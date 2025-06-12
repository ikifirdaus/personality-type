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
import Button from "../ui/Button/Button";
import { Article } from "@/types/article";
import Image from "next/image";
import ClearFiltersButton from "../ui/Button/ClearFiltersButton";

const ArticlePage = () => {
  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState<Article[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const searchParams = useSearchParams();

  const page = parseInt(searchParams.get("page") || "1");
  const perPage = parseInt(searchParams.get("per_page") || "10");
  const query = searchParams.get("query") || "";
  const fromDate = searchParams.get("fromDate") || "";
  const toDate = searchParams.get("toDate") || "";

  useEffect(() => {
    async function fetchUsers() {
      setLoading(true);
      const params = new URLSearchParams({
        page: page.toString(),
        per_page: perPage.toString(),
      });
      if (query) params.set("query", query);
      if (fromDate) params.set("fromDate", fromDate);
      if (toDate) params.set("toDate", toDate);

      const response = await fetch(`/api/article?${params.toString()}`);
      const data = await response.json();
      setArticles(data.users || []);
      setTotalItems(data.totalItems || 0);
      setLoading(false);
    }

    fetchUsers();
  }, [page, perPage, query, fromDate, toDate]);

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this article?")) {
      const response = await fetch(`/api/article/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setArticles(articles.filter((article) => article.id !== id));
      } else {
        alert("Failed to delete the article.");
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
      cell: (row: Article) => {
        const imageUrl = row.ogImage ? row.ogImage : `uploads/${row.ogImage}`;
        return (
          <div>
            <Image
              src={imageUrl}
              width={0}
              height={0}
              sizes="1000vw"
              alt={row.slug}
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
    { header: "Title", accessor: "title" },
    { header: "Slug", accessor: "slug" },
    { header: "Description", accessor: "description" },
    {
      header: "Action",
      accessor: "action",
      cell: (row: Article) => (
        <div className="flex items-center gap-2">
          <ButtonIcon
            url={`/admin/article/${row.id}`}
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
          title="Article Data"
          items={[{ text: "Article", link: "/admin/article" }]}
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
                    url="/admin/article/create"
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
              data={articles}
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
      </CardMain>
    </Layout>
  );
};

export default ArticlePage;
