"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { GraduationCap, LogIn, LogOut, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { appNavItems, isNavItemActive } from "@/lib/navigation";
import { useAuth } from "@/app/context/authContext";
import { Button } from "@/app/components/button";

export function SidebarNav() {
  const pathname = usePathname();

  const { currentUser, signOut } = useAuth();
  const router = useRouter();
  
  return (
    <aside className="hidden md:flex fixed left-0 top-0 z-40 h-screen w-64 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground shadow-sm">
      <Link
        href="/"
        className="flex items-center gap-3 border-b border-sidebar-border px-5 py-6 transition-opacity hover:opacity-90"
      >
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-violet-600 text-white">
          <GraduationCap className="h-5 w-5" />
        </div>
        <div>
          <p className="text-lg font-bold leading-tight text-sidebar-primary">
            Campus Hub
          </p>
          <p className="text-xs text-muted-foreground">College Road Trip</p>
        </div>
      </Link>

      <nav className="flex-1 flex flex-col gap-1 p-3">
        {appNavItems.map((item) => {
          const active = isNavItemActive(pathname, item);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold transition-colors",
                active
                  ? "border-r-4 border-sidebar-primary bg-muted text-sidebar-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-sidebar-primary"
              )}
            >
              <Icon className="h-5 w-5 shrink-0" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="flex flex-col gap-1 p-3">
        {currentUser ? (
          <div className="flex flex-col gap-1">
            <Link href="/profile" className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold transition-colors hover:bg-muted hover:text-sidebar-primary">
              <User className="h-5 w-5 shrink-0" />
              {currentUser.email}
            </Link>
            <Button variant="outline" onClick={() => {
              signOut();
              router.push("/");
            }}>
              <LogOut className="h-5 w-5 shrink-0" />
              Logout
            </Button>
          </div>
        ) : (
          <Link href="/login" className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold transition-colors hover:bg-muted hover:text-sidebar-primary">
            <LogIn className="h-5 w-5 shrink-0" />
            Login / Register
          </Link>
        )}
      </div>
    </aside>
  );
}
