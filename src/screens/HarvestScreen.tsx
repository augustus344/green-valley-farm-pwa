import { motion } from 'framer-motion';
import { CountUp } from '../components/CountUp';
import { riseItem, spring, staggerContainer, tapScale } from '../motion';

const HARVESTS = [
  { crop: 'Tomatoes', emoji: '🍅', amount: '320 kg', status: 'Ready', pct: 100 },
  { crop: 'Corn', emoji: '🌽', amount: '480 kg', status: 'In 5 days', pct: 70 },
  { crop: 'Lettuce', emoji: '🥬', amount: '95 kg', status: 'Ready', pct: 100 },
  { crop: 'Carrots', emoji: '🥕', amount: '210 kg', status: 'In 12 days', pct: 55 },
  { crop: 'Wheat', emoji: '🌾', amount: '175 kg', status: 'In 20 days', pct: 40 },
];

export function HarvestScreen() {
  return (
    <motion.div
      className="px-4 pt-4 pb-24 space-y-4"
      variants={staggerContainer}
      initial="hidden"
      animate="show"
    >
      <motion.div variants={riseItem}>
        <h1 className="text-xl font-bold text-[#2E5B34]">Harvest</h1>
        <p className="text-xs text-gray-500">Season overview · Fall 2026</p>
      </motion.div>

      <motion.div variants={riseItem} className="bg-[#FFFDF8] rounded-3xl shadow-md p-5 text-center">
        <p className="text-xs text-gray-500 uppercase tracking-wide">Total ready</p>
        <p className="text-4xl font-bold text-[#2E5B34]">
          <CountUp end={415} suffix=" kg" />
        </p>
        <p className="text-xs text-green-600 mt-1">2 crops ready to pick</p>
      </motion.div>

      <div className="space-y-3">
        {HARVESTS.map((h, i) => (
          <motion.div
            key={h.crop}
            variants={riseItem}
            whileTap={tapScale}
            className="bg-[#FFFDF8] rounded-3xl shadow-sm p-4"
          >
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl">{h.emoji}</span>
              <div className="flex-1">
                <p className="font-semibold text-[#2E5B34]">{h.crop}</p>
                <p className="text-xs text-gray-500">{h.amount}</p>
              </div>
              <span
                className={`text-[10px] font-semibold px-2 py-1 rounded-full ${
                  h.pct === 100 ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                }`}
              >
                {h.status}
              </span>
            </div>
            <div className="w-full h-2 bg-[#E8E2D6] rounded-full overflow-hidden">
              <motion.div
                className={`h-full rounded-full ${h.pct === 100 ? 'bg-[#2E5B34]' : 'bg-[#E8A838]'}`}
                initial={{ width: 0 }}
                animate={{ width: `${h.pct}%` }}
                transition={{ ...spring, delay: 0.2 + i * 0.06 }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
