import CardMain from "@/components/dashboard/layouts/CardMain";
import Layout from "@/components/dashboard/layouts/Layout";
import TitleBreadcrumb from "@/components/dashboard/layouts/TitleBreadcrumb";
import ProductForm from "@/components/dashboard/ui/Form/ProductForm";

const createPage = () => {
  return (
    <div>
      <Layout>
        <TitleBreadcrumb
          title="Add Product"
          items={[
            { text: "Product", link: "/admin/product" },
            { text: "Create", link: "/admin/product/create" },
          ]}
        />
        <CardMain>
          <div className="">
            <ProductForm />
          </div>
        </CardMain>
      </Layout>
    </div>
  );
};

export default createPage;
