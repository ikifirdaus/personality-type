"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";

interface BreadcrumbItem {
  text: string;
  link?: string;
}

interface TitleBreadcrumbProps {
  title?: string;
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ title, items }: TitleBreadcrumbProps) {
  return (
    <div className="bg-gray-900 text-white w-full py-6 px-6 md:px-12">
      {/* Breadcrumb Navigation */}
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
                className="hover:underline hover:text-white transition-colors"
              >
                {item.text}
              </Link>
            ) : (
              <span className="text-grey-60">{item.text}</span>
            )}
          </span>
        ))}
      </nav>

      {/* Optional Title */}
      {title && (
        <h1 className="mt-2 text-2xl md:text-3xl font-semibold text-white">
          {title}
        </h1>
      )}
    </div>
  );
}
