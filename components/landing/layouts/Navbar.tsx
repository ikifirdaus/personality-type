import React, { useEffect, useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/");
  };

  const navbarClasses = `w-full py-6 transition-all duration-300 ${
    isSticky ? "fixed top-0 bg-white shadow-md z-50" : "bg-transparent"
  }`;

  return (
    <nav className={navbarClasses}>
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
        <div className="text-2xl font-bold text-indigo-700">NJPT</div>

        {/* Desktop Menu */}
        <div className="hidden md:flex text-center space-x-5 font-medium">
          <a href="#about" className="text-gray-700 hover:text-indigo-600">
            Tentang Kami
          </a>
          <a
            href="#what-is-njpt"
            className="text-gray-700 hover:text-indigo-600"
          >
            Apa itu NJPT?
          </a>
          <a href="#test" className="text-gray-700 hover:text-indigo-600">
            Tes Kepribadian
          </a>
          <a
            href="#consultation"
            className="text-gray-700 hover:text-indigo-600"
          >
            Konsultasi
          </a>
          <a href="#children" className="text-gray-700 hover:text-indigo-600">
            Untuk Anak & Remaja
          </a>
          <a href="#blog" className="text-gray-700 hover:text-indigo-600">
            Artikel
          </a>
          <a href="#contact" className="text-gray-700 hover:text-indigo-600">
            Kontak
          </a>
        </div>

        {/* Auth Section */}
        <div className="hidden md:flex font-medium relative">
          {session?.user ? (
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="flex items-center text-gray-700 hover:text-indigo-600 space-x-2"
              >
                <span>{session.user.name}</span>
                <ChevronDown size={16} />
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white shadow-md rounded-md z-50">
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-3 text-sm rounded-md text-gray-700 hover:bg-gray-100"
                  >
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
            <a
              href="#about"
              onClick={toggleMenu}
              className="text-gray-700 hover:text-indigo-600"
            >
              Tentang Kami
            </a>
            <a
              href="#what-is-njpt"
              onClick={toggleMenu}
              className="text-gray-700 hover:text-indigo-600"
            >
              Apa itu NJPT?
            </a>
            <a
              href="#test"
              onClick={toggleMenu}
              className="text-gray-700 hover:text-indigo-600"
            >
              Tes Kepribadian
            </a>
            <a
              href="#consultation"
              onClick={toggleMenu}
              className="text-gray-700 hover:text-indigo-600"
            >
              Konsultasi
            </a>
            <a
              href="#children"
              onClick={toggleMenu}
              className="text-gray-700 hover:text-indigo-600"
            >
              Untuk Anak & Remaja
            </a>
            <a
              href="#blog"
              onClick={toggleMenu}
              className="text-gray-700 hover:text-indigo-600"
            >
              Artikel
            </a>
            <a
              href="#contact"
              onClick={toggleMenu}
              className="text-gray-700 hover:text-indigo-600"
            >
              Kontak
            </a>
            {session?.user ? (
              <button
                onClick={handleLogout}
                className="text-gray-700 hover:text-indigo-600"
              >
                Logout
              </button>
            ) : (
              <Link
                href="/signin"
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
