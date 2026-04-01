import { useState, useCallback, useEffect } from "react";
import { Activity } from "@/types";
import { NoiseColor } from "@/types";
import { startBinaural, stopBinaural, setVolume, setNoiseVolume, isPlaying } from "@/audio/engine";
import { Play, Square, Volume2, Waves, Headphones } from "lucide-react";

interface BinauralPlayerProps {
  activity: Activity;
}

export function BinauralPlayer({ activity }: BinauralPlayerProps) {
  const defaultBeat = Math.round(
    (activity.frequencyRange[0] + activity.frequencyRange[1]) / 2
  );
  const [playing, setPlaying] = useState(false);
  const [carrierHz, setCarrierHz] = useState(200);
  const [beatHz, setBeatHz] = useState(defaultBeat);
  const [noiseColor, setNoiseColor] = useState<NoiseColor | null>(
    activity.noiseColors[0] ?? null
  );
  const [volume, setVolumeState] = useState(0.7);
  const [noiseVol, setNoiseVol] = useState(0.3);

  // Reset defaults when activity changes
  useEffect(() => {
    const newBeat = Math.round(
      (activity.frequencyRange[0] + activity.frequencyRange[1]) / 2
    );
    setBeatHz(newBeat);
    setNoiseColor(activity.noiseColors[0] ?? null);
    if (isPlaying()) {
      stopBinaural();
      setPlaying(false);
    }
  }, [activity.id]); // eslint-disable-line react-hooks/exhaustive-deps

  // Stop audio on unmount (navigating away)
  useEffect(() => {
    return () => {
      if (isPlaying()) stopBinaural();
    };
  }, []);

  const handleToggle = useCallback(() => {
    if (playing) {
      stopBinaural();
      setPlaying(false);
    } else {
      startBinaural(carrierHz, beatHz, noiseColor, volume, noiseVol);
      setPlaying(true);
    }
  }, [playing, carrierHz, beatHz, noiseColor, volume, noiseVol]);

  const handleVolumeChange = useCallback(
    (v: number) => {
      setVolumeState(v);
      if (playing) setVolume(v);
    },
    [playing]
  );

  const handleNoiseVolChange = useCallback(
    (v: number) => {
      setNoiseVol(v);
      if (playing) setNoiseVolume(v);
    },
    [playing]
  );

  const handleRestart = useCallback(() => {
    if (playing) {
      stopBinaural();
      startBinaural(carrierHz, beatHz, noiseColor, volume, noiseVol);
    }
  }, [playing, carrierHz, beatHz, noiseColor, volume, noiseVol]);

  const noiseOptions: (NoiseColor | null)[] = [null, "White", "Pink", "Brown"];

  return (
    <div className="bg-bg-card border border-border-subtle rounded-xl p-5">
      <div className="flex items-center gap-2 mb-4">
        <Headphones size={16} className="text-accent-purple" />
        <h3 className="text-sm font-medium text-text-primary">Built-in Player</h3>
        <span className="text-[10px] px-1.5 py-0.5 rounded bg-accent-purple/10 text-accent-purple ml-auto">
          Use headphones
        </span>
      </div>

      {/* Play button + frequency display */}
      <div className="flex items-center gap-4 mb-5">
        <button
          onClick={handleToggle}
          className={`w-12 h-12 rounded-full flex items-center justify-center transition-all shrink-0 ${
            playing
              ? "bg-accent-rose text-white shadow-lg shadow-accent-rose/20"
              : "bg-accent-purple text-white shadow-lg shadow-accent-purple/20 hover:bg-accent-purple-dim"
          }`}
        >
          {playing ? <Square size={18} /> : <Play size={18} className="ml-0.5" />}
        </button>
        <div className="flex-1">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-mono font-semibold text-text-primary">{beatHz} Hz</span>
            <span className="text-xs text-text-muted">{activity.brainwaveCategory} wave</span>
          </div>
          <p className="text-xs text-text-secondary mt-0.5">
            Carrier: {carrierHz} Hz left / {carrierHz + beatHz} Hz right
          </p>
        </div>
        {playing && (
          <div className="flex gap-1 items-center">
            {[0, 1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="w-1 bg-accent-purple rounded-full animate-pulse"
                style={{
                  height: `${12 + Math.random() * 16}px`,
                  animationDelay: `${i * 0.15}s`,
                  animationDuration: `${0.6 + Math.random() * 0.4}s`,
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Beat frequency slider */}
      <div className="space-y-4">
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs text-text-secondary flex items-center gap-1.5">
              <Waves size={12} />
              Beat Frequency
            </label>
            <span className="text-xs font-mono text-text-muted">
              {activity.frequencyRange[0]}-{activity.frequencyRange[1]} Hz range
            </span>
          </div>
          <input
            type="range"
            min={activity.frequencyRange[0]}
            max={activity.frequencyRange[1]}
            step={0.5}
            value={beatHz}
            onChange={(e) => {
              setBeatHz(parseFloat(e.target.value));
              handleRestart();
            }}
            className="w-full accent-accent-purple h-1.5 rounded-full appearance-none bg-bg-secondary cursor-pointer"
          />
        </div>

        {/* Carrier frequency */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs text-text-secondary">Carrier Frequency</label>
            <span className="text-xs font-mono text-text-muted">{carrierHz} Hz</span>
          </div>
          <input
            type="range"
            min={100}
            max={400}
            step={10}
            value={carrierHz}
            onChange={(e) => {
              setCarrierHz(parseInt(e.target.value));
              handleRestart();
            }}
            className="w-full accent-accent-purple h-1.5 rounded-full appearance-none bg-bg-secondary cursor-pointer"
          />
        </div>

        {/* Noise color */}
        <div>
          <label className="text-xs text-text-secondary block mb-1.5">Noise Layer</label>
          <div className="flex gap-1.5">
            {noiseOptions.map((color) => (
              <button
                key={color ?? "none"}
                onClick={() => {
                  setNoiseColor(color);
                  if (playing) {
                    stopBinaural();
                    startBinaural(carrierHz, beatHz, color, volume, noiseVol);
                  }
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  noiseColor === color
                    ? "bg-accent-purple/15 text-accent-purple"
                    : "bg-bg-secondary text-text-muted hover:text-text-secondary border border-border-subtle"
                }`}
              >
                {color ?? "None"}
              </button>
            ))}
          </div>
        </div>

        {/* Volume controls */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs text-text-secondary flex items-center gap-1.5">
                <Volume2 size={12} />
                Volume
              </label>
              <span className="text-xs font-mono text-text-muted">{Math.round(volume * 100)}%</span>
            </div>
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={volume}
              onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
              className="w-full accent-accent-purple h-1.5 rounded-full appearance-none bg-bg-secondary cursor-pointer"
            />
          </div>
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs text-text-secondary">Noise Mix</label>
              <span className="text-xs font-mono text-text-muted">
                {Math.round(noiseVol * 100)}%
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={noiseVol}
              onChange={(e) => handleNoiseVolChange(parseFloat(e.target.value))}
              className="w-full accent-accent-purple h-1.5 rounded-full appearance-none bg-bg-secondary cursor-pointer"
              disabled={!noiseColor}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
