import { useState } from 'react';
import { CountUp } from '../components/CountUp';
import { ProgressRing } from '../components/ProgressRing';
import { ANIMALS, FEEDING_SLOTS, CATEGORY_COUNTS, type AnimalKind } from '../data/farm';

interface Props {
  onBack: () => void;
}

const CATEGORIES: { kind: AnimalKind; emoji: string; label: string }[] = [
  { kind: 'cow', emoji: '🐄', label: 'Cows' },
  { kind: 'chicken', emoji: '🐔', label: 'Chickens' },
  { kind: 'sheep', emoji: '🐑', label: 'Sheep' },
  { kind: 'goat', emoji: '🐐', label: 'Goats' },
];

export function LivestockScreen({ onBack }: Props) {
  const [selectedKind, setSelectedKind] = useState<AnimalKind>('cow');
  const filtered = ANIMALS.filter((a) => a.kind === selectedKind);

  return (
    <div className="px-4 pt-4 pb-24 space-y-4">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={onBack}
          className="w-9 h-9 rounded-full bg-[#FFFDF8] shadow-sm flex items-center justify-center text-lg"
        >
          ←
        </button>
        <div>
          <h1 className="text-xl font-bold text-[#2E5B34]">Livestock</h1>
          <p className="text-xs text-gray-500">Green Valley Farm</p>
        </div>
      </div>

      {/* Total herd */}
      <div className="bg-[#FFFDF8] rounded-3xl shadow-md p-5 flex items-center justify-between">
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wide">Total Herd</p>
          <p className="text-4xl font-bold text-[#2E5B34]">
            <CountUp end={48} />
          </p>
        </div>
        <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
          All healthy ✓
        </span>
      </div>

      {/* Progress rings */}
      <div className="bg-[#FFFDF8] rounded-3xl shadow-sm p-4 flex justify-around">
        <ProgressRing percent={95} color="#2E5B34" label="Health" sublabel="Excellent" size={80} />
        <ProgressRing percent={72} color="#E8A838" label="Feed" sublabel="12 days stock" size={80} />
        <ProgressRing percent={83} color="#4A90C4" label="Production" sublabel="On target" size={80} />
      </div>

      {/* Feeding timeline */}
      <div className="bg-[#FFFDF8] rounded-3xl shadow-sm p-4">
        <h3 className="text-sm font-semibold text-[#2E5B34] mb-3">Today's feeding</h3>
        <div className="relative pl-6 space-y-4">
          <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-[#E8E2D6]" />
          {FEEDING_SLOTS.map((slot) => (
            <div key={slot.time} className="relative flex items-center gap-3">
              <div
                className={`absolute -left-6 w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                  slot.status === 'done'
                    ? 'bg-[#2E5B34] text-white'
                    : 'bg-[#FFFDF8] border-2 border-[#E8A838] text-[#E8A838]'
                }`}
              >
                {slot.status === 'done' ? '✓' : '·'}
              </div>
              <span className="text-xs font-mono text-gray-500 w-12">{slot.time}</span>
              <span className="text-sm font-medium text-[#2E5B34] flex-1">{slot.label}</span>
              <span
                className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                  slot.status === 'done' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                }`}
              >
                {slot.status === 'done' ? 'Done' : 'Upcoming'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div>
        <h3 className="text-sm font-semibold text-[#2E5B34] mb-2">Categories</h3>
        <div className="grid grid-cols-4 gap-2">
          {CATEGORIES.map((c) => {
            const isActive = selectedKind === c.kind;
            return (
              <button
                key={c.kind}
                onClick={() => setSelectedKind(c.kind)}
                className={`rounded-2xl p-3 flex flex-col items-center gap-1 transition-all duration-300 ${
                  isActive
                    ? 'bg-[#2E5B34] text-white shadow-md scale-105'
                    : 'bg-[#FFFDF8] text-[#2E5B34] shadow-sm'
                }`}
              >
                <span className="text-2xl">{c.emoji}</span>
                <span className="text-lg font-bold">{CATEGORY_COUNTS[c.kind]}</span>
                <span className="text-[10px] opacity-80">{c.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Animal list */}
      <div className="space-y-2">
        {filtered.map((animal) => (
          <div
            key={animal.id}
            className="bg-[#FFFDF8] rounded-2xl shadow-sm p-3 flex items-center gap-3"
          >
            <div className="w-11 h-11 rounded-full bg-[#F6F1E7] flex items-center justify-center text-2xl">
              {animal.emoji}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="font-semibold text-[#2E5B34]">{animal.name}</p>
                {animal.needsCheck && (
                  <span className="text-[9px] bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded-full font-semibold">
                    Check
                  </span>
                )}
              </div>
              <p className="text-[11px] text-gray-500 truncate">
                {animal.breed} · {animal.tagId} · {animal.ageYears}y
              </p>
            </div>
            <span
              className={`text-xs font-bold px-2 py-1 rounded-full ${
                animal.health >= 90
                  ? 'bg-green-100 text-green-700'
                  : animal.health >= 80
                  ? 'bg-amber-100 text-amber-700'
                  : 'bg-red-100 text-red-600'
              }`}
            >
              {animal.health}%
            </span>
            <span className="text-gray-300">›</span>
          </div>
        ))}
      </div>
    </div>
  );
}
