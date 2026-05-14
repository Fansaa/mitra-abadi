import { useState, useMemo } from "react";
import { PALETTE_COLORS, FABRICS, SUBCATEGORIES, ITEMS_PER_PAGE } from "../../constants/fabrics";
import { Link, usePage } from "@inertiajs/react";
import FabricCard from "../../components/FabricCard";
import ChatWindow from "../../components/ChatWindow";

export default function Catalog() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeSubCategory, setActiveSubCategory] = useState("All Cotton Types");
  const [selectedColor, setSelectedColor] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [fabState, setFabState] = useState("closed"); // "closed" | "popup" | "chat"
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const { auth, products, categories: dbCategories } = usePage().props;

  const mappedProducts = useMemo(() => {
    if (!products) return [];
    return products.map((p, index) => {
      const colors = p.variants ? p.variants.map(v => v.color_name) : [];
      return {
        id: p.id,
        slug: p.slug,
        name: p.name,
        category: p.category ? p.category.name : "Uncategorized",
        composition: p.composition || "Unknown",
        weight: `${p.gsm || 0} GSM`,
        width: `${p.width_cm || 0}cm`,
        price: "Rp 45.000 / yard", // Format price properly
        dominantColors: colors,
        image: FABRICS[index % FABRICS.length]?.image || FABRICS[0].image,
        refId: `MA-${p.id.toString().padStart(4, '0')}`,
        variants: p.variants || [],
      };
    });
  }, [products]);

  const subCategoryOptions = SUBCATEGORIES[activeCategory] || SUBCATEGORIES["All"];

  const filteredFabrics = useMemo(() => {
    let result = mappedProducts;
    if (activeCategory !== "All") {
      result = result.filter((f) => f.category === activeCategory);
    }
    if (selectedColor) {
      result = result.filter((f) =>
        f.dominantColors.some(
          (c) => c.toLowerCase() === selectedColor.toLowerCase()
        )
      );
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (f) =>
          f.name.toLowerCase().includes(q) ||
          f.refId.toLowerCase().includes(q) ||
          f.category.toLowerCase().includes(q)
      );
    }
    return result;
  }, [activeCategory, selectedColor, searchQuery, mappedProducts]);

  const visibleFabrics = filteredFabrics.slice(0, visibleCount);
  const hasMore = visibleCount < filteredFabrics.length;

  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
    setActiveSubCategory(SUBCATEGORIES[cat]?.[0] || "All");
    setVisibleCount(ITEMS_PER_PAGE);
  };

  const handleColorSelect = (hex) => {
    setSelectedColor(selectedColor === hex ? null : hex);
    setVisibleCount(ITEMS_PER_PAGE);
  };

