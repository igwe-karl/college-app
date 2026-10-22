import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { GraduationCap, Sparkles, Users, Calendar } from "lucide-react";
import { LandingAuthActions } from "./components/landing-auth-actions";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-orange-50 to-sky-50 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-violet-600 text-white">
            <GraduationCap className="h-5 w-5" />
          </span>
          <span className="text-xl font-bold bg-gradient-to-r from-orange-600 to-violet-600 bg-clip-text text-transparent">
            Campus Hub
          </span>
        </Link>
        <LandingAuthActions />
      </header>

      <main className="mx-auto max-w-6xl px-6 pb-20 pt-8 md:pt-16">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="space-y-6">
            <p className="inline-flex items-center gap-2 rounded-full bg-orange-100 px-3 py-1 text-sm font-medium text-orange-800 dark:bg-orange-950 dark:text-orange-200">
              <Sparkles className="h-4 w-4" />
              College Road Trip Africa
            </p>
            <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl lg:text-6xl">
              The{" "}
              <span className="bg-gradient-to-r from-orange-500 via-pink-500 to-violet-600 bg-clip-text text-transparent">
                definitive
              </span>{" "}
              campus experience
            </h1>
            <p className="text-lg text-muted-foreground max-w-lg">
              News, events, media, and your student profile—built for African
              campuses. Sign in to unlock your personalized hub.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button size="lg" asChild className="bg-violet-600 hover:bg-violet-700">
                <Link href="/register">Create free account</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/login">I already have an account</Link>
              </Button>
            </div>
          </div>

          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-2xl ring-4 ring-white/50 dark:ring-white/10">
            <Image
              src="/assets/image/campus_home.jpg"
              alt="Students on campus"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-violet-900/60 to-transparent" />
          </div>
        </div>

        <section className="mt-20 grid gap-6 sm:grid-cols-3">
          {[
            {
              icon: Users,
              title: "Community",
              text: "Connect with students across campus activities and CRT stories.",
              color: "from-pink-500 to-rose-500",
            },
            {
              icon: Calendar,
              title: "Events",
              text: "Discover mixers, symposiums, and media nights—never miss out.",
              color: "from-orange-500 to-amber-500",
            },
            {
              icon: Sparkles,
              title: "Highlights",
              text: "Trending updates and quick links to maps, dining, and shuttles.",
              color: "from-violet-500 to-indigo-500",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-xl border border-white/60 bg-white/80 p-6 shadow-lg backdrop-blur dark:border-white/10 dark:bg-white/5"
            >
              <div
                className={`mb-4 inline-flex rounded-lg bg-gradient-to-br ${item.color} p-2 text-white`}
              >
                <item.icon className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-lg">{item.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{item.text}</p>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}
