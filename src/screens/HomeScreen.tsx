import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CountUp } from '../components/CountUp';
import { ProgressRing } from '../components/ProgressRing';
import { useToast } from '../components/Toast';
import { QUICK_STATS } from '../data/farm';
import { riseItem, spring, staggerContainer, tapScale } from '../motion';
import { ASSETS } from '../assets';

const ALERTS = [
  { id: 1, icon: '🌧️', title: 'Rain expected', body: 'Light rain tomorrow 2–5 PM. Irrigation paused.' },
  { id: 2, icon: '🐄', title: 'Moose needs check', body: 'Cow COW-007 health at 74%. Schedule vet.' },
  { id: 3, icon: '🍅', title: 'Tomatoes ready', body: '320 kg ready to harvest in Tomato Field.' },
  { id: 4, icon: '💧', title: 'Tank at 82%', body: 'Water stored 8,200 L. Top-up not needed.' },
];

function HeroBanner() {
  return (
    <div className="relative h-44 w-full overflow-hidden rounded-3xl bg-gradient-to-b from-[#87CEEB] to-[#B8E0A8] shadow-md">
      <div className="absolute top-3 right-6 h-10 w-10">
        <div className="idle-sun-rays absolute inset-[-8px] opacity-40">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="absolute left-1/2 top-0 h-3 w-0.5 origin-bottom bg-[#FFD93D]/70" style={{ transform: `translateX(-50%) rotate(${i * 45}deg) translateY(-6px)` }} />
          ))}
        </div>
        <div className="relative z-10 h-10 w-10 rounded-full bg-[#FFD93D] shadow-lg" />
      </div>
      <div className="idle-cloud absolute left-4 top-4 h-5 w-14 rounded-full bg-white/80" />
      <div className="idle-cloud-slow absolute left-10 top-7 h-4 w-10 rounded-full bg-white/60" />
      <span className="idle-tree absolute bottom-6 left-4 text-3xl">🌲</span>
      <span className="idle-tree-alt absolute bottom-8 left-12 text-2xl">🌳</span>
      <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 flex-col items-center">
        <div className="h-3 w-16 rounded-t-lg bg-[#8B3A2A]" style={{ clipPath: 'polygon(10% 100%, 50% 0%, 90% 100%)' }} />
        <div className="relative h-10 w-14 rounded-b-sm bg-[#C45C4A]">
          <div className="absolute left-1/2 top-1 h-4 w-4 -translate-x-1/2 rounded-sm bg-[#FFD93D]/80" />
          <div className="absolute bottom-0 left-1/2 h-5 w-5 -translate-x-1/2 rounded-t-sm bg-[#5D4037]" />
        </div>
      </div>
      <img src={ASSETS.cow} alt="" className="absolute bottom-4 right-20 h-10 w-10 object-contain drop-shadow" />
      <img src={ASSETS.chicken} alt="" className="idle-peck absolute bottom-5 right-12 h-7 w-7 object-contain" />
      <span className="idle-tree absolute bottom-6 right-4 text-2xl">🌲</span>
      <div className="absolute bottom-2 left-16 right-16 flex h-3 gap-1 opacity-70">
        {[...Array(6)].map((_, i) => (
          <span key={i} className="idle-crop text-sm" style={{ animationDelay: `${i * 0.15}s` }}>{i % 2 ? '🌽' : '🍅'}</span>
        ))}
      </div>
    </div>
  );
}

