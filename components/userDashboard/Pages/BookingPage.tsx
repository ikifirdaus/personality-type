"use client";

import TitleBreadcrumb from "@/components/dashboard/layouts/TitleBreadcrumb";
import Table from "@/components/dashboard/ui/Table/Table";
// import { Trash2, FilePenLine } from "lucide-react";
import React, { useState, useEffect } from "react";
// import ButtonIcon from "@/components/dashboard/ui/Button/ButtonIcon";
import Pagination from "@/components/dashboard/ui/Pagination/Pagination";
import { useSearchParams } from "next/navigation";
import SearchColumn from "@/components/dashboard/ui/Search/SearchColumn";
import TableSkeleton from "@/components/dashboard/ui/TableSkeleton/TableSkeleton";
import Skeleton from "@/components/dashboard/ui/Skeleton/Skeleton";
import { Schedule } from "@/types/schedule";
import Layout from "../layouts/Layout";
import CardMain from "../layouts/CardMain";

const BookingPage = () => {
  const [loading, setLoading] = useState(true);
  const [schedules, setSchedules] = useState<Schedule[]>([]);
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
    {
      header: "No",
      accessor: "no",
    },
    { header: "Nama Produk", accessor: "productName" },
    {
      header: "Tanggal Booking",
      accessor: "scheduledDate",
      cell: (row: Schedule) => new Date(row.scheduledDate).toLocaleDateString(),
    },
    { header: "Status", accessor: "status" },
    // {
    //   header: "Action",
    //   accessor: "action",
    //   cell: (row: Schedule) => (
    //     <div className="flex items-center gap-2">
    //       <ButtonIcon
    //         url={`/admin/product/${row.id}`}
    //         icon={<FilePenLine className="w-4 h-4" />}
    //       />
    //       <button
    //         onClick={() => handleDelete(row.id)}
    //         className="p-1 bg-red-400 text-white rounded hover:bg-red-600"
    //       >
    //         <Trash2 className="w-4 h-4" />
    //       </button>
    //     </div>
    //   ),
    // },
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
              <>
                <div className="w-full">
                  <SearchColumn />
                </div>
              </>
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
          </>
        )}
      </CardMain>
    </Layout>
  );
};

export default BookingPage;
