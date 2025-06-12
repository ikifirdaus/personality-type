import {
  BetweenVerticalStart,
  ClipboardList,
  LayoutDashboard,
  ListChecks,
  ListCollapse,
  Newspaper,
  ShoppingBag,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const menuItems = [
    {
      icon: LayoutDashboard,
      label: "Dashboard",
      path: "/admin/dashboard",
    },
    { icon: ListChecks, label: "Riwayat Transaksi", path: "/admin/transaksi" },
    { icon: ListCollapse, label: "Riwayat Booking", path: "/admin/booking" },
    {
      icon: BetweenVerticalStart,
      label: "Cognitive",
      path: "/admin/cognitive",
    },
    {
      icon: ClipboardList,
      label: "Question",
      path: "/admin/question",
    },
    { icon: ShoppingBag, label: "Product", path: "/admin/product" },
    { icon: Newspaper, label: "Article", path: "/admin/article" },
    { icon: Users, label: "Users/Staff", path: "/admin/user" },
  ];

  const pathname = usePathname();

  return (
    <aside className="w-64 bg-slate-800 text-white min-h-screen h-full">
      <div className="p-6">
        <h1 className="text-2xl font-bold">Admin Panel</h1>
      </div>

      <nav className="mt-6">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.path}
              href={item.path}
              className={`flex items-center px-6 py-3 transition-all duration-300 ease-in-out hover:bg-slate-700 hover:mx-2 my-1 rounded-lg ${
                pathname === item.path ? "bg-slate-700 mx-2 " : ""
              }`}
            >
              <>
                <Icon className="w-5 h-5 mr-3" />
                {item.label}
              </>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
