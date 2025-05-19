import Image from "next/image";
import React from "react";
export const CharactersSection = () => {
  const characters = [
    {
      type: "INFJ",
      character: "Gandalf",
      movie: "The Lord of the Rings",
      traits: "Visioner, bijaksana, idealis",
      image: "/character-1.avif",
    },
    {
      type: "ENFP",
      character: "Rapunzel",
      movie: "Tangled",
      traits: "Antusias, kreatif, penuh semangat",
      image: "/character-2.avif",
    },
    {
      type: "INTJ",
      character: "Doctor Strange",
      movie: "Marvel Universe",
      traits: "Strategis, visioner, independen",
      image: "/character-3.avif",
    },
    {
      type: "ESTP",
      character: "Iron Man",
      movie: "Marvel Universe",
      traits: "Spontan, energik, improvisator",
      image: "/character-4.avif",
    },
  ];
  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white w-full">
      <div className="container mx-auto px-6 md:px-12">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-800">
          Tokoh & Karakter Film
        </h2>
        <p className="text-xl text-center text-gray-600 mb-12">
          Siapa kamu jika berada di dunia film?
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {characters.map((char, index) => (
            <div
              key={index}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="h-48 overflow-hidden">
                <Image
                  src={char.image}
                  alt={char.character}
                  className="w-full h-full object-cover"
                  width={0}
                  height={0}
                  sizes="1000vw"
                />
              </div>
              <div className="p-6">
                <div className="inline-block px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full font-semibold text-sm mb-3">
                  {char.type}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-1">
                  {char.character}
                </h3>
                <p className="text-gray-500 text-sm mb-3">{char.movie}</p>
                <p className="text-gray-700">{char.traits}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300">
            Temukan Karakter Film Anda
          </button>
        </div>
      </div>
    </section>
  );
};
