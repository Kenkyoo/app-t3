import { HydrateClient } from "~/trpc/server";
import Hero from "~/components/hero";

export default function Home() {
  return (
    <HydrateClient>
      <Hero />
    </HydrateClient>
  );
}
