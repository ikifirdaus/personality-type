"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import Header from "@/components/landing/layouts/Header";
// import Footer from "@/components/landing/layouts/Footer";

export default function Home() {
  const { data: session, status } = useSession();

  const isLoading = status === "loading";
  const isLoggedIn = status === "authenticated";

  return (
    <div className="flex flex-col min-h-screen font-[family-name:var(--font-geist-mono)]">
      <Header />

      <main className="flex-grow flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl font-bold mb-4">LANDING PAGE</h1>

        {isLoading && <p className="text-gray-500">Loading...</p>}

        {isLoggedIn ? (
          <>
            <p className="mb-2">Nama User: {session?.user?.name}</p>
            <Link
              href="/personalityTest"
              className="text-blue-500 hover:underline mb-4"
            >
              Personality Test
            </Link>
            <button
              onClick={() => signOut()}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded text-gray-700"
            >
              Logout
            </button>
          </>
        ) : (
          <p className="text-gray-500">Silakan login untuk melihat informasi</p>
        )}
      </main>

      {/* <Footer /> */}
    </div>
  );
}
