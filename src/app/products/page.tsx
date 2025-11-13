// app/page.tsx
import prisma from "~/lib/prisma"; // Ajusta la ruta según tu configuración
import ProductCard from "../_components/product";

export default async function Home() {
  const products = await prisma.product.findMany();

  return (
    <main className="container mx-auto px-4 py-8">
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        The People of the Kingdom
      </h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}
