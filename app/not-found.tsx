"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function NotFound() {
  const { data: session } = useSession();
  const [redirectUrl, setRedirectUrl] = useState("/");

  useEffect(() => {
    const role = session?.user?.role;

    if (role === "ADMIN") {
      setRedirectUrl("/admin/dashboard");
    } else {
      setRedirectUrl("/");
    }
  }, [session]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 px-4 py-16">
      <div className="text-center text-white space-y-6 max-w-md">
        <h1 className="text-7xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
          404
        </h1>
        <p className="text-2xl font-semibold">Halaman tidak ditemukan</p>
        <p className="text-gray-400">
          Ups, sepertinya kamu nyasar atau halaman ini sudah tidak tersedia.
        </p>
        <Link
          href={redirectUrl}
          className="inline-flex items-center gap-2 px-4 py-3 mt-4 bg-indigo-600 hover:bg-indigo-700 rounded-md text-white transition duration-200"
        >
          <ArrowLeft className="w-5 h-5" />
          Kembali ke {redirectUrl === "/" ? "Beranda" : "Dashboard Admin"}
        </Link>
      </div>
    </div>
  );
}
