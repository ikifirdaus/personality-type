import React from "react";

export const LandingSkeleton = () => {
  return (
    <div className="animate-pulse font-sans bg-gray-50">
      {/* Navbar */}
      <div className="h-16 w-full bg-white shadow px-6 flex items-center justify-between">
        <div className="h-6 w-24 bg-gray-300 rounded"></div>
        <div className="flex space-x-4">
          <div className="h-4 w-12 bg-gray-300 rounded"></div>
          <div className="h-4 w-12 bg-gray-300 rounded"></div>
          <div className="h-4 w-12 bg-gray-300 rounded"></div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="h-[60vh] bg-gray-200 flex items-center justify-center">
        <div className="w-3/4 h-40 bg-gray-300 rounded"></div>
      </div>

      {/* Text & Image Sections */}
      <div className="py-12 px-6 space-y-12">
        {[1, 2, 3].map((_, i) => (
          <div
            key={i}
            className={`flex flex-col md:flex-row items-center gap-6 ${
              i % 2 === 1 ? "md:flex-row-reverse" : ""
            }`}
          >
            <div className="w-full md:w-1/2 h-40 bg-gray-300 rounded"></div>
            <div className="w-full md:w-1/2 space-y-3">
              <div className="h-6 w-3/4 bg-gray-300 rounded"></div>
              <div className="h-4 w-full bg-gray-200 rounded"></div>
              <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Cards Section */}
      <div className="py-12 px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-white p-4 rounded-lg shadow space-y-4">
            <div className="h-32 bg-gray-200 rounded"></div>
            <div className="h-4 w-2/3 bg-gray-300 rounded"></div>
            <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="bg-white py-8 mt-12 px-6 border-t">
        <div className="h-4 w-1/4 bg-gray-300 rounded mb-2"></div>
        <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
      </div>
    </div>
  );
};
