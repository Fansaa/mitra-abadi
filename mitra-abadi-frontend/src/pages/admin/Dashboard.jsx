import { useState, useEffect, useMemo } from "react";
import api from "../../lib/api";
import SectionLoader from "../../components/SectionLoader";

// Bangun array N hari terakhir dalam format YYYY-MM-DD
function getLastNDays(n) {
  return Array.from({ length: n }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (n - 1 - i));
    return d.toISOString().slice(0, 10);
  });
}

// Format label sumbu X: "1 Jan", "15 Jan", dll
function formatAxisLabel(iso) {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("id-ID", { day: "numeric", month: "short" });
}

// Hasilkan polyline points dari array nilai
function buildPolylinePoints(values, svgW = 100, svgH = 80, padTop = 5) {
  const maxVal = Math.max(...values, 1);
  return values.map((v, i) => {
    const x = values.length > 1 ? (i / (values.length - 1)) * svgW : svgW / 2;
    const y = svgH - padTop - (v / maxVal) * (svgH - padTop - 5) + padTop;
    return { x: parseFloat(x.toFixed(2)), y: parseFloat(y.toFixed(2)), v };
  });
}

const STATUS_LABEL = {
  pending: "Menunggu",
  processing: "Diproses",
  completed: "Selesai",
  cancelled: "Dibatalkan",
};

