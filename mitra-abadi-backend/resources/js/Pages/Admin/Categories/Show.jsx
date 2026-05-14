import { router } from "@inertiajs/react";
import AdminLayout from '@/Components/layout/AdminLayout';

const specimens = [
  {
    id: "CH-100-A",
    name: "Imperial White Batiste",
    stock: 1200,
    status: "Tersedia",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCpY_1BDMtQ1ZWC45P707th-Vo0n9PdmgSUjvGxV9804yC0Fxr2ktADT71JmT6Dka2sPWK5uR3yTmNkZ6baCAzYz9V2GLY2yErHs-kzH4zjUAZbwDRs97EzZZtt8uUfKPq0jKhLxtNlQUG-mvLZGUKiuGYFrkAtoim21spc6Ug7EpI8GtnzpF5RZ57ISC8CuN9kzSYX1yWi0UkLa8YzHQjeTa5ykiOz-aB7Tb-lpe1ze8XCk4LWI0LHjag4v5lU6__0nA9LMAlDJ3ps",
  },
  {
    id: "CH-204-T",
    name: "Heritage Twill Heavy",
    stock: 450,
    status: "Terbatas",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC5PNqiBG8AjKIvMLY0MXQWeH-3DFvozmh3eYcjIIX21Lv9sWXxgFaSo9fTX1Ow-bJJrPDZnhtSTwDWCVLF3syv1nacUZ2NZkdAEP3HHJOO_Sbs53bCvkjTq7gCd5_3DPsx4p3H_UGQB5dcLqwDVNjtwOC5A9XwbJZjSPLXnvB7WdYYlJuJucdKBitXRC7qjcylQnY0s9uywYJVZBdyK05uTiudDmlXBqZFqc4I9wM3scUD34vC-efuyvfB-kjA45zv7fd_0tWthVqh",
  },
  {
    id: "CH-088-O",
    name: "Oxford Blue Classic",
    stock: 0,
    status: "Habis",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDkY8ZcINz6h6p6MO5LUgAnmhBYblqehcbhQfJN8OeBRK8doWuzKx2LLhjbUFaKECmb6echxUqXBguReJPEadJ7ZjAd10lYzlYYtRRunK1eSGw15z-wqoWZgNLidDqGl82JwEeBP3QHT3Xw7EmMaRZaPq6Oq58flYCk7W0_EFbJgo4L1ogPzBNEdaonDb98eK7UAVdvd9HzIXoBk3U6-A9nhp_CVmlu7P-gD9gPOAAl7Y5Kvhbmjxt4-rnLXgL_Hr6ozx4qWVBAATZ4",
  },
];

const statusStyle = (status) => {
  switch (status) {
    case "Habis":
      return "bg-error/10 text-error";
    default:
      return "bg-surface-container-highest text-on-surface";
  }
};

