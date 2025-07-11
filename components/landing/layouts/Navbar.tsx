"use client";

import React, { useEffect, useState } from "react";
import useSWR from "swr";
import {
  Menu,
  X,
  ChevronDown,
  User,
  LogOut,
  ShoppingCart,
  LayoutDashboard,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);

  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isCartLoading, setIsCartLoading] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const { data: session, status } = useSession();

  const { data: cartData } = useSWR(
    status === "authenticated" ? "/api/landing/cart" : null,
    fetcher,
    {
      refreshInterval: 3000,
    }
  );

  const cartCount = cartData?.count || 0;

  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 70);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const toggleMobileDropdown = () =>
    setIsMobileDropdownOpen(!isMobileDropdownOpen);

  const handleClick = () => {
    setIsLoading(true);
    router.push("/user/dashboard");
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await signOut({ redirect: false });
    router.push("/");
  };

  const handleCartClick = () => {
    setIsCartLoading(true);
    router.push("/cart");
  };

  const navbarClasses = `w-full py-6 transition-all duration-500 transform ${
    isSticky
      ? "fixed top-0 bg-white shadow-md z-50 translate-y-0"
      : "relative bg-transparent"
  }`;

  const menuItems = [
    { href: "#about", label: "Tentang Kami" },
    { href: "#what-is-njpt", label: "Apa itu NJPT?" },
    { href: "#consultation", label: "Konsultasi" },
    { href: "#children", label: "Untuk Anak & Remaja" },
    { href: "/produk", label: "Produk" },
    { href: "/artikel", label: "Artikel" },
    { href: "#contact", label: "Kontak" },
  ];

  return (
    <nav className={navbarClasses}>
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Logo */}
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
        <div className="hidden md:flex font-medium relative items-center gap-4">
          {/* Cart Icon */}
          <button
            onClick={handleCartClick}
            className="relative text-gray-700 hover:text-indigo-600"
          >
            <ShoppingCart className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-xs text-white rounded-full w-4 h-4 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

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
                  <button
                    onClick={handleClick}
                    disabled={isLoading}
                    className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-gray-300 border-t-transparent rounded-full animate-spin" />
                        <span className="text-gray-300">Loading...</span>
                      </>
                    ) : (
                      <>
                        <LayoutDashboard />
                        <span>Dashboard</span>
                      </>
                    )}
                  </button>
                  <button
                    onClick={handleLogout}
                    disabled={isLoggingOut}
                    className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                  >
                    {isLoggingOut ? (
                      <>
                        <div className="w-4 h-4 border-2 border-gray-300 border-t-transparent rounded-full animate-spin" />
                        <div className="text-gray-300">Logging out...</div>
                      </>
                    ) : (
                      <>
                        <LogOut className="w-5 h-5" />
                        Logout
                      </>
                    )}
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

            {/* Auth Section Mobile */}
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
                    <button
                      onClick={handleClick}
                      disabled={isLoading}
                      className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 border-b flex items-center gap-2"
                    >
                      {isLoading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-gray-300 border-t-transparent rounded-full animate-spin" />
                          <span className="text-gray-300">Loading...</span>
                        </>
                      ) : (
                        <>
                          <LayoutDashboard className="w-5 h-5" />
                          <span>Dashboard</span>
                        </>
                      )}
                    </button>
                    <button
                      onClick={handleCartClick}
                      disabled={isCartLoading}
                      className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 border-b flex items-center gap-2"
                    >
                      {isCartLoading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-gray-300 border-t-transparent rounded-full animate-spin" />
                          <div className="text-gray-300">Loading...</div>
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="w-5 h-5" />
                          Cart
                          {cartCount > 0 && (
                            <span className="ml-1 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">
                              {cartCount}
                            </span>
                          )}
                        </>
                      )}
                    </button>

                    <button
                      onClick={handleLogout}
                      disabled={isLoggingOut}
                      className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                    >
                      {isLoggingOut ? (
                        <>
                          <div className="w-4 h-4 border-2 border-gray-300 border-t-transparent rounded-full animate-spin" />
                          <div className="text-gray-300">Logging out...</div>
                        </>
                      ) : (
                        <>
                          <LogOut className="w-5 h-5" />
                          Logout
                        </>
                      )}
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
