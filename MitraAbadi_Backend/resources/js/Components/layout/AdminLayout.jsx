import SidebarAdmin from "../SidebarAdmin";
import NavAdmin from "../NavAdmin";

export default function AdminLayout({ children }) {
  return (
    <div className="bg-surface text-on-surface antialiased min-h-screen flex">
      {/* Sidebar - Fixed width */}
      <div className="w-64 flex-shrink-0">
        <SidebarAdmin />
      </div>

      <div className="flex-1 flex flex-col min-w-0">
        <NavAdmin />
        <main className="pt-16 min-h-screen">
          {children}
        </main>
      </div>
    </div>
  );
}