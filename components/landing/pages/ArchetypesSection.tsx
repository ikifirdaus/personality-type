import Image from "next/image";

// import React, { memo } from "react";
export const ArchetypesSection = () => {
  return (
    <section className="py-16 bg-white w-full">
      <div className="container mx-auto px-6 md:px-12">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
          Arketipe & Fungsi Kognitif
        </h2>
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Archetypes Section */}
          <div className="lg:w-1/2">
            <h3 className="text-2xl font-bold text-indigo-700 mb-6">
              Apa itu Arketipe?
            </h3>
            <p className="text-gray-700 mb-6">
              Arketipe adalah pola dasar kepribadian yang muncul dalam psikologi
              Jungian, mewakili aspek-aspek fundamental dari psikis manusia yang
              memengaruhi perilaku, motivasi, dan cara kita melihat dunia.
            </p>
            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="bg-indigo-50 p-4 rounded-lg">
                <h4 className="font-bold text-indigo-700 mb-2">The Hero</h4>
                <p className="text-gray-700">
                  Mencari tantangan dan pertumbuhan, mengatasi rintangan
                </p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="font-bold text-purple-700 mb-2">
                  The Caregiver
                </h4>
                <p className="text-gray-700">
                  Melindungi dan merawat orang lain dengan penuh kasih sayang
                </p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-bold text-blue-700 mb-2">The Explorer</h4>
                <p className="text-gray-700">
                  Mencari kebebasan dan penemuan diri melalui pengalaman baru
                </p>
              </div>
              <div className="bg-teal-50 p-4 rounded-lg">
                <h4 className="font-bold text-teal-700 mb-2">The Sage</h4>
                <p className="text-gray-700">
                  Mencari kebijaksanaan dan kebenaran melalui pengetahuan
                </p>
              </div>
            </div>
          </div>
          {/* Cognitive Functions Section */}
          <div className="lg:w-1/2">
            <h3 className="text-2xl font-bold text-indigo-700 mb-6">
              Fungsi Kognitif
            </h3>
            <p className="text-gray-700 mb-6">
              Fungsi kognitif dalam teori Jung menjelaskan bagaimana kita
              memproses informasi, membuat keputusan, dan berinteraksi dengan
              dunia. Setiap orang memiliki preferensi terhadap fungsi-fungsi
              tertentu yang membentuk kepribadian mereka.
            </p>
            <div className="bg-gray-50 p-6 rounded-xl shadow-md">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-3 border-l-4 border-indigo-500">
                  <h4 className="font-bold text-gray-800">
                    Introverted Thinking (Ti)
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Analisis internal, logika pribadi
                  </p>
                </div>
                <div className="p-3 border-l-4 border-indigo-400">
                  <h4 className="font-bold text-gray-800">
                    Extroverted Thinking (Te)
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Organisasi eksternal, efisiensi
                  </p>
                </div>
                <div className="p-3 border-l-4 border-purple-500">
                  <h4 className="font-bold text-gray-800">
                    Introverted Feeling (Fi)
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Nilai-nilai personal, autentisitas
                  </p>
                </div>
                <div className="p-3 border-l-4 border-purple-400">
                  <h4 className="font-bold text-gray-800">
                    Extroverted Feeling (Fe)
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Harmoni sosial, empati
                  </p>
                </div>
                <div className="p-3 border-l-4 border-blue-500">
                  <h4 className="font-bold text-gray-800">
                    Introverted Sensing (Si)
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Detail internal, memori
                  </p>
                </div>
                <div className="p-3 border-l-4 border-blue-400">
                  <h4 className="font-bold text-gray-800">
                    Extroverted Sensing (Se)
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Pengalaman langsung, kehadiran
                  </p>
                </div>
                <div className="p-3 border-l-4 border-teal-500">
                  <h4 className="font-bold text-gray-800">
                    Introverted Intuition (Ni)
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Wawasan mendalam, visi
                  </p>
                </div>
                <div className="p-3 border-l-4 border-teal-400">
                  <h4 className="font-bold text-gray-800">
                    Extroverted Intuition (Ne)
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Ide-ide baru, kemungkinan
                  </p>
                </div>
              </div>
              <div className="mt-6">
                <Image
                  src="/archetype-section.avif"
                  alt="Diagram fungsi kognitif Jung"
                  className="w-full rounded-lg"
                  width={0}
                  height={0}
                  sizes="1000vw"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
