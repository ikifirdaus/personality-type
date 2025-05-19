// components/landing/modals/LoginReminderModal.tsx
"use client";

import { FileInput } from "lucide-react";
// import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Button from "../Button/Button";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function LoginReminderModal({ open, onClose }: Props) {
  //   const router = useRouter();

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 font-[family-name:var(--font-geist-sans)]">
      <div className="bg-white w-full max-w-md mx-4 p-6 rounded-lg shadow-lg relative">
        {/* Close button (X) */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          ×
        </button>

        <h1 className="text-2xl font-semibold text-gray-800 mb-4">
          Registrasi Dulu Yuk! 😉
        </h1>
        <p className="text-md text-gray-600 mt-2">
          Untuk mengikuti tes kepribadian, kamu perlu masuk ke akunmu terlebih
          dahulu. Dengan masuk, hasil tesmu bisa tersimpan dan kamu bisa lanjut
          kapan pun.
        </p>

        <div className="mt-5 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Nanti Aja
          </button>
          <Button
            className=""
            url="/register"
            title="Register"
            icon={<FileInput size={18} className="ml-2" />}
          />
        </div>
      </div>
    </div>
  );
}
