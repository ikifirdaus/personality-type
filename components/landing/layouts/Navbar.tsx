import React, { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const navbarClasses = `w-full py-6 transition-all duration-300 ${
    isSticky ? "fixed top-0 bg-white shadow-md z-50" : "bg-transparent"
  }`;
  return (
    <nav className={navbarClasses}>
      <div className="container mx-auto px-6 flex justify-between items-center">
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
        <div className="hidden md:flex font-medium">
          <Link href="/signin" className="text-gray-700 hover:text-indigo-600">
            Sign In
          </Link>
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
              className="text-gray-700 hover:text-indigo-600"
              onClick={toggleMenu}
            >
              Tentang Kami
            </a>
            <a
              href="#what-is-njpt"
              className="text-gray-700 hover:text-indigo-600"
              onClick={toggleMenu}
            >
              Apa itu NJPT?
            </a>
            <a
              href="#test"
              className="text-gray-700 hover:text-indigo-600"
              onClick={toggleMenu}
            >
              Tes Kepribadian
            </a>
            <a
              href="#consultation"
              className="text-gray-700 hover:text-indigo-600"
              onClick={toggleMenu}
            >
              Konsultasi
            </a>
            <a
              href="#children"
              className="text-gray-700 hover:text-indigo-600"
              onClick={toggleMenu}
            >
              Untuk Anak & Remaja
            </a>
            <a
              href="#blog"
              className="text-gray-700 hover:text-indigo-600"
              onClick={toggleMenu}
            >
              Artikel
            </a>
            <a
              href="#contact"
              className="text-gray-700 hover:text-indigo-600"
              onClick={toggleMenu}
            >
              Kontak
            </a>
            <Link
              href="/signin"
              className="text-gray-700 hover:text-indigo-600"
            >
              Sign In
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};
