import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

const productsData = [
  {
    name: "Calvin Klein CK One",
    description:
      "CK One by Calvin Klein is a classic unisex fragrance, known for its fresh and clean scent. It's a versatile fragrance suitable for everyday wear.",
    image:
      "https://cdn.dummyjson.com/product-images/fragrances/calvin-klein-ck-one/1.webp",
    price: 49.99,
    stripeProductId: "prod_TPE2FEs3X8Vweu", // 👈 copiado del dashboard de Stripe
    stripePriceId: "price_1SSPaA3O375UcYQs0v3q955v", // 👈 copiado del dashboard de Stripe
  },
  {
    name: "Essence Mascara Lash Princess",
    description:
      "The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.",
    image:
      "https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/1.webp",
    price: 9.99,
    stripeProductId: "prod_TPNqAcrDIhcicz", // 👈 copiado del dashboard de Stripe
    stripePriceId: "price_1SSZ4t3O375UcYQslwaBXCCd", // 👈 copiado del dashboard de Stripe
  },
  {
    name: "Chanel Coco Noir Eau De",
    description:
      "Coco Noir by Chanel is an elegant and mysterious fragrance, featuring notes of grapefruit, rose, and sandalwood. Perfect for evening occasions.",
    image:
      "https://cdn.dummyjson.com/product-images/fragrances/chanel-coco-noir-eau-de/1.webp",
    price: 129.99,
    stripeProductId: "prod_TPNsMVqctBcHuZ", // 👈 copiado del dashboard de Stripe
    stripePriceId: "price_1SSZ6m3O375UcYQsx7v2Qpvm", // 👈 copiado del dashboard de Stripe
  },
];

export async function main() {
  console.log("🌱 Iniciando seed de productos...");
  for (const p of productsData) {
    await prisma.product.upsert({
      where: { stripeProductId: p.stripeProductId },
      update: {},
      create: p,
    });
  }
  console.log("✅ Productos creados correctamente");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
