import { useState } from "react";
import { router } from "@inertiajs/react";
import AdminLayout from '@/Components/layout/AdminLayout';

export default function SpecimenEntry() {
  // using router.visit
  const [form, setForm] = useState({
    name: "",
    sku: "TEX-2024-8991",
    category: "",
    color: "",
    minPrice: "",
    maxPrice: "",
    stockRoll: "",
    notes: "",
  });

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div>
      {/* Header */}
      <header className="px-16 pt-12 pb-12 bg-surface">
        <div className="max-w-4xl">
        <h2 className="text-4xl font-display font-extrabold text-on-surface tracking-tight mb-2">
            Specimen Entry
          </h2>
          <p className="font-body text-lg text-on-surface-variant max-w-xl leading-relaxed">
            Daftarkan spesimen kain baru ke dalam arsip digital. Pastikan semua metadata terisi
            dengan presisi untuk mempermudah kurasi di masa mendatang.
          </p>
        </div>
      </header>

      {/* Form */}
      <div className="px-16 pb-24">
        <form className="grid grid-cols-1 xl:grid-cols-12 gap-8 xl:gap-12 items-start max-w-7xl">
          {/* Left Column */}
          <div className="xl:col-span-7 flex flex-col gap-10">
            {/* Informasi Dasar */}
            <section className="bg-surface-container-lowest rounded-xl p-10 shadow-[0_40px_80px_-20px_rgba(26,28,28,0.04)]">
              <h3 className="font-headline text-lg font-medium text-on-surface mb-8">
                Informasi Dasar
              </h3>
              <div className="space-y-8">
                <div>
                  <label className="font-body text-[10px] uppercase tracking-widest text-on-surface-variant block mb-2">
                    Nama Spesimen
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    placeholder="Mis: Royal Silk Jacquard Motif Kawung"
                    className="w-full border-0 border-b border-outline-variant bg-transparent px-0 py-2 font-body text-on-surface focus:ring-0 focus:border-primary transition-colors placeholder:text-on-surface-variant/40"
                  />
                </div>

                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <label className="font-body text-[10px] uppercase tracking-widest text-on-surface-variant block mb-2">
                      Kode SKU
                    </label>
                    <input
                      type="text"
                      disabled
                      value={form.sku}
                      className="w-full border-0 border-b border-outline-variant/30 bg-transparent px-0 py-2 font-body text-on-surface-variant focus:ring-0 cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <label className="font-body text-[10px] uppercase tracking-widest text-on-surface-variant block mb-2">
                      Kategori Material
                    </label>
                    <div className="relative">
                      <select
                        value={form.category}
                        onChange={(e) => handleChange("category", e.target.value)}
                        className="w-full border-0 border-b border-outline-variant bg-transparent px-0 py-2 font-body text-on-surface focus:ring-0 focus:border-primary transition-colors appearance-none cursor-pointer"
                      >
                        <option value="" disabled>
                          Pilih Kategori
                        </option>
                        <option value="silk">Silk (Sutra)</option>
                        <option value="cotton">Cotton (Katun)</option>
                        <option value="linen">Linen</option>
                        <option value="jacquard">Jacquard</option>
                        <option value="wool">Wool</option>
                      </select>
                      <span className="material-symbols-outlined absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant">
                        expand_more
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="font-body text-[10px] uppercase tracking-widest text-on-surface-variant block mb-2">
                    Warna
                  </label>
                  <input
                    type="text"
                    value={form.color}
                    onChange={(e) => handleChange("color", e.target.value)}
                    placeholder="Mis: Indigo Deep Blue"
                    className="w-full border-0 border-b border-outline-variant bg-transparent px-0 py-2 font-body text-on-surface focus:ring-0 focus:border-primary transition-colors placeholder:text-on-surface-variant/40"
                  />
                </div>
              </div>
            </section>

            {/* Informasi Harga */}
            <section className="bg-surface-container-lowest rounded-xl p-10 shadow-[0_40px_80px_-20px_rgba(26,28,28,0.04)]">
              <h3 className="font-headline text-lg font-medium text-on-surface mb-8">
                Informasi Harga
              </h3>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <label className="font-body text-[10px] uppercase tracking-widest text-on-surface-variant block mb-2">
                    Harga Minimum
                  </label>
                  <input
                    type="text"
                    value={form.minPrice}
                    onChange={(e) => handleChange("minPrice", e.target.value)}
                    placeholder="IDR 500.000,00"
                    className="w-full border-0 border-b border-outline-variant bg-transparent px-0 py-2 font-body text-on-surface focus:ring-0 focus:border-primary transition-colors placeholder:text-on-surface-variant/40"
                  />
                </div>
                <div>
                  <label className="font-body text-[10px] uppercase tracking-widest text-on-surface-variant block mb-2">
                    Harga Maksimum
                  </label>
                  <input
                    type="text"
                    value={form.maxPrice}
                    onChange={(e) => handleChange("maxPrice", e.target.value)}
                    placeholder="IDR 1.000.000,00"
                    className="w-full border-0 border-b border-outline-variant bg-transparent px-0 py-2 font-body text-on-surface focus:ring-0 focus:border-primary transition-colors placeholder:text-on-surface-variant/40"
                  />
                </div>
              </div>
            </section>

            {/* Manajemen Stok */}
            <section className="bg-surface-container-lowest rounded-xl p-10 shadow-[0_40px_80px_-20px_rgba(26,28,28,0.04)]">
              <h3 className="font-headline text-lg font-medium text-on-surface mb-8">
                Manajemen Stok
              </h3>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <label className="font-body text-[10px] uppercase tracking-widest text-on-surface-variant block mb-2">
                    Stok Masuk (Roll)
                  </label>
                  <input
                    type="number"
                    value={form.stockRoll}
                    onChange={(e) => handleChange("stockRoll", e.target.value)}
                    placeholder="1"
                    className="w-full border-0 border-b border-outline-variant bg-transparent px-0 py-2 font-body text-on-surface focus:ring-0 focus:border-primary transition-colors placeholder:text-on-surface-variant/40"
                  />
                </div>
                <div className="bg-surface-container-low p-4 rounded-lg flex flex-col justify-center">
                  <label className="font-body text-[10px] uppercase tracking-widest text-on-surface-variant block mb-1">
                    Konversi ke Meter (Est)
                  </label>
                  <div className="font-display text-xl text-on-surface-variant">
                    <span>{form.stockRoll ? (form.stockRoll * 50).toFixed(1) : "--"}</span>{" "}
                    <span className="text-sm font-body ml-1">Yard</span>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column */}
          <div className="xl:col-span-5 flex flex-col gap-10">
            {/* Media Arsip */}
            <section className="bg-surface-container-lowest rounded-xl p-8 shadow-[0_40px_80px_-20px_rgba(26,28,28,0.04)]">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-headline text-lg font-medium text-on-surface">Media Arsip</h3>
                <span className="font-body text-[10px] uppercase tracking-widest text-outline bg-surface-container px-2 py-1 rounded-full">
                  High-Res Only
                </span>
              </div>
              <div className="relative group border-2 border-dashed border-outline-variant hover:border-primary transition-colors duration-300 rounded-xl bg-surface-container-lowest overflow-hidden cursor-pointer h-72 flex flex-col items-center justify-center text-center p-8">
                <div className="w-16 h-16 rounded-full bg-surface-container-low flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-primary/10 transition-all duration-300">
                  <span className="material-symbols-outlined text-3xl text-on-surface-variant group-hover:text-primary transition-colors">
                    add_a_photo
                  </span>
                </div>
                <p className="font-body text-sm text-on-surface font-medium mb-1">
                  Tarik &amp; Lepas foto makro di sini
                </p>
                <p className="font-body text-xs text-on-surface-variant max-w-[200px]">
                  Mendukung JPG, PNG, RAW. Maksimal 50MB.
                </p>
              </div>
            </section>

            {/* Catatan Kurator */}
            <section className="bg-surface-container-lowest rounded-xl p-8 shadow-[0_40px_80px_-20px_rgba(26,28,28,0.04)] flex-1 flex flex-col">
              <h3 className="font-headline text-lg font-medium text-on-surface mb-6">
                Catatan Kurator
              </h3>
              <div className="relative flex-1 flex flex-col">
                <textarea
                  value={form.notes}
                  onChange={(e) => handleChange("notes", e.target.value)}
                  placeholder="Tuliskan deskripsi historis, karakteristik tekstur, atau instruksi perawatan khusus untuk spesimen ini..."
                  className="w-full flex-1 min-h-[200px] resize-none border-0 bg-surface-container-low rounded-lg p-6 font-body text-sm text-on-surface focus:ring-0 focus:bg-surface-container-highest transition-colors placeholder:text-on-surface-variant/50 leading-relaxed"
                />
                <div className="absolute bottom-4 right-6 pointer-events-none">
                  <span className="material-symbols-outlined text-outline-variant/30 text-4xl">
                    edit_document
                  </span>
                </div>
              </div>
            </section>
          </div>
        </form>

        {/* Action Bar */}
        <div className="mt-16 pt-8 border-t border-outline-variant/20 flex items-center justify-end gap-6 max-w-7xl">
          <button
            type="button"
            onClick={() => router.visit("/admin/inventory")}
            className="text-on-surface-variant font-body text-[11px] uppercase tracking-widest font-semibold px-4 py-3 hover:text-on-surface transition-colors"
          >
            Batal
          </button>
          <button
            type="submit"
            className="bg-primary-container text-on-primary-container font-body text-[11px] uppercase tracking-widest font-semibold px-10 py-4 rounded shadow-lg shadow-primary-container/20 hover:bg-primary hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
          >
            Simpan ke Arsip
          </button>
        </div>
      </div>
    </div>
  );
}

SpecimenEntry.layout = page => <AdminLayout children={page} />;