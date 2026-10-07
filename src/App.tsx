import { useState } from 'react';
import { BottomTabBar, type TabId } from './components/BottomTabBar';
import { HomeScreen } from './screens/HomeScreen';
import { FarmScreen } from './screens/FarmScreen';
import { LivestockScreen } from './screens/LivestockScreen';
import { AnalyticsScreen } from './screens/AnalyticsScreen';
import { HarvestScreen } from './screens/HarvestScreen';
import { ProfileScreen } from './screens/ProfileScreen';

export default function App() {
  const [tab, setTab] = useState<TabId>('home');
  const [showLivestock, setShowLivestock] = useState(false);

  const handleTabChange = (t: TabId) => {
    setShowLivestock(false);
    setTab(t);
  };

  return (
    <div className="min-h-full max-w-[430px] mx-auto bg-[#F6F1E7] relative">
      {showLivestock ? (
        <LivestockScreen onBack={() => setShowLivestock(false)} />
      ) : (
        <>
          {tab === 'home' && <HomeScreen />}
          {tab === 'farm' && (
            <FarmScreen onOpenLivestock={() => setShowLivestock(true)} />
          )}
          {tab === 'analytics' && <AnalyticsScreen />}
          {tab === 'harvest' && <HarvestScreen />}
          {tab === 'profile' && <ProfileScreen />}
        </>
      )}

      {!showLivestock && <BottomTabBar active={tab} onChange={handleTabChange} />}
    </div>
  );
}
