export type BrainwaveCategory = "Delta" | "Theta" | "Alpha" | "Low Beta" | "Beta" | "High Beta";

export type NoiseColor = "White" | "Pink" | "Brown";

export type Provider = "youtube" | "spotify" | "other";

export interface Activity {
  id: string;
  name: string;
  icon: string;
  frequencyRange: [number, number];
  brainwaveCategory: BrainwaveCategory;
  noiseColors: NoiseColor[];
  description: string;
  whyItWorks: string;
}

export interface Recommendation {
  id: string;
  provider: Provider;
  title: string;
  url: string;
  activityId: string;
  frequencyRange: [number, number];
  brainwaveCategory: BrainwaveCategory;
  noiseColor: NoiseColor | null;
  durationSeconds: number | null;
  tags: string[];
  note: string;
}

export interface Favorite {
  recommendationId: string;
  activityId: string;
  addedAt: number;
}

export interface RecentPlay {
  recommendationId: string;
  activityId: string;
  playedAt: number;
}

export interface SessionPreset {
  activityId: string;
  durationMinutes: number;
  breakReminderMinutes: number | null;
}

export interface Settings {
  defaultProvider: Provider | "all";
  openInBrowser: boolean;
  darkMode: boolean;
  defaultSessionMinutes: number;
}

export type Page = "home" | "activity" | "favorites" | "settings";
