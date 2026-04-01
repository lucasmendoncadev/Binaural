import { useState, useCallback, useEffect } from "react";
import { Favorite, RecentPlay, Settings, Page, Provider } from "@/types";

const STORAGE_KEYS = {
  favorites: "binaural-favorites",
  recents: "binaural-recents",
  settings: "binaural-settings",
} as const;

const DEFAULT_SETTINGS: Settings = {
  defaultProvider: "all",
  openInBrowser: true,
  darkMode: true,
  defaultSessionMinutes: 30,
};

function loadJSON<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function saveJSON<T>(key: string, value: T) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function useStore() {
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [selectedActivityId, setSelectedActivityId] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<Favorite[]>(() =>
    loadJSON(STORAGE_KEYS.favorites, [])
  );
  const [recents, setRecents] = useState<RecentPlay[]>(() =>
    loadJSON(STORAGE_KEYS.recents, [])
  );
  const [settings, setSettings] = useState<Settings>(() =>
    loadJSON(STORAGE_KEYS.settings, DEFAULT_SETTINGS)
  );

  // Timer state
  const [timerMinutes, setTimerMinutes] = useState<number>(30);
  const [timerSecondsLeft, setTimerSecondsLeft] = useState<number | null>(null);
  const [timerRunning, setTimerRunning] = useState(false);

  useEffect(() => saveJSON(STORAGE_KEYS.favorites, favorites), [favorites]);
  useEffect(() => saveJSON(STORAGE_KEYS.recents, recents), [recents]);
  useEffect(() => saveJSON(STORAGE_KEYS.settings, settings), [settings]);

  // Timer effect
  useEffect(() => {
    if (!timerRunning || timerSecondsLeft === null) return;
    if (timerSecondsLeft <= 0) {
      setTimerRunning(false);
      new Notification("Binaural Finder", { body: "Session timer complete!" });
      return;
    }
    const interval = setInterval(() => {
      setTimerSecondsLeft((s) => (s !== null ? s - 1 : null));
    }, 1000);
    return () => clearInterval(interval);
  }, [timerRunning, timerSecondsLeft]);

  const navigateTo = useCallback((page: Page, activityId?: string) => {
    setCurrentPage(page);
    if (activityId !== undefined) setSelectedActivityId(activityId);
  }, []);

  const toggleFavorite = useCallback((recommendationId: string, activityId: string) => {
    setFavorites((prev) => {
      const exists = prev.find((f) => f.recommendationId === recommendationId);
      if (exists) {
        return prev.filter((f) => f.recommendationId !== recommendationId);
      }
      return [...prev, { recommendationId, activityId, addedAt: Date.now() }];
    });
  }, []);

  const isFavorite = useCallback(
    (recommendationId: string) => favorites.some((f) => f.recommendationId === recommendationId),
    [favorites]
  );

  const addRecent = useCallback((recommendationId: string, activityId: string) => {
    setRecents((prev) => {
      const filtered = prev.filter((r) => r.recommendationId !== recommendationId);
      return [{ recommendationId, activityId, playedAt: Date.now() }, ...filtered].slice(0, 20);
    });
  }, []);

  const updateSettings = useCallback((partial: Partial<Settings>) => {
    setSettings((prev) => ({ ...prev, ...partial }));
  }, []);

  const startTimer = useCallback((minutes: number) => {
    setTimerMinutes(minutes);
    setTimerSecondsLeft(minutes * 60);
    setTimerRunning(true);
  }, []);

  const stopTimer = useCallback(() => {
    setTimerRunning(false);
    setTimerSecondsLeft(null);
  }, []);

  const filterByProvider = useCallback(
    (provider: Provider) => {
      return settings.defaultProvider === "all" || settings.defaultProvider === provider;
    },
    [settings.defaultProvider]
  );

  return {
    currentPage,
    selectedActivityId,
    favorites,
    recents,
    settings,
    timerMinutes,
    timerSecondsLeft,
    timerRunning,
    navigateTo,
    toggleFavorite,
    isFavorite,
    addRecent,
    updateSettings,
    startTimer,
    stopTimer,
    setTimerMinutes,
    filterByProvider,
  };
}
