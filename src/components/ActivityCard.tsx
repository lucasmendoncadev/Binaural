import { Activity } from "@/types";
import { Icon } from "./Icon";

interface ActivityCardProps {
  activity: Activity;
  onClick: () => void;
}

export function ActivityCard({ activity, onClick }: ActivityCardProps) {
  return (
    <button
      onClick={onClick}
      className="group bg-bg-card hover:bg-bg-card-hover border border-border-subtle rounded-xl p-4 text-left transition-all hover:border-accent-purple/30 hover:shadow-lg hover:shadow-accent-purple/5"
    >
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-lg bg-accent-purple/10 flex items-center justify-center text-accent-purple group-hover:bg-accent-purple/20 transition-colors shrink-0">
          <Icon name={activity.icon} size={20} />
        </div>
        <div className="min-w-0">
          <h3 className="font-medium text-sm text-text-primary">{activity.name}</h3>
          <p className="text-xs text-text-secondary mt-0.5 leading-relaxed">
            {activity.frequencyRange[0]}-{activity.frequencyRange[1]} Hz &middot;{" "}
            {activity.brainwaveCategory} &middot; {activity.noiseColors[0]} noise
          </p>
        </div>
      </div>
      <p className="text-xs text-text-muted mt-3 leading-relaxed line-clamp-2">
        {activity.description}
      </p>
    </button>
  );
}
