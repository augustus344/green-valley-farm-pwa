import { motion } from 'framer-motion';
import { spring, tapScale } from '../motion';

export type TabId = 'home' | 'farm' | 'analytics' | 'harvest' | 'profile';

const TABS: { id: TabId; emoji: string; label: string }[] = [
  { id: 'home', emoji: '🏡', label: 'Home' },
  { id: 'farm', emoji: '🗺️', label: 'Farm' },
  { id: 'analytics', emoji: '📊', label: 'Analytics' },
  { id: 'harvest', emoji: '🌾', label: 'Harvest' },
  { id: 'profile', emoji: '👤', label: 'Profile' },
];

interface Props {
  active: TabId;
  onChange: (tab: TabId) => void;
}

export function BottomTabBar({ active, onChange }: Props) {
  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-[#FFFDF8]/border-t border-[#E8E2D6] safe-bottom z-50">
      <div className="flex items-center justify-around px-1 py-2">
        {TABS.map((tab) => {
          const isActive = active === tab.id;
          return (
            <motion.button
              key={tab.id}
              onClick={() => onChange(tab.id)}
              whileTap={tapScale}
              className="relative flex flex-col items-center gap-0.5 min-w-[56px] py-1 rounded-2xl"
            >
              {isActive && (
                <motion.div
                  layoutId="tab-pill"
                  className="absolute inset-0 bg-[#2E5B34]/10 rounded-2xl"
                  transition={spring}
                />
              )}
              <motion.span
                className="relative text-xl z-10"
                animate={{ scale: isActive ? 1.12 : 1, opacity: isActive ? 1 : 0.55 }}
                transition={spring}
              >
                {tab.emoji}
              </motion.span>
              <span
                className={`relative z-10 text-[10px] font-medium ${
                  isActive ? 'text-[#2E5B34]' : 'text-gray-500'
                }`}
              >
                {tab.label}
              </span>
            </motion.button>
          );
        })}
      </div>
    </nav>
  );
}
