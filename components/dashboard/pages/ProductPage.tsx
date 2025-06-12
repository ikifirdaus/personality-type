"use client";

import CardMain from "@/components/dashboard/layouts/CardMain";
import Layout from "@/components/dashboard/layouts/Layout";
import TitleBreadcrumb from "@/components/dashboard/layouts/TitleBreadcrumb";
import Table from "@/components/dashboard/ui/Table/Table";
import { Trash2, FilePenLine, PlusCircle } from "lucide-react";
import React, { useState, useEffect } from "react";
import ButtonIcon from "@/components/dashboard/ui/Button/ButtonIcon";
import Pagination from "@/components/dashboard/ui/Pagination/Pagination";
import { useSearchParams } from "next/navigation";
import SearchColumn from "@/components/dashboard/ui/Search/SearchColumn";
import TableSkeleton from "@/components/dashboard/ui/TableSkeleton/TableSkeleton";
import Skeleton from "@/components/dashboard/ui/Skeleton/Skeleton";
import { Product } from "@/types/product";
import Button from "../ui/Button/Button";
import Image from "next/image";
import ClearFiltersButton from "../ui/Button/ClearFiltersButton";

const ProductPage = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const searchParams = useSearchParams();

  const page = parseInt(searchParams.get("page") || "1");
  const perPage = parseInt(searchParams.get("per_page") || "10");
  const query = searchParams.get("query") || "";
  const fromDate = searchParams.get("fromDate") || "";
  const toDate = searchParams.get("toDate") || "";

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      const params = new URLSearchParams({
        page: page.toString(),
        per_page: perPage.toString(),
      });
      if (query) params.set("query", query);
      if (fromDate) params.set("fromDate", fromDate);
      if (toDate) params.set("toDate", toDate);

      const response = await fetch(`/api/product?${params.toString()}`);
      const data = await response.json();
      setProducts(data.products || []);
      setTotalItems(data.totalItems || 0);
      setLoading(false);
    }

    fetchProducts();
  }, [page, perPage, query, fromDate, toDate]);

  const [selectedDescription, setSelectedDescription] = useState<string | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openDescriptionModal = (description: string) => {
    setSelectedDescription(description);
    setIsModalOpen(true);
  };

  const closeDescriptionModal = () => {
    setSelectedDescription(null);
    setIsModalOpen(false);
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this product?")) {
      const response = await fetch(`/api/product/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setProducts(products.filter((product) => product.id !== id));
      } else {
        alert("Failed to delete the product.");
      }
    }
  };

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showImageModal, setShowImageModal] = useState(false);

  const hasNextPage = page * perPage < totalItems;
  const hasPrevPage = page > 1;

  const columns = [
    {
      header: "No",
      accessor: "no",
    },
    {
      header: "Image",
      accessor: "ogImage",
      cell: (row: Product) => {
        const imageUrl = row.image ? row.image : `uploads/product/${row.image}`;
        return (
          <div>
            <Image
              src={imageUrl}
              width={0}
              height={0}
              sizes="1000vw"
              alt={row.productName}
              className="w-10 h-10 rounded-full cursor-pointer object-cover"
              onClick={() => {
                setSelectedImage(imageUrl);
                setShowImageModal(true);
              }}
            />
          </div>
        );
      },
    },
    { header: "Product Name", accessor: "productName" },
    {
      header: "Price",
      accessor: "price",
      cell: (row: Product) =>
        new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
          minimumFractionDigits: 0,
        }).format(row.price),
    },
    {
      header: "Description",
      accessor: "description",
      cell: (row: Product) => (
        <button
          onClick={() => openDescriptionModal(row.description || "")}
          className="text-white bg-green-500 hover:bg-green-700 text-xs rounded p-1 px-3 py-1"
        >
          View
        </button>
      ),
    },

    { header: "Duration", accessor: "duration" },
    {
      header: "Action",
      accessor: "action",
      cell: (row: Product) => (
        <div className="flex items-center gap-2">
          <ButtonIcon
            url={`/admin/product/${row.id}`}
            icon={<FilePenLine className="w-4 h-4" />}
          />
          <button
            onClick={() => handleDelete(row.id)}
            className="p-1 bg-red-400 text-white rounded hover:bg-red-600"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <Layout>
      {loading ? (
        <Skeleton className="h-8 w-48 mb-4" />
      ) : (
        <TitleBreadcrumb
          title="Product Data"
          items={[{ text: "Product", link: "/admin/product" }]}
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
                <div className="flex mt-2 md:mt-0">
                  <Button
                    className=""
                    icon={<PlusCircle className="w-4 h-4" />}
                    url="/admin/product/create"
                    title="Create"
                  />
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
              data={products}
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

            {showImageModal && selectedImage && (
              <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
                <div className="bg-white p-2 rounded-lg shadow-lg relative w-full max-w-[90vw] md:max-w-[700px] max-h-[90vh] overflow-auto">
                  <button
                    onClick={() => setShowImageModal(false)}
                    className="absolute top-2 right-2 hover:bg-red-700 text-sm bg-red-500/60 rounded px-3 py-1 p-4 shadow-lg text-white"
                  >
                    &times;
                  </button>
                  <div className="flex justify-center items-center">
                    <Image
                      src={selectedImage}
                      alt="Full View"
                      width={0}
                      height={0}
                      sizes="1000vw"
                      className="w-full h-auto object-contain rounded"
                    />
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 px-4">
            <div className="relative bg-white rounded-lg p-6 w-full max-w-xl max-h-[80vh] overflow-y-auto shadow-xl">
              {/* Tombol Close di pojok kanan atas */}
              <button
                onClick={closeDescriptionModal}
                className="absolute top-2 right-2 hover:bg-red-700 text-sm bg-red-500/60 rounded px-3 py-1 p-4 shadow-lg text-white"
                aria-label="Close"
              >
                &times;
              </button>

              <h2 className="text-lg font-semibold mb-4">Description</h2>
              <p className="text-gray-700 whitespace-pre-line">
                {selectedDescription}
              </p>
            </div>
          </div>
        )}
      </CardMain>
    </Layout>
  );
};

export default ProductPage;
