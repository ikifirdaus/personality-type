import React from "react";
import { ArrowRight } from "lucide-react";
import Button from "../ui/Button/Button";

export const HeroSection = () => {
  const scrollToSection = () => {
    const section = document.getElementById("what-is-njpt");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="w-full bg-gradient-to-r from-indigo-100 via-purple-50 to-blue-50 py-20">
      <div className="container mx-auto px-6 md:px-12 flex flex-col lg:flex-row items-center">
        <div className="lg:w-1/2 mb-10 lg:mb-0">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Temukan Karakter Otentikmu Melalui Neuroscience & Jungian
            Personality Type
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Sebuah pendekatan holistik untuk pengembangan diri, kreativitas, dan
            potensi melalui pemahaman fungsi kognitif dan arketipe.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              className=""
              url="/personalityTest"
              title="Mulai Tes Sekarang"
              icon={<ArrowRight size={18} className="ml-2" />}
            />
            <button
              onClick={scrollToSection}
              className="bg-white hover:bg-gray-100 text-indigo-600 font-semibold py-3 px-6 rounded-lg border border-indigo-600 transition duration-300"
            >
              Pelajari Lebih Lanjut
            </button>
          </div>
        </div>
        <div className="lg:w-1/2 flex justify-center">
          <img
            src="https://images.unsplash.com/photo-1559757175-5700dde675bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
            alt="Ilustrasi otak dan kepribadian"
            className="w-full max-w-md rounded-lg shadow-xl"
          />
        </div>
      </div>
    </section>
  );
};
