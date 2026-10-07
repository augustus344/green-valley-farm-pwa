import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ZONES, ZONE_DETAILS, type ZoneId } from '../data/farm';
import { riseItem, spring, springSoft, staggerContainer, tapScale } from '../motion';

interface Props {
  onOpenLivestock: () => void;
}

const CHIPS: { id: ZoneId | 'overview'; label: string }[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'house', label: 'Farm House' },
  { id: 'tomato', label: 'Tomato Field' },
  { id: 'vegetable', label: 'Vegetable Field' },
  { id: 'corn', label: 'Corn Field' },
  { id: 'animals', label: 'Animal Area' },
  { id: 'water', label: 'Water Tank' },
];

function WanderCow({ reduce }: { reduce: boolean | null }) {
  const [pos, setPos] = useState({ x: 15, y: 25 });
  const [facing, setFacing] = useState(1);

  useEffect(() => {
    if (reduce) return;
    let cancelled = false;
    const tick = () => {
      if (cancelled) return;
      const nx = 10 + Math.random() * 55;
      const ny = 15 + Math.random() * 50;
      setFacing(nx >= pos.x ? 1 : -1);
      setPos({ x: nx, y: ny });
      const delay = 4000 + Math.random() * 3000;
      timer = window.setTimeout(tick, delay);
    };
    let timer = window.setTimeout(tick, 2000);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduce]);

  return (
    <motion.span
      className="absolute text-sm pointer-events-none select-none"
      animate={{
        left: `${pos.x}%`,
        top: `${pos.y}%`,
        scaleX: facing,
      }}
      transition={reduce ? { duration: 0 } : { duration: 2.8, ease: 'easeInOut' }}
      style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
    >
      <motion.span
        animate={reduce ? {} : { y: [0, -2, 0, -1.5, 0] }}
        transition={{ duration: 0.7, repeat: Infinity, ease: 'easeInOut' }}
        className="inline-block"
      >
        🐄
      </motion.span>
    </motion.span>
  );
}

function WanderSheep({ reduce }: { reduce: boolean | null }) {
  const [pos, setPos] = useState({ x: 55, y: 40 });
  const [facing, setFacing] = useState(1);

  useEffect(() => {
    if (reduce) return;
    let cancelled = false;
    const tick = () => {
      if (cancelled) return;
      const nx = 20 + Math.random() * 50;
      const ny = 20 + Math.random() * 45;
      setFacing(nx >= pos.x ? 1 : -1);
      setPos({ x: nx, y: ny });
      timer = window.setTimeout(tick, 5000 + Math.random() * 2500);
    };
    let timer = window.setTimeout(tick, 3500);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduce]);

  return (
    <motion.span
      className="absolute text-sm pointer-events-none select-none"
      animate={{
        left: `${pos.x}%`,
        top: `${pos.y}%`,
        scaleX: facing,
      }}
      transition={reduce ? { duration: 0 } : { duration: 3.2, ease: 'easeInOut' }}
      style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
    >
      🐑
    </motion.span>
  );
}

