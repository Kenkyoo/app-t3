// components/ProductCard.tsx
"use client";

import { useState } from "react";
import Image from "next/image";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    description: string | null;
    price: number;
    image: string | null;
    stripePriceId: string;
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);

    try {
      const response = await fetch("/api/checkout_sessions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          priceId: product.stripePriceId,
          quantity: 1,
        }),
      });

      const data = (await response.json()) as { url?: string; error?: string };

      if (typeof data.url === "string" && data.url) {
        // Redirigir a Stripe Checkout
        window.location.href = data.url;
      } else {
        console.error("Error:", data.error);
        alert("Hubo un error al procesar tu compra");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Hubo un error al procesar tu compra");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-lg border p-4 shadow-md">
      {product.image && (
        <Image
          width={300}
          height={300}
          src={product.image}
          alt={product.name}
          className="mb-4 h-48 w-full rounded-md object-cover"
        />
      )}
      <h3 className="mb-2 text-xl font-semibold">{product.name}</h3>
      <p className="mb-4 text-gray-600">{product.description}</p>
      <div className="flex items-center justify-between">
        <span className="text-2xl font-bold">${product.price.toFixed(2)}</span>
        <button
          onClick={handleCheckout}
          disabled={loading}
          className="rounded-md bg-blue-600 px-6 py-2 text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400"
        >
          {loading ? "Procesando..." : "Comprar"}
        </button>
      </div>
    </div>
  );
}