// using router.visit
  const handleFabClick = () => {
    if (fabState === "closed") setFabState("popup");
    else if (fabState === "popup") setFabState("closed");
    else if (fabState === "chat") setFabState("closed");
  };

  return (
    <div className="min-h-screen bg-[#fdf8f8] text-stone-900" style={{ fontFamily: "Manrope, sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />

      {/* NAV */}
      <nav className="fixed top-0 w-full z-50 bg-stone-50/90 backdrop-blur-md border-b border-stone-200/20">
        <div className="flex justify-between items-center px-8 py-5 max-w-screen-2xl mx-auto">
          <div className="flex items-center gap-10">
            <span className="text-2xl font-bold tracking-tighter text-[#e61e25]">Mitra Abadi</span>
            <div className="hidden md:flex gap-7 items-center">
              {["Catalog", "Collections", "About", "Contact"].map((item) => (
                <a key={item} href={item === "Catalog" ? "/" : "about"} className={`text-sm font-semibold tracking-tight transition-colors duration-200 ${item === "Catalog" ? "text-[#e61e25] border-b-2 border-[#e61e25] pb-0.5" : "text-stone-600 hover:text-[#e61e25]"}`}>
                  {item}
                </a>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-5">
            <div className="relative hidden lg:block">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
              <input
                type="text"
                placeholder="Search archives..."
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setVisibleCount(ITEMS_PER_PAGE); }}
                className="pl-9 pr-4 py-2 bg-stone-100 border-none rounded-full text-xs focus:ring-2 focus:ring-[#e61e25]/20 w-56 outline-none"
              />
            </div>
            <div className="flex gap-3">
              <button className="text-stone-600 hover:text-[#e61e25] transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
              </button>
              <div className="relative">
                <button 
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="text-stone-600 hover:text-[#e61e25] transition-colors flex items-center"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
                </button>

                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-3 w-48 bg-white border border-stone-100 rounded-md shadow-xl overflow-hidden z-50">
                    <div className="px-4 py-3 border-b border-stone-50 bg-stone-50/50">
                      <p className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">Portal Akses</p>
                    </div>
                    {auth?.user ? (
                      <Link
                        href={route('admin.dashboard')}
                        className="block w-full text-left px-4 py-3 text-sm font-semibold text-stone-700 hover:bg-stone-50 hover:text-[#e61e25] transition-colors"
                      >
                        Dashboard Admin
                      </Link>
                    ) : (
                      <Link
                        href={route('login')}
                        className="block w-full text-left px-4 py-3 text-sm font-semibold text-stone-700 hover:bg-stone-50 hover:text-[#e61e25] transition-colors"
                      >
                        Login Admin
                      </Link>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* MAIN */}
      <main className="pt-28 pb-16 px-8 max-w-[1600px] mx-auto min-h-screen">
        {/* Header */}
        <header className="mb-14 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-xl">
            <span className="text-[10px] uppercase tracking-[0.15em] text-[#e61e25] font-extrabold mb-3 block">Premium Textile Archivist</span>
            <h1 className="text-5xl md:text-6xl font-extrabold text-stone-900 leading-none tracking-tight">The Fabric Catalog</h1>
            <p className="mt-5 text-stone-500 max-w-lg leading-relaxed text-sm">A curated collection of high-performance textiles, from heavy-duty industrial knits to soft-touch sustainable cottons.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleCategoryChange("All")}
              className={`px-5 py-2 rounded text-[10px] font-bold uppercase tracking-widest transition-all ${activeCategory === "All" ? "bg-[#e61e25] text-white shadow-sm" : "bg-stone-100 text-stone-500 hover:bg-[#e61e25] hover:text-white"}`}
            >
              All Materials
            </button>
            {dbCategories?.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.name)}
                className={`px-5 py-2 rounded text-[10px] font-bold uppercase tracking-widest transition-all ${activeCategory === cat.name ? "bg-[#e61e25] text-white shadow-sm" : "bg-stone-100 text-stone-500 hover:bg-[#e61e25] hover:text-white"}`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </header>

        <div className="flex flex-col lg:flex-row gap-14">
          {/* SIDEBAR */}
          <aside className="w-full lg:w-60 flex-shrink-0 space-y-10">
            {/* Palette */}
            <section>
              <h3 className="text-[10px] uppercase tracking-[0.15em] font-extrabold text-stone-400 mb-5 border-b border-stone-200 pb-2">Primary Palette</h3>
              <div className="grid grid-cols-5 gap-2.5">
                {PALETTE_COLORS.map((color) => (
                  <button
                    key={color.hex}
                    onClick={() => handleColorSelect(color.hex)}
                    title={color.label}
                    className={`w-8 h-8 rounded-sm transition-all shadow-inner ${selectedColor === color.hex ? "ring-2 ring-offset-2 ring-[#e61e25]" : "ring-2 ring-offset-2 ring-transparent hover:ring-[#e61e25]/50"}`}
                    style={{ backgroundColor: color.hex, border: color.hex === "#ffffff" ? "1px solid #e5e7eb" : "none" }}
                  />
                ))}
              </div>
              {selectedColor && (
                <button onClick={() => setSelectedColor(null)} className="mt-3 text-[10px] text-[#e61e25] font-bold uppercase tracking-wider hover:underline">
                  Clear color filter
                </button>
              )}
            </section>

            {/* Sub-categories */}
            <section>
              <h3 className="text-[10px] uppercase tracking-[0.15em] font-extrabold text-stone-400 mb-5 border-b border-stone-200 pb-2">Sub-Categories</h3>
              <div className="relative">
                <select
                  value={activeSubCategory}
                  onChange={(e) => setActiveSubCategory(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-sm px-4 py-3 text-[11px] uppercase tracking-wider text-stone-700 appearance-none focus:ring-1 focus:ring-[#e61e25] focus:border-[#e61e25] cursor-pointer outline-none"
                >
                  {subCategoryOptions.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
                <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/></svg>
              </div>
              <p className="mt-2.5 text-[10px] italic text-stone-400">
                {activeCategory === "All" ? "Filtering cotton-specific weaves" : `Filtering by: ${activeCategory}`}
              </p>
            </section>

            {/* Curator note */}
            <section className="p-5 bg-stone-100 rounded-sm border-l-4 border-[#e61e25]">
              <p className="text-[10px] uppercase tracking-wider text-[#e61e25] font-black mb-2">Curator's Note</p>
              <p className="text-xs text-stone-500 leading-relaxed italic">"All swatches are archived at 1200dpi to ensure digital color accuracy matches physical inventory."</p>
            </section>
          </aside>

          {/* GRID */}
          <div className="flex-grow">
            {filteredFabrics.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <svg className="w-12 h-12 text-stone-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                <p className="text-stone-400 text-sm font-semibold">No fabrics found</p>
                <p className="text-stone-300 text-xs mt-1">Try adjusting your filters</p>
                <button onClick={() => { setActiveCategory("All"); setSelectedColor(null); setSearchQuery(""); }} className="mt-4 text-[#e61e25] text-xs font-bold uppercase tracking-wider hover:underline">Clear all filters</button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-y-14 gap-x-10">
                  {visibleFabrics.map((fabric) => (
                    <FabricCard key={fabric.id} fabric={fabric} />
                  ))}
                </div>
                {hasMore && (
                  <div className="mt-16 flex justify-center">
                    <button
                      onClick={() => setVisibleCount((v) => v + ITEMS_PER_PAGE)}
                      className="group flex items-center gap-3 px-9 py-4 bg-white border border-stone-200 rounded-sm hover:bg-[#e61e25] hover:text-white hover:border-[#e61e25] transition-all duration-300"
                    >
                      <span className="text-[10px] font-extrabold uppercase tracking-widest">Load More From Archive</span>
                      <svg className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/></svg>
                    </button>
                  </div>
                )}
                {!hasMore && filteredFabrics.length > ITEMS_PER_PAGE && (
                  <p className="mt-12 text-center text-[10px] uppercase tracking-widest text-stone-300 font-bold">— End of archive —</p>
                )}
              </>
            )}
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="w-full border-t border-stone-200 bg-stone-50">
        <div className="flex flex-col md:flex-row justify-between items-center px-8 py-10 max-w-screen-2xl mx-auto">
          <span className="text-sm text-stone-500">© 2024 Mitra Abadi Textile Archive. All rights reserved.</span>
          <div className="flex gap-8 mt-5 md:mt-0">
            {["Privacy Policy", "Terms of Service", "Accessibility", "Sustainability"].map((item) => (
              <a key={item} href="#" className="text-sm text-stone-500 hover:underline decoration-[#e61e25] underline-offset-4 transition-all">{item}</a>
            ))}
          </div>
        </div>
      </footer>

      {/* FAB POPUP */}
      {fabState === "popup" && (
        <div className="fixed bottom-28 right-8 z-50 w-72 bg-white rounded-xl shadow-2xl border border-stone-200 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="p-4 border-b border-stone-100 bg-stone-50">
            <p className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">How can we help?</p>
          </div>
          <div className="p-2">
            <a
              href="https://wa.me/628123456789"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center gap-4 p-3 hover:bg-stone-50 rounded-lg transition-colors text-left"
            >
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              </div>
              <div>
                <p className="text-sm font-bold text-stone-900">Chat with Admin</p>
                <p className="text-[11px] text-stone-500">WhatsApp Support</p>
              </div>
            </a>
            <button
              onClick={() => setFabState("chat")}
              className="w-full flex items-center gap-4 p-3 hover:bg-stone-50 rounded-lg transition-colors text-left"
            >
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-[#e61e25]" fill="currentColor" viewBox="0 0 24 24"><path d="M13 10h-2V8h2m0 8h-2v-6h2m-1-9A10 10 0 002 12a10 10 0 0010 10 10 10 0 0010-10A10 10 0 0012 2z"/></svg>
              </div>
              <div>
                <p className="text-sm font-bold text-stone-900">Chat with AI Assistant</p>
                <p className="text-[11px] text-stone-500">Instant Support 24/7</p>
              </div>
            </button>
          </div>
        </div>
      )}

      {/* AI CHAT WINDOW */}
      {fabState === "chat" && (
        <ChatWindow onClose={() => setFabState("closed")} />
      )}

      {/* FAB BUTTON */}
      <button
        onClick={handleFabClick}
        className="fixed bottom-8 right-8 w-14 h-14 bg-[#e61e25] text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform z-40 group"
      >
        {fabState === "closed" || fabState === "popup" ? (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
        )}
        <span className="absolute right-full mr-4 bg-stone-900 text-white px-3 py-1 rounded text-[10px] uppercase tracking-wider font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Catalog Inquiry
        </span>
      </button>
    </div>
  );
}