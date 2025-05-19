import CardMain from "@/components/dashboard/layouts/CardMain";
import Layout from "@/components/dashboard/layouts/Layout";
import TitleBreadcrumb from "@/components/dashboard/layouts/TitleBreadcrumb";
import ProductForm from "@/components/dashboard/ui/Form/ProductForm";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface Props {
  params: { id: string };
}

export default async function EditProductPage({ params }: Props) {
  const { id } = await Promise.resolve(params);

  const productId = Number(id);

  if (isNaN(productId)) {
    return <div>Invalid product ID</div>;
  }

  const product = await prisma.product.findUnique({
    where: { id: productId },
  });

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <Layout>
      <TitleBreadcrumb
        title="Edit Product"
        items={[
          { text: "Product", link: "/admin/product" },
          { text: "Edit", link: `/admin/product/${productId}` },
        ]}
      />
      <CardMain>
        <ProductForm product={product} />
      </CardMain>
    </Layout>
  );
}
