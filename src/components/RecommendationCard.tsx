import { Recommendation } from "@/types";
import { ExternalLink, Heart, CirclePlay, Music, Globe } from "lucide-react";
import { open } from "@tauri-apps/plugin-shell";

interface RecommendationCardProps {
  recommendation: Recommendation;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onPlay: () => void;
}

const providerIcons = {
  youtube: <CirclePlay size={16} />,
  spotify: <Music size={16} />,
  other: <Globe size={16} />,
};

const providerColors = {
  youtube: "text-provider-youtube",
  spotify: "text-provider-spotify",
  other: "text-provider-other",
};

const providerLabels = {
  youtube: "YouTube",
  spotify: "Spotify",
  other: "Web",
};

function formatDuration(seconds: number | null): string | null {
  if (!seconds) return null;
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  if (h > 0) return `${h}h ${m}m`;
  return `${m}m`;
}

export function RecommendationCard({
  recommendation,
  isFavorite,
  onToggleFavorite,
  onPlay,
}: RecommendationCardProps) {
  const handleOpen = async () => {
    onPlay();
    try {
      await open(recommendation.url);
    } catch {
      window.open(recommendation.url, "_blank");
    }
  };

  return (
    <div className="bg-bg-card border border-border-subtle rounded-xl p-4 hover:border-accent-purple/20 transition-colors">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 mb-1.5">
            <span className={providerColors[recommendation.provider]}>
              {providerIcons[recommendation.provider]}
            </span>
            <span className="text-xs text-text-muted">
              {providerLabels[recommendation.provider]}
            </span>
            {recommendation.durationSeconds && (
              <span className="text-xs text-text-muted">
                &middot; {formatDuration(recommendation.durationSeconds)}
              </span>
            )}
          </div>
          <h4 className="text-sm font-medium text-text-primary leading-snug line-clamp-1">
            {recommendation.title}
          </h4>
          <p className="text-xs text-text-secondary mt-1">{recommendation.note}</p>
          <div className="flex items-center gap-2 mt-2">
            {recommendation.noiseColor && (
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-bg-secondary text-text-muted border border-border-subtle">
                {recommendation.noiseColor} noise
              </span>
            )}
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-bg-secondary text-text-muted border border-border-subtle">
              {recommendation.frequencyRange[0]}-{recommendation.frequencyRange[1]} Hz
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-1.5 shrink-0">
          <button
            onClick={handleOpen}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-accent-purple hover:bg-accent-purple-dim text-white text-xs font-medium rounded-lg transition-colors"
          >
            <ExternalLink size={12} />
            Open
          </button>
          <button
            onClick={onToggleFavorite}
            className={`flex items-center justify-center p-1.5 rounded-lg border transition-colors ${
              isFavorite
                ? "border-accent-rose/30 text-accent-rose bg-accent-rose/10"
                : "border-border-subtle text-text-muted hover:text-accent-rose hover:border-accent-rose/30"
            }`}
          >
            <Heart size={14} fill={isFavorite ? "currentColor" : "none"} />
          </button>
        </div>
      </div>
    </div>
  );
}
