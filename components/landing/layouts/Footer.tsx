import React from "react";
import { Facebook, Instagram, Twitter, Youtube, Mail } from "lucide-react";
import Link from "next/link";
export const Footer = () => {
  return (
    <footer id="contact" className="bg-gray-900 text-white pt-16 pb-8 w-full">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* About */}
          <div>
            <h3 className="text-2xl font-bold mb-4">NJPT</h3>
            <p className="text-gray-400 mb-6">
              Neuroscience Jungian Personality Type - Pendekatan holistik untuk
              pengembangan diri melalui pemahaman fungsi kognitif dan arketipe.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition duration-300"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition duration-300"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition duration-300"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition duration-300"
              >
                <Youtube size={20} />
              </a>
            </div>
          </div>
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#about"
                  className="text-gray-400 hover:text-white transition duration-300"
                >
                  Tentang Kami
                </a>
              </li>
              <li>
                <a
                  href="#what-is-njpt"
                  className="text-gray-400 hover:text-white transition duration-300"
                >
                  Apa itu NJPT?
                </a>
              </li>
              <li>
                <a
                  href="#test"
                  className="text-gray-400 hover:text-white transition duration-300"
                >
                  Tes Kepribadian
                </a>
              </li>
              <li>
                <a
                  href="#consultation"
                  className="text-gray-400 hover:text-white transition duration-300"
                >
                  Konsultasi
                </a>
              </li>
              <li>
                <a
                  href="#children"
                  className="text-gray-400 hover:text-white transition duration-300"
                >
                  Untuk Anak & Remaja
                </a>
              </li>
              <li>
                <Link
                  href="/produk"
                  className="text-gray-400 hover:text-white transition duration-300"
                >
                  Produk
                </Link>
              </li>
              <li>
                <a
                  href="#blog"
                  className="text-gray-400 hover:text-white transition duration-300"
                >
                  Artikel
                </a>
              </li>
              <li>
                <Link
                  href="/kebijakan"
                  className="text-gray-400 hover:text-white transition duration-300"
                >
                  Kebijakan & Privasi
                </Link>
              </li>
            </ul>
          </div>
          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Kontak</h3>
            <address className="not-italic text-gray-400">
              <p className="mb-2">Jl. Contoh No. 123</p>
              <p className="mb-2">Jakarta, Indonesia 12345</p>
              <p className="mb-2">+62 123 4567 890</p>
              <p className="mb-2">info@njpt.com</p>
            </address>
          </div>
          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-gray-400 mb-4">
              Dapatkan artikel dan insight terbaru seputar neuroscience dan
              pengembangan diri.
            </p>
            <form className="flex">
              <input
                type="email"
                placeholder="Email Anda"
                className="bg-gray-800 text-white px-4 py-2 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full"
              />
              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-r-lg transition duration-300"
              >
                <Mail size={20} />
              </button>
            </form>
          </div>
        </div>
        {/* Copyright */}
        <div className="pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
          <p>
            © {new Date().getFullYear()} NJPT (Neuroscience Jungian Personality
            Type). All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
