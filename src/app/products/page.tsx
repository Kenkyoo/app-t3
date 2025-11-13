// app/page.tsx
import prisma from "~/lib/prisma"; // Ajusta la ruta según tu configuración
import ProductCard from "../_components/product";

export default async function Home() {
  const products = await prisma.product.findMany();

  return (
    <div className="flex flex-col min-h-svh w-full items-center justify-center gap-8 p-6 md:p-10">
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 mb-5">
        Our Products
      </h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
