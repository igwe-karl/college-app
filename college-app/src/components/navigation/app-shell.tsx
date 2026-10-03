import { SidebarNav } from "./sidebar-nav";
import { AppTopBar } from "./app-top-bar";
import { MobileBottomNav } from "./mobile-bottom-nav";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-background">
      <SidebarNav />
      <div className="flex min-h-screen flex-1 flex-col md:ml-64">
        <AppTopBar />
        <main className="flex-1 px-4 pb-24 pt-20 md:px-8 md:pb-10">
          {children}
        </main>
      </div>
      <MobileBottomNav />
    </div>
  );
}
