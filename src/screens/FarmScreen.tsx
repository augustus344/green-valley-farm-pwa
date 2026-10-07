import { useState } from 'react';
import { ZONES, ZONE_DETAILS, type ZoneId } from '../data/farm';

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

export function FarmScreen({ onOpenLivestock }: Props) {
  const [active, setActive] = useState<ZoneId | 'overview'>('overview');

  const select = (id: ZoneId | 'overview') => setActive(id);

  const zoomStyle =
    active === 'overview'
      ? { transform: 'scale(1) translate(0, 0)' }
      : (() => {
          const z = ZONES.find((z) => z.id === active)!;
          const cx = z.x + z.w / 2;
          const cy = z.y + z.h / 2;
          const tx = 50 - cx;
          const ty = 50 - cy;
          return { transform: `scale(1.45) translate(${tx * 0.4}%, ${ty * 0.4}%)` };
        })();

  const detail = active !== 'overview' ? ZONE_DETAILS[active] : null;

  return (
    <div className="px-4 pt-4 pb-24 flex flex-col h-full">
      <div className="mb-3">
        <h1 className="text-xl font-bold text-[#2E5B34]">My Farm</h1>
        <p className="text-xs text-gray-500">Green Valley Farm · 12.5 ha</p>
      </div>

      {/* Chips */}
      <div className="flex gap-2 overflow-x-auto pb-3 -mx-1 px-1 scrollbar-hide">
        {CHIPS.map((c) => (
          <button
            key={c.id}
            onClick={() => select(c.id)}
            className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${
              active === c.id
                ? 'bg-[#2E5B34] text-white shadow-md'
                : 'bg-[#FFFDF8] text-[#2E5B34] border border-[#E8E2D6]'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Map */}
      <div className="relative flex-1 min-h-[280px] bg-[#C8E6C9] rounded-3xl overflow-hidden shadow-inner border-2 border-[#A5D6A7]">
        <div
          className="absolute inset-0 transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
          style={zoomStyle}
        >
          {/* Grid lines */}
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
              <button
                key={z.id}
                onClick={() => select(z.id)}
                className={`absolute rounded-2xl flex flex-col items-center justify-center transition-all duration-300 ${
                  isSelected
                    ? 'ring-4 ring-white shadow-xl scale-105 z-10'
                    : 'ring-1 ring-black/10 shadow-sm'
                }`}
                style={{
                  left: `${z.x}%`,
                  top: `${z.y}%`,
                  width: `${z.w}%`,
                  height: `${z.h}%`,
                  backgroundColor: z.color + 'CC',
                }}
              >
                <span className="text-2xl drop-shadow">{z.emoji}</span>
                <span className="text-[9px] font-semibold text-white drop-shadow mt-0.5 leading-tight text-center px-1">
                  {z.name}
                </span>

                {/* Idle animals in animal zone */}
                {z.id === 'animals' && (
                  <>
                    <span className="absolute text-sm animate-wander-x" style={{ top: '20%', left: '15%' }}>🐄</span>
                    <span className="absolute text-xs animate-wander-y" style={{ top: '55%', left: '50%', animationDelay: '1s' }}>🐔</span>
                    <span className="absolute text-sm animate-wander-x" style={{ top: '30%', left: '60%', animationDelay: '2s' }}>🐑</span>
                  </>
                )}
                {z.id === 'water' && (
                  <div className="absolute bottom-1 flex gap-1">
                    <div className="w-3 h-5 bg-[#4A90C4] rounded-sm border border-white/40" />
                    <div className="w-3 h-4 bg-[#4A90C4]/80 rounded-sm border border-white/40" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Detail card */}
      {detail && active !== 'overview' && (
        <div className="mt-3 bg-[#FFFDF8] rounded-3xl shadow-lg p-4 animate-slide-up">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">{ZONES.find((z) => z.id === active)?.emoji}</span>
            <h3 className="font-bold text-[#2E5B34]">{ZONES.find((z) => z.id === active)?.name}</h3>
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
                <div className="h-full bg-[#2E5B34] rounded-full transition-all duration-700" style={{ width: `${detail.growth}%` }} />
              </div>
              <div className="flex gap-2">
                <button className="flex-1 py-2 bg-[#2E5B34] text-white text-sm font-medium rounded-2xl">💧 Water</button>
                <button className="flex-1 py-2 bg-[#FFFDF8] border border-[#2E5B34] text-[#2E5B34] text-sm font-medium rounded-2xl">View crop</button>
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
              <button
                onClick={onOpenLivestock}
                className="w-full py-3 bg-[#2E5B34] text-white font-semibold rounded-2xl text-sm"
              >
                Open livestock →
              </button>
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
                <div className="h-full bg-[#4A90C4] rounded-full" style={{ width: `${detail.level}%` }} />
              </div>
              <button className="w-full py-2.5 bg-[#4A90C4] text-white font-semibold rounded-2xl text-sm">
                Smart watering →
              </button>
            </>
          )}

          {active === 'storage' && (
            <div className="text-sm space-y-1">
              <p><span className="text-gray-500">Capacity:</span> <strong>{detail.capacity}</strong></p>
              <p><span className="text-gray-500">Items:</span> {detail.items}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
