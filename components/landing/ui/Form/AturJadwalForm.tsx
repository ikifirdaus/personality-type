"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { Input } from "@/components/dashboard/ui/Input/Input";
import Textarea from "@/components/dashboard/ui/TextArea/Textarea";
import { NotebookIcon } from "lucide-react";

type AturJadwalFormProps = {
  userId: number;
  userName: string;
  transactionId: number;
  productId: number;
};

type FormValues = {
  date: string; // format: yyyy-MM-dd
  time: string; // format: HH:mm
  note?: string;
};

export default function AturJadwalForm({
  userId,
  userName,
  transactionId,
  productId,
}: AturJadwalFormProps) {
  const { register, handleSubmit, formState } = useForm<FormValues>();
  const { errors, isSubmitting } = formState;
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (data: FormValues) => {
    setLoading(true);
    try {
      // Gabungkan date + time → ISO string
      const scheduledDate = new Date(`${data.date}T${data.time}:00`);

      const res = await fetch("/api/landing/schedule", {
        method: "POST",
        body: JSON.stringify({
          scheduledDate: scheduledDate.toISOString(),
          note: data.note,
          userId,
          transactionId,
          productId,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        const errorData = await res.json();
        const errorMessage =
          errorData?.error ||
          "Gagal menyimpan jadwal. Silakan coba lagi nanti.";
        throw new Error(errorMessage);
      }

      toast.success("Jadwal berhasil dibuat!");
      router.push("/user/booking");
    } catch (error: any) {
      toast.error(error.message || "Terjadi kesalahan.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl w-full mx-auto border rounded-lg p-7 bg-white shadow-sm border-indigo-700">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block mb-1 text-gray-500 font-semibold">Nama</label>
          <Input type="text" value={userName} disabled />
        </div>

        <div>
          <label className="block mb-1 text-gray-500 font-semibold">
            Tanggal
          </label>
          <Input
            type="date"
            {...register("date", { required: "Tanggal wajib diisi" })}
          />
          {errors.date && (
            <p className="text-sm text-red-500 mt-1">{errors.date.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-1 text-gray-500 font-semibold">Jam</label>
          <Input
            type="time"
            {...register("time", { required: "Jam wajib diisi" })}
          />
          {errors.time && (
            <p className="text-sm text-red-500 mt-1">{errors.time.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-1 text-gray-500 font-semibold">
            Catatan (Opsional)
          </label>
          <Textarea {...register("note")} rows={3} />
        </div>

        <button
          type="submit"
          disabled={isSubmitting || loading}
          className="bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-6 rounded-lg transition duration-300 flex items-center justify-center w-full"
        >
          {loading ? (
            "Menyimpan..."
          ) : (
            <div className="flex items-center gap-2">
              <NotebookIcon size={20} />
              <span className="text-[15px]">Konfirmasi Booking</span>
            </div>
          )}
        </button>
      </form>
    </div>
  );
}
