"use client";

import { useState } from "react";
import { LogOut, User, Menu, ShoppingBag } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface HeaderProps {
  onMenuClick: () => void;
}

const Header = ({ onMenuClick }: HeaderProps) => {
  const { data: session } = useSession();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [loadingAction, setLoadingAction] = useState<
    "produk" | "logout" | null
  >(null);
  const router = useRouter();

  const handleClick = async () => {
    setLoadingAction("produk");
    router.push("/produk");
  };

  const handleLogout = async () => {
    setLoadingAction("logout");
    await signOut({ redirect: false });
    router.push("/");
  };

  return (
    <header className="bg-white border-b border-gray-200 text-gray-700 h-16">
      <div className="h-full px-6 flex items-center justify-between">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 hover:bg-gray-100 rounded-md"
        >
          <Menu className="w-6 h-6" />
        </button>

        <div className="relative ml-auto">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center space-x-2 hover:bg-gray-100 p-2 rounded-md"
          >
            <User className="w-5 h-5" />
            <span>{session?.user?.name}</span>
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 border border-gray-200">
              <button
                onClick={handleClick}
                disabled={loadingAction !== null}
                className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 w-full"
              >
                {loadingAction === "produk" ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-gray-300 border-t-transparent rounded-full animate-spin" />
                    <span className="text-gray-300">Loading...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <ShoppingBag size={22} />
                    <span>Produk</span>
                  </div>
                )}
              </button>

              <button
                onClick={handleLogout}
                disabled={loadingAction !== null}
                className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 w-full gap-2"
              >
                {loadingAction === "logout" ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-gray-300 border-t-transparent rounded-full animate-spin" />
                    <span className="text-gray-300">Logging out...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <LogOut size={22} />
                    <span>Logout</span>
                  </div>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
