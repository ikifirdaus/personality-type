"use client";

import { useRouter, useSearchParams } from "next/navigation";

const ClearFiltersButton = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleClear = () => {
    const newParams = new URLSearchParams(searchParams.toString());

    newParams.delete("query");
    newParams.delete("fromDate");
    newParams.delete("toDate");
    newParams.set("page", "1"); // Reset ke halaman 1

    router.replace(`?${newParams.toString()}`);
  };

  const isFiltered =
    searchParams.get("query") ||
    searchParams.get("fromDate") ||
    searchParams.get("toDate");

  if (!isFiltered) return null;

  return (
    <button
      onClick={handleClear}
      className="text-sm font-medium text-slate-500 hover:bg-primary hover:bg-slate-200 hover:text-white flex items-center justify-center border md:w-28 h-9 rounded w-full"
    >
      Hapus Search
    </button>
  );
};

export default ClearFiltersButton;
