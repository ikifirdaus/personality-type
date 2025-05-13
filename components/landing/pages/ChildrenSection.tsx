import React from "react";
import { BookOpen, Compass, Heart, Star } from "lucide-react";
export const ChildrenSection = () => {
  return (
    <section id="children" className="py-16 bg-white w-full scroll-mt-20">
      <div className="container mx-auto px-6 md:px-12">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 text-gray-800">
          Untuk Anak & Remaja
        </h2>
        <p className="text-xl text-center text-gray-600 mb-12 max-w-3xl mx-auto">
          Membantu anak-anak dan remaja menemukan jati diri dan mengembangkan
          potensi unik mereka sejak dini.
        </p>
        <div className="flex flex-col lg:flex-row gap-8 items-center">
          <div className="lg:w-1/2">
            <img
              src="https://images.unsplash.com/photo-1544717305-2782549b5136?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
              alt="Anak dan remaja belajar"
              className="rounded-xl shadow-lg w-full"
            />
          </div>
          <div className="lg:w-1/2">
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="bg-indigo-100 p-3 rounded-full h-12 w-12 flex items-center justify-center flex-shrink-0">
                  <BookOpen size={24} className="text-indigo-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    Pentingnya Mengenal Karakter Sejak Dini
                  </h3>
                  <p className="text-gray-600">
                    Memahami tipe kepribadian anak sejak dini membantu orang tua
                    dan pendidik memberikan pendekatan yang tepat untuk
                    mengoptimalkan potensi mereka dan menciptakan lingkungan
                    belajar yang sesuai.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="bg-purple-100 p-3 rounded-full h-12 w-12 flex items-center justify-center flex-shrink-0">
                  <Compass size={24} className="text-purple-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    Bimbingan Minat & Bakat
                  </h3>
                  <p className="text-gray-600">
                    Kami membantu mengidentifikasi minat dan bakat alami anak
                    berdasarkan tipe kognitifnya, sehingga mereka dapat fokus
                    mengembangkan area yang sesuai dengan kecenderungan alami
                    mereka.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="bg-blue-100 p-3 rounded-full h-12 w-12 flex items-center justify-center flex-shrink-0">
                  <Heart size={24} className="text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    Pendekatan yang Menyenangkan
                  </h3>
                  <p className="text-gray-600">
                    Program kami dirancang dengan pendekatan yang menyenangkan
                    dan interaktif, membantu anak-anak dan remaja memahami diri
                    mereka dalam suasana yang positif.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="bg-teal-100 p-3 rounded-full h-12 w-12 flex items-center justify-center flex-shrink-0">
                  <Star size={24} className="text-teal-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    Konsultasi Khusus dengan Psikolog
                  </h3>
                  <p className="text-gray-600">
                    Sesi konsultasi dengan psikolog anak yang berpengalaman
                    untuk membantu orang tua memahami dan mengoptimalkan pola
                    asuh sesuai tipe kepribadian anak.
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-10">
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300">
                Jadwalkan Konsultasi Anak
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
