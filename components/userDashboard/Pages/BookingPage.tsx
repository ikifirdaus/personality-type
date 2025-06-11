"use client";

import TitleBreadcrumb from "@/components/dashboard/layouts/TitleBreadcrumb";
import Table from "@/components/dashboard/ui/Table/Table";
import React, { useState, useEffect } from "react";
import Pagination from "@/components/dashboard/ui/Pagination/Pagination";
import { useSearchParams } from "next/navigation";
import SearchColumn from "@/components/dashboard/ui/Search/SearchColumn";
import TableSkeleton from "@/components/dashboard/ui/TableSkeleton/TableSkeleton";
import Skeleton from "@/components/dashboard/ui/Skeleton/Skeleton";
import { Schedule } from "@/types/schedule";
import Layout from "../layouts/Layout";
import CardMain from "../layouts/CardMain";
import Link from "next/link";

const BookingPage = () => {
  const [loading, setLoading] = useState(true);
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [notScheduledProducts, setNotScheduledProducts] = useState<any[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const searchParams = useSearchParams();

  const page = parseInt(searchParams.get("page") || "1");
  const perPage = parseInt(searchParams.get("per_page") || "10");
  const query = searchParams.get("query") || "";
  const fromDate = searchParams.get("fromDate") || "";
  const toDate = searchParams.get("toDate") || "";

  useEffect(() => {
    async function fetchSchedule() {
      setLoading(true);
      const params = new URLSearchParams({
        page: page.toString(),
        per_page: perPage.toString(),
      });
      if (query) params.set("query", query);
      if (fromDate) params.set("fromDate", fromDate);
      if (toDate) params.set("toDate", toDate);

      const response = await fetch(`/api/schedule?${params.toString()}`);
      const data = await response.json();
      setSchedules(data.schedule || []);
      setTotalItems(data.totalItems || 0);
      setLoading(false);
    }

    fetchSchedule();
  }, [page, perPage, query, fromDate, toDate]);

  useEffect(() => {
    async function fetchNotScheduledProducts() {
      const response = await fetch("/api/schedule/not-scheduled");
      const data = await response.json();
      setNotScheduledProducts(data || []);
    }

    fetchNotScheduledProducts();
  }, []);

  const hasNextPage = page * perPage < totalItems;
  const hasPrevPage = page > 1;

  const columns = [
    {
      header: "No",
      accessor: "no",
    },
    { header: "Nama Produk", accessor: "productName" },
    {
      header: "Tanggal & Jam Booking",
      accessor: "scheduledDate",
      cell: (row: Schedule) =>
        new Date(row.scheduledDate).toLocaleString("id-ID", {
          dateStyle: "medium",
          timeStyle: "short",
        }),
    },
    { header: "Status", accessor: "status" },
  ];

  const unscheduledColumns = [
    { header: "No", accessor: "no" },
    { header: "Nama Produk", accessor: "productName" },
    { header: "Tanggal Pembelian", accessor: "createdAt" },
    {
      header: "Aksi",
      accessor: "action",
      cell: (row: any) => row.action, // render JSX-nya
    },
  ];

  return (
    <Layout>
      {loading ? (
        <Skeleton className="h-8 w-48 mb-4" />
      ) : (
        <TitleBreadcrumb
          title="Booking Data"
          items={[{ text: "Booking", link: "/user/booking" }]}
        />
      )}
      <CardMain>
        <div className="flex md:items-center md:justify-between flex-col md:flex-row w-full">
          <div className="flex flex-col md:flex-row gap-2 w-full">
            {loading ? (
              <Skeleton className="h-10 w-full md:w-64 mb-2" />
            ) : (
              <div className="w-full">
                <SearchColumn />
              </div>
            )}
          </div>
        </div>

        {loading ? (
          <TableSkeleton />
        ) : (
          <>
            <Table
              data={schedules.map((item, index) => ({
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

            {notScheduledProducts.length > 0 && (
              <div className="mt-8">
                <h2 className="text-lg font-semibold mb-4">
                  Belum Dijadwalkan
                </h2>
                <Table
                  data={notScheduledProducts.map((item, index) => ({
                    no: index + 1,
                    productName: item.productName,
                    createdAt: new Date(item.createdAt).toLocaleDateString(),
                    action: (
                      <Link
                        href={`/atur-jadwal?transactionId=${item.transactionId}&productId=${item.productId}`}
                        className="text-blue-500 hover:underline"
                      >
                        Buat Jadwal
                      </Link>
                    ),
                  }))}
                  columns={unscheduledColumns}
                  currentPage={1}
                  perPage={notScheduledProducts.length}
                />
              </div>
            )}
          </>
        )}
      </CardMain>
    </Layout>
  );
};

export default BookingPage;
