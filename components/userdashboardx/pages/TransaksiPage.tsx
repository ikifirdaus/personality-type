"use client";

import TitleBreadcrumb from "@/components/dashboard/layouts/TitleBreadcrumb";
import Table from "@/components/dashboard/ui/Table/Table";
import React, { useState, useEffect } from "react";
import Pagination from "@/components/dashboard/ui/Pagination/Pagination";
import { useSearchParams } from "next/navigation";
import SearchColumn from "@/components/dashboard/ui/Search/SearchColumn";
import TableSkeleton from "@/components/dashboard/ui/TableSkeleton/TableSkeleton";
import Skeleton from "@/components/dashboard/ui/Skeleton/Skeleton";
import Layout from "../layouts/Layout";
import CardMain from "../layouts/CardMain";
import { TransactionItemWithDetails } from "@/types/TransactionItemWithDetails";
import ClearFiltersButton from "@/components/dashboard/ui/Button/ClearFiltersButton";

const TransaksiPage = () => {
  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState<
    TransactionItemWithDetails[]
  >([]);
  const [totalItems, setTotalItems] = useState(0);
  const searchParams = useSearchParams();

  const page = parseInt(searchParams.get("page") || "1");
  const perPage = parseInt(searchParams.get("per_page") || "10");
  const query = searchParams.get("query") || "";
  const fromDate = searchParams.get("fromDate") || "";
  const toDate = searchParams.get("toDate") || "";

  useEffect(() => {
    async function fetchTransaction() {
      setLoading(true);
      const params = new URLSearchParams({
        page: page.toString(),
        per_page: perPage.toString(),
      });
      if (query) params.set("query", query);
      if (fromDate) params.set("fromDate", fromDate);
      if (toDate) params.set("toDate", toDate);

      const response = await fetch(`/api/transaction?${params.toString()}`);
      const data = await response.json();
      setTransactions(data.transactionItem || []);
      setTotalItems(data.totalItems || 0);
      setLoading(false);
    }

    fetchTransaction();
  }, [page, perPage, query, fromDate, toDate]);

  // const handleDelete = async (id: number) => {
  //   if (confirm("Are you sure you want to delete this schedule?")) {
  //     const response = await fetch(`/api/schedule/${id}`, {
  //       method: "DELETE",
  //     });

  //     if (response.ok) {
  //       setSchedules(schedules.filter((schedule) => schedule.id !== id));
  //     } else {
  //       alert("Failed to delete the schedule.");
  //     }
  //   }
  // };

  const hasNextPage = page * perPage < totalItems;
  const hasPrevPage = page > 1;

  const columns = [
    { header: "No", accessor: "no" },
    { header: "Nama Produk", accessor: "productName" },
    {
      header: "Jumlah",
      accessor: "quantity",
    },
    {
      header: "Harga Satuan",
      accessor: "price",
      cell: (row: TransactionItemWithDetails) =>
        `Rp${row.price.toLocaleString()}`,
    },
    {
      header: "Total",
      accessor: "total",
      cell: (row: TransactionItemWithDetails) =>
        `Rp${(row.price * row.quantity).toLocaleString()}`,
    },
    {
      header: "Tanggal Transaksi",
      accessor: "createdAt",
      cell: (row: TransactionItemWithDetails) =>
        new Date(row.createdAt).toLocaleDateString("id-ID"),
    },
  ];

  return (
    <Layout>
      {loading ? (
        <Skeleton className="h-8 w-48 mb-4" />
      ) : (
        <TitleBreadcrumb
          title="Transaksi Data"
          items={[{ text: "Transaksi", link: "/user/transaksi" }]}
        />
      )}
      <CardMain>
        <div className="flex md:items-center md:justify-between flex-col md:flex-row w-full">
          <div className="flex flex-col md:flex-row gap-2 w-full">
            {loading ? (
              <Skeleton className="h-10 w-full md:w-64 mb-2" />
            ) : (
              <>
                <div className="w-full">
                  <SearchColumn />
                </div>
                <ClearFiltersButton />
              </>
            )}
          </div>
        </div>

        {loading ? (
          <TableSkeleton />
        ) : (
          <>
            <Table
              data={transactions.map((item, index) => ({
                ...item,
                no: (page - 1) * perPage + index + 1,
                productName: item.product?.productName || "Unknown",
              }))}
              columns={columns}
              currentPage={page}
              perPage={10}
            />

            <div className="mt-3">
              <Pagination
                hasNextPage={hasNextPage}
                hasPrevPage={hasPrevPage}
                totalItems={totalItems}
              />
            </div>
          </>
        )}
      </CardMain>
    </Layout>
  );
};

export default TransaksiPage;
