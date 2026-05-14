import { useState, useEffect, useMemo } from "react";
import api from "../../lib/api";
import SectionLoader from "../../components/SectionLoader";

// --- Helpers ---

function formatIDR(amount) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount ?? 0);
}

function formatDate(dateStr) {
  if (!dateStr) return "-";
  return new Date(dateStr).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

const STATUS_MAP = {
  pending: { label: "Menunggu", color: "bg-amber-100 text-amber-700 border-amber-200" },
  processing: { label: "Diproses", color: "bg-blue-100 text-blue-700 border-blue-200" },
  completed: { label: "Selesai", color: "bg-emerald-100 text-emerald-700 border-emerald-200" },
  cancelled: { label: "Dibatalkan", color: "bg-red-100 text-red-700 border-red-200" },
};

function StatusBadge({ status }) {
  const cfg = STATUS_MAP[status] ?? { label: status, color: "bg-gray-100 text-gray-600 border-gray-200" };
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${cfg.color}`}
    >
      {cfg.label}
    </span>
  );
}

function formatProductSummary(items) {
  if (!items || items.length === 0) return "-";
  const firstName = items[0]?.product_name ?? items[0]?.name ?? "Produk";
  if (items.length === 1) return firstName;
  return `${firstName} + ${items.length - 1} lainnya`;
}

// --- Download Helper ---

async function downloadPdf(orderId, type, filename) {
  const response = await api.get(`/admin/orders/${orderId}/${type}`, {
    responseType: "blob",
  });
  const url = URL.createObjectURL(new Blob([response.data], { type: "application/pdf" }));
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

// --- Detail Modal ---

function DetailModal({ order, onClose }) {
  if (!order) return null;

  const [downloadingInvoice, setDownloadingInvoice] = useState(false);
  const [downloadingPacking, setDownloadingPacking] = useState(false);

  const handleDownloadInvoice = async () => {
    setDownloadingInvoice(true);
    try {
      await downloadPdf(order.id, "invoice", `invoice_${order.order_code}.pdf`);
    } finally {
      setDownloadingInvoice(false);
    }
  };

  const handleDownloadPackingList = async () => {
    setDownloadingPacking(true);
    try {
      await downloadPdf(order.id, "packing-list", `packing_list_${order.order_code}.pdf`);
    } finally {
      setDownloadingPacking(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-surface-container-lowest rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-start justify-between px-8 pt-8 pb-6 border-b border-outline-variant">
          <div>
            <p className="font-body text-xs uppercase tracking-widest text-on-surface-variant mb-1">
              Detail Transaksi
            </p>
            <h3 className="font-headline text-xl font-bold text-on-surface">
              {order.order_code}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-on-surface-variant hover:text-on-surface transition-colors p-1"
            aria-label="Tutup"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto flex-1 px-8 py-6 space-y-6">
          {/* Status & Date */}
          <div className="flex flex-wrap gap-4 items-center">
            <StatusBadge status={order.status} />
            <span className="font-body text-sm text-on-surface-variant">
              {formatDate(order.created_at)}
            </span>
          </div>

          {/* Customer Info */}
          <section>
            <h4 className="font-body text-xs uppercase tracking-widest font-semibold text-on-surface-variant mb-3">
              Informasi Pelanggan
            </h4>
            <div className="bg-surface-container-low rounded-xl p-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <p className="font-body text-xs text-on-surface-variant">Nama</p>
                <p className="font-body text-sm font-medium text-on-surface">{order.customer_name || "-"}</p>
              </div>
              <div>
                <p className="font-body text-xs text-on-surface-variant">Telepon</p>
                <p className="font-body text-sm font-medium text-on-surface">{order.customer_phone || "-"}</p>
              </div>
              <div>
                <p className="font-body text-xs text-on-surface-variant">Email</p>
                <p className="font-body text-sm font-medium text-on-surface">{order.customer_email || "-"}</p>
              </div>
              <div>
                <p className="font-body text-xs text-on-surface-variant">Alamat</p>
                <p className="font-body text-sm font-medium text-on-surface">{order.customer_address || "-"}</p>
              </div>
            </div>
          </section>

          {/* Items Table */}
          <section>
            <h4 className="font-body text-xs uppercase tracking-widest font-semibold text-on-surface-variant mb-3">
              Item Pesanan
            </h4>
            <div className="overflow-x-auto rounded-xl border border-outline-variant">
              <table className="w-full text-sm">
                <thead className="bg-surface-container-low">
                  <tr>
                    <th className="text-left font-body text-xs uppercase tracking-widest text-on-surface-variant px-4 py-3">
                      Produk
                    </th>
                    <th className="text-left font-body text-xs uppercase tracking-widest text-on-surface-variant px-4 py-3">
                      Warna
                    </th>
                    <th className="text-right font-body text-xs uppercase tracking-widest text-on-surface-variant px-4 py-3">
                      Qty (Roll)
                    </th>
                    <th className="text-right font-body text-xs uppercase tracking-widest text-on-surface-variant px-4 py-3">
                      Subtotal
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/30">
                  {(order.items ?? []).map((item, idx) => (
                    <tr key={item.id ?? idx} className="hover:bg-surface-container-low/50 transition-colors">
                      <td className="px-4 py-3 font-medium text-on-surface">
                        {item.product_name ?? item.name ?? "-"}
                      </td>
                      <td className="px-4 py-3 text-on-surface-variant">
                        {item.color_name ?? item.color ?? "-"}
                      </td>
                      <td className="px-4 py-3 text-right text-on-surface">
                        {item.qty_roll ?? "-"}
                      </td>
                      <td className="px-4 py-3 text-right font-medium text-on-surface">
                        {item.subtotal != null ? formatIDR(item.subtotal) : "-"}
                      </td>
                    </tr>
                  ))}
                  {(order.items ?? []).length === 0 && (
                    <tr>
                      <td colSpan={4} className="px-4 py-6 text-center text-on-surface-variant font-body text-sm">
                        Tidak ada item.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>

          {/* Total & Notes */}
          <section className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            {order.notes && (
              <div className="flex-1">
                <p className="font-body text-xs uppercase tracking-widest text-on-surface-variant mb-1">
                  Catatan
                </p>
                <p className="font-body text-sm text-on-surface bg-surface-container-low rounded-lg px-4 py-2">
                  {order.notes}
                </p>
              </div>
            )}
            <div className="sm:text-right">
              <p className="font-body text-xs uppercase tracking-widest text-on-surface-variant mb-1">
                Total
              </p>
              <p className="font-headline text-2xl font-bold text-primary">
                {formatIDR(order.total_amount)}
              </p>
            </div>
          </section>
        </div>

        {/* Modal Footer */}
        <div className="px-8 py-5 border-t border-outline-variant flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadInvoice}
              disabled={downloadingInvoice}
              className="inline-flex items-center gap-1.5 font-body text-sm font-semibold px-4 py-2.5 rounded-lg bg-primary text-on-primary hover:bg-primary/90 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
            >
              {downloadingInvoice ? (
                <span className="material-symbols-outlined text-[18px] animate-spin">progress_activity</span>
              ) : (
                <span className="material-symbols-outlined text-[18px]">receipt_long</span>
              )}
              Unduh Invoice
            </button>
            <button
              onClick={handleDownloadPackingList}
              disabled={downloadingPacking}
              className="inline-flex items-center gap-1.5 font-body text-sm font-semibold px-4 py-2.5 rounded-lg bg-secondary text-on-secondary hover:bg-secondary/90 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
            >
              {downloadingPacking ? (
                <span className="material-symbols-outlined text-[18px] animate-spin">progress_activity</span>
              ) : (
                <span className="material-symbols-outlined text-[18px]">inventory_2</span>
              )}
              Unduh Packing List
            </button>
          </div>
          <button
            onClick={onClose}
            className="font-body text-sm font-semibold px-6 py-2.5 rounded-lg bg-surface-container-high text-on-surface hover:bg-surface-container-highest transition-colors"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}

// --- Main Page ---

export default function RiwayatTransaksi() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Filters
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [tanggalDari, setTanggalDari] = useState("");
  const [tanggalSampai, setTanggalSampai] = useState("");

  // Modal
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Download state: { id, type } or null
  const [downloadingId, setDownloadingId] = useState(null);

  const handleDownload = async (order, type) => {
    const key = `${order.id}-${type}`;
    if (downloadingId === key) return;
    setDownloadingId(key);
    try {
      const filename =
        type === "invoice"
          ? `invoice_${order.order_code}.pdf`
          : `packing_list_${order.order_code}.pdf`;
      await downloadPdf(order.id, type, filename);
    } finally {
      setDownloadingId(null);
    }
  };

  useEffect(() => {
    setLoading(true);
    setError("");
    api
      .get("/admin/orders")
      .then((res) => setOrders(res.data.data ?? []))
      .catch((err) => {
        setError(err.response?.data?.message ?? "Gagal memuat riwayat transaksi.");
      })
      .finally(() => setLoading(false));
  }, []);

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      // Search by customer name or order code
      if (search.trim()) {
        const q = search.trim().toLowerCase();
        const matchName = (order.customer_name ?? "").toLowerCase().includes(q);
        const matchCode = (order.order_code ?? "").toLowerCase().includes(q);
        if (!matchName && !matchCode) return false;
      }

      // Status filter
      if (statusFilter !== "all" && order.status !== statusFilter) return false;

      // Date range filter
      if (tanggalDari) {
        const orderDate = new Date(order.created_at);
        const fromDate = new Date(tanggalDari);
        fromDate.setHours(0, 0, 0, 0);
        if (orderDate < fromDate) return false;
      }
      if (tanggalSampai) {
        const orderDate = new Date(order.created_at);
        const toDate = new Date(tanggalSampai);
        toDate.setHours(23, 59, 59, 999);
        if (orderDate > toDate) return false;
      }

      return true;
    });
  }, [orders, search, statusFilter, tanggalDari, tanggalSampai]);

  const handleClearFilters = () => {
    setSearch("");
    setStatusFilter("all");
    setTanggalDari("");
    setTanggalSampai("");
  };

  const hasActiveFilters =
    search.trim() || statusFilter !== "all" || tanggalDari || tanggalSampai;

  return (
    <>
      <div className="px-8 py-8">
        {/* Page Header */}
        <div className="mb-8 flex justify-between items-end">
          <div>
            <h2 className="text-4xl font-display font-extrabold tracking-tight text-on-surface mb-2">
              Riwayat Transaksi
            </h2>
            <p className="font-body text-on-surface-variant text-lg leading-relaxed">
              Pantau dan kelola seluruh riwayat pesanan pelanggan secara terpusat.
            </p>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="bg-surface-container-lowest rounded-xl p-6 mb-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search */}
            <div className="lg:col-span-2">
              <label className="block font-body text-xs uppercase tracking-widest font-semibold text-on-surface-variant mb-2">
                Cari
              </label>
              <div className="relative bg-surface-container-low rounded-lg flex items-center">
                <span className="material-symbols-outlined text-on-surface-variant ml-3 text-[20px] select-none">
                  search
                </span>
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Nama pelanggan atau kode order..."
                  className="w-full bg-transparent border-none focus:ring-0 font-body text-sm text-on-surface placeholder-on-surface-variant py-2.5 px-3"
                />
                {search && (
                  <button
                    onClick={() => setSearch("")}
                    className="mr-3 text-on-surface-variant hover:text-on-surface transition-colors"
                  >
                    <span className="material-symbols-outlined text-[18px]">close</span>
                  </button>
                )}
              </div>
            </div>

            {/* Status Filter */}
            <div>
              <label className="block font-body text-xs uppercase tracking-widest font-semibold text-on-surface-variant mb-2">
                Status
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full bg-surface-container-low border-none rounded-lg font-body text-sm text-on-surface py-2.5 px-3 focus:ring-1 focus:ring-primary"
              >
                <option value="all">Semua</option>
                <option value="pending">Menunggu</option>
                <option value="processing">Diproses</option>
                <option value="completed">Selesai</option>
                <option value="cancelled">Dibatalkan</option>
              </select>
            </div>

            {/* Spacer for alignment on large screens */}
            <div className="hidden lg:block" />

            {/* Date From */}
            <div>
              <label className="block font-body text-xs uppercase tracking-widest font-semibold text-on-surface-variant mb-2">
                Tanggal Dari
              </label>
              <input
                type="date"
                value={tanggalDari}
                onChange={(e) => setTanggalDari(e.target.value)}
                className="w-full bg-surface-container-low border-none rounded-lg font-body text-sm text-on-surface py-2.5 px-3 focus:ring-1 focus:ring-primary"
              />
            </div>

            {/* Date To */}
            <div>
              <label className="block font-body text-xs uppercase tracking-widest font-semibold text-on-surface-variant mb-2">
                Tanggal Sampai
              </label>
              <input
                type="date"
                value={tanggalSampai}
                onChange={(e) => setTanggalSampai(e.target.value)}
                min={tanggalDari || undefined}
                className="w-full bg-surface-container-low border-none rounded-lg font-body text-sm text-on-surface py-2.5 px-3 focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>

          {/* Clear filters */}
          {hasActiveFilters && (
            <div className="flex justify-end">
              <button
                onClick={handleClearFilters}
                className="font-body text-xs font-semibold text-primary underline underline-offset-4 decoration-1 hover:text-primary/70 transition-colors"
              >
                Hapus semua filter
              </button>
            </div>
          )}
        </div>

        {/* Table */}
        <div className="bg-surface-container-lowest rounded-xl overflow-hidden">
          {loading ? (
            <SectionLoader />
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-24 gap-3">
              <span className="material-symbols-outlined text-4xl text-red-400">error_outline</span>
              <p className="font-body text-sm text-red-500">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="font-body text-xs text-primary underline underline-offset-4"
              >
                Coba lagi
              </button>
            </div>
          ) : filteredOrders.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 gap-3 text-on-surface-variant">
              <span className="material-symbols-outlined text-4xl">receipt_long</span>
              <p className="font-body text-sm">
                {orders.length === 0
                  ? "Belum ada transaksi tercatat."
                  : "Tidak ada transaksi yang cocok dengan filter."}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-surface-container-low border-b border-outline-variant">
                  <tr>
                    <th className="text-left font-body text-xs uppercase tracking-widest text-on-surface-variant px-6 py-4">
                      No. Order
                    </th>
                    <th className="text-left font-body text-xs uppercase tracking-widest text-on-surface-variant px-4 py-4">
                      Pelanggan
                    </th>
                    <th className="text-left font-body text-xs uppercase tracking-widest text-on-surface-variant px-4 py-4">
                      Produk
                    </th>
                    <th className="text-right font-body text-xs uppercase tracking-widest text-on-surface-variant px-4 py-4">
                      Jumlah
                    </th>
                    <th className="text-center font-body text-xs uppercase tracking-widest text-on-surface-variant px-4 py-4">
                      Status
                    </th>
                    <th className="text-left font-body text-xs uppercase tracking-widest text-on-surface-variant px-4 py-4">
                      Tanggal
                    </th>
                    <th className="px-6 py-4 text-left font-body text-xs uppercase tracking-widest text-on-surface-variant">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/30">
                  {filteredOrders.map((order) => (
                    <tr
                      key={order.id}
                      className="hover:bg-surface-container-low/60 transition-colors group"
                    >
                      <td className="px-6 py-4">
                        <span className="font-mono text-xs font-semibold text-primary bg-primary/5 px-2 py-1 rounded">
                          {order.order_code}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <p className="font-medium text-on-surface">{order.customer_name}</p>
                        {order.customer_phone && (
                          <p className="text-xs text-on-surface-variant mt-0.5">{order.customer_phone}</p>
                        )}
                      </td>
                      <td className="px-4 py-4 text-on-surface-variant">
                        {formatProductSummary(order.items)}
                      </td>
                      <td className="px-4 py-4 text-right font-semibold text-on-surface">
                        {formatIDR(order.total_amount)}
                      </td>
                      <td className="px-4 py-4 text-center">
                        <StatusBadge status={order.status} />
                      </td>
                      <td className="px-4 py-4 text-on-surface-variant text-xs whitespace-nowrap">
                        {formatDate(order.created_at)}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setSelectedOrder(order)}
                            className="font-body text-xs font-semibold text-primary underline underline-offset-2 decoration-1 hover:text-primary/70 transition-colors whitespace-nowrap"
                          >
                            Lihat Detail
                          </button>
                          <button
                            onClick={() => handleDownload(order, "invoice")}
                            disabled={downloadingId === `${order.id}-invoice`}
                            title="Unduh Invoice"
                            className="inline-flex items-center justify-center w-7 h-7 rounded-md hover:bg-surface-container-high text-on-surface-variant hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                          >
                            {downloadingId === `${order.id}-invoice` ? (
                              <span className="material-symbols-outlined text-[16px] animate-spin">progress_activity</span>
                            ) : (
                              <span className="material-symbols-outlined text-[16px]">receipt_long</span>
                            )}
                          </button>
                          <button
                            onClick={() => handleDownload(order, "packing-list")}
                            disabled={downloadingId === `${order.id}-packing-list`}
                            title="Unduh Packing List"
                            className="inline-flex items-center justify-center w-7 h-7 rounded-md hover:bg-surface-container-high text-on-surface-variant hover:text-secondary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                          >
                            {downloadingId === `${order.id}-packing-list` ? (
                              <span className="material-symbols-outlined text-[16px] animate-spin">progress_activity</span>
                            ) : (
                              <span className="material-symbols-outlined text-[16px]">inventory_2</span>
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Table footer: result count */}
              <div className="px-6 py-4 border-t border-outline-variant/30 flex items-center justify-between">
                <p className="font-body text-xs text-on-surface-variant">
                  Menampilkan{" "}
                  <span className="font-semibold text-on-surface">{filteredOrders.length}</span>{" "}
                  dari <span className="font-semibold text-on-surface">{orders.length}</span> transaksi
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Detail Modal */}
      {selectedOrder && (
        <DetailModal order={selectedOrder} onClose={() => setSelectedOrder(null)} />
      )}
    </>
  );
}
