import Image from "next/image";
import React from "react";
export const AboutSection = () => {
  return (
    <section id="what-is-njpt" className="py-16 bg-white w-full scroll-mt-20">
      <div className="container mx-auto px-6 md:px-12">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
          Apa Itu Neuroscience Jungian Personality Type (NJPT)?
        </h2>
        <div className="flex flex-col lg:flex-row items-center gap-8">
          <div className="lg:w-1/2">
            <p className="text-lg text-gray-700 mb-6">
              NJPT adalah pendekatan inovatif yang menggabungkan teori
              kepribadian Carl Jung dengan temuan neuroscience modern.
              Pendekatan ini tidak hanya mengkategorikan kepribadian, tetapi
              juga memahami bagaimana otak memengaruhi pola pikir, perasaan, dan
              perilaku kita.
            </p>
            <p className="text-lg text-gray-700 mb-6">
              Berbeda dengan tes kepribadian konvensional, NJPT berfokus pada
              pengembangan diri berbasis karakter otentik Anda. Kami tidak
              sekadar memberikan label tipe kepribadian, tetapi membantu Anda
              memahami pola kerja otak dan bagaimana hal ini memengaruhi
              kepribadian unik Anda.
            </p>
            <p className="text-lg text-gray-700">
              Dengan memahami fungsi kognitif dan arketipe Jungian, Anda dapat
              mengembangkan potensi diri secara maksimal dan menjalani kehidupan
              yang lebih selaras dengan karakter otentik Anda.
            </p>
          </div>
          <div className="lg:w-1/2 mt-8 lg:mt-0">
            <div className="bg-gray-50 p-6 rounded-xl shadow-lg">
              <Image
                src="/about-section.avif"
                alt="Diagram fungsi kognitif dan otak"
                className="w-full rounded-lg mb-6"
                width={0}
                height={0}
                sizes="1000vw"
              />
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-indigo-50 p-4 rounded-lg">
                  <h3 className="font-bold text-indigo-700 mb-2">
                    Fungsi Kognitif
                  </h3>
                  <p className="text-gray-700">
                    Mengidentifikasi cara Anda memproses informasi dan membuat
                    keputusan
                  </p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h3 className="font-bold text-purple-700 mb-2">Arketipe</h3>
                  <p className="text-gray-700">
                    Pola dasar kepribadian yang memengaruhi motivasi dan
                    perilaku Anda
                  </p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-bold text-blue-700 mb-2">Neuroscience</h3>
                  <p className="text-gray-700">
                    Pemahaman ilmiah tentang bagaimana otak memengaruhi
                    kepribadian
                  </p>
                </div>
                <div className="bg-teal-50 p-4 rounded-lg">
                  <h3 className="font-bold text-teal-700 mb-2">
                    Pengembangan Diri
                  </h3>
                  <p className="text-gray-700">
                    Strategi personal berdasarkan tipe kognitif Anda
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
