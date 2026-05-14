import { router } from "@inertiajs/react";
import AdminLayout from '@/Components/layout/AdminLayout';

const items = [
  {
    id: "ARC-0921",
    name: "Indigo Jacquard Silk",
    category: "Silk",
    stock: 145.5,
    status: "Tersedia",
    price: "IDR 850.000,00 - IDR 1.200.000,00",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuABQ8CNRpYFjxVgQ_bVY2yMDC3d64zWZhThgWNSTsOHjIbxelGQ_Dk0kdTBUKEM1la2eBkm2OUTzLFZ4SKr83chhNFYYVcqsYT72XsILF_zZ50qZNz9pmvutALWI71EoWJe8HoY2QNEgvxcA2ZhfcTB0C2Y-83HiwarCJtNk3tJseWelZw7HStk7BBpnj0IGoMUf3WjEMPc_LrAkYXXDdUQlCM4SdGiz6gC3OGjgc0hIXCBiuwSQdG-LqLT4Xao6TwLu5MdkNOhlB0z",
    lowStock: false,
  },
  {
    id: "ARC-1044",
    name: "Raw Organic Cotton",
    category: "Cotton",
    stock: 12.0,
    status: "Stok Menipis",
    price: "IDR 350.000,00 - IDR 550.000,00",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA_dSKQFtJpVTGehblYZDV1uFrg14s9yCckw186yqOm_Vnde6Z7ZG2JFKN97eZSQc_wv1FvLnNKwozWw2_6qk_WaP44zysYWpcygG4vk40F3MnxkmOHbyxn0jKe46sV898xhtGBrmUxdFLnk_gPotPtVvfzLxaoW7mrfqUck0BnAgyjIPWG34vfcImIS6flqm6X9rSzOG7CqSHhDEadHLg65PAd-xeHP9nWtptBCp9ubkcAmoAHBTWnG4WUAACqi5j-2qtc1vNkxc8V",
    lowStock: true,
  },
  {
    id: "ARC-0872",
    name: "Heavyweight Linen",
    category: "Linen",
    stock: 320.0,
    status: "Tersedia",
    price: "IDR 500.000,00 - IDR 750.000,00",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAikeJrs01ROb9xnFCkTvFcV2LGMq8pRUMVWYcV1Et0hFsxf8QH42HF-lKR1Cc_6KJPZNTnXg9E7frYFlWEBTU6Tryub4g1p0VW0cVlqeA2e5gXQExcmqdvuHveTKJJz8aowlk58xBEzlnZmxvQ10CsC6SHtMs922H1nuePMgAWLRNNMZb8v9UJOvRUZNExETe3Z3VpKqE8oCXW5osjO5vuZZarTrQMENl-WElInvOnDt2csaKtLftusswpBW_ZEj1GTi3KGJXB5UXT",
    lowStock: false,
  },
];

