"use client";

// import { useEffect, useState } from "react";
import useSWR from "swr";
import { ChevronRight, ShoppingCart } from "lucide-react";
import Link from "next/link";

interface BreadcrumbItem {
  text: string;
  link?: string;
}

interface TitleBreadcrumbProps {
  title?: string;
  items: BreadcrumbItem[];
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Breadcrumb({ title, items }: TitleBreadcrumbProps) {
  const { data } = useSWR("/api/landing/cart", fetcher, {
    refreshInterval: 3000, // refresh otomatis setiap 5 detik
  });

  const cartCount = data?.count || 0;

  return (
    <div className="bg-gray-900 text-white w-full py-10 px-6 md:px-12">
      <div className="flex justify-between items-center">
        {/* Breadcrumb Navigation */}
        <div>
          <nav className="text-sm font-medium text-slate-400 flex items-center flex-wrap">
            <Link href="/" className="hover:underline text-white">
              Home
            </Link>
            {items.map((item, index) => (
              <span key={index} className="flex items-center">
                <ChevronRight size={16} className="mx-2 text-gray-400" />
                {item.link ? (
                  <Link
                    href={item.link}
                    className="hover:underline hover:text-white transition-colors text-white"
                  >
                    {item.text}
                  </Link>
                ) : (
                  <span className="text-grey-60">{item.text}</span>
                )}
              </span>
            ))}
          </nav>

          {title && (
            <h1 className="mt-2 text-2xl md:text-3xl font-semibold text-white">
              {title}
            </h1>
          )}
        </div>

        {/* Cart Icon with Badge */}
        <Link
          href="/cart"
          className="relative text-white hover:text-gray-300 transition-colors"
        >
          <ShoppingCart />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-xs text-white rounded-full w-4 h-4 flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </Link>
      </div>
    </div>
  );
}
