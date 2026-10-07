import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ZONES, ZONE_DETAILS, type ZoneId } from '../data/farm';
import { useToast } from '../components/Toast';
import { riseItem, spring, springSoft, staggerContainer, tapScale } from '../motion';
import { ASSETS } from '../assets';

interface Props { onOpenLivestock: () => void }

const CHIPS: { id: ZoneId | 'overview'; label: string }[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'house', label: 'Farm House' },
  { id: 'tomato', label: 'Tomato Field' },
  { id: 'vegetable', label: 'Vegetable Field' },
  { id: 'corn', label: 'Corn Field' },
  { id: 'animals', label: 'Animal Area' },
  { id: 'water', label: 'Water Tank' },
];

const ZONE_SPRITE: Record<string, string> = {
  house: ASSETS.barn,
  tomato: ASSETS.tomato,
  vegetable: ASSETS.lettuce,
  corn: ASSETS.corn,
  animals: ASSETS.cow,
  water: ASSETS.water_barrel,
  storage: ASSETS.crate,
};

function WanderCow({ reduce }: { reduce: boolean | null }) {
  const [pos, setPos] = useState({ x: 15, y: 25 });
  const [facing, setFacing] = useState(1);
  useEffect(() => {
    if (reduce) return;
    let cancelled = false;
    let timer = 0;
    const tick = () => {
      if (cancelled) return;
      const nx = 10 + Math.random() * 55;
      const ny = 15 + Math.random() * 50;
      setFacing(nx >= pos.x ? 1 : -1);
      setPos({ x: nx, y: ny });
      timer = window.setTimeout(tick, 4000 + Math.random() * 3000);
    };
    timer = window.setTimeout(tick, 2000);
    return () => { cancelled = true; clearTimeout(timer); };
  }, [reduce]);
  return (
    <motion.img src={ASSETS.cow} alt="" className="pointer-events-none absolute h-8 w-8 object-contain"
      animate={{ left: `${pos.x}%`, top: `${pos.y}%`, scaleX: facing }}
      transition={reduce ? { duration: 0 } : { duration: 2.8, ease: 'easeInOut' }} />
  );
}

