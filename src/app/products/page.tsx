// app/page.tsx
import prisma from "~/lib/prisma"; // Ajusta la ruta según tu configuración
import ProductCard from "../_components/product";

export default async function Home() {
  const products = await prisma.product.findMany();

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">Productos</h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}
