"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";
import { appNavItems, isNavItemActive } from "@/lib/navigation";

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex fixed left-0 top-0 z-40 h-screen w-64 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground shadow-sm">
      <div className="flex items-center gap-3 border-b border-sidebar-border px-5 py-6">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sidebar-primary text-sidebar-primary-foreground">
          <GraduationCap className="h-5 w-5" />
        </div>
        <div>
          <p className="text-lg font-bold leading-tight text-sidebar-primary">
            Campus Hub
          </p>
          <p className="text-xs text-muted-foreground">College Road Trip</p>
        </div>
      </div>

      <nav className="flex flex-1 flex-col gap-1 p-3">
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
    </aside>
  );
}
