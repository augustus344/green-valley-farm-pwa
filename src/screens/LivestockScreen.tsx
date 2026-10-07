import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CountUp } from '../components/CountUp';
import { ProgressRing } from '../components/ProgressRing';
import { useToast } from '../components/Toast';
import { ANIMALS, FEEDING_SLOTS, CATEGORY_COUNTS, type Animal, type AnimalKind } from '../data/farm';
import { riseItem, spring, springSnappy, staggerContainer, tapScale } from '../motion';
import { ASSETS } from '../assets';

interface Props { onBack: () => void }

const CATEGORIES: { kind: AnimalKind; label: string; sprite: string }[] = [
  { kind: 'cow', label: 'Cows', sprite: ASSETS.cow },
  { kind: 'chicken', label: 'Chickens', sprite: ASSETS.chicken },
  { kind: 'sheep', label: 'Sheep', sprite: ASSETS.sprite_sheep },
  { kind: 'goat', label: 'Goats', sprite: ASSETS.goat },
];

const KIND_SPRITE: Record<AnimalKind, string> = {
  cow: ASSETS.cow,
  chicken: ASSETS.chicken,
  sheep: ASSETS.sprite_sheep,
  goat: ASSETS.goat,
};

export function LivestockScreen({ onBack }: Props) {
  const [selectedKind, setSelectedKind] = useState<AnimalKind>('cow');
  const [selected, setSelected] = useState<Animal | null>(null);
  const filtered = ANIMALS.filter((a) => a.kind === selectedKind);
  const toast = useToast();

  return (
    <motion.div className="space-y-4 px-4 pb-8 pt-4" variants={staggerContainer} initial="hidden" animate="show">
      <motion.div variants={riseItem} className="flex items-center gap-3">
        <motion.button type="button" whileTap={tapScale} onClick={onBack} className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-[#FFFDF8] text-lg shadow-sm">←</motion.button>
        <div>
          <h1 className="text-xl font-bold text-[#2E5B34]">Livestock</h1>
          <p className="text-xs text-gray-500">Green Valley Farm</p>
        </div>
      </motion.div>

      <motion.div variants={riseItem} className="flex items-center justify-between rounded-3xl bg-[#FFFDF8] p-5 shadow-md">
        <div>
          <p className="text-xs uppercase tracking-wide text-gray-500">Total Herd</p>
          <p className="text-4xl font-bold text-[#2E5B34]"><CountUp end={48} /></p>
        </div>
        <motion.span initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ ...springSnappy, delay: 0.35 }} className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
          All healthy ✓
        </motion.span>
      </motion.div>

      <motion.div variants={riseItem} className="flex justify-around rounded-3xl bg-[#FFFDF8] p-4 shadow-sm">
        <ProgressRing percent={95} color="#2E5B34" label="Health" sublabel="Excellent" size={80} delay={0.1} />
        <ProgressRing percent={72} color="#E8A838" label="Feed" sublabel="12 days stock" size={80} delay={0.22} />
        <ProgressRing percent={83} color="#4A90C4" label="Production" sublabel="On target" size={80} delay={0.34} />
      </motion.div>

      <motion.div variants={riseItem} className="rounded-3xl bg-[#FFFDF8] p-4 shadow-sm">
        <h3 className="mb-3 text-sm font-semibold text-[#2E5B34]">Today's feeding</h3>
        <div className="relative space-y-4 pl-6">
          <motion.div className="absolute left-[11px] top-2 w-0.5 origin-top bg-[#E8E2D6]" initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }} style={{ bottom: 8 }} />
          {FEEDING_SLOTS.map((slot, i) => (
            <button key={slot.time} type="button" className="relative flex w-full cursor-pointer items-center gap-3 text-left"
              onClick={() => toast(slot.status === 'done' ? `${slot.label} already done` : `Starting ${slot.label}`, '🌾')}>
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ ...springSnappy, delay: 0.3 + i * 0.15 }}
                className={`absolute -left-6 flex h-5 w-5 items-center justify-center rounded-full text-[10px] ${
                  slot.status === 'done' ? 'bg-[#2E5B34] text-white' : 'border-2 border-[#E8A838] bg-[#FFFDF8] text-[#E8A838]'
                }`}>{slot.status === 'done' ? '✓' : '·'}</motion.div>
              <span className="w-12 font-mono text-xs text-gray-500">{slot.time}</span>
              <span className="flex-1 text-sm font-medium text-[#2E5B34]">{slot.label}</span>
              <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${slot.status === 'done' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                {slot.status === 'done' ? 'Done' : 'Upcoming'}
              </span>
            </button>
          ))}
        </div>
      </motion.div>

      <motion.div variants={riseItem}>
        <h3 className="mb-2 text-sm font-semibold text-[#2E5B34]">Categories</h3>
        <div className="grid grid-cols-4 gap-2">
          {CATEGORIES.map((c) => {
            const isActive = selectedKind === c.kind;
            return (
              <motion.button key={c.kind} type="button" onClick={() => setSelectedKind(c.kind)} whileTap={tapScale}
                className="relative flex cursor-pointer flex-col items-center gap-1 overflow-hidden rounded-2xl p-3">
                {isActive && <motion.div layoutId="cat-pill" className="absolute inset-0 rounded-2xl bg-[#2E5B34] shadow-md" transition={spring} />}
                {!isActive && <span className="absolute inset-0 rounded-2xl bg-[#FFFDF8] shadow-sm" />}
                <img src={c.sprite} alt="" className="relative z-10 h-8 w-8 object-contain" />
                <span className={`relative z-10 text-lg font-bold ${isActive ? 'text-white' : 'text-[#2E5B34]'}`}>{CATEGORY_COUNTS[c.kind]}</span>
                <span className={`relative z-10 text-[10px] ${isActive ? 'text-white/80' : 'text-[#2E5B34]/80'}`}>{c.label}</span>
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.div key={selectedKind} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }} className="space-y-2">
          {filtered.map((animal, i) => (
            <motion.button key={animal.id} type="button" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ ...spring, delay: i * 0.05 }} whileTap={{ scale: 0.98 }} onClick={() => setSelected(animal)}
              className="flex w-full cursor-pointer items-center gap-3 rounded-2xl bg-[#FFFDF8] p-3 text-left shadow-sm">
              <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full bg-[#F6F1E7]">
                <img src={KIND_SPRITE[animal.kind]} alt="" className="h-9 w-9 object-contain" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-[#2E5B34]">{animal.name}</p>
                  {animal.needsCheck && <span className="rounded-full bg-amber-100 px-1.5 py-0.5 text-[9px] font-semibold text-amber-700">Check</span>}
                </div>
                <p className="truncate text-[11px] text-gray-500">{animal.breed} · {animal.tagId} · {animal.ageYears}y</p>
              </div>
              <span className={`rounded-full px-2 py-1 text-xs font-bold ${
                animal.health >= 90 ? 'bg-green-100 text-green-700' : animal.health >= 80 ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-600'
              }`}>{animal.health}%</span>
              <span className="text-gray-300">›</span>
            </motion.button>
          ))}
        </motion.div>
      </AnimatePresence>

      <AnimatePresence>
        {selected && (
          <>
            <motion.div className="fixed inset-0 z-40 bg-black/30" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelected(null)} />
            <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} transition={spring}
              className="fixed bottom-0 left-1/2 z-50 w-full max-w-[430px] -translate-x-1/2 rounded-t-3xl bg-[#FFFDF8] p-5 pb-10 shadow-2xl">
              <div className="mb-4 flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#F6F1E7]">
                  <img src={KIND_SPRITE[selected.kind]} alt="" className="h-14 w-14 object-contain" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#2E5B34]">{selected.name}</h3>
                  <p className="text-xs text-gray-500">{selected.breed} · {selected.tagId}</p>
                </div>
              </div>
              <div className="mb-4 flex justify-around">
                <ProgressRing percent={selected.health} size={72} stroke={7} color={selected.health >= 90 ? '#2E5B34' : '#E8A838'} label="Health" />
                <div className="text-center"><p className="text-2xl font-bold text-[#2E5B34]">{selected.ageYears}y</p><p className="text-[10px] text-gray-500">Age</p></div>
                <div className="text-center"><p className="text-2xl font-bold text-[#2E5B34]">{selected.kind}</p><p className="text-[10px] text-gray-500">Kind</p></div>
              </div>
              <div className="flex gap-2">
                <motion.button type="button" whileTap={tapScale} onClick={() => { toast(`Fed ${selected.name}`, '🌾'); setSelected(null); }} className="flex-1 cursor-pointer rounded-2xl bg-[#2E5B34] py-2.5 text-sm font-semibold text-white">Feed now</motion.button>
                <motion.button type="button" whileTap={tapScale} onClick={() => setSelected(null)} className="flex-1 cursor-pointer rounded-2xl border border-[#E8E2D6] py-2.5 text-sm font-medium text-[#2E5B34]">Close</motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
