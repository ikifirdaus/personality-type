import React, { useEffect, useState } from "react";
import { Menu, X, ChevronDown, User, LogOut, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);

  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const toggleMobileDropdown = () =>
    setIsMobileDropdownOpen(!isMobileDropdownOpen);

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/");
  };

  const navbarClasses = `w-full py-6 transition-all duration-300 ${
    isSticky ? "fixed top-0 bg-white shadow-md z-50" : "bg-transparent"
  }`;

  const menuItems = [
    { href: "#about", label: "Tentang Kami" },
    { href: "#what-is-njpt", label: "Apa itu NJPT?" },
    { href: "#consultation", label: "Konsultasi" },
    { href: "#children", label: "Untuk Anak & Remaja" },
    { href: "/produk", label: "Produk" },
    { href: "#blog", label: "Artikel" },
    { href: "#contact", label: "Kontak" },
  ];

  return (
    <nav className={navbarClasses}>
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
        <div className="text-2xl font-bold text-indigo-700">NJPT</div>

        {/* Desktop Menu */}
        <div className="hidden md:flex text-center space-x-5 font-medium items-center justify-center">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-gray-700 hover:text-indigo-600"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Desktop Auth Section */}
        <div className="hidden md:flex font-medium relative">
          {session?.user ? (
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="flex items-center text-gray-700 hover:text-indigo-600 space-x-2"
              >
                <User className="w-5 h-5" />
                <span>{session.user.name}</span>
                <ChevronDown size={16} />
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white shadow-md rounded-md z-50">
                  <Link
                    href="/cart"
                    className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 border-b flex items-center gap-2"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    Cart
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                  >
                    <LogOut className="w-5 h-5" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/signin"
              className="text-gray-700 hover:text-indigo-600"
            >
              Sign In
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={toggleMenu}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white absolute top-16 left-0 right-0 shadow-md z-50">
          <div className="flex flex-col items-center py-4 space-y-4 font-medium">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={toggleMenu}
                className="text-gray-700 hover:text-indigo-600"
              >
                {item.label}
              </Link>
            ))}

            {/* Auth Section */}
            {session?.user ? (
              <div className="w-full px-4">
                <button
                  onClick={toggleMobileDropdown}
                  className="w-full flex items-center justify-center gap-1 text-gray-700 hover:text-indigo-600"
                >
                  <div className="flex items-center space-x-2">
                    <User className="w-5 h-5" />
                    <span>{session.user.name}</span>
                  </div>
                  <ChevronDown size={16} />
                </button>
                {isMobileDropdownOpen && (
                  <div className="mt-2 bg-white shadow-md rounded-md border">
                    <Link
                      href="/cart"
                      onClick={toggleMenu}
                      className="px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 border-b flex items-center gap-2"
                    >
                      <ShoppingCart className="w-5 h-5" />
                      Cart
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        toggleMenu();
                      }}
                      className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                    >
                      <LogOut className="w-5 h-5" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/signin"
                onClick={toggleMenu}
                className="text-gray-700 hover:text-indigo-600"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
