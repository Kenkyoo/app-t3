import { Button } from "~/components/ui/button";
import { Logo } from "~/components/logo";
import { NavMenu } from "~/components/nav-menu";
import { NavigationSheet } from "~/components/navigation-sheet";
import { auth } from "~/server/better-auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getSession } from "~/server/better-auth/server";
import Link from "next/link";
import { ModeToggle } from "./mode-toggle";

async function Navbar() {
  const session = await getSession();
  return (
    <nav className="bg-background h-16 border-b">
      <div className="mx-auto flex h-full max-w-(--breakpoint-xl) items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-12">
          <Logo />

          {/* Desktop Menu */}
          <NavMenu className="hidden md:block" />
        </div>

        <div className="flex items-center gap-3">
          {!session ? (
            <Button variant="outline" className="hidden sm:inline-flex">
              <Link href="/login">Login</Link>
            </Button>
          ) : (
            <form>
              <Button
                formAction={async () => {
                  "use server";
                  await auth.api.signOut({
                    headers: await headers(),
                  });
                  redirect("/");
                }}
              >
                Sign out
              </Button>
            </form>
          )}
          <ModeToggle />

          {/* Mobile Menu */}
          <div className="md:hidden">
            <NavigationSheet />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
