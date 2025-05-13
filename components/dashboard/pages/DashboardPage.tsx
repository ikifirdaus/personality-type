"use client";

import CardMain from "@/components/dashboard/layouts/CardMain";
import Layout from "@/components/dashboard/layouts/Layout";

const DashboardPage = () => {
  return (
    <Layout>
      <CardMain>
        <div className="flex justify-center items-center h-[75vh]">
          List Dashboard Page
        </div>
      </CardMain>
    </Layout>
  );
};

export default DashboardPage;
