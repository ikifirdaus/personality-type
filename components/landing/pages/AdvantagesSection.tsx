import React from "react";
import { Brain, Palette, Users, Sparkles } from "lucide-react";
export const AdvantagesSection = () => {
  return (
    <section className="py-16 bg-gray-50 w-full">
      <div className="container mx-auto px-6 md:px-12">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-800">
          Keunggulan NJPT
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Advantage 1 */}
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="bg-indigo-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-6">
              <Brain size={32} className="text-indigo-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">
              Pendekatan Ilmiah & Psikologis
            </h3>
            <p className="text-gray-600">
              Menggabungkan teori psikologi Jung dengan temuan neuroscience
              terkini untuk pemahaman kepribadian yang lebih mendalam.
            </p>
          </div>
          {/* Advantage 2 */}
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="bg-purple-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-6">
              <Palette size={32} className="text-purple-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">
              Cocok untuk Individu Kreatif dan Logis
            </h3>
            <p className="text-gray-600">
              Pendekatan yang seimbang untuk memahami baik sisi kreatif maupun
              logis dari kepribadian Anda.
            </p>
          </div>
          {/* Advantage 3 */}
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="bg-blue-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-6">
              <Sparkles size={32} className="text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">
              Fokus pada Fungsi Kognitif dan Arketipe
            </h3>
            <p className="text-gray-600">
              Mengidentifikasi pola pikir dan perilaku mendalam yang membentuk
              kepribadian unik Anda.
            </p>
          </div>
          {/* Advantage 4 */}
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="bg-teal-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-6">
              <Users size={32} className="text-teal-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">
              Konsultasi Lanjutan untuk Dewasa & Anak
            </h3>
            <p className="text-gray-600">
              Program konsultasi khusus untuk memaksimalkan potensi diri bagi
              segala usia dan tahap kehidupan.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
