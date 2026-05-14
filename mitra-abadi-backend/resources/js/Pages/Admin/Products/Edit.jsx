import { useState } from "react";
import { router } from "@inertiajs/react";
import AdminLayout from '@/Components/layout/AdminLayout';

export default function EditSpesimen() {
  // using router.visit
  const [form, setForm] = useState({
    name: "Indigo Jacquard Silk",
    sku: "JQD-IND-001",
    category: "Silk",
    color: "Indigo Deep Blue",
    stock: 145.5,
    minPrice: "850.000,00",
    maxPrice: "1.200.000,00",
    notes:
      "A heavy, luxurious silk jacquard dyed in profound indigo. The weave features a subtle, historic floral motif characteristic of late 19th-century export textiles. Requires climate-controlled storage away from direct UV exposure to prevent fading of natural dyes.",
  });

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="px-8 pb-24">
      {/* Header */}
      <div className="sticky top-16 z-10 bg-surface/90 backdrop-blur-md py-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <button
            onClick={() => window.history.back()}
            className="editorial-link mb-4 text-on-surface-variant"
          >
            <span className="material-symbols-outlined text-lg">arrow_back</span>
            Back to Detail View
          </button>
          <h1 className="font-display text-4xl font-extrabold tracking-tight text-on-surface">
            Edit Specimen
          </h1>
          <p className="text-on-surface-variant mt-2">
            Refining archival metadata for {form.sku}
          </p>
        </div>

        <div className="flex items-center gap-6">
          <button
            onClick={() => window.history.back()}
            className="editorial-link text-on-surface-variant hover:text-error"
          >
            Cancel
          </button>
          <button className="bg-primary-container text-on-primary-container hover:bg-primary transition-all duration-300 px-8 py-3 rounded-md font-bold text-sm tracking-wide shadow-[0_4px_14px_0_rgba(230,30,37,0.2)] hover:shadow-[0_6px_20px_rgba(230,30,37,0.3)] hover:-translate-y-0.5 active:translate-y-0">
            Save Changes
          </button>
        </div>
      </div>

      {/* Main Canvas */}
      <div className="max-w-[1600px] mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-8">
          {/* Left Column */}
          <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-12">
            {/* Informasi Dasar */}
            <section className="bg-surface-container-lowest p-8 rounded-xl tonal-lift">
              <h2 className="font-headline text-xl font-bold mb-8 text-on-surface flex items-center gap-3">
                <span className="material-symbols-outlined fill text-primary">info</span>
                Informasi Dasar
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                <div>
                  <label className="ledger-label">Nama Spesimen</label>
                  <input
                    type="text"
                    className="ledger-input"
                    value={form.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                  />
                </div>
                <div>
                  <label className="ledger-label">Kode SKU</label>
                  <input
                    type="text"
                    className="ledger-input text-on-surface-variant"
                    readOnly
                    value={form.sku}
                  />
                  <p className="text-[10px] text-on-surface-variant mt-2 uppercase tracking-wider">
                    SKU is immutable
                  </p>
                </div>
                <div>
                  <label className="ledger-label">Kategori</label>
                  <div className="relative">
                    <select
                      className="ledger-input appearance-none bg-transparent pr-8 cursor-pointer"
                      value={form.category}
                      onChange={(e) => handleChange("category", e.target.value)}
                    >
                      <option>Cotton</option>
                      <option>Silk</option>
                      <option>Linen</option>
                      <option>Wool</option>
                    </select>
                    <span className="material-symbols-outlined absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-outline">
                      expand_more
                    </span>
                  </div>
                </div>
                <div>
                  <label className="ledger-label">Warna Dominan</label>
                  <input
                    type="text"
                    className="ledger-input"
                    value={form.color}
                    onChange={(e) => handleChange("color", e.target.value)}
                  />
                </div>
              </div>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Manajemen Stok */}
              <section className="bg-surface-container-lowest p-8 rounded-xl tonal-lift">
                <h2 className="font-headline text-xl font-bold mb-8 text-on-surface flex items-center gap-3">
                  <span className="material-symbols-outlined fill text-primary">
                    inventory_2
                  </span>
                  Manajemen Stok
                </h2>
                <div>
                  <label className="ledger-label">Stok Fisik (Yard)</label>
                  <div className="relative">
                    <input
                      type="number"
                      step="0.1"
                      className="ledger-input text-2xl font-light pr-12"
                      value={form.stock}
                      onChange={(e) => handleChange("stock", e.target.value)}
                    />
                    <span className="absolute right-0 bottom-2 text-on-surface-variant font-medium">
                      yd
                    </span>
                  </div>
                </div>
              </section>

              {/* Informasi Harga */}
              <section className="bg-surface-container-lowest p-8 rounded-xl tonal-lift">
                <h2 className="font-headline text-xl font-bold mb-8 text-on-surface flex items-center gap-3">
                  <span className="material-symbols-outlined fill text-primary">payments</span>
                  Informasi Harga
                </h2>
                <div className="flex flex-col gap-6">
                  <div>
                    <label className="ledger-label">Harga Minimum (IDR)</label>
                    <input
                      type="text"
                      className="ledger-input"
                      value={form.minPrice}
                      onChange={(e) => handleChange("minPrice", e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="ledger-label">Harga Maksimum (IDR)</label>
                    <input
                      type="text"
                      className="ledger-input"
                      value={form.maxPrice}
                      onChange={(e) => handleChange("maxPrice", e.target.value)}
                    />
                  </div>
                </div>
              </section>
            </div>

            {/* Curator's Notes */}
            <section className="bg-surface-container-lowest p-8 rounded-xl tonal-lift">
              <h2 className="font-headline text-xl font-bold mb-8 text-on-surface flex items-center gap-3">
                <span className="material-symbols-outlined fill text-primary">edit_note</span>
                Curator's Notes / Deskripsi
              </h2>
              <textarea
                className="w-full bg-surface border border-outline-variant/30 rounded-lg p-4 text-on-surface font-body leading-relaxed focus:ring-0 focus:border-primary transition-colors min-h-[200px] resize-y"
                placeholder="Detail the weave pattern, historical significance, and preservation requirements..."
                value={form.notes}
                onChange={(e) => handleChange("notes", e.target.value)}
              />
            </section>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-5 xl:col-span-4 flex flex-col gap-8">
            <section className="bg-surface-container-low rounded-xl p-2 relative overflow-hidden group">
              <div className="absolute top-6 left-6 z-10 flex gap-2">
                <span className="bg-surface-container-lowest/80 backdrop-blur-md text-on-surface text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full">
                  Primary Image
                </span>
              </div>
              <div className="w-full aspect-[4/5] bg-surface-container-highest rounded-lg overflow-hidden relative">
                <img
                  alt="Specimen"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCh6JJ6j7zGpK2FhtzpYCJQ64_lY8ujg1Mh8SKFyuw7CCtAO7zJBiofkOfeXpN_ihVMDcleigp7m4_dLfuEju-SNsmcffGgHhdwgsDOQQWe4lfTkBlerD7MQ5aMYeSF_hSWuvhkrSftpbP0uyjylAJwqah-O19bfBpBen7mOQwbg4Ak_wpO6reEutb7m5hSN59gxElmyaWP-0lpumLelDBjzA9Ulx8_jLYNywcQsM5qgksk4-iMnpnwmDznAFOfKlTfoz_-9dT_cw9l"
                />
                <div className="absolute inset-0 bg-on-surface/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 backdrop-blur-sm">
                  <button
                    className="bg-surface-container-lowest text-on-surface p-3 rounded-full hover:bg-primary-container hover:text-on-primary-container transition-colors"
                    title="Replace Image"
                  >
                    <span className="material-symbols-outlined">cameraswitch</span>
                  </button>
                  <button
                    className="bg-surface-container-lowest text-error p-3 rounded-full hover:bg-error hover:text-on-error transition-colors"
                    title="Remove Image"
                  >
                    <span className="material-symbols-outlined">delete</span>
                  </button>
                </div>
              </div>
            </section>

            <section className="bg-surface-container-lowest p-6 rounded-xl border border-dashed border-outline-variant/50 hover:bg-surface-container-low transition-colors cursor-pointer flex flex-col items-center justify-center text-center gap-4 min-h-[160px]">
              <div className="bg-surface text-primary p-4 rounded-full shadow-sm">
                <span className="material-symbols-outlined text-2xl">add_photo_alternate</span>
              </div>
              <div>
                <h3 className="font-bold text-sm text-on-surface">Upload Additional Angles</h3>
                <p className="text-xs text-on-surface-variant mt-1 max-w-[200px]">
                  Drag &amp; drop hi-res TIFF or JPG files here.
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

EditSpesimen.layout = page => <AdminLayout children={page} />;