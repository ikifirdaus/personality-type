// app/components/landing/layouts/Header.tsx
"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white shadow-md px-6 py-6 flex items-center justify-between">
      {/* Kiri: Logo */}
      <div className="text-xl font-bold text-blue-600">
        <Link href="/">MyLogo</Link>
      </div>

      {/* Tengah: Menu */}
      <nav className="space-x-6 hidden md:flex">
        <Link href="/" className="text-gray-700 hover:text-blue-600">
          Home
        </Link>
        <Link href="/profile" className="text-gray-700 hover:text-blue-600">
          Profile
        </Link>
        <Link href="/news" className="text-gray-700 hover:text-blue-600">
          News
        </Link>
        <Link
          href="/personalityTest"
          className="text-gray-700 hover:text-blue-600"
        >
          Personality Test
        </Link>
        <Link href="/kontak" className="text-gray-700 hover:text-blue-600">
          Kontak
        </Link>
      </nav>

      {/* Kanan: Sign In/Register */}
      <div className="space-x-4">
        <Link href="/signin" className="text-sm text-blue-600 hover:underline">
          Sign In
        </Link>
        <Link
          href="/register"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
        >
          Register
        </Link>
      </div>
    </header>
  );
}
