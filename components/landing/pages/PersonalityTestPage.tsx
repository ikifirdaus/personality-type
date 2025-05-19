"use client";

import FooterDetail from "../layouts/FooterDetail";
import Breadcrumb from "../ui/Breadcrumb/Breadcrumb";

const PersonalityTestPage = () => {
  return (
    <>
      <div className="font-[family-name:var(--font-geist-sans)]">
        <Breadcrumb
          title="Tes Kepribadian"
          items={[
            { text: "Personality Test" }, // tidak ada link, jadi teks aktif
          ]}
        />
        <div className="py-16 bg-white  px-6 md:px-12">
          <h1 className="text-3xl font-semibold mb-8 flex h-[70vh] justify-center items-center">
            Personality Test Page
          </h1>

          <FooterDetail />
        </div>
      </div>
    </>
  );
};

export default PersonalityTestPage;
