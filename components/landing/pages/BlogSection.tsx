import React from "react";
import { Calendar, Clock } from "lucide-react";
export const BlogSection = () => {
  const articles = [
    {
      title: "Mengenal Diri Lewat Fungsi Otak",
      excerpt:
        "Bagaimana neuroscience dapat membantu kita memahami cara kerja otak dan pengaruhnya terhadap kepribadian.",
      image:
        "https://images.unsplash.com/photo-1454789548928-9efd52dc4031?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      date: "5 Sep 2023",
      readTime: "8 menit",
    },
    {
      title: "Jungian Typology untuk Musisi dan Seniman",
      excerpt:
        "Bagaimana pemahaman fungsi kognitif dapat membantu mengembangkan kreativitas dan ekspresi artistik.",
      image:
        "https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      date: "28 Agu 2023",
      readTime: "6 menit",
    },
    {
      title: "Bagaimana Arketipe Membentuk Tujuan Hidup",
      excerpt:
        "Menelusuri pengaruh arketipe dalam pembentukan nilai, motivasi, dan tujuan hidup seseorang.",
      image:
        "https://images.unsplash.com/photo-1454789548928-9efd52dc4031?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      date: "15 Agu 2023",
      readTime: "10 menit",
    },
  ];
  return (
    <section id="blog" className="py-16 bg-gray-50 w-full">
      <div className="container mx-auto px-6 md:px-12">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 text-gray-800">
          Blog / Artikel / Insight
        </h2>
        <p className="text-xl text-center text-gray-600 mb-12 max-w-3xl mx-auto">
          Temukan wawasan terbaru tentang neuroscience, kepribadian, dan
          pengembangan diri.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <div
              key={index}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center text-gray-500 text-sm mb-3">
                  <div className="flex items-center mr-4">
                    <Calendar size={14} className="mr-1" />
                    <span>{article.date}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock size={14} className="mr-1" />
                    <span>{article.readTime}</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  {article.title}
                </h3>
                <p className="text-gray-600 mb-4">{article.excerpt}</p>
                <a
                  href="#"
                  className="text-indigo-600 font-semibold hover:text-indigo-800 transition duration-300"
                >
                  Baca selengkapnya →
                </a>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <button className="bg-white hover:bg-gray-100 text-indigo-600 font-semibold py-3 px-6 rounded-lg border border-indigo-600 transition duration-300">
            Lihat Semua Artikel
          </button>
        </div>
      </div>
    </section>
  );
};
