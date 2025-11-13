import { LoginForm } from "~/components/login-form";
import { getSession } from "~/server/better-auth/server";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getSession();
  if (session) {
    redirect("/products");
  }
  return (
    <div className="flex min-h-svh w-full flex-col items-center justify-center gap-5 p-6 md:p-10">
      <h2 className="mb-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Login with your github account
      </h2>
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
}
