"use client";

import { usePathname } from "next/navigation";
import { AppShell } from "@/components/navigation/app-shell";
import { usesAppShell } from "@/lib/navigation";
import Header from "./header";
import Footer from "./footer";

export function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (usesAppShell(pathname)) {
    return <AppShell>{children}</AppShell>;
  }

  return (
    <>
      <Header />
      <main className="min-h-screen w-full">{children}</main>
      <Footer />
    </>
  );
}
