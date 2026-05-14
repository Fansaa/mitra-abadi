import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../lib/api";
import PageLoader from "../../components/PageLoader";

export default function DetailKategori() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/admin/categories/${id}`)
      .then(res => setCategory(res.data.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <PageLoader />;
  if (!category) return <PageLoader text="Kategori tidak ditemukan." />;

  const products = category.products ?? [];

  return (
    <div className="px-8 py-8 min-h-screen">
      {/* Breadcrumbs & Back */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2 text-sm text-on-surface-variant font-medium">
          <button
            onClick={() => navigate("/admin/manajemen-kategori")}
            className="hover:text-primary transition-colors"
          >
            Manajemen Kategori
          </button>
          <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          <span className="text-on-surface">Detail Kategori</span>
        </div>
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-container transition-colors"
        >
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          Kembali
        </button>
      </div>

      {/* Header */}
      <section className="mb-12 max-w-4xl">
        <h1 className="text-5xl font-display font-bold tracking-tight text-on-surface mb-4 flex items-center">
          {category.name}
        </h1>
        <p className="text-lg text-on-surface-variant leading-relaxed max-w-2xl">
          {category.description || 'Tidak ada deskripsi.'}
        </p>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <div className="bg-surface-container-low p-8 rounded-xl">
          <p className="font-body text-xs uppercase tracking-widest text-on-surface-variant mb-2">
            Total Produk
          </p>
          <p className="text-4xl font-display font-bold text-on-surface">{products.length}</p>
        </div>
        <div className="bg-surface-container-low p-8 rounded-xl">
          <p className="font-body text-xs uppercase tracking-widest text-on-surface-variant mb-2">
            ID Kategori
          </p>
          <p className="text-4xl font-display font-bold text-on-surface">{category.id}</p>
        </div>
      </section>

      {/* Product List */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-headline font-bold text-on-surface">Daftar Produk</h2>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-12 text-on-surface-variant font-body">
            Belum ada produk dalam kategori ini.
          </div>
        ) : (
          <div className="w-full">
            <div className="grid grid-cols-12 gap-4 pb-4 border-b border-outline-variant/30 mb-4 px-4">
              <div className="col-span-1 font-body text-xs uppercase tracking-widest text-on-surface-variant">
                ID
              </div>
              <div className="col-span-5 font-body text-xs uppercase tracking-widest text-on-surface-variant">
                Nama Produk
              </div>
              <div className="col-span-3 font-body text-xs uppercase tracking-widest text-on-surface-variant">
                Harga
              </div>
              <div className="col-span-3 font-body text-xs uppercase tracking-widest text-on-surface-variant text-right">
                Aksi
              </div>
            </div>

            <div className="space-y-4">
              {products.map((p) => (
                <div
                  key={p.id}
                  className="grid grid-cols-12 gap-4 items-center px-4 py-2 hover:bg-surface-container-low transition-colors rounded-lg group cursor-pointer"
                  onClick={() => navigate(`/admin/inventory/${p.id}`)}
                >
                  <div className="col-span-1 text-sm text-on-surface-variant font-mono">
                    {p.id}
                  </div>
                  <div className="col-span-5 font-medium text-on-surface">{p.name}</div>
                  <div className="col-span-3 text-sm text-on-surface-variant">
                    {p.price != null
                      ? `IDR ${parseFloat(p.price).toLocaleString('id-ID')}`
                      : '-'}
                  </div>
                  <div
                    className="col-span-3 flex justify-end gap-3"
                    onClick={e => e.stopPropagation()}
                  >
                    <button
                      onClick={() => navigate(`/admin/inventory/${p.id}`)}
                      className="text-on-surface-variant hover:text-primary transition-colors"
                      title="Lihat Detail"
                    >
                      <span className="material-symbols-outlined text-[20px]">visibility</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
