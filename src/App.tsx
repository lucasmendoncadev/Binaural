import { Sidebar } from "@/components/Sidebar";
import { HomePage } from "@/pages/HomePage";
import { ActivityPage } from "@/pages/ActivityPage";
import { FavoritesPage } from "@/pages/FavoritesPage";
import { SettingsPage } from "@/pages/SettingsPage";
import { useStore } from "@/hooks/useStore";

function App() {
  const store = useStore();

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar
        currentPage={store.currentPage}
        navigateTo={store.navigateTo}
        timerSecondsLeft={store.timerSecondsLeft}
        timerRunning={store.timerRunning}
        stopTimer={store.stopTimer}
      />
      <main className="flex-1 overflow-hidden">
        {store.currentPage === "home" && (
          <HomePage
            favorites={store.favorites}
            recents={store.recents}
            isFavorite={store.isFavorite}
            toggleFavorite={store.toggleFavorite}
            addRecent={store.addRecent}
            navigateTo={(page, actId) => store.navigateTo(page, actId)}
          />
        )}
        {store.currentPage === "activity" && store.selectedActivityId && (
          <ActivityPage
            activityId={store.selectedActivityId}
            isFavorite={store.isFavorite}
            toggleFavorite={store.toggleFavorite}
            addRecent={store.addRecent}
            navigateTo={store.navigateTo}
            timerMinutes={store.timerMinutes}
            timerRunning={store.timerRunning}
            onSetTimerMinutes={store.setTimerMinutes}
            onStartTimer={store.startTimer}
          />
        )}
        {store.currentPage === "favorites" && (
          <FavoritesPage
            favorites={store.favorites}
            isFavorite={store.isFavorite}
            toggleFavorite={store.toggleFavorite}
            addRecent={store.addRecent}
          />
        )}
        {store.currentPage === "settings" && (
          <SettingsPage settings={store.settings} updateSettings={store.updateSettings} />
        )}
      </main>
    </div>
  );
}

export default App;
