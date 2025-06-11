import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import AturJadwalForm from "@/components/landing/ui/Form/AturJadwalForm";
import LayoutLandingDetail from "@/components/landing/layouts/LayoutLandingDetail";
import Breadcrumb from "@/components/landing/ui/Breadcrumb/Breadcrumb";
import CalendarEventComponent from "@/components/landing/ui/Calendar/CalendarEventComponent";
import { CalendarCheck, NotepadText } from "lucide-react";

export default async function AturJadwalPage({
  searchParams,
}: {
  searchParams: { transactionId?: string; productId?: string };
}) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "USER") {
    redirect("/");
  }

  const { transactionId, productId } = await searchParams;

  if (!transactionId || !productId) {
    return <div>Parameter tidak valid</div>;
  }

  const userId = Number(session.user.id);
  const productIdNum = Number(productId);

  const transaction = await prisma.transaction.findUnique({
    where: { id: Number(transactionId) },
    include: {
      transactionItem: {
        include: {
          product: true,
        },
      },
    },
  });

  const productItem = transaction?.transactionItem.find(
    (item) => item.productId === productIdNum
  );
  const productName = productItem?.product.productName ?? "Tidak ditemukan";

  const isValid =
    transaction &&
    transaction.userId === userId &&
    transaction.status === "PAID" &&
    transaction.transactionItem.some((item) => item.productId === productIdNum);

  if (!isValid) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Anda tidak memiliki akses ke jadwal ini.
      </div>
    );
  }

  // Ambil semua schedule berdasarkan productId
  const schedules = await prisma.schedule.findMany({
    // where: {
    //   productId: productIdNum,
    // },
    include: {
      user: true,
      transaction: {
        include: {
          transactionItem: {
            include: {
              product: true, // tambahkan ini!
            },
          },
        },
      },
    },
    orderBy: {
      scheduledDate: "asc",
    },
  });

  return (
    <LayoutLandingDetail>
      <Breadcrumb title="Atur Jadwal" items={[{ text: "Jadwal" }]} />
      <div className="min-h-[600px] md:min-h-screen flex flex-col md:flex-row gap-8 md:gap-10 bg-gray-50 px-5 md:px-12  py-10">
        {/* Bagian Form Jadwal */}
        <div className="md:basis-[40%] w-full flex flex-col justify-start">
          <div className="text-2xl font-bold text-left mb-2 flex items-center gap-2 text-indigo-700">
            Atur Jadwal {productName}{" "}
            <span>
              <NotepadText />
            </span>
          </div>
          <p className="text-base text-gray-700 mb-4 text-left">
            Silakan isi formulir di bawah ini dengan informasi yang diperlukan
            untuk menentukan jadwal pertemuan yang sesuai dengan preferensi dan
            ketersediaan waktu Anda.
          </p>
          <AturJadwalForm
            userId={userId}
            userName={session.user.name || "User"}
            transactionId={Number(transactionId)}
            productId={productIdNum}
          />
        </div>

        {/* Bagian Kalender */}
        <div className="md:basis-[60%] w-full flex flex-col justify-start">
          <div className="text-2xl font-bold text-left mb-2 flex items-center gap-2 text-indigo-700">
            Kalender
            <span>
              <CalendarCheck />
            </span>
          </div>
          <p className="text-base text-gray-700 text-left mb-4">
            Silakan gunakan kalender ini sebagai referensi untuk melihat dan
            memilih slot waktu yang masih tersedia, agar Anda dapat menjadwalkan
            pertemuan atau konsultasi sesuai dengan ketersediaan waktu yang ada.
          </p>
          {/* <p className="mb-4">tes</p> */}
          <div className="w-full bg-white rounded-lg shadow-sm p-6 text-gray-500 border border-indigo-700">
            <CalendarEventComponent schedule={schedules} />
          </div>
        </div>
      </div>
    </LayoutLandingDetail>
  );
}
