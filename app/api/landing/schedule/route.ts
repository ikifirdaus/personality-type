import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { scheduledDate, note, userId, transactionId, productId } = body;

    if (!scheduledDate || !userId || !transactionId || !productId) {
      return NextResponse.json(
        { error: "Data tidak lengkap." },
        { status: 400 }
      );
    }

    // Cek apakah jadwal ini sudah dibuat untuk transaksi tersebut
    const existingSchedule = await prisma.schedule.findUnique({
      where: {
        userId_productId_transactionId: {
          userId,
          productId,
          transactionId,
        },
      },
    });

    if (existingSchedule) {
      return NextResponse.json(
        { error: "Jadwal sudah dibuat untuk transaksi ini." },
        { status: 409 }
      );
    }

    // Ambil durasi dari produk
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return NextResponse.json(
        { error: "Produk tidak ditemukan." },
        { status: 404 }
      );
    }

    const duration = product.duration;
    if (duration === null) {
      return NextResponse.json(
        { error: "Durasi produk tidak tersedia." },
        { status: 400 }
      );
    }
    const start = new Date(scheduledDate);
    const end = new Date(start.getTime() + duration * 60000);

    // Cek apakah ada jadwal lain yang bentrok
    const overlapping = await prisma.schedule.findMany({
      where: {
        status: { in: ["BOOKED", "CONFIRMED"] },
        OR: [
          // Jadwal lain yang dimulai di antara start dan end yang diminta
          {
            scheduledDate: {
              gte: start,
              lt: end,
            },
          },
          // Jadwal lain yang dimulai sebelum start tapi masih berlangsung saat start
          {
            scheduledDate: {
              lt: start,
            },
            product: {
              duration: {
                gt: 0,
              },
            },
          },
        ],
      },
      include: {
        product: true,
      },
    });

    // Filter lagi untuk pastikan bahwa jadwal yang dimulai sebelum `start`
    // memang masih aktif saat `start`
    const hasConflict = overlapping.some((s) => {
      if (s.product.duration === null) return false; // skip jika durasi tidak valid
      const sStart = new Date(s.scheduledDate);
      const sEnd = new Date(sStart.getTime() + s.product.duration * 60000);
      return sEnd > start;
    });

    if (hasConflict) {
      return NextResponse.json(
        { error: "Sudah ada jadwal yang bentrok di waktu ini." },
        { status: 409 }
      );
    }

    // Simpan schedule baru
    const schedule = await prisma.schedule.create({
      data: {
        scheduledDate: start,
        note,
        userId,
        productId,
        transactionId,
        status: "BOOKED", // default status
      },
    });

    return NextResponse.json(schedule, { status: 201 });
  } catch (error) {
    console.error("POST /api/schedule error:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan saat membuat jadwal." },
      { status: 500 }
    );
  }
}
