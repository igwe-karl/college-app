import Link from "next/link";
import { GraduationCap } from "lucide-react";
import { ReactNode } from "react";

type AuthPageShellProps = {
  title: string;
  subtitle: string;
  accent: "login" | "register";
  children: ReactNode;
  footer?: ReactNode;
};

const accents = {
  login: {
    gradient: "from-violet-600 via-purple-600 to-indigo-700",
    blob: "bg-violet-400/30",
    ring: "ring-violet-200 dark:ring-violet-900",
  },
  register: {
    gradient: "from-orange-500 via-pink-500 to-violet-600",
    blob: "bg-orange-400/30",
    ring: "ring-orange-200 dark:ring-orange-900",
  },
};

export function AuthPageShell({
  title,
  subtitle,
  accent,
  children,
  footer,
}: AuthPageShellProps) {
  const theme = accents[accent];

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-orange-50/80 to-sky-50 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950">
      <div className="mx-auto grid min-h-screen max-w-6xl lg:grid-cols-2">
        <div
          className={`relative hidden flex-col justify-between overflow-hidden bg-gradient-to-br ${theme.gradient} p-10 text-white lg:flex`}
        >
          <Link href="/" className="flex items-center gap-2 w-fit">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur">
              <GraduationCap className="h-5 w-5" />
            </span>
            <span className="text-lg font-bold">Campus Hub</span>
          </Link>
          <div className="relative z-10 space-y-4">
            <h1 className="text-4xl font-extrabold leading-tight">{title}</h1>
            <p className="max-w-sm text-lg text-white/90">{subtitle}</p>
          </div>
          <p className="relative z-10 text-sm text-white/70">
            College Road Trip Africa · Campus community
          </p>
          <div className={`absolute -right-20 -top-20 h-64 w-64 rounded-full ${theme.blob} blur-3xl`} />
          <div className="absolute -bottom-16 left-10 h-48 w-48 rounded-full bg-white/10 blur-2xl" />
        </div>

        <div className="flex flex-col justify-center px-6 py-12 sm:px-10">
          <div className="mb-8 flex items-center gap-2 lg:hidden">
            <Link href="/" className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-violet-600 text-white">
                <GraduationCap className="h-4 w-4" />
              </span>
              <span className="font-bold bg-gradient-to-r from-orange-600 to-violet-600 bg-clip-text text-transparent">
                Campus Hub
              </span>
            </Link>
          </div>

          <div
            className={`mx-auto w-full max-w-md rounded-2xl border border-white/60 bg-white/90 p-6 shadow-xl backdrop-blur dark:border-white/10 dark:bg-slate-900/90 sm:p-8 ring-1 ${theme.ring}`}
          >
            <div className="mb-6 lg:hidden">
              <h2 className="text-2xl font-bold">{title}</h2>
              <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
            </div>
            {children}
          </div>
          {footer && (
            <div className="mx-auto mt-6 max-w-md text-center text-sm text-muted-foreground">
              {footer}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
