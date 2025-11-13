import AnimatedGridPattern from "~/components/ui/animated-grid-pattern";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import { ArrowUpRight, CirclePlay } from "lucide-react";
import Link from "next/link";
import { api } from "~/trpc/server";

export default async function Hero() {
  const hello = await api.post.hello({ text: "from tRPC" });
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-6">
      <AnimatedGridPattern
        numSquares={30}
        maxOpacity={0.1}
        duration={3}
        className={cn(
          "mask-[radial-gradient(500px_circle_at_center,white,transparent)]",
          "inset-x-0 h-full skew-y-12",
        )}
      />
      <div className="relative z-10 max-w-3xl text-center">
        <Badge
          variant="secondary"
          className="border-border rounded-full py-1"
          asChild
        >
          <Link href="#">
            Build with stripe <ArrowUpRight className="ml-1 size-4" />
          </Link>
        </Badge>
        <h1 className="mt-6 text-4xl font-semibold tracking-tighter sm:text-5xl md:text-6xl md:leading-[1.2] lg:text-7xl">
          App e-commerce with stripe payments
        </h1>
        <p className="text-foreground/80 mt-6 md:text-lg">
          {hello ? hello.greeting : "Loading tRPC query..."}
        </p>
        <div className="mt-12 flex items-center justify-center gap-4">
          <Link href="/products">
            <Button
              variant="outline"
              size="lg"
              className="rounded-full text-base shadow-none"
            >
              <CirclePlay className="h-5! w-5!" /> Products
            </Button>
          </Link>
          <Link href="/create">
            <Button
              variant="outline"
              size="lg"
              className="rounded-full text-base shadow-none"
            >
              <CirclePlay className="h-5! w-5!" /> Create
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
