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
import Modal from "@/components/dashboard/ui/Modal/Modal";
import ClearFiltersButton from "../ui/Button/ClearFiltersButton";

const BookingPage = () => {
  const [loading, setLoading] = useState(true);
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [notScheduledProducts, setNotScheduledProducts] = useState<any[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const searchParams = useSearchParams();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState<Schedule | null>(
    null
  );
  const [newStatus, setNewStatus] = useState("");

  const openModal = (schedule: Schedule) => {
    setSelectedSchedule(schedule);
    setNewStatus(schedule.status || "");
    setIsModalOpen(true);
  };

  const handleSubmit = async () => {
    if (!selectedSchedule) return;

    const response = await fetch(`/api/schedule/${selectedSchedule.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: newStatus }),
    });

    if (response.ok) {
      setIsModalOpen(false);
      location.reload(); // Atau bisa fetch ulang jadwal
    } else {
      console.error("Gagal update status");
    }
  };

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
      try {
        const response = await fetch("/api/schedule/not-scheduled");

        if (!response.ok) {
          throw new Error(`Fetch failed with status ${response.status}`);
        }

        const data = await response.json();
        setNotScheduledProducts(data.unscheduledProducts || []);
      } catch (err) {
        console.error("❌ Error fetching not scheduled products:", err);
      }
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
    {
      header: "Nama Customer",
      accessor: "name",
      cell: (row: Schedule) => row.user?.name || "-", // tambahkan ini
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
    {
      header: "Status",
      accessor: "status",
      cell: (row: Schedule) => {
        const status = row.status;
        let badgeClass = "bg-gray-200 text-gray-800";

        if (status === "BOOKED") {
          badgeClass = "bg-green-100 text-green-800";
        } else if (status === "DONE") {
          badgeClass = "bg-blue-100 text-blue-800";
        }

        return (
          <div className="flex items-center gap-2">
            <span
              className={`px-2 py-1 rounded text-xs font-medium ${badgeClass}`}
            >
              {status}
            </span>
            <button
              onClick={() => openModal(row)}
              className="text-blue-500 text-sm hover:underline"
            >
              Edit
            </button>
          </div>
        );
      },
    },
  ];

  const unscheduledColumns = [
    { header: "No", accessor: "no" },
    { header: "Nama Customer", accessor: "name" },
    { header: "Nama Produk", accessor: "productName" },
    {
      header: "Tanggal Pembelian",
      accessor: "createdAt",
      cell: (row: any) =>
        new Date(row.createdAt).toLocaleString("id-ID", {
          dateStyle: "medium",
        }),
    },
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
              data={schedules.map((item, index) => ({
                ...item,
                no: (page - 1) * perPage + index + 1,
                name: item.user?.name || "-",
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
                    name: item.user?.name || "-",
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
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Ubah Status Jadwal"
        >
          <div className="flex flex-col gap-4">
            <select
              className="border rounded px-3 py-2"
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
            >
              <option value="">Pilih status</option>
              <option value="BOOKED">BOOKED</option>
              <option value="DONE">DONE</option>
            </select>
            <button
              onClick={handleSubmit}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Simpan
            </button>
          </div>
        </Modal>
      </CardMain>
    </Layout>
  );
};

export default BookingPage;
