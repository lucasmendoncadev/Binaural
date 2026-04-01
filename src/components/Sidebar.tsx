import { Home, Heart, Settings, Timer, Square } from "lucide-react";
import { Page } from "@/types";

interface SidebarProps {
  currentPage: Page;
  navigateTo: (page: Page) => void;
  timerSecondsLeft: number | null;
  timerRunning: boolean;
  stopTimer: () => void;
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function Sidebar({
  currentPage,
  navigateTo,
  timerSecondsLeft,
  timerRunning,
  stopTimer,
}: SidebarProps) {
  const navItems: { page: Page; icon: React.ReactNode; label: string }[] = [
    { page: "home", icon: <Home size={20} />, label: "Home" },
    { page: "favorites", icon: <Heart size={20} />, label: "Favorites" },
    { page: "settings", icon: <Settings size={20} />, label: "Settings" },
  ];

  return (
    <div className="w-56 bg-bg-secondary border-r border-border-subtle flex flex-col h-full shrink-0">
      <div className="p-5 pb-3">
        <h1 className="text-lg font-semibold tracking-tight text-text-primary">
          Binaural Finder
        </h1>
        <p className="text-xs text-text-muted mt-0.5">Find your frequency</p>
      </div>

      <nav className="flex-1 px-3 py-2 space-y-0.5">
        {navItems.map(({ page, icon, label }) => (
          <button
            key={page}
            onClick={() => navigateTo(page)}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
              currentPage === page
                ? "bg-accent-purple/15 text-accent-purple"
                : "text-text-secondary hover:bg-bg-card hover:text-text-primary"
            }`}
          >
            {icon}
            {label}
          </button>
        ))}
      </nav>

      {timerRunning && timerSecondsLeft !== null && (
        <div className="mx-3 mb-4 p-3 bg-bg-card rounded-lg border border-border-subtle">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2 text-xs text-text-secondary">
              <Timer size={14} />
              Session Timer
            </div>
            <button
              onClick={stopTimer}
              className="text-text-muted hover:text-accent-rose transition-colors"
            >
              <Square size={12} />
            </button>
          </div>
          <div className="text-2xl font-mono font-semibold text-accent-purple">
            {formatTime(timerSecondsLeft)}
          </div>
        </div>
      )}
    </div>
  );
}
