"use client";

import Link from "next/link";
import { useState, ReactNode } from "react";

interface ButtonProps {
  url: ReactNode;
  icon: ReactNode;
  title: ReactNode;
  className: string; // Ubah dari String menjadi string
}

export default function Button({ url, icon, title, className }: ButtonProps) {
  const [loading, setLoading] = useState(false);

  return (
    <Link
      href={`${url}`}
      onClick={() => setLoading(true)}
      className={`bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 flex items-center justify-center ${className}`}
    >
      {loading ? (
        "Loading..."
      ) : (
        <div className="flex items-center">
          {title}
          {icon}
        </div>
      )}
    </Link>
  );
}
