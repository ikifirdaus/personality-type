"use client";

import Link from "next/link";
import LayoutLandingDetail from "../layouts/LayoutLandingDetail";
import Breadcrumb from "../ui/Breadcrumb/Breadcrumb";

const KebijakanPage = () => {
  return (
    <>
      <LayoutLandingDetail>
        <Breadcrumb
          title="Kebijakan & Privasi"
          items={[
            { text: "Kebijakan" }, // tidak ada link, jadi teks aktif
          ]}
        />
        <div className="py-16 bg-gray-50 min-h-screen px-6 md:px-12">
          <h1 className="text-3xl font-semibold mb-8">Kebijakan Privasi</h1>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              1. Informasi yang Kami Kumpulkan
            </h2>
            <p>
              Kami mengumpulkan informasi pribadi yang Anda berikan secara
              langsung ketika Anda mengisi tes kepribadian, mendaftar, atau
              menggunakan aplikasi kami. Informasi ini mungkin mencakup nama,
              alamat email, usia, jenis kelamin, dan data tes lainnya. Selain
              itu, kami juga dapat mengumpulkan informasi teknis seperti alamat
              IP, jenis perangkat, dan aktivitas penggunaan aplikasi untuk
              meningkatkan pengalaman pengguna.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              2. Penggunaan Informasi
            </h2>
            <p>Informasi yang kami kumpulkan digunakan untuk tujuan berikut:</p>
            <ul className="list-disc ml-6">
              <li>
                Menyediakan hasil tes kepribadian yang relevan dan akurat.
              </li>
              <li>
                Memperbaiki dan mengembangkan aplikasi kami berdasarkan feedback
                pengguna.
              </li>
              <li>
                Mengirimkan pembaruan, berita, atau promosi yang relevan tentang
                layanan kami, jika Anda memilih untuk menerima komunikasi
                tersebut.
              </li>
              <li>Memastikan keamanan dan kelancaran operasional aplikasi.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              3. Perlindungan Data
            </h2>
            <p>
              Kami berkomitmen untuk menjaga keamanan data pribadi Anda. Kami
              menerapkan langkah-langkah keamanan yang sesuai untuk melindungi
              data dari akses yang tidak sah, perubahan, pengungkapan, atau
              perusakan. Semua data pribadi yang dikumpulkan dienkripsi dan
              disimpan di server yang aman.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              4. Berbagi Informasi dengan Pihak Ketiga
            </h2>
            <p>
              Kami tidak menjual atau menyewakan data pribadi Anda kepada pihak
              ketiga. Namun, kami mungkin berbagi informasi dengan penyedia
              layanan yang membantu kami mengoperasikan aplikasi atau memenuhi
              layanan yang Anda minta, seperti pengelola server atau penyedia
              pembayaran, dengan syarat mereka hanya menggunakan data untuk
              tujuan yang sesuai dan sesuai dengan kebijakan privasi ini.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              5. Penggunaan Cookie
            </h2>
            <p>
              Aplikasi kami menggunakan cookie untuk meningkatkan pengalaman
              pengguna. Cookie adalah file teks kecil yang disimpan di perangkat
              Anda dan digunakan untuk mengingat preferensi dan pengaturan Anda.
              Anda dapat mengatur browser Anda untuk menolak cookie, namun hal
              ini dapat memengaruhi fungsionalitas aplikasi.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">6. Hak Pengguna</h2>
            <p>
              Anda berhak untuk mengakses, mengoreksi, atau menghapus informasi
              pribadi yang kami simpan. Jika Anda ingin melakukannya, Anda dapat
              menghubungi kami melalui email yang tercantum di bagian bawah
              halaman ini.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              7. Perubahan Kebijakan Privasi
            </h2>
            <p>
              Kami dapat memperbarui kebijakan privasi ini dari waktu ke waktu.
              Perubahan akan diberitahukan melalui aplikasi atau email yang
              terdaftar. Kami mendorong Anda untuk memeriksa kebijakan ini
              secara berkala.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">8. Kontak</h2>
            <p>
              Jika Anda memiliki pertanyaan mengenai kebijakan privasi ini, Anda
              dapat menghubungi kami di{" "}
              <span>
                <Link
                  href="mailto:njpt@personanjpt.com"
                  className="text-indigo-800 hover:text-indigo-500 text-medium"
                >
                  njpt@personanjpt.com
                </Link>
              </span>
              .
            </p>
          </section>
        </div>
      </LayoutLandingDetail>
    </>
  );
};

export default KebijakanPage;
