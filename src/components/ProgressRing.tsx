import { motion, useReducedMotion } from 'framer-motion';
import { spring } from '../motion';

interface Props {
  percent: number;
  size?: number;
  stroke?: number;
  color?: string;
  label?: string;
  sublabel?: string;
  delay?: number;
}

export function ProgressRing({
  percent,
  size = 88,
  stroke = 8,
  color = '#2E5B34',
  label,
  sublabel,
  delay = 0,
}: Props) {
  const reduce = useReducedMotion();
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (percent / 100) * circ;

  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke="#E8E2D6"
            strokeWidth={stroke}
          />
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke={color}
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circ}
            initial={{ strokeDashoffset: circ }}
            animate={{ strokeDashoffset: reduce ? offset : offset }}
            transition={reduce ? { duration: 0 } : { ...spring, delay }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm font-bold text-[#2E5B34]">{percent}%</span>
        </div>
      </div>
      {label && <span className="text-xs font-semibold text-[#2E5B34]">{label}</span>}
      {sublabel && <span className="text-[10px] text-gray-500">{sublabel}</span>}
    </div>
  );
}
