"use client";

import Image from "next/image";
import Link from "next/link";
import { Bell, Moon, Search, Sun, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useAuth } from "@/app/context/authContext";
import { useTheme } from "./theme-provider";

export function AppTopBar() {
  const { currentUser } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const profileHref = "/profile";
  const avatarSrc =
    currentUser?.user_metadata?.avatar_url ??
    currentUser?.user_metadata?.picture ??
    null;

  return (
    <header
      className={cn(
        "fixed top-0 z-30 flex h-16 w-full items-center gap-4 border-b border-border/60",
        "bg-background/80 backdrop-blur-xl",
        "px-4 md:left-64 md:w-[calc(100%-16rem)] md:px-8"
      )}
    >
      <div className="relative mx-auto w-full max-w-xl flex-1">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search campus, news, media..."
          className="h-10 rounded-full border-none bg-muted pl-10 shadow-none focus-visible:ring-primary/30"
          aria-label="Search"
        />
      </div>

      <div className="flex shrink-0 items-center gap-1 sm:gap-2">
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5" />
        </button>

        <button
          type="button"
          onClick={toggleTheme}
          className="flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
        >
          {theme === "dark" ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
        </button>

        <Link
          href={profileHref}
          className="relative ml-1 flex h-10 w-10 shrink-0 overflow-hidden rounded-full border-2 border-transparent transition-colors hover:border-primary"
          aria-label="Open profile"
        >
          {avatarSrc ? (
            <Image
              src={avatarSrc}
              alt={
                currentUser?.user_metadata?.display_name ??
                currentUser?.email ??
                "Profile"
              }
              fill
              className="object-cover"
              sizes="40px"
            />
          ) : (
            <span className="flex h-full w-full items-center justify-center bg-muted text-muted-foreground">
              <User className="h-5 w-5" />
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}
