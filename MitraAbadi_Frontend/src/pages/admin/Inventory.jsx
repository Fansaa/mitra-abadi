import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../lib/api";
import SectionLoader from "../../components/SectionLoader";

function getImageUrl(imagePath) {
  if (!imagePath) return null;
  if (imagePath.startsWith("http")) return imagePath;
  return "http://localhost:8000/storage/" + imagePath;
}

export default function Inventory() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = () => {
    api
      .get("/admin/products")
      .then((res) => setProducts(res.data.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchProducts(); }, []);

  const handleDelete = async (e, product) => {
    e.stopPropagation();
    if (!window.confirm(`Hapus produk "${product.name}"? Tindakan ini tidak dapat dibatalkan.`)) return;
    try {
      await api.delete(`/admin/products/${product.id}`);
      fetchProducts();
    } catch {
      alert('Gagal menghapus produk. Coba lagi.');
    }
  };

  return (
    <div className="px-8 py-8">
      {/* Page Header */}
      <div className="flex justify-between items-end mb-8">
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
          <div className="text-right col-span-2">Stok (Roll)</div>
          <div className="col-span-2 flex justify-end">Status</div>
          <div className="col-span-2 text-right">Harga</div>
          <div className="col-span-1 text-right">Aksi</div>
        </div>

        {/* Rows */}
        {loading ? (
          <SectionLoader />
        ) : (
          <div className="flex flex-col gap-6">
            {products.map((p) => {
              const stock = p.variants?.[0]?.inventory?.stock_roll ?? 0;
              const lowStock = stock < 10;
              const imagePath = p.variants?.[0]?.image_path;
              const imageUrl = getImageUrl(imagePath);
              const priceFormatted = p.price
                ? "IDR " + Number(p.price).toLocaleString("id-ID")
                : "-";

              return (
                <div
                  key={p.id}
                  onClick={() => navigate(`/admin/inventory/${p.id}`)}
                  className={`grid grid-cols-12 gap-4 items-center group cursor-pointer ${
                    lowStock ? "bg-error-container/20 -mx-4 px-4 py-2 rounded-lg" : ""
                  }`}
                >
                  <div className="col-span-3 flex items-center gap-4">
                    <div className="w-12 h-12 bg-surface-container-highest rounded-full overflow-hidden flex-shrink-0">
                      {imageUrl && (
                        <img src={imageUrl} alt={p.name} className="w-full h-full object-cover" />
                      )}
                    </div>
                    <div>
                      <div
                        className={`font-headline font-bold text-sm transition-colors ${
                          lowStock
                            ? "text-error"
                            : "text-on-surface group-hover:text-primary"
                        }`}
                      >
                        {p.name}
                      </div>
                      <div className="font-body text-xs text-on-surface-variant mt-1">
                        ID: {p.id}
                      </div>
                    </div>
                  </div>

                  <div className="col-span-2">
                    <span className="inline-block px-3 py-1 bg-surface-container-high text-on-surface text-[10px] font-body font-bold tracking-widest uppercase rounded-full">
                      {p.category?.name ?? "-"}
                    </span>
                  </div>

                  <div
                    className={`text-right font-body text-sm col-span-2 ${
                      lowStock ? "font-bold text-error" : "font-medium text-on-surface"
                    }`}
                  >
                    {stock}
                  </div>

                  <div className="col-span-2 flex justify-end">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 text-[10px] font-body font-bold tracking-widest uppercase rounded-full ${
                        lowStock
                          ? "bg-error-container text-error"
                          : "bg-surface-container-low text-on-surface"
                      }`}
                    >
                      <span
                        className={`w-2 h-2 rounded-full ${
                          lowStock ? "bg-error animate-pulse" : "bg-tertiary"
                        }`}
                      ></span>
                      {lowStock ? "Stok Menipis" : "Tersedia"}
                    </span>
                  </div>

                  <div className="col-span-2 text-right font-body text-xs text-on-surface font-semibold">
                    {priceFormatted}
                  </div>

                  <div
                    className="col-span-1 flex justify-end items-center gap-2 text-on-surface-variant"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      onClick={() => navigate(`/admin/inventory/${p.id}`)}
                      className="hover:text-primary transition-colors"
                    >
                      <span className="material-symbols-outlined text-[18px]">visibility</span>
                    </button>
                    <button
                      onClick={() => navigate(`/admin/inventory/${p.id}/edit`)}
                      className="hover:text-primary transition-colors"
                    >
                      <span className="material-symbols-outlined text-[18px]">edit</span>
                    </button>
                    <button onClick={(e) => handleDelete(e, p)} className="hover:text-error transition-colors">
                      <span className="material-symbols-outlined text-[18px]">delete</span>
                    </button>
                  </div>
                </div>
              );
            })}
            {products.length === 0 && (
              <div className="py-12 text-center text-on-surface-variant font-body text-sm">
                Belum ada produk.
              </div>
            )}
          </div>
        )}

        {/* Pagination */}
        <div className="mt-8 pt-6 flex justify-between items-center border-t border-outline-variant/15">
          <div className="text-xs font-body text-on-surface-variant">
            Menampilkan {products.length} spesimen
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
            <button className="w-8 h-8 rounded flex items-center justify-center hover:bg-surface-container-high text-on-surface transition-colors">
              <span className="material-symbols-outlined text-sm">chevron_right</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
