// components/ProductCard.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { ArrowRight } from "lucide-react";

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
    <Card className="max-w-xs gap-0 p-2 shadow-none">
      <CardHeader className="flex flex-row items-center gap-3 px-5 py-4 my-5 font-semibold">
        {product.name}
      </CardHeader>

      <CardContent className="text-muted-foreground mt-1 px-5 text-[15px]">
        <div className="rounded-full py-2">
          {product.image && (
            <Image
              width={300}
              height={300}
              src={product.image}
              alt={product.name}
              className="mb-4 h-48 w-full rounded-md object-cover"
            />
          )}
        </div>
        <p className="mt-2">{product.description}</p>
      </CardContent>

      <CardFooter className="mt-6 flex gap-4 py-2">
        <span className="text-2xl font-bold">${product.price.toFixed(2)}</span>
        <Button onClick={handleCheckout} disabled={loading} className="/blocks">
          {loading ? "Procesando..." : "Comprar"} <ArrowRight />
        </Button>
      </CardFooter>
    </Card>
  );
}
