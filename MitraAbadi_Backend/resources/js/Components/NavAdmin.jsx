export default function NavAdmin({ title = "Textile Archive Management" }) {
  return (
    <header
      className="fixed top-0 right-0 z-40 flex justify-between items-center px-8 h-16 bg-surface-container-low transition-colors duration-300"
      style={{ left: "16rem", width: "calc(100% - 16rem)" }}
    >
      <div className="flex-1 flex items-center">
        <h1 className="text-lg font-bold tracking-tight text-on-surface">{title}</h1>
      </div>

      <div className="flex items-center gap-6">
        {/* Search */}
        <div className="relative group hidden md:block">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface/50 group-focus-within:text-primary transition-colors">
            search
          </span>
          <input
            type="text"
            placeholder="Search archive..."
            className="bg-surface-container-highest border-0 rounded-full py-2 pl-10 pr-4 text-sm w-64 focus:ring-0 focus:border-primary transition-colors text-on-surface placeholder-on-surface/50"
          />
        </div>

        <button className="text-on-surface/70 hover:text-primary transition-colors duration-200 active:opacity-80 relative">
          <span className="material-symbols-outlined text-2xl">notifications</span>
          <span className="absolute top-0 right-0 w-2 h-2 bg-primary rounded-full"></span>
        </button>

        <button className="flex items-center gap-2 text-on-surface/70 hover:text-primary transition-colors duration-200 active:opacity-80">
          <span className="material-symbols-outlined fill text-2xl">account_circle</span>
        </button>
      </div>
    </header>
  );
}