export default function DetailKategori() {
  // using router.visit

  return (
    <div className="px-12 pb-24 pt-8 min-h-screen">
      {/* Breadcrumbs & Back */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2 text-sm text-on-surface-variant font-medium">
          <button
            onClick={() => router.visit("/admin/manajemen-kategori")}
            className="hover:text-primary transition-colors"
          >
            Manajemen Kategori
          </button>
          <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          <span className="text-on-surface">Detail Kategori</span>
        </div>
        <button
          onClick={() => window.history.back()}
          className="flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-container transition-colors"
        >
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          Kembali
        </button>
      </div>

      {/* Header */}
      <section className="mb-12 max-w-4xl">
        <h1 className="text-5xl font-display font-bold tracking-tight text-on-surface mb-4 flex items-center">
          Cotton Heritage
          <div className="inline-flex items-center gap-2 ml-4 mb-1">
            <button className="p-2 text-on-surface-variant hover:text-primary transition-colors hover:bg-surface-container-high rounded-full">
              <span className="material-symbols-outlined text-[24px]">edit</span>
            </button>
            <button className="p-2 text-on-surface-variant hover:text-error transition-colors hover:bg-error-container/20 rounded-full">
              <span className="material-symbols-outlined text-[24px]">delete</span>
            </button>
          </div>
        </h1>
        <p className="text-lg text-on-surface-variant leading-relaxed max-w-2xl">
          A foundational collection of premium cotton weaves, representing the historical core of
          the Mitra Abadi Archive. Characterized by high durability, varied thread counts, and
          historical significance in early 20th-century textile production.
        </p>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <div className="bg-surface-container-low p-8 rounded-xl">
          <p className="font-body text-xs uppercase tracking-widest text-on-surface-variant mb-2">
            Total Spesimen
          </p>
          <p className="text-4xl font-display font-bold text-on-surface">1,248</p>
        </div>
        <div className="bg-surface-container-low p-8 rounded-xl">
          <p className="font-body text-xs uppercase tracking-widest text-on-surface-variant mb-2">
            Total Stok (Yard)
          </p>
          <p className="text-4xl font-display font-bold text-on-surface">45,920</p>
        </div>
      </section>

      {/* Specimen List */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-headline font-bold text-on-surface">Daftar Spesimen</h2>
          <div className="flex gap-4">
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">
                search
              </span>
              <input
                type="text"
                placeholder="Cari spesimen..."
                className="pl-10 pr-4 py-2 bg-transparent border-b border-outline-variant focus:border-primary focus:ring-0 focus:outline-none w-64 transition-colors text-sm"
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-surface-container-highest text-on-surface rounded text-sm font-semibold hover:bg-surface-dim transition-colors">
              <span className="material-symbols-outlined text-[18px]">filter_list</span>
              Filter
            </button>
          </div>
        </div>

        <div className="w-full">
          <div className="grid grid-cols-12 gap-4 pb-4 border-b border-outline-variant/30 mb-4 px-4">
            <div className="col-span-1 font-body text-xs uppercase tracking-widest text-on-surface-variant">
              Foto
            </div>
            <div className="col-span-3 font-body text-xs uppercase tracking-widest text-on-surface-variant">
              Nama Spesimen
            </div>
            <div className="col-span-2 font-body text-xs uppercase tracking-widest text-on-surface-variant">
              ID Spesimen
            </div>
            <div className="col-span-2 font-body text-xs uppercase tracking-widest text-on-surface-variant">
              Stok (Yard)
            </div>
            <div className="col-span-2 font-body text-xs uppercase tracking-widest text-on-surface-variant">
              Status
            </div>
            <div className="col-span-2 font-body text-xs uppercase tracking-widest text-on-surface-variant text-right">
              Aksi
            </div>
          </div>

          <div className="space-y-4">
            {specimens.map((sp) => (
              <div
                key={sp.id}
                className="grid grid-cols-12 gap-4 items-center px-4 py-2 hover:bg-surface-container-low transition-colors rounded-lg group"
              >
                <div className="col-span-1">
                  <div className="w-12 h-12 bg-surface-container-highest rounded overflow-hidden">
                    <img src={sp.image} alt={sp.name} className="w-full h-full object-cover" />
                  </div>
                </div>
                <div className="col-span-3 font-medium text-on-surface">{sp.name}</div>
                <div className="col-span-2 text-sm text-on-surface-variant font-mono">
                  {sp.id}
                </div>
                <div className="col-span-2 text-sm text-on-surface-variant">
                  {sp.stock.toLocaleString()}
                </div>
                <div className="col-span-2">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${statusStyle(
                      sp.status
                    )}`}
                  >
                    {sp.status}
                  </span>
                </div>
                <div className="col-span-2 flex justify-end gap-3">
                  <button
                    className="text-on-surface-variant hover:text-primary transition-colors"
                    title="Lihat Detail"
                  >
                    <span className="material-symbols-outlined text-[20px]">visibility</span>
                  </button>
                  <button
                    className="text-on-surface-variant hover:text-primary transition-colors"
                    title="Edit"
                  >
                    <span className="material-symbols-outlined text-[20px]">edit</span>
                  </button>
                  <button
                    className="text-on-surface-variant hover:text-error transition-colors"
                    title="Hapus"
                  >
                    <span className="material-symbols-outlined text-[20px]">delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination */}
        <div className="mt-8 flex justify-between items-center px-4">
          <span className="text-sm text-on-surface-variant">
            Menampilkan 1-3 dari 1,248 spesimen
          </span>
          <div className="flex gap-2">
            <button
              className="w-8 h-8 flex items-center justify-center text-on-surface-variant hover:text-primary disabled:opacity-50"
              disabled
            >
              <span className="material-symbols-outlined text-[20px]">chevron_left</span>
            </button>
            <button className="w-8 h-8 flex items-center justify-center text-on-surface font-bold">
              1
            </button>
            <button className="w-8 h-8 flex items-center justify-center text-on-surface-variant hover:text-primary">
              2
            </button>
            <button className="w-8 h-8 flex items-center justify-center text-on-surface-variant hover:text-primary">
              3
            </button>
            <button className="w-8 h-8 flex items-center justify-center text-on-surface-variant hover:text-primary">
              <span className="material-symbols-outlined text-[20px]">chevron_right</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

DetailKategori.layout = page => <AdminLayout children={page} />;