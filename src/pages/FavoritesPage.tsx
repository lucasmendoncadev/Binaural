import { recommendations } from "@/data/recommendations";
import { activities } from "@/data/activities";
import { RecommendationCard } from "@/components/RecommendationCard";
import { Favorite } from "@/types";
import { Heart } from "lucide-react";

interface FavoritesPageProps {
  favorites: Favorite[];
  isFavorite: (id: string) => boolean;
  toggleFavorite: (recId: string, actId: string) => void;
  addRecent: (recId: string, actId: string) => void;
}

export function FavoritesPage({
  favorites,
  isFavorite,
  toggleFavorite,
  addRecent,
}: FavoritesPageProps) {
  const favoriteRecs = favorites
    .map((f) => {
      const rec = recommendations.find((r) => r.id === f.recommendationId);
      const activity = activities.find((a) => a.id === f.activityId);
      return rec ? { rec, activityName: activity?.name || "" } : null;
    })
    .filter(Boolean);

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6 overflow-y-auto h-full">
      <div>
        <h2 className="text-xl font-semibold text-text-primary mb-1">Favorites</h2>
        <p className="text-sm text-text-secondary">Your saved tracks and playlists.</p>
      </div>

      {favoriteRecs.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <Heart size={40} className="text-text-muted mb-4" />
          <p className="text-sm text-text-secondary mb-1">No favorites yet</p>
          <p className="text-xs text-text-muted">
            Heart a recommendation to save it here for quick access.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {favoriteRecs.map(
            (item) =>
              item && (
                <div key={item.rec.id}>
                  <p className="text-xs text-text-muted mb-1.5">{item.activityName}</p>
                  <RecommendationCard
                    recommendation={item.rec}
                    isFavorite={isFavorite(item.rec.id)}
                    onToggleFavorite={() => toggleFavorite(item.rec.id, item.rec.activityId)}
                    onPlay={() => addRecent(item.rec.id, item.rec.activityId)}
                  />
                </div>
              )
          )}
        </div>
      )}
    </div>
  );
}
