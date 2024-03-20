import AdminNavbar from "./components/Navbar/AdminNavbar";
import AdminSidebar from "./components/AdminSidebar/AdminSidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
  return (
    <div className="flex">
      <AdminSidebar />
      <div className="bg-gray-100 flex-7">
        <AdminNavbar />
        {children}
      </div>
    </div>
  );
}
