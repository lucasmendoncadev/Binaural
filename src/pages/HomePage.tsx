import { activities } from "@/data/activities";
import { recommendations } from "@/data/recommendations";
import { ActivityCard } from "@/components/ActivityCard";
import { RecommendationCard } from "@/components/RecommendationCard";
import { Favorite, RecentPlay } from "@/types";
import { Clock, Heart } from "lucide-react";

interface HomePageProps {
  favorites: Favorite[];
  recents: RecentPlay[];
  isFavorite: (id: string) => boolean;
  toggleFavorite: (recId: string, actId: string) => void;
  addRecent: (recId: string, actId: string) => void;
  navigateTo: (page: "activity", activityId: string) => void;
}

export function HomePage({
  favorites,
  recents,
  isFavorite,
  toggleFavorite,
  addRecent,
  navigateTo,
}: HomePageProps) {
  const favoriteRecs = favorites
    .slice(0, 4)
    .map((f) => recommendations.find((r) => r.id === f.recommendationId))
    .filter(Boolean);

  const recentRecs = recents
    .slice(0, 4)
    .map((r) => recommendations.find((rec) => rec.id === r.recommendationId))
    .filter(Boolean);

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8 overflow-y-auto h-full">
      <div>
        <h2 className="text-xl font-semibold text-text-primary mb-1">What are you doing?</h2>
        <p className="text-sm text-text-secondary">
          Pick an activity to get the right binaural beats and noise pairing.
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
        {activities.map((activity) => (
          <ActivityCard
            key={activity.id}
            activity={activity}
            onClick={() => navigateTo("activity", activity.id)}
          />
        ))}
      </div>

      {favoriteRecs.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Heart size={16} className="text-accent-rose" />
            <h3 className="text-sm font-medium text-text-primary">Favorites</h3>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            {favoriteRecs.map(
              (rec) =>
                rec && (
                  <RecommendationCard
                    key={rec.id}
                    recommendation={rec}
                    isFavorite={isFavorite(rec.id)}
                    onToggleFavorite={() => toggleFavorite(rec.id, rec.activityId)}
                    onPlay={() => addRecent(rec.id, rec.activityId)}
                  />
                )
            )}
          </div>
        </div>
      )}

      {recentRecs.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Clock size={16} className="text-accent-blue" />
            <h3 className="text-sm font-medium text-text-primary">Recently Played</h3>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            {recentRecs.map(
              (rec) =>
                rec && (
                  <RecommendationCard
                    key={rec.id}
                    recommendation={rec}
                    isFavorite={isFavorite(rec.id)}
                    onToggleFavorite={() => toggleFavorite(rec.id, rec.activityId)}
                    onPlay={() => addRecent(rec.id, rec.activityId)}
                  />
                )
            )}
          </div>
        </div>
      )}
    </div>
  );
}
