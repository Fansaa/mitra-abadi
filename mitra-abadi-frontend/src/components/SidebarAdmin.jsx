import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";

const menuItems = [
  { to: "/admin/dashboard", label: "Dashboard", icon: "dashboard" },
  { to: "/admin/manual-order-entry", label: "Catat Pesanan", icon: "edit_document" },
  { to: "/admin/riwayat-transaksi", label: "Riwayat Transaksi", icon: "history" },
  { to: "/admin/inventory", label: "Inventori", icon: "inventory_2" },
  { to: "/admin/manajemen-kategori", label: "Manajemen Kategori", icon: "category" },
  { to: "/admin/specimen-entry", label: "Tambah Produk", icon: "add_box" },
];

export default function SidebarAdmin() {

  return (
    <nav className="fixed left-0 top-0 h-full w-64 bg-surface-container-low flex flex-col py-8 px-4 z-50">
      {/* Brand */}
      <div className="mb-12 px-4 flex flex-col items-center">
        <img
          src={logo}
          alt="Mitra Abadi"
          className="w-16 h-16 object-contain mb-4"
        />
        <h2 className="text-xl font-black text-on-surface text-center tracking-tight">
          Portal Admin
        </h2>
        <p className="font-body uppercase text-[10px] tracking-widest font-semibold text-on-surface-variant/70 mt-1">
          Mitra Abadi
        </p>
      </div>

      {/* Main Menu */}
      <ul className="flex-1 space-y-2">
        {menuItems.map((item) => (
          <li key={item.to}>
            <NavLink
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-4 px-4 py-3 rounded-lg transition-all cursor-pointer active:scale-95 font-body uppercase text-[10px] tracking-widest font-semibold ${
                  isActive
                    ? "text-primary border-r-2 border-primary bg-surface-container-lowest"
                    : "text-on-surface-variant/70 hover:bg-surface-container-highest hover:text-primary"
                }`
              }
            >
              <span className="material-symbols-outlined">{item.icon}</span>
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>

      {/* Footer */}
      <div className="mt-auto border-t border-surface-container-highest pt-4">
        <ul className="space-y-2">
          <li>
            <NavLink
              to="/admin/help"
              className="flex items-center gap-4 px-4 py-3 rounded-lg text-on-surface-variant/70 hover:bg-surface-container-highest hover:text-primary transition-all cursor-pointer active:scale-95 font-body uppercase text-[10px] tracking-widest font-semibold"
            >
              <span className="material-symbols-outlined">help</span>
              Bantuan
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}