const statusStyle = (status) => {
  switch (status) {
    case "completed":
      return "bg-[#1e293b] text-white";
    case "processing":
      return "bg-surface-container-highest text-on-surface";
    case "cancelled":
      return "bg-red-100 text-red-700";
    default:
      return "bg-surface-container-high text-on-surface";
  }
};

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [chartDays, setChartDays] = useState(30);

  useEffect(() => {
    api
      .get("/admin/dashboard")
      .then((res) => {
        setStats(res.data.data);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const transactions = stats?.recent_orders ?? [];

  // Hitung data chart dari recent_orders, dikelompokkan per hari
  const { chartPoints, xLabels, yTicks, totalInRange } = useMemo(() => {
    const days = getLastNDays(chartDays);
    const counts = Object.fromEntries(days.map((d) => [d, 0]));

    transactions.forEach((order) => {
      const date = (order.created_at ?? "").slice(0, 10);
      if (date in counts) counts[date]++;
    });

    const values = days.map((d) => counts[d]);
    const maxVal = Math.max(...values, 1);
    const chartPoints = buildPolylinePoints(values);

    // Pilih ~7 label sumbu X yang merata
    const step = Math.max(1, Math.floor(days.length / 6));
    const xLabels = days
      .map((d, i) => ({ label: formatAxisLabel(d), i, x: chartPoints[i]?.x ?? 0 }))
      .filter((_, i) => i % step === 0 || i === days.length - 1);

    // Sumbu Y: 0, setengah, max (dibulatkan)
    const yTicks = [maxVal, Math.round(maxVal / 2), 0];

    const totalInRange = values.reduce((s, v) => s + v, 0);

    return { chartPoints, xLabels, yTicks, totalInRange };
  }, [transactions, chartDays]);

  return (
    <div className="px-8 py-8 space-y-10">
        <div className="mb-8 flex justify-between items-end">
          <div>
            <h2 className="text-4xl font-display font-extrabold text-on-surface tracking-tight mb-2">
              Ringkasan Dashboard
            </h2>
            <p className="text-lg text-on-surface-variant leading-relaxed font-body">
              Pantau performa penjualan, stok, dan transaksi terkini.
            </p>
          </div>
        </div>

        {/* Grafik Pesanan */}
        <section>
          <div className="bg-surface-container-lowest p-8 flex flex-col rounded-xl">
            {/* Header */}
            <div className="flex justify-between items-start mb-1">
              <div>
                <h3 className="font-headline text-2xl font-medium tracking-tight text-on-surface">
                  Grafik Pesanan
                </h3>
                <p className="text-sm text-on-surface-variant mt-1">
                  {totalInRange} pesanan dalam {chartDays} hari terakhir
                </p>
              </div>
              <div className="flex space-x-2">
                {[7, 30].map((d) => (
                  <button
                    key={d}
                    onClick={() => setChartDays(d)}
                    className={`px-3 py-1 text-sm rounded-full transition-colors ${
                      chartDays === d
                        ? "bg-primary text-white"
                        : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high"
                    }`}
                  >
                    {d} Hari
                  </button>
                ))}
              </div>
            </div>

            {loading ? (
              <div className="h-64 flex items-center justify-center">
                <SectionLoader />
              </div>
            ) : (
              <div className="h-64 w-full relative mt-6">
                {/* Y-axis labels + grid lines */}
                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-7">
                  {yTicks.map((val, i) => (
                    <div key={i} className="flex items-center w-full">
                      <span className="text-xs text-on-surface-variant w-8 text-right mr-3 shrink-0">
                        {val}
                      </span>
                      <div
                        className={`flex-1 border-t ${
                          i === yTicks.length - 1
                            ? "border-outline-variant/40 border-solid"
                            : "border-surface-container-high border-dashed"
                        }`}
                      />
                    </div>
                  ))}
                </div>

                {/* SVG Chart */}
                <svg
                  className="absolute inset-0 w-full h-full"
                  viewBox="0 0 100 90"
                  preserveAspectRatio="none"
                  style={{ paddingBottom: "28px", paddingLeft: "44px", paddingRight: "4px" }}
                >
                  <defs>
                    <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="#e61e25" stopOpacity="0.18" />
                      <stop offset="100%" stopColor="#e61e25" stopOpacity="0" />
                    </linearGradient>
                  </defs>

                  {/* Area fill */}
                  {chartPoints.length > 0 && (
                    <polygon
                      points={[
                        ...chartPoints.map((p) => `${p.x},${p.y}`),
                        `${chartPoints[chartPoints.length - 1].x},90`,
                        `${chartPoints[0].x},90`,
                      ].join(" ")}
                      fill="url(#chartGradient)"
                    />
                  )}

                  {/* Line */}
                  {chartPoints.length > 1 && (
                    <polyline
                      points={chartPoints.map((p) => `${p.x},${p.y}`).join(" ")}
                      fill="none"
                      stroke="#e61e25"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  )}

                  {/* Data point dots — hanya hari yang ada pesanannya */}
                  {chartPoints
                    .filter((p) => p.v > 0)
                    .map((p, i) => (
                      <circle key={i} cx={p.x} cy={p.y} r="2" fill="#e61e25" />
                    ))}
                </svg>

                {/* X-axis labels */}
                <div className="absolute bottom-0 left-11 right-1 flex justify-between text-xs text-on-surface-variant">
                  {xLabels.map(({ label, i }) => (
                    <span key={i}>{label}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Metric Overview */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                label: "Total Produk",
                icon: "inventory_2",
                value: stats?.total_products ?? "-",
                desc: "Total kain dalam inventori",
              },
              {
                label: "Total Pesanan",
                icon: "shopping_cart",
                value: stats?.total_orders ?? "-",
                desc: "Seluruh transaksi tercatat",
              },
              {
                label: "Stok Menipis",
                icon: "warning",
                value: stats?.low_stock_count ?? "-",
                desc: "Produk perlu direstok",
                critical: (stats?.low_stock_count ?? 0) > 0,
              },
              {
                label: "Estimasi Pendapatan",
                icon: "account_balance_wallet",
                value: stats?.total_revenue
                  ? "Rp " + Number(stats.total_revenue).toLocaleString("id-ID")
                  : "-",
                desc: "Akumulasi seluruh transaksi",
                accent: true,
              },
            ].map((m) => (
              <div
                key={m.label}
                className="bg-surface-container-lowest p-8 rounded-xl flex flex-col justify-between relative group hover:-translate-y-1 transition-transform duration-300 overflow-hidden"
              >
                {m.accent && (
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none"></div>
                )}
                {m.critical && (
                  <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent pointer-events-none"></div>
                )}
                <div className="flex justify-between items-start mb-6 relative z-10">
                  <span className="font-body text-xs tracking-wider uppercase text-on-surface-variant">
                    {m.label}
                  </span>
                  <span className="material-symbols-outlined text-primary">{m.icon}</span>
                </div>
                <div className="relative z-10">
                  <p
                    className={`font-display ${
                      m.accent ? "text-3xl" : "text-4xl"
                    } font-black tracking-tighter text-on-surface`}
                  >
                    {m.value}
                  </p>
                  <p className="font-body text-sm text-on-surface-variant mt-2">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Recent Transactions */}
        <section className="space-y-6">
          <div className="flex justify-between items-end">
            <h3 className="font-headline text-2xl font-medium tracking-tight text-on-surface">
              Transaksi Terbaru
            </h3>
            <a
              href="/admin/riwayat-transaksi"
              className="font-body text-xs text-primary hover:text-primary-container transition-colors uppercase tracking-wider underline underline-offset-4 decoration-1"
            >
              Lihat Semua
            </a>
          </div>

          <div className="bg-surface-container-lowest px-8 py-4 rounded-xl">
            {loading ? (
              <SectionLoader />
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr>
                      {["Pelanggan", "Produk", "Qty (Roll)", "Total (Rp)", "Status"].map((h, i) => (
                        <th
                          key={h}
                          className={`py-4 font-body text-xs uppercase tracking-wider text-on-surface-variant opacity-70 ${
                            i === 2 || i === 3 ? "text-right" : ""
                          } ${i === 4 ? "pl-8" : ""}`}
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="font-body text-base">
                    {transactions.map((t, idx) => (
                      <tr
                        key={t.id ?? idx}
                        className="group hover:bg-surface-container-low transition-colors duration-200"
                      >
                        <td className="py-5 font-medium text-on-surface">{t.customer_name}</td>
                        <td className="py-5 text-on-surface-variant">{t.product_name}</td>
                        <td className="py-5 text-right text-on-surface">{t.qty_roll} roll</td>
                        <td className="py-5 text-right font-medium text-on-surface">
                          {t.total_amount != null ? "Rp " + Number(t.total_amount).toLocaleString("id-ID") : "-"}
                        </td>
                        <td className="py-5 pl-8">
                          <span
                            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase ${statusStyle(
                              t.status
                            )}`}
                          >
                            {STATUS_LABEL[t.status] ?? t.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                    {transactions.length === 0 && (
                      <tr>
                        <td colSpan={5} className="py-8 text-center text-on-surface-variant text-sm">
                          Belum ada transaksi.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </section>
    </div>
  );
}
