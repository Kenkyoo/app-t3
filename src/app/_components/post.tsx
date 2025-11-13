"use client";
import { api } from "~/trpc/react";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "~/components/ui/card";
import { ArrowRight, Shapes } from "lucide-react";
import React from "react";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    description: string | null;
    price: number;
    image: string | null;
  };
}

export function LatestPost() {
  const [latestPost] = api.post.getLatest.useSuspenseQuery();
  return (
    <div className="w-full max-w-xs">
      {latestPost ? (
        <div>
          <p className="truncate">Your most recent post:</p>
          <ProductCard product={latestPost} />
        </div>
      ) : (
        <p>You have no posts yet.</p>
      )}
    </div>
  );
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Card className="max-w-xs gap-0 pt-0 shadow-none">
      <CardHeader className="flex flex-row items-center gap-3 px-5 py-4 font-semibold">
        <div className="bg-primary text-primary-foreground flex h-8 w-8 items-center justify-center rounded-full">
          {product.image}
        </div>
        {product.name}
      </CardHeader>
      <CardContent className="text-muted-foreground mt-1 px-5 text-[15px]">
        <p>{product.description}</p>
        <div className="bg-muted mt-5 aspect-video w-full rounded-xl" />
      </CardContent>

      <CardFooter className="mt-6">
        {product.price}
        <Button className="/blocks">
          Add <ArrowRight />
        </Button>
      </CardFooter>
    </Card>
  );
};
