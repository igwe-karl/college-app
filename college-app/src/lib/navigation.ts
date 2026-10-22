import {
  Building2,
  CalendarDays,
  Clapperboard,
  MessageCircle,
  Newspaper,
  Shield,
  User,
  type LucideIcon,
} from "lucide-react";

export type AppNavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
  exact?: boolean;
};

export const appNavItems: AppNavItem[] = [
  { label: "Campus", href: "/campus", icon: Building2, exact: true },
  { label: "News", href: "/news", icon: Newspaper },
  { label: "Events", href: "/events", icon: CalendarDays },
  { label: "Messages", href: "/messages", icon: MessageCircle },
  { label: "Media", href: "/entertainment", icon: Clapperboard },
  { label: "Profile", href: "/profile", icon: User, exact: true },
];

export const adminNavItem: AppNavItem = {
  label: "Admin",
  href: "/admin",
  icon: Shield,
};

export function isNavItemActive(pathname: string, item: AppNavItem): boolean {
  if (item.exact) {
    return pathname === item.href;
  }
  return pathname === item.href || pathname.startsWith(`${item.href}/`);
}

/** Routes that may use the authenticated app shell (sidebar + top bar). */
export const authenticatedShellRoutes = [
  "/campus",
  "/news",
  "/events",
  "/messages",
  "/profile",
  "/entertainment",
  "/admin",
  "/contact",
  "/company",
];

export function usesAuthenticatedShell(pathname: string): boolean {
  if (pathname.startsWith("/login") || pathname.startsWith("/register")) {
    return false;
  }
  return authenticatedShellRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );
}