export function FarmScreen({ onOpenLivestock }: Props) {
  const [active, setActive] = useState<ZoneId | 'overview'>('overview');
  const reduce = useReducedMotion();

  const select = (id: ZoneId | 'overview') => setActive(id);

  const camera =
    active === 'overview'
      ? { scale: 1, x: '0%', y: '0%' }
      : (() => {
          const z = ZONES.find((z) => z.id === active)!;
          const cx = z.x + z.w / 2;
          const cy = z.y + z.h / 2;
          return {
            scale: 1.5,
            x: `${(50 - cx) * 0.45}%`,
            y: `${(50 - cy) * 0.45}%`,
          };
        })();

  const detail = active !== 'overview' ? ZONE_DETAILS[active] : null;
  const zoneMeta = ZONES.find((z) => z.id === active);

  return (
    <motion.div
      className="px-4 pt-4 pb-24 flex flex-col h-full"
      variants={staggerContainer}
      initial="hidden"
      animate="show"
    >
      <motion.div variants={riseItem} className="mb-3">
        <h1 className="text-xl font-bold text-[#2E5B34]">My Farm</h1>
        <p className="text-xs text-gray-500">Green Valley Farm · 12.5 ha</p>
      </motion.div>

      {/* Chips with shared layoutId pill */}
      <motion.div variants={riseItem} className="flex gap-2 overflow-x-auto pb-3 -mx-1 px-1 scrollbar-hide">
        {CHIPS.map((c) => {
          const isActive = active === c.id;
          return (
            <motion.button
              key={c.id}
              onClick={() => select(c.id)}
              whileTap={tapScale}
              className="relative shrink-0 px-3 py-1.5 rounded-full text-xs font-medium"
            >
              {isActive && (
                <motion.div
                  layoutId="chip-pill"
                  className="absolute inset-0 bg-[#2E5B34] rounded-full shadow-md"
                  transition={spring}
                />
              )}
              <span className={`relative z-10 ${isActive ? 'text-white' : 'text-[#2E5B34]'}`}>
                {c.label}
              </span>
              {!isActive && (
                <span className="absolute inset-0 rounded-full border border-[#E8E2D6] bg-[#FFFDF8] -z-0" />
              )}
            </motion.button>
          );
        })}
      </motion.div>

      {/* Map */}
      <motion.div
        variants={riseItem}
        className="relative flex-1 min-h-[280px] bg-[#C8E6C9] rounded-3xl overflow-hidden shadow-inner border-2 border-[#A5D6A7]"
      >
        <motion.div
          className="absolute inset-0"
          animate={camera}
          transition={reduce ? { duration: 0.2 } : { ...springSoft, duration: 0.55 }}
        >
          <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#2E5B34" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>

          {ZONES.map((z) => {
            const isSelected = active === z.id;
            return (
              <motion.button
                key={z.id}
                onClick={() => select(z.id)}
                whileTap={tapScale}
                className={`absolute rounded-2xl flex flex-col items-center justify-center ${
                  isSelected ? 'z-10 idle-pulse-ring' : ''
                }`}
                style={{
                  left: `${z.x}%`,
                  top: `${z.y}%`,
                  width: `${z.w}%`,
                  height: `${z.h}%`,
                  backgroundColor: z.color + 'CC',
                }}
                animate={{
                  scale: isSelected ? 1.06 : 1,
                  boxShadow: isSelected
                    ? '0 0 0 3px #fff, 0 0 0 5px rgba(46,91,52,0.45)'
                    : '0 1px 3px rgba(0,0,0,0.12)',
                }}
                transition={spring}
              >
                <span className="text-2xl drop-shadow">{z.emoji}</span>
                <span className="text-[9px] font-semibold text-white drop-shadow mt-0.5 leading-tight text-center px-1">
                  {z.name}
                </span>

                {z.id === 'animals' && (
                  <>
                    <WanderCow reduce={reduce} />
                    <WanderSheep reduce={reduce} />
                    <span
                      className="absolute text-xs pointer-events-none idle-peck"
                      style={{ top: '60%', left: '40%' }}
                    >
                      🐔
                    </span>
                  </>
                )}

                {z.id === 'water' && (
                  <div className="absolute bottom-1 flex gap-1">
                    <div className="w-3 h-5 bg-[#4A90C4] rounded-sm border border-white/40 idle-water" />
                    <div
                      className="w-3 h-4 bg-[#4A90C4]/80 rounded-sm border border-white/40 idle-water"
                      style={{ animationDelay: '0.6s' }}
                    />
                  </div>
                )}

                {(z.id === 'tomato' || z.id === 'vegetable' || z.id === 'corn') && (
                  <div className="absolute inset-0 flex items-end justify-around pb-1 pointer-events-none opacity-70">
                    {[0, 1, 2].map((i) => (
                      <span
                        key={i}
                        className="text-[8px] idle-crop"
                        style={{ animationDelay: `${i * 0.3}s` }}
                      >
                        {z.id === 'tomato' ? '🌱' : z.id === 'corn' ? '🌾' : '🥬'}
                      </span>
                    ))}
                  </div>
                )}
              </motion.button>
            );
          })}
        </motion.div>
      </motion.div>

      {/* Detail card */}
      <AnimatePresence mode="wait">
        {detail && active !== 'overview' && zoneMeta && (
          <motion.div
            key={active}
            initial={reduce ? { opacity: 0 } : { y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={reduce ? { opacity: 0 } : { y: 16, opacity: 0 }}
            transition={reduce ? { duration: 0.15 } : { type: 'spring', stiffness: 280, damping: 22 }}
            className="mt-3 bg-[#FFFDF8] rounded-3xl shadow-lg p-4"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">{zoneMeta.emoji}</span>
              <h3 className="font-bold text-[#2E5B34]">{zoneMeta.name}</h3>
            </div>

            {active === 'house' && (
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div><span className="text-gray-500 text-xs">Size</span><p className="font-medium">{detail.size}</p></div>
                <div><span className="text-gray-500 text-xs">Type</span><p className="font-medium">{detail.type}</p></div>
                <div><span className="text-gray-500 text-xs">Team</span><p className="font-medium">{detail.team}</p></div>
                <div><span className="text-gray-500 text-xs">Built</span><p className="font-medium">{detail.built}</p></div>
              </div>
            )}

            {(active === 'tomato' || active === 'vegetable' || active === 'corn') && (
              <>
                <div className="flex items-center gap-3 mb-3">
                  <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-semibold rounded-full">{detail.status}</span>
                  <span className="text-sm text-gray-600">Growth {detail.growth}%</span>
                </div>
                <div className="w-full h-2 bg-[#E8E2D6] rounded-full overflow-hidden mb-3">
                  <motion.div
                    className="h-full bg-[#2E5B34] rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${detail.growth}%` }}
                    transition={spring}
                  />
                </div>
                <div className="flex gap-2">
                  <motion.button whileTap={tapScale} className="flex-1 py-2 bg-[#2E5B34] text-white text-sm font-medium rounded-2xl">
                    💧 Water
                  </motion.button>
                  <motion.button whileTap={tapScale} className="flex-1 py-2 bg-[#FFFDF8] border border-[#2E5B34] text-[#2E5B34] text-sm font-medium rounded-2xl">
                    View crop
                  </motion.button>
                </div>
              </>
            )}

            {active === 'animals' && (
              <>
                <div className="grid grid-cols-3 gap-2 text-center mb-3">
                  <div><p className="text-lg font-bold text-[#2E5B34]">{detail.count}</p><p className="text-[10px] text-gray-500">Animals</p></div>
                  <div><p className="text-lg font-bold text-green-600">{detail.health}%</p><p className="text-[10px] text-gray-500">Health</p></div>
                  <div><p className="text-lg font-bold text-[#2E5B34]">{detail.nextFeed}</p><p className="text-[10px] text-gray-500">Next feed</p></div>
                </div>
                <motion.button
                  whileTap={tapScale}
                  onClick={onOpenLivestock}
                  className="w-full py-3 bg-[#2E5B34] text-white font-semibold rounded-2xl text-sm"
                >
                  Open livestock →
                </motion.button>
              </>
            )}

            {active === 'water' && (
              <>
                <div className="grid grid-cols-3 gap-2 text-center mb-3">
                  <div><p className="text-lg font-bold text-[#4A90C4]">{detail.level}%</p><p className="text-[10px] text-gray-500">Level</p></div>
                  <div><p className="text-sm font-bold text-[#2E5B34]">{detail.stored}</p><p className="text-[10px] text-gray-500">Stored</p></div>
                  <div><p className="text-sm font-bold text-[#2E5B34]">{detail.usedToday}</p><p className="text-[10px] text-gray-500">Used today</p></div>
                </div>
                <div className="w-full h-3 bg-[#E8E2D6] rounded-full overflow-hidden mb-3">
                  <motion.div
                    className="h-full bg-[#4A90C4] rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${detail.level}%` }}
                    transition={spring}
                  />
                </div>
                <motion.button whileTap={tapScale} className="w-full py-2.5 bg-[#4A90C4] text-white font-semibold rounded-2xl text-sm">
                  Smart watering →
                </motion.button>
              </>
            )}

            {active === 'storage' && (
              <div className="text-sm space-y-1">
                <p><span className="text-gray-500">Capacity:</span> <strong>{detail.capacity}</strong></p>
                <p><span className="text-gray-500">Items:</span> {detail.items}</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