export default function Inventory() {
  // using router.visit

  return (
    <div className="p-8 max-w-7xl">
      {/* Page Header */}
      <div className="flex justify-between items-end mb-12 pt-4">
        <div>
          <h2 className="text-4xl font-display font-extrabold tracking-tight text-on-surface mb-2">
            Inventaris
          </h2>
          <p className="text-on-surface-variant font-body text-lg leading-relaxed">
            Kelola spesimen kain, pantau stok, dan perbarui metadata.
          </p>
        </div>
        <div className="flex gap-4">
          <button className="px-6 py-2 bg-surface-container-lowest text-on-surface text-sm font-bold tracking-wide rounded hover:bg-surface-container-high transition-colors flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">filter_list</span>
            Filter
          </button>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-surface-container-lowest rounded-xl p-8 mb-8">
        {/* Table Header */}
        <div className="grid grid-cols-12 gap-4 pb-4 border-b border-outline-variant/20 mb-6 text-xs font-body font-bold tracking-widest uppercase text-on-surface-variant">
          <div className="col-span-3">Nama Spesimen</div>
          <div className="col-span-2">Kategori</div>
          <div className="text-right col-span-2">Stok (Yard)</div>
          <div className="col-span-2 flex justify-end">Status</div>
          <div className="col-span-2 text-right">Harga</div>
          <div className="col-span-1 text-right">Aksi</div>
        </div>

        {/* Rows */}
        <div className="flex flex-col gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              onClick={() => router.visit(`/admin/inventory/${item.id}`)}
              className={`grid grid-cols-12 gap-4 items-center group cursor-pointer ${
                item.lowStock ? "bg-error-container/20 -mx-4 px-4 py-2 rounded-lg" : ""
              }`}
            >
              <div className="col-span-3 flex items-center gap-4">
                <div className="w-12 h-12 bg-surface-container-highest rounded-full overflow-hidden flex-shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <div
                    className={`font-headline font-bold text-sm transition-colors ${
                      item.lowStock
                        ? "text-error"
                        : "text-on-surface group-hover:text-primary"
                    }`}
                  >
                    {item.name}
                  </div>
                  <div className="font-body text-xs text-on-surface-variant mt-1">
                    ID: {item.id}
                  </div>
                </div>
              </div>

              <div className="col-span-2">
                <span className="inline-block px-3 py-1 bg-surface-container-high text-on-surface text-[10px] font-body font-bold tracking-widest uppercase rounded-full">
                  {item.category}
                </span>
              </div>

              <div
                className={`text-right font-body text-sm col-span-2 ${
                  item.lowStock ? "font-bold text-error" : "font-medium text-on-surface"
                }`}
              >
                {item.stock.toFixed(1)}
              </div>

              <div className="col-span-2 flex justify-end">
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1 text-[10px] font-body font-bold tracking-widest uppercase rounded-full ${
                    item.lowStock
                      ? "bg-error-container text-error"
                      : "bg-surface-container-low text-on-surface"
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${
                      item.lowStock ? "bg-error animate-pulse" : "bg-tertiary"
                    }`}
                  ></span>
                  {item.status}
                </span>
              </div>

              <div className="col-span-2 text-right font-body text-xs text-on-surface font-semibold">
                {item.price}
              </div>

              <div
                className="col-span-1 flex justify-end items-center gap-2 text-on-surface-variant"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => router.visit(`/admin/inventory/${item.id}`)}
                  className="hover:text-primary transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px]">visibility</span>
                </button>
                <button
                  onClick={() => navigate(`/admin/inventory/${item.id}/edit`)}
                  className="hover:text-primary transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px]">edit</span>
                </button>
                <button className="hover:text-error transition-colors">
                  <span className="material-symbols-outlined text-[18px]">delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-8 pt-6 flex justify-between items-center border-t border-outline-variant/15">
          <div className="text-xs font-body text-on-surface-variant">
            Menampilkan 1-3 dari 124 spesimen
          </div>
          <div className="flex gap-2">
            <button
              className="w-8 h-8 rounded flex items-center justify-center hover:bg-surface-container-high text-on-surface transition-colors cursor-not-allowed opacity-50"
              disabled
            >
              <span className="material-symbols-outlined text-sm">chevron_left</span>
            </button>
            <button className="w-8 h-8 rounded flex items-center justify-center bg-surface-container-high text-on-surface font-body text-xs font-bold transition-colors">
              1
            </button>
            <button className="w-8 h-8 rounded flex items-center justify-center hover:bg-surface-container-high text-on-surface font-body text-xs font-bold transition-colors">
              2
            </button>
            <button className="w-8 h-8 rounded flex items-center justify-center hover:bg-surface-container-high text-on-surface font-body text-xs font-bold transition-colors">
              3
            </button>
            <button className="w-8 h-8 rounded flex items-center justify-center hover:bg-surface-container-high text-on-surface transition-colors">
              <span className="material-symbols-outlined text-sm">chevron_right</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

Inventory.layout = page => <AdminLayout children={page} />;