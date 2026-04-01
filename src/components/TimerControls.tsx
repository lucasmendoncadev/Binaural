import { Play, Minus, Plus } from "lucide-react";

interface TimerControlsProps {
  timerMinutes: number;
  timerRunning: boolean;
  onSetMinutes: (m: number) => void;
  onStart: (m: number) => void;
}

const presets = [15, 25, 30, 45, 60, 90];

export function TimerControls({
  timerMinutes,
  timerRunning,
  onSetMinutes,
  onStart,
}: TimerControlsProps) {
  if (timerRunning) return null;

  return (
    <div className="bg-bg-card border border-border-subtle rounded-xl p-4">
      <h3 className="text-sm font-medium text-text-primary mb-3">Session Timer</h3>
      <div className="flex items-center gap-3 mb-3">
        <button
          onClick={() => onSetMinutes(Math.max(5, timerMinutes - 5))}
          className="p-1.5 rounded-lg bg-bg-secondary border border-border-subtle text-text-secondary hover:text-text-primary transition-colors"
        >
          <Minus size={14} />
        </button>
        <span className="text-2xl font-mono font-semibold text-text-primary w-20 text-center">
          {timerMinutes}m
        </span>
        <button
          onClick={() => onSetMinutes(Math.min(180, timerMinutes + 5))}
          className="p-1.5 rounded-lg bg-bg-secondary border border-border-subtle text-text-secondary hover:text-text-primary transition-colors"
        >
          <Plus size={14} />
        </button>
        <button
          onClick={() => onStart(timerMinutes)}
          className="ml-auto flex items-center gap-1.5 px-4 py-2 bg-accent-green hover:bg-accent-green/80 text-white text-xs font-medium rounded-lg transition-colors"
        >
          <Play size={12} />
          Start
        </button>
      </div>
      <div className="flex gap-1.5">
        {presets.map((p) => (
          <button
            key={p}
            onClick={() => onSetMinutes(p)}
            className={`px-2 py-1 rounded text-xs transition-colors ${
              timerMinutes === p
                ? "bg-accent-purple/15 text-accent-purple"
                : "bg-bg-secondary text-text-muted hover:text-text-secondary border border-border-subtle"
            }`}
          >
            {p}m
          </button>
        ))}
      </div>
    </div>
  );
}
