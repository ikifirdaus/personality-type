"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import LoginReminderModal from "../LoginReminderModal/LoginReminderModal";

export default function LoginReminderWrapper() {
  const { data: session, status } = useSession();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (status === "loading") return;

    const isLoggedInAsUser =
      session?.user?.role === "USER" || session?.user?.role === "ADMIN";
    if (!isLoggedInAsUser) {
      setShowModal(true);
    }
  }, [session, status]);

  if (status === "loading") return null;

  return (
    <LoginReminderModal open={showModal} onClose={() => setShowModal(false)} />
  );
}
