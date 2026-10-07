import { motion } from 'framer-motion';
import { useToast } from '../components/Toast';
import { riseItem, spring, staggerContainer, tapScale } from '../motion';
import { ASSETS } from '../assets';

const MENU = [
  { icon: '🏞️', label: 'Farm size', value: '12.5 ha' },
  { icon: '📅', label: 'Member since', value: 'Mar 2024' },
  { icon: '🏆', label: 'Badges', value: '12 earned' },
  { icon: '⚙️', label: 'Settings', value: '' },
  { icon: '❓', label: 'Help & support', value: '' },
];

export function ProfileScreen() {
  const toast = useToast();
  return (
    <motion.div
      className="space-y-4 px-4 pb-6 pt-4"
      variants={staggerContainer}
      initial="hidden"
      animate="show"
    >
      <motion.h1 variants={riseItem} className="text-xl font-bold text-[#2E5B34]">
        Profile
      </motion.h1>

      <motion.div
        variants={riseItem}
        className="bg-[#FFFDF8] rounded-3xl shadow-md p-6 flex flex-col items-center"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ ...spring, delay: 0.15 }}
          className="mb-3 flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-[#2E5B34]/15"
        >
          <img src={ASSETS.farmer_a} alt="" className="h-16 w-16 object-contain" style={{ imageRendering: 'pixelated' }} />
        </motion.div>
        <p className="text-lg font-bold text-[#2E5B34]">Guest Farmer</p>
        <p className="text-xs text-gray-500">Green Valley Farm</p>
        <span className="mt-2 px-3 py-1 bg-[#2E5B34]/10 text-[#2E5B34] text-xs font-semibold rounded-full">
          Owner
        </span>
      </motion.div>

      <motion.div variants={riseItem} className="bg-[#FFFDF8] rounded-3xl shadow-sm divide-y divide-[#E8E2D6]">
        {MENU.map((item) => (
          <motion.button
            key={item.label}
            whileTap={tapScale}
            onClick={() => toast(item.label, item.icon)}
            type="button"
            className="flex w-full cursor-pointer items-center gap-3 px-4 py-3.5 text-left"
          >
            <span className="text-xl">{item.icon}</span>
            <span className="flex-1 text-sm font-medium text-[#2E5B34]">{item.label}</span>
            {item.value && <span className="text-xs text-gray-500">{item.value}</span>}
            <span className="text-gray-300">›</span>
          </motion.button>
        ))}
      </motion.div>

      <motion.p variants={riseItem} className="text-center text-[10px] text-gray-400 pt-4">
        Green Valley Farm PWA v1.0.0 · Works offline 🌾
      </motion.p>
    </motion.div>
  );
}
