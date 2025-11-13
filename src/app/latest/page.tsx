import { LatestPost } from "~/app/_components/post";
import { getSession } from "~/server/better-auth/server";
import { api, HydrateClient } from "~/trpc/server";

export default async function Latest() {
  const session = await getSession();

  if (session) {
    void api.post.getLatest.prefetch();
  }

  return (
    <HydrateClient>
      <div className="flex flex-col items-center justify-center gap-8 mt-10 py-10">
        <div>
        <h1 className="scroll-m-20 text-center text-4xl mb-10 font-extrabold tracking-tight text-balance">
          {session && <span>Logged in as {session.user?.name}</span>}
        </h1>
      </div>
      <div>
      {session?.user && <LatestPost />}
    </div>
    </div>
    </HydrateClient>
  );
}
