"use client";

import { usePathname } from "next/navigation";
import { AppShell } from "@/components/navigation/app-shell";
import { usesAuthenticatedShell } from "@/lib/navigation";
import { useAuth } from "@/app/context/authContext";
import Header from "./header";
import Footer from "./footer";

export function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { userLoggedIn, loading } = useAuth();

  const showAppShell =
    !loading && userLoggedIn && usesAuthenticatedShell(pathname);

  if (showAppShell) {
    return <AppShell>{children}</AppShell>;
  }

  return (
    <>
      {!userLoggedIn && pathname !== "/" && <Header />}
      <main className="min-h-screen w-full">{children}</main>
      {!userLoggedIn && pathname !== "/" && <Footer />}
    </>
  );
}