export function FarmScreen({ onOpenLivestock }: Props) {
  const [active, setActive] = useState<ZoneId | 'overview'>('overview');
  const [fullscreen, setFullscreen] = useState(false);
  const [watered, setWatered] = useState<Record<string, boolean>>({});
  const reduce = useReducedMotion();
  const toast = useToast();

  const select = (id: ZoneId | 'overview') => setActive(id);

  const camera =
    active === 'overview'
      ? { scale: 1, x: '0%', y: '0%' }
      : (() => {
          const z = ZONES.find((z) => z.id === active)!;
          const cx = z.x + z.w / 2;
          const cy = z.y + z.h / 2;
          return { scale: 1.5, x: `${(50 - cx) * 0.45}%`, y: `${(50 - cy) * 0.45}%` };
        })();

  const detail = active !== 'overview' ? ZONE_DETAILS[active] : null;
  const zoneMeta = ZONES.find((z) => z.id === active);

  const doWater = (zone: string) => {
    setWatered((w) => ({ ...w, [zone]: true }));
    toast(zone === 'water' ? 'Smart watering started' : 'Field watered', '💧');
  };

  const MapBody = ({ interactive }: { interactive: boolean }) => (
    <motion.div className="absolute inset-0" animate={camera} transition={reduce ? { duration: 0.2 } : { ...springSoft, duration: 0.55 }}>
      {ZONES.map((z) => {
        const isSelected = active === z.id;
        const sprite = ZONE_SPRITE[z.id];
        return (
          <motion.button key={z.id} type="button" onClick={() => interactive && select(z.id)} whileTap={interactive ? tapScale : undefined}
            className={`absolute flex cursor-pointer flex-col items-center justify-center rounded-2xl ${isSelected ? 'z-10 idle-pulse-ring' : ''}`}
            style={{ left: `${z.x}%`, top: `${z.y}%`, width: `${z.w}%`, height: `${z.h}%`, backgroundColor: z.color + 'AA' }}
            animate={{
              scale: isSelected ? 1.06 : 1,
              boxShadow: isSelected ? '0 0 0 3px #fff, 0 0 0 5px rgba(46,91,52,0.45)' : '0 1px 3px rgba(0,0,0,0.12)',
            }}
            transition={spring}
          >
            {sprite && <img src={sprite} alt="" className="h-10 w-10 object-contain drop-shadow" />}
            <span className="mt-0.5 px-1 text-center text-[9px] font-semibold leading-tight text-white drop-shadow">{z.name}</span>
            {z.id === 'animals' && (
              <>
                <WanderCow reduce={reduce} />
                <img src={ASSETS.chicken} alt="" className="idle-peck pointer-events-none absolute h-5 w-5 object-contain" style={{ top: '60%', left: '40%' }} />
                <img src={ASSETS.goat} alt="" className="pointer-events-none absolute h-6 w-6 object-contain" style={{ top: '30%', left: '55%' }} />
              </>
            )}
            {(z.id === 'tomato' || z.id === 'vegetable' || z.id === 'corn') && (
              <div className="pointer-events-none absolute inset-x-1 bottom-1 flex justify-around opacity-90">
                {[0, 1, 2].map((i) => (
                  <span key={i} className="idle-crop text-sm" style={{ animationDelay: `${i * 0.3}s` }}>
                    {z.id === 'tomato' ? '🍅' : z.id === 'corn' ? '🌽' : '🥬'}
                  </span>
                ))}
              </div>
            )}
          </motion.button>
        );
      })}
    </motion.div>
  );

  return (
    <motion.div className="flex h-full flex-col px-4 pb-6 pt-4" variants={staggerContainer} initial="hidden" animate="show">
      <motion.div variants={riseItem} className="mb-3 flex items-start justify-between">
        <div>
          <h1 className="text-xl font-bold text-[#2E5B34]">My Farm</h1>
          <p className="text-xs text-gray-500">Green Valley Farm · 12.5 ha</p>
        </div>
        <motion.button type="button" whileTap={tapScale} onClick={() => setFullscreen(true)} className="cursor-pointer rounded-full bg-[#FFFDF8] px-3 py-1.5 text-xs font-medium text-[#2E5B34] shadow-sm">
          ⛶ Expand
        </motion.button>
      </motion.div>

      <motion.div variants={riseItem} className="scrollbar-hide -mx-1 mb-3 flex gap-2 overflow-x-auto px-1 pb-1">
        {CHIPS.map((c) => {
          const isActive = active === c.id;
          return (
            <motion.button key={c.id} type="button" onClick={() => select(c.id)} whileTap={tapScale} className="relative shrink-0 cursor-pointer rounded-full px-3 py-1.5 text-xs font-medium">
              {isActive && <motion.div layoutId="chip-pill" className="absolute inset-0 rounded-full bg-[#2E5B34] shadow-md" transition={spring} />}
              <span className={`relative z-10 ${isActive ? 'text-white' : 'text-[#2E5B34]'}`}>{c.label}</span>
              {!isActive && <span className="absolute inset-0 -z-0 rounded-full border border-[#E8E2D6] bg-[#FFFDF8]" />}
            </motion.button>
          );
        })}
      </motion.div>

      <motion.div variants={riseItem} className="relative min-h-[280px] flex-1 overflow-hidden rounded-3xl border-2 border-[#A5D6A7] bg-[#C8E6C9] shadow-inner">
        <MapBody interactive />
      </motion.div>

      <AnimatePresence mode="wait">
        {detail && active !== 'overview' && zoneMeta && (
          <motion.div key={active} initial={reduce ? { opacity: 0 } : { y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={reduce ? { opacity: 0 } : { y: 16, opacity: 0 }}
            transition={reduce ? { duration: 0.15 } : { type: 'spring', stiffness: 280, damping: 22 }} className="mt-3 rounded-3xl bg-[#FFFDF8] p-4 shadow-lg">
            <div className="mb-2 flex items-center gap-2">
              <img src={ZONE_SPRITE[active] || ASSETS.barn} alt="" className="h-8 w-8 object-contain" />
              <h3 className="font-bold text-[#2E5B34]">{zoneMeta.name}</h3>
            </div>
            {active === 'house' && (
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div><span className="text-xs text-gray-500">Size</span><p className="font-medium">{detail.size}</p></div>
                <div><span className="text-xs text-gray-500">Type</span><p className="font-medium">{detail.type}</p></div>
                <div><span className="text-xs text-gray-500">Team</span><p className="font-medium">{detail.team}</p></div>
                <div><span className="text-xs text-gray-500">Built</span><p className="font-medium">{detail.built}</p></div>
              </div>
            )}
            {(active === 'tomato' || active === 'vegetable' || active === 'corn') && (
              <>
                <div className="mb-3 flex items-center gap-3">
                  <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-700">{detail.status}</span>
                  <span className="text-sm text-gray-600">Growth {detail.growth}%</span>
                </div>
                <div className="mb-3 h-2 w-full overflow-hidden rounded-full bg-[#E8E2D6]">
                  <motion.div className="h-full rounded-full bg-[#2E5B34]" initial={{ width: 0 }} animate={{ width: `${detail.growth}%` }} transition={spring} />
                </div>
                <div className="flex gap-2">
                  <motion.button type="button" whileTap={tapScale} onClick={() => doWater(active)} className="flex-1 cursor-pointer rounded-2xl bg-[#2E5B34] py-2 text-sm font-medium text-white">
                    {watered[active] ? 'Watered ✓' : '💧 Water'}
                  </motion.button>
                  <motion.button type="button" whileTap={tapScale} onClick={() => toast(`Viewing ${zoneMeta.name}`, '🌱')} className="flex-1 cursor-pointer rounded-2xl border border-[#2E5B34] bg-[#FFFDF8] py-2 text-sm font-medium text-[#2E5B34]">
                    View crop
                  </motion.button>
                </div>
              </>
            )}
            {active === 'animals' && (
              <>
                <div className="mb-3 grid grid-cols-3 gap-2 text-center">
                  <div><p className="text-lg font-bold text-[#2E5B34]">{detail.count}</p><p className="text-[10px] text-gray-500">Animals</p></div>
                  <div><p className="text-lg font-bold text-green-600">{detail.health}%</p><p className="text-[10px] text-gray-500">Health</p></div>
                  <div><p className="text-lg font-bold text-[#2E5B34]">{detail.nextFeed}</p><p className="text-[10px] text-gray-500">Next feed</p></div>
                </div>
                <motion.button type="button" whileTap={tapScale} onClick={onOpenLivestock} className="w-full cursor-pointer rounded-2xl bg-[#2E5B34] py-3 text-sm font-semibold text-white">
                  Open livestock →
                </motion.button>
              </>
            )}
            {active === 'water' && (
              <>
                <div className="mb-3 grid grid-cols-3 gap-2 text-center">
                  <div><p className="text-lg font-bold text-[#4A90C4]">{detail.level}%</p><p className="text-[10px] text-gray-500">Level</p></div>
                  <div><p className="text-sm font-bold text-[#2E5B34]">{detail.stored}</p><p className="text-[10px] text-gray-500">Stored</p></div>
                  <div><p className="text-sm font-bold text-[#2E5B34]">{detail.usedToday}</p><p className="text-[10px] text-gray-500">Used today</p></div>
                </div>
                <div className="mb-3 h-3 w-full overflow-hidden rounded-full bg-[#E8E2D6]">
                  <motion.div className="h-full rounded-full bg-[#4A90C4]" initial={{ width: 0 }} animate={{ width: `${detail.level}%` }} transition={spring} />
                </div>
                <motion.button type="button" whileTap={tapScale} onClick={() => doWater('water')} className="w-full cursor-pointer rounded-2xl bg-[#4A90C4] py-2.5 text-sm font-semibold text-white">
                  {watered.water ? 'Watering ✓' : 'Smart watering →'}
                </motion.button>
              </>
            )}
            {active === 'storage' && (
              <div className="space-y-1 text-sm">
                <p><span className="text-gray-500">Capacity:</span> <strong>{detail.capacity}</strong></p>
                <p><span className="text-gray-500">Items:</span> {detail.items}</p>
                <motion.button type="button" whileTap={tapScale} onClick={() => toast('Storage opened', '📦')} className="mt-2 w-full cursor-pointer rounded-2xl bg-[#2E5B34] py-2 text-sm font-medium text-white">Open storage</motion.button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {fullscreen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex flex-col bg-[#C8E6C9]">
            <div className="flex items-center justify-between bg-[#FFFDF8]/95 px-4 py-3 backdrop-blur">
              <h2 className="font-bold text-[#2E5B34]">Farm map</h2>
              <button type="button" className="cursor-pointer text-sm text-[#2E5B34]" onClick={() => setFullscreen(false)}>Close ✕</button>
            </div>
            <div className="relative min-h-0 flex-1 overflow-auto">
              <div className="relative mx-auto h-[120vw] max-h-[600px] w-[120vw] max-w-[600px]">
                <MapBody interactive />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
