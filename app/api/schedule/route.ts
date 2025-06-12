import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions); // ✅ FIXED

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const perPage = parseInt(searchParams.get("per_page") || "10");
    const query = searchParams.get("query")?.trim().toLowerCase() || "";
    const fromDate = searchParams.get("fromDate")?.trim();
    const toDate = searchParams.get("toDate")?.trim();

    const where: any = {};

    if (session.user.role === "USER") {
      where.userId = parseInt(session.user.id);
    }

    // Filter tanggal langsung di database
    if (fromDate || toDate) {
      where.scheduledDate = {};
      if (fromDate) where.scheduledDate.gte = new Date(fromDate);
      if (toDate) {
        const endOfDay = new Date(toDate);
        endOfDay.setHours(23, 59, 59, 999);
        where.scheduledDate.lte = endOfDay;
      }

      // Jika kosong, hapus
      if (Object.keys(where.scheduledDate).length === 0) {
        delete where.scheduledDate;
      }
    }

    // Ambil semua data schedule terlebih dahulu
    let schedules = await prisma.schedule.findMany({
      where,
      include: {
        user: true,
        product: true,
      },
      orderBy: { scheduledDate: "desc" },
    });

    // Filter di kode (user.name dan product.productName)
    if (query) {
      schedules = schedules.filter((schedule) => {
        const userName = schedule.user?.name?.toLowerCase() || "";
        const productName = schedule.product?.productName?.toLowerCase() || "";
        const status = schedule.status?.toLowerCase() || "";
        return (
          userName.includes(query) ||
          productName.includes(query) ||
          status.includes(query)
        );
      });
    }

    const totalItems = schedules.length;

    // Pagination di JS
    const paginatedSchedules = schedules.slice(
      (page - 1) * perPage,
      page * perPage
    );

    return NextResponse.json({
      schedule: paginatedSchedules,
      totalItems,
    });
  } catch (error) {
    console.error("Error fetching schedules:", error);

    return new NextResponse(
      JSON.stringify({ error: "Internal Server Error" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
