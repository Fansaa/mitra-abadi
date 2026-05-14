import { router, usePage } from "@inertiajs/react";
import AdminLayout from '@/Components/layout/AdminLayout';

export default function DetailSpesimen() {
  const { url } = usePage();
  const id = url.split("/").pop();

  // Dummy data
  const specimen = {
    id: id || "ARC-0921",
    name: "Indigo Jacquard Silk",
    category: "Silk",
    sku: "JQD-IND-001",
    color: "Indigo Deep Blue",
    priceRange: "IDR 850.000,00 - IDR 1.200.000,00",
    stock: 145.5,
    status: "Tersedia",
    mainImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA3DWwPG69utYwrBnWSlmeH6vooiT20tBLea63Zke7yX5nVbhre8a_Nv3Vq0yNzHNfEHBGqQwYZX_vYe0Ks_FGtyjo37l-bxF20AwGDIB8opm9bcS0wvOIL77tT6Nm2Cyx0RgKRBjq09OAvljBWjgzkbvEicZ5glwLd1iwn1a0HsofHfqQ4kP_SdwYkOIOhSKUPStbaE0ghC9bcq6Y0oPyDmOmAxIHSE7F1JMvzeypphGinexqcke2jbVUadzaRkg21Ze5MDkgEUM4O",
    detailImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAcENEe1j9XOB-ZTnAR_D0WdhGmIPG8YKBi1Z_rSR5VafbWF-9Rg1Cdge3Wm0qmGbJ0Shd9z9LddVct_lq9lTXjOYxLZ8JmajbFt1xl9ER1U7SMmaJqtlTLjiVYteCw0UfHVLVMniGLnNFd6_vjLao0NYtRPhe__QY30FLjpepkyHAclWafL7iwACDeWwQFMez7CpnqVDWe7pCDVmWVkmIjd6QG0erAv1Q3_uuZN3yZwja0pnyxYHxIbX_jnU928322ICIoIKy3sUYZ",
    notes:
      "This exquisite Indigo Jacquard Silk represents a masterclass in tension weaving. Sourced from the historical mills of the region, the deep blue hue is achieved through a multi-stage VAT dyeing process, ensuring absolute colorfastness.",
    notes2:
      "The intricate floral motif is woven directly into the structural integrity of the fabric, rather than printed, giving it a dual-sided textural read that is highly prized in archival collections.",
    logs: [
      { type: "Restock Entry", date: "Oct 12, 2023", by: "Admin", change: "+50.0 Yds" },
      { type: "Audit Adjustment", date: "Sep 01, 2023", by: "Curator", change: "-2.5 Yds" },
      { type: "Initial Intake", date: "Jan 15, 2023", by: "Curator", change: "+98.0 Yds" },
    ],
  };

  return (
    <div className="px-12 pb-24 pt-8 max-w-7xl mx-auto">
      {/* Back link */}
      <div className="mb-8">
        <button
          onClick={() => window.history.back()}
          className="flex items-center gap-2 text-sm font-bold text-primary hover:text-primary-container transition-colors"
        >
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          Kembali
        </button>
      </div>

      {/* Header Actions & Title */}
      <div className="flex justify-between items-end mb-12">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="px-3 py-1 bg-surface-container-high text-on-surface rounded-full text-xs font-bold uppercase tracking-widest">
              {specimen.id}
            </span>
            <span className="px-3 py-1 bg-surface-container-high text-on-surface rounded-full text-xs font-bold uppercase tracking-widest">
              {specimen.category}
            </span>
          </div>
          <h1 className="text-5xl font-display font-extrabold tracking-tight text-on-surface">
            {specimen.name}
          </h1>
        </div>

        <div className="flex gap-4">
          <button className="flex items-center gap-2 px-5 py-2.5 border border-error text-error font-semibold text-sm rounded-md hover:bg-error/5 transition-colors">
            <span className="material-symbols-outlined text-[18px]">delete</span>
            Hapus Spesimen
          </button>
          <button
            onClick={() => router.visit(`/admin/inventory/${specimen.id}/edit`)}
            className="flex items-center gap-2 px-5 py-2.5 bg-primary-container text-on-primary-container font-semibold text-sm rounded-md hover:bg-primary transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">edit</span>
            Edit Specimen
          </button>
        </div>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-12 gap-8">
        {/* Left: Texture Gallery */}
        <div className="col-span-8 space-y-8">
          <div className="bg-surface-container-lowest p-4 rounded-xl aspect-[16/9] overflow-hidden group">
            <img
              src={specimen.mainImage}
              alt={specimen.name}
              className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-700"
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="bg-surface-container-lowest p-2 rounded-lg aspect-square overflow-hidden cursor-pointer">
              <img
                src={specimen.detailImage}
                alt="Detail"
                className="w-full h-full object-cover rounded opacity-80 hover:opacity-100 transition-opacity"
              />
            </div>
            <div className="bg-surface-container-highest p-2 rounded-lg aspect-square flex items-center justify-center cursor-pointer group">
              <span className="material-symbols-outlined text-4xl text-on-surface-variant group-hover:text-primary transition-colors">
                add_photo_alternate
              </span>
            </div>
          </div>

          {/* Curator's Notes */}
          <div className="bg-surface-container-lowest p-8 rounded-xl">
            <h3 className="text-lg font-headline font-bold text-on-surface mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[20px]">
                history_edu
              </span>
              Curator's Notes
            </h3>
            <div className="text-on-surface-variant text-base leading-relaxed space-y-4 font-body">
              <p>{specimen.notes}</p>
              <p>{specimen.notes2}</p>
            </div>
          </div>
        </div>

        {/* Right: Sidebar Info */}
        <div className="col-span-4 space-y-8">
          {/* Stock Status */}
          <div className="bg-surface-container-lowest p-8 rounded-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary-fixed-dim/20 rounded-bl-full -z-0"></div>
            <h3 className="text-sm font-semibold text-on-surface-variant uppercase tracking-widest mb-2 relative z-10">
              Current Stock
            </h3>
            <div className="text-4xl font-display font-extrabold text-on-surface mb-4 relative z-10">
              {specimen.stock}
              <span className="text-lg text-on-surface-variant font-medium ml-1">Yards</span>
            </div>
            <div className="flex items-center gap-2 relative z-10">
              <div className="w-2.5 h-2.5 rounded-full bg-primary-container"></div>
              <span className="text-sm font-bold text-primary-container tracking-wide">
                {specimen.status}
              </span>
            </div>
          </div>

          {/* Technical Specs */}
          <div className="bg-surface-container-lowest p-8 rounded-xl">
            <h3 className="text-sm font-semibold text-on-surface-variant uppercase tracking-widest mb-6">
              Technical Specifications
            </h3>
            <div className="space-y-6">
              <div>
                <div className="text-xs text-on-surface-variant mb-1 font-medium">Kode SKU</div>
                <div className="text-base font-bold text-on-surface border-b border-outline-variant/30 pb-2">
                  {specimen.sku}
                </div>
              </div>
              <div>
                <div className="text-xs text-on-surface-variant mb-1 font-medium">Warna</div>
                <div className="text-base font-bold text-on-surface border-b border-outline-variant/30 pb-2">
                  {specimen.color}
                </div>
              </div>
              <div>
                <div className="text-xs text-on-surface-variant mb-1 font-medium">
                  Kategori Material
                </div>
                <div className="text-base font-bold text-on-surface border-b border-outline-variant/30 pb-2">
                  {specimen.category}
                </div>
              </div>
              <div>
                <div className="text-xs text-on-surface-variant mb-1 font-medium">
                  Informasi Harga
                </div>
                <div className="text-base font-bold text-on-surface pb-2">
                  {specimen.priceRange}
                </div>
              </div>
            </div>
          </div>

          {/* Stock Logs */}
          <div className="bg-surface-container-lowest p-8 rounded-xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-sm font-semibold text-on-surface-variant uppercase tracking-widest">
                Stock Logs
              </h3>
              <span className="material-symbols-outlined text-primary cursor-pointer hover:text-primary-container text-[18px]">
                open_in_new
              </span>
            </div>
            <div className="space-y-4">
              {specimen.logs.map((log, idx) => (
                <div key={idx} className="flex justify-between items-center py-2">
                  <div>
                    <div className="text-sm font-bold text-on-surface">{log.type}</div>
                    <div className="text-xs text-on-surface-variant">
                      {log.date} • by {log.by}
                    </div>
                  </div>
                  <div
                    className={`text-sm font-bold ${
                      log.change.startsWith("+")
                        ? "text-primary-container"
                        : "text-on-surface-variant"
                    }`}
                  >
                    {log.change}
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 py-2 text-xs font-bold text-primary tracking-widest uppercase border border-outline-variant/30 rounded hover:bg-surface-container-highest transition-colors">
              View Full Ledger
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

DetailSpesimen.layout = page => <AdminLayout children={page} />;