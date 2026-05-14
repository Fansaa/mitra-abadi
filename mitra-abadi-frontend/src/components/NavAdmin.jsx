import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function NavAdmin({ title = "Sistem Manajemen Distribusi Tekstil" }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  // Tutup dropdown saat klik di luar
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    setDropdownOpen(false);
    await logout();
    navigate("/admin/login");
  };

  return (
    <header
      className="fixed top-0 right-0 z-40 flex justify-between items-center px-8 h-16 bg-surface-container-low transition-colors duration-300"
      style={{ left: "16rem", width: "calc(100% - 16rem)" }}
    >
      <div className="flex-1 flex items-center">
        <h1 className="text-lg font-bold tracking-tight text-on-surface">{title}</h1>
      </div>

      {/* Profile Dropdown */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setDropdownOpen((v) => !v)}
          className="flex items-center gap-2 text-on-surface/70 hover:text-primary transition-colors duration-200 active:opacity-80 focus:outline-none"
          aria-label="Profil pengguna"
        >
          <span className="material-symbols-outlined fill text-3xl">account_circle</span>
          <span className="hidden md:block text-sm font-semibold text-on-surface">
            {user?.name || "Admin"}
          </span>
          <span className="material-symbols-outlined text-sm text-on-surface-variant">
            {dropdownOpen ? "expand_less" : "expand_more"}
          </span>
        </button>

        {dropdownOpen && (
          <div className="absolute right-0 top-full mt-2 w-52 bg-surface-container-lowest rounded-xl shadow-lg border border-surface-container-highest py-2 z-50">
            {/* Info admin */}
            <div className="px-4 py-3 border-b border-surface-container-highest">
              <p className="text-xs font-bold text-on-surface truncate">{user?.name || "Administrator"}</p>
              <p className="text-[10px] text-on-surface-variant truncate mt-0.5">{user?.email || ""}</p>
            </div>

            {/* Tombol Keluar */}
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold text-error hover:bg-error-container/30 transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">logout</span>
              Keluar
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
