import React from "react";
export const TeamSection = () => {
  const teamMembers = [
    {
      name: "Dr. Rina Wijaya",
      role: "Psikolog & Founder",
      background: "Latar belakang psikologi klinis dan seni",
      image:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
    },
    {
      name: "Budi Santoso",
      role: "Neuroscience Researcher",
      background: "Teknologi & ilmu saraf",
      image:
        "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
    },
    {
      name: "Maya Putri",
      role: "Art Therapist",
      background: "Seni rupa & musik",
      image:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
    },
    {
      name: "Arif Rahman",
      role: "Career Coach",
      background: "Hukum & pengembangan SDM",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
    },
  ];
  return (
    <section id="about" className="py-16 bg-gray-50 w-full">
      <div className="container mx-auto px-6">
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
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
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
