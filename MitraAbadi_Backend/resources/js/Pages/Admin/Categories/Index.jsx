import { router } from "@inertiajs/react";
import AdminLayout from '@/Components/layout/AdminLayout';

const categories = [
  { id: "cotton-heritage", name: "Cotton Heritage", count: 1245, status: "Aktif", icon: "texture" },
  { id: "imperial-silk", name: "Imperial Silk", count: 892, status: "Aktif", icon: "waves" },
  { id: "raw-linen", name: "Raw Linen", count: 410, status: "Non-aktif", icon: "filter_vintage" },
  { id: "merino-wool", name: "Merino Wool", count: 156, status: "Aktif", icon: "hive" },
];

export default function ManajemenKategori() {
  // using router.visit

  return (
    <div className="p-12 max-w-7xl mx-auto w-full flex-1 flex flex-col gap-12">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="max-w-2xl">
          <h2 className="text-4xl font-display font-extrabold text-on-surface tracking-tight mb-2">
            Manajemen Kategori
          </h2>
          <p className="text-lg text-on-surface-variant leading-relaxed font-body">
            Kelola dan organisasikan kategori kain untuk katalog dan inventaris. Pertahankan
            standar kurasi digital yang presisi.
          </p>
        </div>
        <button className="bg-primary-container text-on-primary font-semibold py-3 px-6 rounded-md hover:bg-primary transition-colors flex items-center gap-2 shrink-0 shadow-sm">
          <span className="material-symbols-outlined">add</span>
          <span>Tambah Kategori Baru</span>
        </button>
      </div>

      {/* Category Table */}
      <div className="bg-surface-container-lowest rounded-xl p-8 ring-1 ring-outline-variant/15 flex flex-col gap-6">
        {/* Header */}
        <div className="grid grid-cols-12 gap-4 pb-4 border-b border-surface-variant/50 px-4">
          <div className="col-span-5 text-[10px] font-semibold text-on-surface/50 uppercase tracking-widest font-body">
            Nama Kategori
          </div>
          <div className="col-span-3 text-[10px] font-semibold text-on-surface/50 uppercase tracking-widest font-body">
            Jumlah Spesimen
          </div>
          <div className="col-span-2 text-[10px] font-semibold text-on-surface/50 uppercase tracking-widest font-body">
            Status
          </div>
          <div className="col-span-2 text-[10px] font-semibold text-on-surface/50 uppercase tracking-widest font-body text-right">
            Aksi
          </div>
        </div>

        {/* Rows */}
        <div className="flex flex-col gap-4">
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => router.visit(`/admin/manajemen-kategori/${cat.id}`)}
              className="grid grid-cols-12 gap-4 items-center bg-surface hover:bg-surface-container-low transition-colors p-4 rounded-lg group cursor-pointer"
            >
              <div className="col-span-5 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-surface-container-highest flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-on-surface/70 text-sm">
                    {cat.icon}
                  </span>
                </div>
                <span className="font-bold text-on-surface text-sm tracking-tight">
                  {cat.name}
                </span>
              </div>
              <div className="col-span-3">
                <span className="text-sm font-medium text-on-surface/80">
                  {cat.count.toLocaleString()}{" "}
                  <span className="text-xs text-on-surface/50 ml-1">Spesimen</span>
                </span>
              </div>
              <div className="col-span-2">
                <span
                  className={`inline-flex items-center px-2 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase ${
                    cat.status === "Aktif"
                      ? "bg-surface-container-highest text-on-surface"
                      : "bg-surface-variant text-on-surface/60"
                  }`}
                >
                  {cat.status}
                </span>
              </div>
              <div
                className="col-span-2 flex items-center justify-end gap-3"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => router.visit(`/admin/manajemen-kategori/${cat.id}`)}
                  className="text-primary hover:text-primary-container transition-colors p-1"
                  title="Lihat Detail"
                >
                  <span className="material-symbols-outlined text-lg">visibility</span>
                </button>
                <button
                  className="text-primary hover:text-primary-container transition-colors p-1"
                  title="Edit Kategori"
                >
                  <span className="material-symbols-outlined text-lg">edit</span>
                </button>
                <button
                  className="text-primary hover:text-primary-container transition-colors p-1"
                  title="Hapus Kategori"
                >
                  <span className="material-symbols-outlined text-lg">delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

ManajemenKategori.layout = page => <AdminLayout children={page} />;