import { usePage, Link } from '@inertiajs/react';
import AdminLayout from '@/Components/layout/AdminLayout';

const statusStyle = (status) => {
    switch (status) {
      case "Completed":
        return "bg-[#1e293b] text-white";
      case "Processed":
        return "bg-surface-container-highest text-on-surface";
      default:
        return "bg-surface-container-high text-on-surface";
    }
  };
  
  export default function Dashboard() {
    const { totalSales, activeOrders, lowStockItems, recentOrders } = usePage().props;

    const transactions = recentOrders && recentOrders.length > 0 
      ? recentOrders.map(order => ({
          customer: order.customer_name || "Walk-in Customer",
          specimen: order.items?.[0]?.product_variant?.product?.name || "Various Fabrics",
          yardage: order.items?.reduce((sum, item) => sum + (item.quantity_yard || 0), 0) || 0,
          total: `Rp ${Number(order.total_amount || 0).toLocaleString('id-ID')}`,
          status: order.status ? order.status.charAt(0).toUpperCase() + order.status.slice(1) : "Pending",
        }))
      : [];

    return (
      <div className="px-8 pb-12 pt-4">
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Page heading (Curator's Overview shown in Navbar context, here we add the chart) */}
          <div className="pt-4">
          <h2 className="text-4xl font-display font-extrabold text-on-surface tracking-tight mb-2">
            Curator's Overview
          </h2>
          </div>
  
          {/* Grafik Pesanan */}
          <section>
            <div className="bg-surface-container-lowest p-8 flex flex-col relative group rounded-xl">
              <div className="flex justify-between items-start mb-6">
                <h3 className="font-headline text-2xl font-medium tracking-tight text-on-surface">
                  Grafik Pesanan
                </h3>
                <div className="flex space-x-2">
                  <span className="px-3 py-1 bg-surface-container-low text-on-surface-variant text-sm rounded-full cursor-pointer hover:bg-surface-container-high transition-colors">
                    7 Hari
                  </span>
                  <span className="px-3 py-1 bg-primary text-white text-sm rounded-full cursor-pointer">
                    30 Hari
                  </span>
                </div>
              </div>
              <div className="h-72 w-full relative">
                {/* Y-axis labels and grid lines */}
                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-8 pr-4">
                  {[100, 75, 50, 25, 0].map((val, i) => (
                    <div key={val} className="flex items-center w-full">
                      <span className="text-xs text-on-surface-variant w-8 text-right mr-4">
                        {val}
                      </span>
                      <div
                        className={`border-t border-surface-container-high w-full ${
                          i === 4 ? "border-solid" : "border-dashed"
                        }`}
                      ></div>
                    </div>
                  ))}
                </div>
  
                {/* Line Chart SVG */}
                <svg
                  className="w-full h-full text-primary pb-8 pl-12 pr-4 absolute inset-0"
                  preserveAspectRatio="none"
                  viewBox="0 0 100 100"
                >
                  <defs>
                    <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="currentColor" stopOpacity="0.2" />
                      <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M0,80 C10,75 20,90 30,65 C40,40 50,75 60,45 C70,15 80,35 90,5 C95,0 100,10 100,10 L100,100 L0,100 Z"
                    fill="url(#chartGradient)"
                  />
                  <path
                    d="M0,80 C10,75 20,90 30,65 C40,40 50,75 60,45 C70,15 80,35 90,5 C95,0 100,10 100,10"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  />
                  <circle cx="0" cy="80" fill="currentColor" r="1.5" />
                  <circle cx="30" cy="65" fill="currentColor" r="1.5" />
                  <circle cx="60" cy="45" fill="currentColor" r="1.5" />
                  <circle cx="90" cy="5" fill="currentColor" r="2.5" />
                  <circle cx="100" cy="10" fill="currentColor" r="1.5" />
                </svg>
  
                {/* X-axis labels */}
                <div className="absolute bottom-0 left-12 right-4 flex justify-between text-xs text-on-surface-variant">
                  {["1 Nov", "5 Nov", "10 Nov", "15 Nov", "20 Nov", "25 Nov", "30 Nov"].map(
                    (label) => (
                      <span key={label}>{label}</span>
                    )
                  )}
                </div>
              </div>
            </div>
          </section>
  
          {/* Metric Overview */}
          <section>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  label: "Pendapatan Total",
                  icon: "account_balance_wallet",
                  value: `Rp ${(Number(totalSales || 0) / 1000000).toFixed(1)}M`,
                  desc: "Total Sales All Time",
                  accent: true,
                },
                {
                  label: "Pesanan Aktif",
                  icon: "local_shipping",
                  value: activeOrders || "0",
                  desc: "Sedang diproses",
                },
                {
                  label: "Stok Menipis",
                  icon: "warning",
                  value: lowStockItems?.length || "0",
                  desc: "Perlu restock segera",
                },
                {
                  label: "Pesanan Terbaru",
                  icon: "receipt_long",
                  value: recentOrders?.length || "0",
                  desc: "Data bulan ini",
                },
              ].map((m) => (
                <div
                  key={m.label}
                  className="bg-surface-container-lowest p-8 rounded-xl flex flex-col justify-between relative group hover:-translate-y-1 transition-transform duration-300 overflow-hidden"
                >
                  {m.accent && (
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none"></div>
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
                Recent Transactions
              </h3>
              <Link
                href={route('admin.orders.index')}
                className="font-body text-xs text-primary hover:text-primary-container transition-colors uppercase tracking-wider underline underline-offset-4 decoration-1"
              >
                View Ledger
              </Link>
            </div>
  
            <div className="bg-surface-container-lowest px-8 py-4 rounded-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr>
                      {["Customer", "Specimen", "Yardage", "Total (Rp)", "Status"].map((h, i) => (
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
                    {transactions.length > 0 ? (
                      transactions.map((t, idx) => (
                        <tr
                          key={idx}
                          className="group hover:bg-surface-container-low transition-colors duration-200"
                        >
                          <td className="py-5 font-medium text-on-surface">{t.customer}</td>
                          <td className="py-5 text-on-surface-variant">{t.specimen}</td>
                          <td className="py-5 text-right text-on-surface">{t.yardage}</td>
                          <td className="py-5 text-right font-medium text-on-surface">{t.total}</td>
                          <td className="py-5 pl-8">
                            <span
                              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase ${statusStyle(
                                t.status
                              )}`}
                            >
                              {t.status}
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="py-8 text-center text-on-surface-variant">
                          Belum ada transaksi pesanan.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }

  Dashboard.layout = page => <AdminLayout children={page} />;