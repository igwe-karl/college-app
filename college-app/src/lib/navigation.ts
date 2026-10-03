import {
  Building2,
  Clapperboard,
  Newspaper,
  User,
  type LucideIcon,
} from "lucide-react";

export type AppNavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
  /** Match exact path only (e.g. campus home) */
  exact?: boolean;
};

export const appNavItems: AppNavItem[] = [
  { label: "Campus", href: "/campus", icon: Building2, exact: true },
  { label: "News", href: "/news", icon: Newspaper },
  { label: "Profile", href: "/profile", icon: User, exact: true },
  { label: "Media", href: "/entertainment", icon: Clapperboard },
];

export function isNavItemActive(pathname: string, item: AppNavItem): boolean {
  if (item.exact) {
    return pathname === item.href;
  }
  return pathname === item.href || pathname.startsWith(`${item.href}/`);
}

/** Routes that use the full app shell (sidebar + top bar). */
export const appShellRoutes = [
  "/",
  "/campus",
  "/news",
  "/profile",
  "/entertainment",
  "/contact",
  "/company",
];

export function usesAppShell(pathname: string): boolean {
  if (pathname.startsWith("/login") || pathname.startsWith("/register")) {
    return false;
  }
  return appShellRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );
}
