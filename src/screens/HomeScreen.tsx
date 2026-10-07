import { motion } from 'framer-motion';
import { CountUp } from '../components/CountUp';
import { ProgressRing } from '../components/ProgressRing';
import { QUICK_STATS } from '../data/farm';
import { riseItem, spring, staggerContainer, tapScale } from '../motion';

function HeroBanner() {
  return (
    <div className="relative w-full h-44 rounded-3xl overflow-hidden bg-gradient-to-b from-[#87CEEB] to-[#B8E0A8] shadow-md">
      {/* Sun + rays */}
      <div className="absolute top-3 right-6 w-10 h-10">
        <div className="absolute inset-[-8px] idle-sun-rays opacity-40">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute left-1/2 top-0 w-0.5 h-3 bg-[#FFD93D]/70 origin-bottom"
              style={{ transform: `translateX(-50%) rotate(${i * 45}deg) translateY(-6px)` }}
            />
          ))}
        </div>
        <div className="w-10 h-10 rounded-full bg-[#FFD93D] shadow-lg relative z-10" />
      </div>

      {/* Clouds — long drift loops */}
      <div className="absolute top-4 left-4 w-14 h-5 bg-white/80 rounded-full idle-cloud" />
      <div className="absolute top-7 left-10 w-10 h-4 bg-white/60 rounded-full idle-cloud-slow" />
      <div className="absolute top-5 right-16 w-12 h-4 bg-white/70 rounded-full idle-cloud" style={{ animationDelay: '-20s' }} />

      {/* Hills */}
      <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 400 80" preserveAspectRatio="none">
        <path d="M0 50 Q100 20 200 45 T400 35 L400 80 L0 80 Z" fill="#7CB342" />
        <path d="M0 60 Q80 40 160 55 T320 50 L400 55 L400 80 L0 80 Z" fill="#689F38" />
      </svg>

      {/* Barn */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center">
        <div className="w-16 h-3 bg-[#8B3A2A] rounded-t-lg" style={{ clipPath: 'polygon(10% 100%, 50% 0%, 90% 100%)' }} />
        <div className="w-14 h-10 bg-[#C45C4A] relative rounded-b-sm">
          <div className="absolute top-1 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#FFD93D]/80 rounded-sm" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-5 bg-[#5D4037] rounded-t-sm" />
        </div>
      </div>

      {/* Trees sway */}
      <div className="absolute bottom-8 left-6 text-2xl idle-tree">🌲</div>
      <div className="absolute bottom-10 left-12 text-xl idle-tree-alt">🌳</div>
      <div className="absolute bottom-8 right-8 text-2xl idle-tree" style={{ animationDelay: '0.8s' }}>🌲</div>

      {/* Farmer */}
      <div className="absolute bottom-7 right-16 text-2xl">🧑‍🌾</div>

      {/* Crop stripes sway */}
      <div className="absolute bottom-2 left-20 right-20 h-3 flex gap-1 opacity-60">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="flex-1 rounded-sm idle-crop"
            style={{
              background: i % 2 ? '#8BC34A' : '#AED581',
              animationDelay: `${i * 0.15}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

export function HomeScreen() {
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';

  return (
    <motion.div
      className="px-4 pt-4 pb-24 space-y-4"
      variants={staggerContainer}
      initial="hidden"
      animate="show"
    >
      {/* Header */}
      <motion.div variants={riseItem} className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-[#2E5B34]/15 flex items-center justify-center text-xl">
            🧑‍🌾
          </div>
          <div>
            <p className="text-sm text-gray-500">{greeting}, Guest</p>
            <p className="font-semibold text-[#2E5B34] flex items-center gap-1">
              Green Valley Farm <span className="text-xs">▾</span>
            </p>
          </div>
        </div>
        <motion.button
          whileTap={tapScale}
          className="relative w-10 h-10 rounded-full bg-[#FFFDF8] shadow-sm flex items-center justify-center text-lg"
        >
          🔔
          <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
            3
          </span>
        </motion.button>
      </motion.div>

      <motion.div variants={riseItem}>
        <HeroBanner />
      </motion.div>

      {/* Overlapping cards */}
      <motion.div variants={riseItem} className="flex gap-3 -mt-6 relative z-10">
        <motion.div whileTap={tapScale} className="flex-1 bg-[#FFFDF8] rounded-3xl shadow-md p-4 flex items-center gap-3">
          <ProgressRing percent={92} size={56} stroke={6} color="#2E5B34" delay={0.15} />
          <div>
            <p className="text-xs text-gray-500">Farm Health</p>
            <p className="font-bold text-[#2E5B34]">Healthy</p>
            <p className="text-[10px] text-green-600">All good ✓</p>
          </div>
        </motion.div>
        <motion.div whileTap={tapScale} className="flex-1 bg-[#FFFDF8] rounded-3xl shadow-md p-4">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-2xl">☀️</span>
            <div>
              <p className="font-bold text-[#2E5B34] text-lg">28°C</p>
              <p className="text-[10px] text-gray-500">Sunny</p>
            </div>
          </div>
          <div className="flex gap-3 text-[10px] text-gray-500 mt-1">
            <span>💧 68%</span>
            <span>💨 15%</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Quick Stats */}
      <motion.div variants={riseItem}>
        <h2 className="text-sm font-semibold text-[#2E5B34] mb-2 px-1">Quick Stats</h2>
        <div className="grid grid-cols-2 gap-3">
          {QUICK_STATS.map((s, i) => (
            <motion.div
              key={s.label}
              whileTap={tapScale}
              initial={{ opacity: 0, scale: 0.9, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ ...spring, delay: 0.25 + i * 0.07 }}
              className="bg-[#FFFDF8] rounded-3xl shadow-sm p-4 flex items-center gap-3"
            >
              <span className="text-2xl">{s.emoji}</span>
              <div>
                <p className="font-bold text-[#2E5B34] text-lg">
                  <CountUp end={s.value} suffix={s.suffix || ''} delay={0.3 + i * 0.07} />
                </p>
                <p className="text-[11px] text-gray-500">{s.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
