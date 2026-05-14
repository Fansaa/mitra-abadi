import { Link, router, usePage } from "@inertiajs/react";

const menuItems = [
  { to: "admin.dashboard", label: "Dashboard", icon: "dashboard" },
  { to: "admin.orders.create", label: "Manual Order Entry", icon: "edit_document" },
  { to: "admin.inventory.index", label: "Inventory", icon: "inventory_2" },
  { to: "admin.categories.index", label: "Manajemen Kategori", icon: "category" },
  { to: "admin.products.create", label: "Specimen Entry", icon: "add_box" },
  { to: "admin.orders.index", label: "Riwayat Transaksi", icon: "history" },
];

const footerItems = [
  { to: "contact", label: "Help", icon: "help" },
  { to: "logout", label: "Logout", icon: "logout" },
];

export default function SidebarAdmin() {
  const { url } = usePage();

  return (
    <nav className="fixed left-0 top-0 h-full w-64 bg-surface-container-low flex flex-col py-8 px-4 z-50 shadow-xl border-r border-outline-variant/10">
      {/* Brand */}
      <div className="mb-12 px-4 flex flex-col items-center">
        <div className="w-16 h-16 rounded-full bg-surface-container-highest mb-4 overflow-hidden shadow-sm flex items-center justify-center">
          <span className="material-symbols-outlined fill text-3xl text-on-surface-variant">
            person
          </span>
        </div>
        <h2 className="text-xl font-black text-on-surface text-center tracking-tight">
          Archive Portal
        </h2>
        <p className="font-body uppercase text-[10px] tracking-widest font-semibold text-on-surface-variant/70 mt-1">
          The Digital Curator
        </p>
        <button
          onClick={() => router.visit(route('admin.products.create'))}
          className="mt-6 w-full bg-primary-container text-on-primary-container py-3 px-4 rounded-md font-bold text-sm tracking-wide hover:bg-primary transition-colors duration-300 shadow-sm flex items-center justify-center gap-2"
        >
          <span className="material-symbols-outlined text-sm">add</span>
          New Specimen
        </button>
      </div>

      {/* Main Menu */}
      <ul className="flex-1 space-y-2">
        {menuItems.map((item) => {
          const isActive = route().current(item.to + '*');
          return (
            <li key={item.to}>
              <Link
                href={route(item.to)}
                className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-all cursor-pointer active:scale-95 font-body uppercase text-[10px] tracking-widest font-semibold ${
                  isActive
                    ? "text-primary border-r-2 border-primary bg-surface-container-lowest"
                    : "text-on-surface-variant/70 hover:bg-surface-container-highest hover:text-primary"
                }`}
              >
                <span className="material-symbols-outlined">{item.icon}</span>
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>

      {/* Footer */}
      <div className="mt-auto border-t border-surface-container-highest pt-4">
        <ul className="space-y-2">
          {footerItems.map((item) => (
            <li key={item.to}>
              <Link
                href={item.to === 'logout' ? route('logout') : route(item.to)}
                method={item.to === 'logout' ? 'post' : 'get'}
                as={item.to === 'logout' ? 'button' : 'a'}
                className="w-full flex items-center gap-4 px-4 py-3 rounded-lg text-on-surface-variant/70 hover:bg-surface-container-highest hover:text-primary transition-all cursor-pointer active:scale-95 font-body uppercase text-[10px] tracking-widest font-semibold"
              >
                <span className="material-symbols-outlined">{item.icon}</span>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}