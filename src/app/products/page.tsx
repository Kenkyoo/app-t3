// app/page.tsx
import prisma from "~/lib/prisma"; // Ajusta la ruta según tu configuración
import ProductCard from "../_components/product";
import { getSession } from "~/server/better-auth/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const products = await prisma.product.findMany();
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }
  return (
    <div className="flex min-h-svh w-full flex-col items-center justify-center gap-8 p-6 md:p-10">
      <h2 className="mb-5 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
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
