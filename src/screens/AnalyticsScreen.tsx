import { motion } from 'framer-motion';
import { useToast } from '../components/Toast';
import { riseItem, spring, staggerContainer, tapScale } from '../motion';

export function AnalyticsScreen() {
  const toast = useToast();
  const bars = [65, 80, 45, 90, 72, 88, 95];
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <motion.div
      className="space-y-4 px-4 pb-6 pt-4"
      variants={staggerContainer}
      initial="hidden"
      animate="show"
    >
      <motion.div variants={riseItem}>
        <h1 className="text-xl font-bold text-[#2E5B34]">Analytics</h1>
        <p className="text-xs text-gray-500">Weekly farm performance</p>
      </motion.div>

      <motion.div variants={riseItem} className="bg-[#FFFDF8] rounded-3xl shadow-md p-4">
        <h3 className="text-sm font-semibold text-[#2E5B34] mb-4">Yield (kg)</h3>
        <div className="flex items-end justify-between h-36 gap-2">
          {bars.map((h, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <motion.div
                className="w-full rounded-t-lg bg-gradient-to-t from-[#2E5B34] to-[#5BA85A]"
                initial={{ height: 0 }}
                animate={{ height: `${h}%` }}
                transition={{ ...spring, delay: 0.15 + i * 0.05 }}
              />
              <span className="text-[9px] text-gray-500">{days[i]}</span>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div variants={riseItem} className="grid grid-cols-2 gap-3">
        {[
          { label: 'Avg moisture', value: '74%', sub: '↑ 3% vs last week', color: 'text-[#2E5B34]', subColor: 'text-green-600' },
          { label: 'Water used', value: '8.4k L', sub: '↓ 5% efficient', color: 'text-[#4A90C4]', subColor: 'text-green-600' },
          { label: 'Livestock health', value: '96%', sub: '48 / 48 healthy', color: 'text-green-600', subColor: 'text-gray-500' },
          { label: 'Crop growth', value: '79%', sub: 'On track for harvest', color: 'text-[#E8A838]', subColor: 'text-gray-500' },
        ].map((c) => (
          <motion.button type="button" key={c.label} whileTap={tapScale} onClick={() => toast(`${c.label}: ${c.value}`, '📊')} className="cursor-pointer rounded-3xl bg-[#FFFDF8] p-4 text-left shadow-sm">
            <p className="text-xs text-gray-500">{c.label}</p>
            <p className={`text-2xl font-bold ${c.color}`}>{c.value}</p>
            <p className={`text-[10px] ${c.subColor}`}>{c.sub}</p>
          </motion.button>
        ))}
      </motion.div>

      <motion.div variants={riseItem} className="rounded-3xl bg-[#FFFDF8] p-4 shadow-sm">
        <h3 className="mb-3 text-sm font-semibold text-[#2E5B34]">Soil nutrients</h3>
        <svg viewBox="0 0 300 80" className="w-full h-20">
          <motion.polyline
            fill="none"
            stroke="#2E5B34"
            strokeWidth="2.5"
            strokeLinecap="round"
            points="0,60 50,45 100,55 150,30 200,40 250,20 300,25"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
          />
          <motion.polyline
            fill="none"
            stroke="#E8A838"
            strokeWidth="2"
            strokeDasharray="4 3"
            points="0,50 50,55 100,40 150,48 200,35 250,42 300,38"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: 'easeOut', delay: 0.5 }}
          />
        </svg>
        <div className="flex gap-4 mt-2 text-[10px]">
          <span className="flex items-center gap-1"><span className="w-3 h-0.5 bg-[#2E5B34]" /> Nitrogen</span>
          <span className="flex items-center gap-1"><span className="w-3 h-0.5 bg-[#E8A838]" /> Phosphorus</span>
        </div>
      </motion.div>
    </motion.div>
  );
}
