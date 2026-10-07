import { useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { BottomTabBar, type TabId } from './components/BottomTabBar';
import { ToastProvider } from './components/Toast';
import { HomeScreen } from './screens/HomeScreen';
import { FarmScreen } from './screens/FarmScreen';
import { LivestockScreen } from './screens/LivestockScreen';
import { AnalyticsScreen } from './screens/AnalyticsScreen';
import { HarvestScreen } from './screens/HarvestScreen';
import { ProfileScreen } from './screens/ProfileScreen';
import { spring } from './motion';

const TAB_ORDER: TabId[] = ['home', 'farm', 'analytics', 'harvest', 'profile'];

export default function App() {
  const [tab, setTab] = useState<TabId>('home');
  const [showLivestock, setShowLivestock] = useState(false);
  const direction = useRef(0);
  const reduce = useReducedMotion();

  const handleTabChange = (t: TabId) => {
    const from = TAB_ORDER.indexOf(tab);
    const to = TAB_ORDER.indexOf(t);
    direction.current = to > from ? 1 : -1;
    setShowLivestock(false);
    setTab(t);
  };

  const slideVariants = {
    enter: (dir: number) => (reduce ? { opacity: 0 } : { x: dir > 0 ? 40 : -40, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => (reduce ? { opacity: 0 } : { x: dir > 0 ? -40 : 40, opacity: 0 }),
  };

  return (
    <ToastProvider>
      <div className="mx-auto flex h-[100dvh] max-w-[430px] flex-col bg-[#F6F1E7]">
        <div className="relative min-h-0 flex-1 overflow-y-auto overflow-x-hidden">
          <AnimatePresence mode="wait" custom={direction.current}>
            {showLivestock ? (
              <motion.div
                key="livestock"
                initial={reduce ? { opacity: 0 } : { x: 60, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={reduce ? { opacity: 0 } : { x: 60, opacity: 0 }}
                transition={spring}
                className="min-h-full"
              >
                <LivestockScreen onBack={() => setShowLivestock(false)} />
              </motion.div>
            ) : (
              <motion.div
                key={tab}
                custom={direction.current}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: reduce ? 0.15 : 0.28, ease: [0.32, 0.72, 0, 1] }}
                className="min-h-full"
              >
                {tab === 'home' && <HomeScreen />}
                {tab === 'farm' && (
                  <FarmScreen onOpenLivestock={() => setShowLivestock(true)} />
                )}
                {tab === 'analytics' && <AnalyticsScreen />}
                {tab === 'harvest' && <HarvestScreen />}
                {tab === 'profile' && <ProfileScreen />}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {!showLivestock && (
          <div className="shrink-0">
            <BottomTabBar active={tab} onChange={handleTabChange} />
          </div>
        )}
      </div>
    </ToastProvider>
  );
}
