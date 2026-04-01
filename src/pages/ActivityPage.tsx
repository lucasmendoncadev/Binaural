import { useState } from "react";
import { activities } from "@/data/activities";
import { recommendations } from "@/data/recommendations";
import { RecommendationCard } from "@/components/RecommendationCard";
import { TimerControls } from "@/components/TimerControls";
import { BinauralPlayer } from "@/components/BinauralPlayer";
import { Icon } from "@/components/Icon";
import { Provider } from "@/types";
import { ArrowLeft, CirclePlay, Music, Globe } from "lucide-react";

interface ActivityPageProps {
  activityId: string;
  isFavorite: (id: string) => boolean;
  toggleFavorite: (recId: string, actId: string) => void;
  addRecent: (recId: string, actId: string) => void;
  navigateTo: (page: "home") => void;
  timerMinutes: number;
  timerRunning: boolean;
  onSetTimerMinutes: (m: number) => void;
  onStartTimer: (m: number) => void;
}

const providerTabs: { id: Provider | "all"; label: string; icon: React.ReactNode }[] = [
  { id: "all", label: "All", icon: null },
  { id: "youtube", label: "YouTube", icon: <CirclePlay size={14} /> },
  { id: "spotify", label: "Spotify", icon: <Music size={14} /> },
  { id: "other", label: "Other", icon: <Globe size={14} /> },
];

export function ActivityPage({
  activityId,
  isFavorite,
  toggleFavorite,
  addRecent,
  navigateTo,
  timerMinutes,
  timerRunning,
  onSetTimerMinutes,
  onStartTimer,
}: ActivityPageProps) {
  const [activeProvider, setActiveProvider] = useState<Provider | "all">("all");
  const activity = activities.find((a) => a.id === activityId);

  if (!activity) {
    return (
      <div className="p-6">
        <button onClick={() => navigateTo("home")} className="text-sm text-text-secondary hover:text-text-primary">
          Activity not found. Go back.
        </button>
      </div>
    );
  }

  const activityRecs = recommendations.filter((r) => r.activityId === activityId);
  const filteredRecs =
    activeProvider === "all"
      ? activityRecs
      : activityRecs.filter((r) => r.provider === activeProvider);

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6 overflow-y-auto h-full">
      <button
        onClick={() => navigateTo("home")}
        className="flex items-center gap-1.5 text-sm text-text-secondary hover:text-text-primary transition-colors"
      >
        <ArrowLeft size={16} />
        Back
      </button>

      <div className="flex items-start gap-4">
        <div className="w-14 h-14 rounded-xl bg-accent-purple/10 flex items-center justify-center text-accent-purple shrink-0">
          <Icon name={activity.icon} size={28} />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-text-primary">{activity.name}</h2>
          <p className="text-sm text-text-secondary mt-1">{activity.description}</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="bg-bg-card border border-border-subtle rounded-xl p-4">
          <p className="text-xs text-text-muted mb-1">Frequency Range</p>
          <p className="text-lg font-semibold text-accent-purple">
            {activity.frequencyRange[0]}-{activity.frequencyRange[1]} Hz
          </p>
          <p className="text-xs text-text-secondary mt-0.5">{activity.brainwaveCategory} waves</p>
        </div>
        <div className="bg-bg-card border border-border-subtle rounded-xl p-4">
          <p className="text-xs text-text-muted mb-1">Noise Pairing</p>
          <div className="flex items-center gap-2 mt-1">
            {activity.noiseColors.map((color) => (
              <span
                key={color}
                className="text-sm font-medium px-2 py-0.5 rounded-md bg-bg-secondary border border-border-subtle text-text-primary"
              >
                {color}
              </span>
            ))}
          </div>
        </div>
        <div className="bg-bg-card border border-border-subtle rounded-xl p-4">
          <p className="text-xs text-text-muted mb-1">Sources</p>
          <p className="text-lg font-semibold text-text-primary">{activityRecs.length}</p>
          <p className="text-xs text-text-secondary mt-0.5">curated picks</p>
        </div>
      </div>

      <div className="bg-bg-card border border-border-subtle rounded-xl p-4">
        <p className="text-xs font-medium text-accent-purple mb-1">Why this works</p>
        <p className="text-sm text-text-secondary leading-relaxed">{activity.whyItWorks}</p>
      </div>

      <BinauralPlayer activity={activity} />

      <TimerControls
        timerMinutes={timerMinutes}
        timerRunning={timerRunning}
        onSetMinutes={onSetTimerMinutes}
        onStart={onStartTimer}
      />

      <div>
        <div className="flex items-center gap-1.5 mb-4">
          {providerTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveProvider(tab.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                activeProvider === tab.id
                  ? "bg-accent-purple/15 text-accent-purple"
                  : "text-text-muted hover:text-text-secondary hover:bg-bg-card"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {filteredRecs.map((rec) => (
            <RecommendationCard
              key={rec.id}
              recommendation={rec}
              isFavorite={isFavorite(rec.id)}
              onToggleFavorite={() => toggleFavorite(rec.id, rec.activityId)}
              onPlay={() => addRecent(rec.id, rec.activityId)}
            />
          ))}
          {filteredRecs.length === 0 && (
            <p className="text-sm text-text-muted py-8 text-center">
              No picks for this provider yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
