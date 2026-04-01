import { Settings, Provider } from "@/types";

interface SettingsPageProps {
  settings: Settings;
  updateSettings: (partial: Partial<Settings>) => void;
}

export function SettingsPage({ settings, updateSettings }: SettingsPageProps) {
  return (
    <div className="p-6 max-w-2xl mx-auto space-y-6 overflow-y-auto h-full">
      <div>
        <h2 className="text-xl font-semibold text-text-primary mb-1">Settings</h2>
        <p className="text-sm text-text-secondary">Customize your Binaural Finder experience.</p>
      </div>

      <div className="space-y-4">
        <div className="bg-bg-card border border-border-subtle rounded-xl p-4">
          <h3 className="text-sm font-medium text-text-primary mb-3">Default Provider</h3>
          <div className="flex gap-2">
            {(["all", "youtube", "spotify", "other"] as const).map((p) => (
              <button
                key={p}
                onClick={() => updateSettings({ defaultProvider: p as Provider | "all" })}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors capitalize ${
                  settings.defaultProvider === p
                    ? "bg-accent-purple/15 text-accent-purple"
                    : "bg-bg-secondary text-text-muted hover:text-text-secondary border border-border-subtle"
                }`}
              >
                {p === "all" ? "Show All" : p}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-bg-card border border-border-subtle rounded-xl p-4">
          <h3 className="text-sm font-medium text-text-primary mb-3">Default Session Length</h3>
          <div className="flex gap-2">
            {[15, 25, 30, 45, 60, 90].map((m) => (
              <button
                key={m}
                onClick={() => updateSettings({ defaultSessionMinutes: m })}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  settings.defaultSessionMinutes === m
                    ? "bg-accent-purple/15 text-accent-purple"
                    : "bg-bg-secondary text-text-muted hover:text-text-secondary border border-border-subtle"
                }`}
              >
                {m}m
              </button>
            ))}
          </div>
        </div>

        <div className="bg-bg-card border border-border-subtle rounded-xl p-4 space-y-3">
          <h3 className="text-sm font-medium text-text-primary">Playback</h3>
          <label className="flex items-center justify-between cursor-pointer">
            <span className="text-sm text-text-secondary">Open links in browser</span>
            <button
              onClick={() => updateSettings({ openInBrowser: !settings.openInBrowser })}
              className={`relative w-10 h-5 rounded-full transition-colors ${
                settings.openInBrowser ? "bg-accent-purple" : "bg-bg-secondary border border-border-subtle"
              }`}
            >
              <span
                className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${
                  settings.openInBrowser ? "translate-x-5" : "translate-x-0.5"
                }`}
              />
            </button>
          </label>
        </div>

        <div className="bg-bg-card border border-border-subtle rounded-xl p-4">
          <h3 className="text-sm font-medium text-text-primary mb-2">About</h3>
          <p className="text-xs text-text-muted leading-relaxed">
            Binaural Finder v0.1.0 - Find the right binaural beats and noise for any activity.
            Built with Tauri, React, and Tailwind CSS.
          </p>
        </div>
      </div>
    </div>
  );
}
