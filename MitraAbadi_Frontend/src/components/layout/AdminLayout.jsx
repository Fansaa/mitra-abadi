import { Outlet } from "react-router-dom";
import SidebarAdmin from "../SideBarAdmin";
import NavAdmin from "../NavAdmin";

export default function AdminLayout() {
  return (
    <div className="bg-surface text-on-surface antialiased min-h-screen">
      <SidebarAdmin />
      <NavAdmin />
      <main className="ml-64 pt-16 min-h-screen">
        <Outlet />
      </main>
    </div>
  );
}