export function HomeScreen() {
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';
  const toast = useToast();
  const [showAlerts, setShowAlerts] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  return (
    <motion.div className="space-y-4 px-4 pb-6 pt-4" variants={staggerContainer} initial="hidden" animate="show">
      <motion.div variants={riseItem} className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full bg-[#2E5B34]/15">
            <img src={ASSETS.cow} alt="" className="h-8 w-8 object-contain" />
          </div>
          <div className="relative">
            <p className="text-sm text-gray-500">{greeting}, Guest</p>
            <button type="button" onClick={() => setShowMenu((v) => !v)} className="flex cursor-pointer items-center gap-1 font-semibold text-[#2E5B34]">
              Green Valley Farm <span className="text-xs">▾</span>
            </button>
            <AnimatePresence>
              {showMenu && (
                <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={spring} className="absolute left-0 top-full z-30 mt-1 w-48 overflow-hidden rounded-2xl border border-[#E8E2D6] bg-[#FFFDF8] shadow-lg">
                  {['Switch farm', 'Farm settings', 'Invite worker'].map((label) => (
                    <button key={label} type="button" className="block w-full cursor-pointer px-4 py-2.5 text-left text-sm text-[#2E5B34] hover:bg-[#F6F1E7]" onClick={() => { setShowMenu(false); toast(label, '⚙️'); }}>
                      {label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        <motion.button type="button" whileTap={tapScale} onClick={() => setShowAlerts(true)} className="relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-[#FFFDF8] text-lg shadow-sm">
          🔔
          <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white">3</span>
        </motion.button>
      </motion.div>

      <motion.div variants={riseItem}><HeroBanner /></motion.div>

      <motion.div variants={riseItem} className="relative z-10 -mt-6 flex gap-3">
        <motion.div whileTap={tapScale} className="flex flex-1 items-center gap-3 rounded-3xl bg-[#FFFDF8] p-4 shadow-md">
          <ProgressRing percent={92} size={56} stroke={6} color="#2E5B34" delay={0.15} />
          <div>
            <p className="text-xs text-gray-500">Farm Health</p>
            <p className="font-bold text-[#2E5B34]">Healthy</p>
            <p className="text-[10px] text-green-600">All good ✓</p>
          </div>
        </motion.div>
        <motion.button type="button" whileTap={tapScale} onClick={() => toast('Weather: Sunny 28°C', '☀️')} className="flex-1 cursor-pointer rounded-3xl bg-[#FFFDF8] p-4 text-left shadow-md">
          <div className="mb-1 flex items-center gap-2">
            <span className="text-2xl">☀️</span>
            <div>
              <p className="text-lg font-bold text-[#2E5B34]">28°C</p>
              <p className="text-[10px] text-gray-500">Sunny</p>
            </div>
          </div>
          <div className="mt-1 flex gap-3 text-[10px] text-gray-500"><span>💧 68%</span><span>💨 15%</span></div>
        </motion.button>
      </motion.div>

      <motion.div variants={riseItem}>
        <h2 className="mb-2 px-1 text-sm font-semibold text-[#2E5B34]">Quick Stats</h2>
        <div className="grid grid-cols-2 gap-3">
          {QUICK_STATS.map((s, i) => (
            <motion.button key={s.label} type="button" whileTap={tapScale} onClick={() => toast(`${s.label}: ${s.value}${s.suffix || ''}`, s.emoji)} initial={{ opacity: 0, scale: 0.9, y: 12 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ ...spring, delay: 0.25 + i * 0.07 }} className="flex cursor-pointer items-center gap-3 rounded-3xl bg-[#FFFDF8] p-4 text-left shadow-sm">
              <span className="text-2xl">{s.emoji}</span>
              <div>
                <p className="text-lg font-bold text-[#2E5B34]"><CountUp end={s.value} suffix={s.suffix || ''} delay={0.3 + i * 0.07} /></p>
                <p className="text-[11px] text-gray-500">{s.label}</p>
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>

      <AnimatePresence>
        {showAlerts && (
          <>
            <motion.div className="fixed inset-0 z-40 bg-black/30" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowAlerts(false)} />
            <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} transition={spring} className="fixed bottom-0 left-1/2 z-50 w-full max-w-[430px] -translate-x-1/2 rounded-t-3xl bg-[#FFFDF8] p-4 pb-8 shadow-2xl">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-lg font-bold text-[#2E5B34]">Notifications</h3>
                <button type="button" className="cursor-pointer text-sm text-gray-500" onClick={() => setShowAlerts(false)}>Close</button>
              </div>
              <div className="space-y-2">
                {ALERTS.map((a) => (
                  <button key={a.id} type="button" className="flex w-full cursor-pointer gap-3 rounded-2xl bg-[#F6F1E7] p-3 text-left" onClick={() => { toast(a.title, a.icon); setShowAlerts(false); }}>
                    <span className="text-2xl">{a.icon}</span>
                    <div>
                      <p className="text-sm font-semibold text-[#2E5B34]">{a.title}</p>
                      <p className="text-xs text-gray-500">{a.body}</p>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
