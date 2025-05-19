import Image from "next/image";
import React from "react";
export const TeamSection = () => {
  const teamMembers = [
    {
      name: "Dr. Rina Wijaya",
      role: "Psikolog & Founder",
      background: "Latar belakang psikologi klinis dan seni",
      image: "/team-1.avif",
    },
    {
      name: "Budi Santoso",
      role: "Neuroscience Researcher",
      background: "Teknologi & ilmu saraf",
      image: "/team-2.avif",
    },
    {
      name: "Maya Putri",
      role: "Art Therapist",
      background: "Seni rupa & musik",
      image: "/team-3.avif",
    },
    {
      name: "Arif Rahman",
      role: "Career Coach",
      background: "Hukum & pengembangan SDM",
      image: "/team-4.avif",
    },
  ];
  return (
    <section id="about" className="py-16 bg-gray-50 w-full scroll-mt-20">
      <div className="container mx-auto px-6 md:px-12">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 text-gray-800">
          Siapa Kami?
        </h2>
        <p className="text-xl text-center text-gray-600 mb-12 max-w-3xl mx-auto">
          Tim multidisiplin kami menggabungkan keahlian dari berbagai bidang
          untuk membantu Anda dalam perjalanan pengembangan diri.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="h-64 overflow-hidden">
                <Image
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                  width={0}
                  height={0}
                  sizes="1000vw"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-1">
                  {member.name}
                </h3>
                <p className="text-indigo-600 font-semibold mb-3">
                  {member.role}
                </p>
                <p className="text-gray-600">{member.background}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-16 bg-white p-8 rounded-xl shadow-md">
          <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">
            Misi Kami
          </h3>
          <p className="text-lg text-gray-700 text-center max-w-3xl mx-auto">
            Kami berkomitmen untuk membantu setiap individu menemukan dan
            mengembangkan karakter otentik mereka melalui pendekatan ilmiah yang
            menggabungkan teori psikologi klasik dengan neuroscience modern.
            Tujuan kami adalah menciptakan masyarakat yang lebih sadar diri,
            kreatif, dan produktif.
          </p>
        </div>
      </div>
    </section>
  );
};
