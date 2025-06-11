import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions); // ✅ FIXED
    if (!session || session.user.role !== "USER") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = parseInt(session.user.id); // ✅ pastikan tipe INT

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const perPage = parseInt(searchParams.get("per_page") || "10");

    const fromDate = searchParams.get("fromDate")?.trim();
    const toDate = searchParams.get("toDate")?.trim();

    const where: any = {
      userId,
    };

    if (fromDate || toDate) {
      where.scheduledDate = {};
      if (fromDate) where.scheduledDate.gte = new Date(fromDate);
      if (toDate) where.scheduledDate.lte = new Date(toDate);
    }

    const totalItems = await prisma.schedule.count({ where });

    const schedules = await prisma.schedule.findMany({
      where,
      include: {
        product: true,
      },
      orderBy: { scheduledDate: "desc" },
      skip: (page - 1) * perPage,
      take: perPage,
    });

    return NextResponse.json({ schedule: schedules, totalItems });
  } catch (error) {
    console.error("Error fetching schedules:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
