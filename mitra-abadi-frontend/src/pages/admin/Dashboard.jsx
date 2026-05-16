import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../lib/api";
import Sk from "../../components/Skeleton";

// --- Helpers ---

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

const STATUS_MAP = {
  pending: { label: "Menunggu", color: "bg-amber-50 text-amber-600 border-amber-200" },
  processing: { label: "Diproses", color: "bg-blue-50 text-blue-600 border-blue-200" },
  completed: { label: "Selesai", color: "bg-emerald-50 text-emerald-600 border-emerald-200" },
  cancelled: { label: "Dibatalkan", color: "bg-red-50 text-red-600 border-red-200" },
};

function StatusBadge({ status }) {
  const cfg = STATUS_MAP[status] ?? { label: status, color: "bg-stone-100 text-stone-600 border-stone-200" };
  return (
    <span className={`inline-flex items-center px-3 py-1.5 rounded-lg text-[10px] font-extrabold uppercase tracking-widest border ${cfg.color}`}>
      {cfg.label}
    </span>
  );
}

// --- Main Component ---

export default function Dashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [chartDays, setChartDays] = useState(30);

  useEffect(() => {
    api
      .get("/admin/dashboard")
      .then((res) => setStats(res.data.data))
      .catch(console.error)
      .finally(() => setLoading(false));
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
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans pb-24" style={{ fontFamily: "Manrope, sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap" rel="stylesheet" />

      {/* ── Top Navbar ── */}
      <div className="bg-white border-b border-stone-200 px-8 py-5 sticky top-0 z-40 shadow-sm">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-[#e61e25] text-white flex items-center justify-center shadow-md">
              <span className="material-symbols-outlined text-[20px]">dashboard</span>
            </div>
            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-widest text-stone-400">Panel Admin</p>
              <h1 className="text-xl font-extrabold text-stone-900">Dashboard</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-8 mt-10 space-y-10">
        
        {/* Page Header */}
        <div className="max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-black text-stone-900 leading-tight mb-3">
            Ringkasan Sistem
          </h2>
          <p className="text-stone-500 font-medium leading-relaxed">
            Pantau performa penjualan, ketersediaan stok inventori, dan status transaksi terkini secara *real-time*.
          </p>
        </div>

        {/* ── Metric Cards ── */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {loading ? Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-white p-8 rounded-[2rem] shadow-sm border border-stone-100 flex flex-col gap-6">
                <div className="flex justify-between items-start">
                  <Sk className="h-4 w-24 rounded-full" />
                  <Sk className="w-12 h-12 rounded-2xl" />
                </div>
                <div className="flex flex-col gap-2 mt-4">
                  <Sk className="h-10 w-24 rounded-lg" />
                  <Sk className="h-3 w-36 rounded-full" />
                </div>
              </div>
            )) : [
              {
                label: "Total Produk",
                icon: "inventory_2",
                value: stats?.total_products ?? "-",
                desc: "Total spesimen di inventori",
                color: "text-stone-900 bg-stone-100",
                iconColor: "text-stone-600"
              },
              {
                label: "Total Pesanan",
                icon: "receipt_long",
                value: stats?.total_orders ?? "-",
                desc: "Seluruh transaksi tercatat",
                color: "text-stone-900 bg-stone-100",
                iconColor: "text-stone-600"
              },
              {
                label: "Stok Menipis",
                icon: "warning",
                value: stats?.low_stock_count ?? "-",
                desc: "Produk perlu direstok segera",
                critical: (stats?.low_stock_count ?? 0) > 0,
                color: "text-stone-900 bg-stone-100",
                iconColor: "text-[#e61e25]"
              },
              {
                label: "Estimasi Pendapatan",
                icon: "account_balance_wallet",
                value: stats?.total_revenue ? "Rp " + Number(stats.total_revenue).toLocaleString("id-ID") : "-",
                desc: "Akumulasi nilai transaksi",
                accent: true,
                color: "text-white bg-stone-800",
                iconColor: "text-stone-300"
              },
            ].map((m, idx) => (
              <div
                key={idx}
                className={`p-8 rounded-[2rem] shadow-sm border flex flex-col justify-between group hover:-translate-y-1 hover:shadow-md transition-all duration-300 ${
                  m.accent ? "bg-stone-900 border-stone-800" : m.critical ? "bg-red-50 border-red-100" : "bg-white border-stone-100"
                }`}
              >
                <div className="flex justify-between items-start mb-8">
                  <span className={`text-[10px] font-extrabold tracking-widest uppercase ${m.accent ? "text-stone-400" : m.critical ? "text-red-500" : "text-stone-400"}`}>
                    {m.label}
                  </span>
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${m.critical ? "bg-red-100" : m.color}`}>
                    <span className={`material-symbols-outlined text-[20px] ${m.iconColor}`}>{m.icon}</span>
                  </div>
                </div>
                <div>
                  <p className={`text-4xl font-black tracking-tight ${m.accent ? "text-white" : m.critical ? "text-[#e61e25]" : "text-stone-900"}`}>
                    {m.value}
                  </p>
                  <p className={`text-xs font-semibold mt-2 ${m.accent ? "text-stone-500" : m.critical ? "text-red-400" : "text-stone-400"}`}>
                    {m.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Grafik Pesanan ── */}
        <section>
          <div className="bg-white p-8 md:p-10 rounded-[2rem] shadow-sm border border-stone-100">
            {/* Header Grafik */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
              <div>
                <h3 className="text-xl font-black tracking-tight text-stone-900 flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#e61e25]">monitoring</span>
                  Grafik Pesanan
                </h3>
                <p className="text-sm font-semibold text-stone-400 mt-1">
                  Total <strong className="text-stone-700">{totalInRange} pesanan</strong> dalam {chartDays} hari terakhir
                </p>
              </div>
              <div className="flex bg-stone-50 p-1.5 rounded-xl border border-stone-200">
                {[7, 30].map((d) => (
                  <button
                    key={d}
                    onClick={() => setChartDays(d)}
                    className={`px-4 py-2 text-[11px] font-extrabold uppercase tracking-widest rounded-lg transition-all ${
                      chartDays === d
                        ? "bg-white text-stone-900 shadow-sm"
                        : "text-stone-400 hover:text-stone-700"
                    }`}
                  >
                    {d} Hari
                  </button>
                ))}
              </div>
            </div>

            {loading ? (
              <div className="h-72 mt-6 flex flex-col gap-4">
                <div className="flex gap-4 h-full">
                  <div className="flex flex-col justify-between py-2 w-8 shrink-0">
                    <Sk className="h-3 w-8 rounded" />
                    <Sk className="h-3 w-6 rounded" />
                    <Sk className="h-3 w-4 rounded" />
                  </div>
                  <Sk className="flex-1 rounded-2xl" />
                </div>
              </div>
            ) : (
              <div className="h-72 w-full relative mt-6">
                {/* Y-axis labels + grid lines */}
                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-8">
                  {yTicks.map((val, i) => (
                    <div key={i} className="flex items-center w-full">
                      <span className="text-[10px] font-extrabold text-stone-400 w-8 text-right mr-4 shrink-0">
                        {val}
                      </span>
                      <div
                        className={`flex-1 border-t ${
                          i === yTicks.length - 1
                            ? "border-stone-200 border-solid"
                            : "border-stone-100 border-dashed"
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
                  style={{ paddingBottom: "32px", paddingLeft: "48px", paddingRight: "4px" }}
                >
                  <defs>
                    <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="#e61e25" stopOpacity="0.2" />
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
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="drop-shadow-sm"
                    />
                  )}

                  {/* Dots (only for days with orders) */}
                  {chartPoints
                    .filter((p) => p.v > 0)
                    .map((p, i) => (
                      <circle key={i} cx={p.x} cy={p.y} r="2" fill="#fff" stroke="#e61e25" strokeWidth="1" />
                    ))}
                </svg>

                {/* X-axis labels */}
                <div className="absolute bottom-0 left-12 right-1 flex justify-between text-[9px] font-extrabold uppercase tracking-widest text-stone-400">
                  {xLabels.map(({ label, i }) => (
                    <span key={i}>{label}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ── Transaksi Terbaru ── */}
        <section>
          <div className="bg-white rounded-[2rem] shadow-sm border border-stone-100 p-8 flex flex-col gap-2">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-black tracking-tight text-stone-900 flex items-center gap-2">
                <span className="material-symbols-outlined text-stone-400">history</span>
                Transaksi Terbaru
              </h3>
              <button
                onClick={() => navigate("/admin/riwayat-transaksi")}
                className="text-[10px] font-extrabold uppercase tracking-widest text-[#e61e25] hover:text-red-700 hover:underline underline-offset-4 transition-colors"
              >
                Lihat Semua
              </button>
            </div>

            {loading ? (
              <div className="flex flex-col gap-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="flex items-center gap-6 px-4 py-2">
                    <Sk className="h-4 w-20 rounded-lg flex-shrink-0" />
                    <div className="flex flex-col gap-2 flex-1">
                      <Sk className="h-4 w-32 rounded-full" />
                      <Sk className="h-3 w-24 rounded-full" />
                    </div>
                    <Sk className="h-4 w-24 rounded-full hidden md:block" />
                    <Sk className="h-6 w-20 rounded-xl hidden md:block" />
                  </div>
                ))}
              </div>
            ) : transactions.length === 0 ? (
              <div className="py-12 text-center flex flex-col items-center">
                <div className="w-16 h-16 bg-stone-50 rounded-full flex items-center justify-center mb-4">
                  <span className="material-symbols-outlined text-3xl text-stone-300">receipt_long</span>
                </div>
                <p className="text-sm font-bold text-stone-500">Belum ada transaksi terbaru.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="border-b border-stone-100">
                    <tr>
                      <th className="py-4 font-extrabold text-[10px] uppercase tracking-widest text-stone-400">Pelanggan</th>
                      <th className="py-4 font-extrabold text-[10px] uppercase tracking-widest text-stone-400">Produk</th>
                      <th className="py-4 font-extrabold text-[10px] uppercase tracking-widest text-stone-400 text-center">Qty</th>
                      <th className="py-4 font-extrabold text-[10px] uppercase tracking-widest text-stone-400 text-right">Total Tagihan</th>
                      <th className="py-4 font-extrabold text-[10px] uppercase tracking-widest text-stone-400 text-center pl-8">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-50">
                    {transactions.map((t, idx) => (
                      <tr key={t.id ?? idx} className="hover:bg-stone-50/50 transition-colors group">
                        <td className="py-5 font-bold text-stone-900 pr-4">
                          {t.customer_name}
                        </td>
                        <td className="py-5 text-sm font-semibold text-stone-500 pr-4">
                          {t.product_name}
                        </td>
                        <td className="py-5 text-center font-bold text-stone-700">
                          {t.qty_roll} roll
                        </td>
                        <td className="py-5 text-right font-black text-stone-900">
                          {t.total_amount != null ? "Rp " + Number(t.total_amount).toLocaleString("id-ID") : "-"}
                        </td>
                        <td className="py-5 pl-8 text-center">
                          <StatusBadge status={t.status} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </section>

      </div>
    </div>
  );
}