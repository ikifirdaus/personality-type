import Link from "next/link";
import React from "react";
export const ConsultationSection = () => {
  const testimonials = [
    {
      name: "Dian Kusuma",
      role: "Creative Director",
      quote:
        "NJPT membantu saya memahami pola kerja otak dan kepribadian saya. Sekarang saya bisa lebih efektif dalam tim dan mengembangkan kreativitas sesuai tipe kognitif saya.",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
    },
    {
      name: "Reza Pratama",
      role: "Software Engineer",
      quote:
        "Konsultasi dengan tim NJPT membuka wawasan baru tentang bagaimana cara berpikir saya memengaruhi pendekatan problem-solving. Sangat membantu dalam karier teknologi.",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
    },
  ];
  return (
    <section
      id="consultation"
      className="py-16 bg-gradient-to-b from-gray-50 to-white w-full scroll-mt-20"
    >
      <div className="container mx-auto px-6 md:px-12">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 text-gray-800">
          Konsultasi & Pengembangan Diri
        </h2>
        <p className="text-xl text-center text-gray-600 mb-12 max-w-3xl mx-auto">
          Jadwalkan konsultasi dengan ahli kami untuk pengembangan diri yang
          lebih mendalam dan personal.
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <div className="bg-white p-8 rounded-xl shadow-md">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              Layanan Konsultasi
            </h3>
            <div className="space-y-6">
              <div className="border-l-4 border-indigo-500 pl-4">
                <h4 className="text-xl font-semibold text-gray-800 mb-2">
                  Personal Growth
                </h4>
                <p className="text-gray-600">
                  Konsultasi untuk memaksimalkan potensi diri dan mengatasi
                  hambatan berdasarkan tipe kepribadian Anda.
                </p>
              </div>
              <div className="border-l-4 border-purple-500 pl-4">
                <h4 className="text-xl font-semibold text-gray-800 mb-2">
                  Karier & Profesional
                </h4>
                <p className="text-gray-600">
                  Panduan untuk menyelaraskan karier dengan tipe kognitif Anda
                  untuk produktivitas dan kepuasan kerja optimal.
                </p>
              </div>
              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="text-xl font-semibold text-gray-800 mb-2">
                  Relasi & Komunikasi
                </h4>
                <p className="text-gray-600">
                  Strategi untuk meningkatkan hubungan interpersonal dengan
                  memahami perbedaan tipe kepribadian.
                </p>
              </div>
              <div className="border-l-4 border-teal-500 pl-4">
                <h4 className="text-xl font-semibold text-gray-800 mb-2">
                  Pendidikan & Pembelajaran
                </h4>
                <p className="text-gray-600">
                  Pendekatan belajar yang disesuaikan dengan tipe kognitif untuk
                  hasil yang lebih efektif.
                </p>
              </div>
            </div>
            <div className="mt-8">
              <Link
                href="/produk"
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300"
              >
                Jadwalkan Konsultasi
              </Link>
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Testimoni</h3>
            <div className="space-y-6">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-md">
                  <div className="flex items-center mb-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover mr-4"
                    />
                    <div>
                      <h4 className="font-bold text-gray-800">
                        {testimonial.name}
                      </h4>
                      <p className="text-gray-500 text-sm">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-700 italic">"{testimonial.quote}"</p>
                </div>
              ))}
            </div>
            <div className="bg-indigo-50 p-6 rounded-xl mt-6">
              <h4 className="font-bold text-indigo-800 mb-2">
                Proses Konsultasi
              </h4>
              <ol className="list-decimal list-inside space-y-2 text-gray-700">
                <li>Tes NJPT komprehensif</li>
                <li>Analisis hasil oleh ahli kami</li>
                <li>Sesi konsultasi mendalam</li>
                <li>Rencana pengembangan personal</li>
                <li>Sesi tindak lanjut</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
