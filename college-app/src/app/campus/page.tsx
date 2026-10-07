import Image from "next/image";
import Link from "next/link";
import { campusHome } from "@/lib/campus-data";
import { ArrowRight, Play } from "lucide-react";

export default function CampusPage() {
  const { hero, latestUpdates, trendingEvents, quickLinks, highlight } =
    campusHome;

  return (
    <div className="mx-auto max-w-6xl space-y-10 pb-8">
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-violet-600 via-purple-600 to-orange-500 p-8 text-white shadow-lg">
        <div className="relative z-10 max-w-xl space-y-3">
          <p className="text-sm font-semibold uppercase tracking-wider text-white/80">
            Campus home
          </p>
          <h1 className="text-3xl font-extrabold md:text-4xl">{hero.title}</h1>
          <p className="text-white/90">{hero.subtitle}</p>
          <Link
            href="/events"
            className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm font-semibold backdrop-blur hover:bg-white/30"
          >
            View events <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-white/10" />
        <div className="absolute -bottom-12 right-20 h-56 w-56 rounded-full bg-orange-400/20" />
      </section>

      <div className="grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-8 space-y-8">
          <section>
            <h2 className="mb-4 text-xl font-bold">Latest updates</h2>
            <div className="space-y-3">
              {latestUpdates.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 rounded-xl border border-border bg-card p-4 shadow-sm transition-shadow hover:shadow-md"
                >
                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${item.color} text-xl text-white`}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {item.body}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold">Trending events</h2>
              <Link href="/events" className="text-sm font-medium text-primary">
                View all
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {trendingEvents.map((event) => (
                <div
                  key={event.id}
                  className="group relative overflow-hidden rounded-xl shadow-md"
                >
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                      sizes="300px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    <span
                      className={`absolute top-3 right-3 rounded-full px-2 py-0.5 text-xs font-bold text-white ${event.tagColor}`}
                    >
                      {event.tag}
                    </span>
                    <div className="absolute bottom-3 left-3 text-white">
                      <p className="text-xs opacity-90">{event.date}</p>
                      <p className="font-bold">{event.title}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <aside className="lg:col-span-4 space-y-6">
          <section className="rounded-xl border border-border bg-gradient-to-br from-sky-50 to-indigo-50 p-5 dark:from-sky-950/40 dark:to-indigo-950/40">
            <h2 className="mb-3 font-bold">Quick links</h2>
            <div className="grid grid-cols-2 gap-2">
              {quickLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`flex flex-col items-center gap-2 rounded-lg p-3 text-center text-sm font-medium transition-transform hover:scale-[1.02] ${link.bg}`}
                >
                  <span className="text-2xl">{link.emoji}</span>
                  {link.label}
                </Link>
              ))}
            </div>
          </section>

          <section className="overflow-hidden rounded-xl border border-border bg-card shadow-md">
            <div className="relative aspect-video">
              <Image
                src={highlight.image}
                alt={highlight.title}
                fill
                className="object-cover"
                sizes="400px"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/30 backdrop-blur">
                  <Play className="h-8 w-8 text-white fill-white" />
                </span>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-semibold">Highlights</h3>
              <p className="text-sm font-medium">{highlight.title}</p>
              <p className="text-xs text-muted-foreground">{highlight.views}</p>
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}
