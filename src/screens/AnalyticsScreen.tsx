export function AnalyticsScreen() {
  const bars = [65, 80, 45, 90, 72, 88, 95];
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <div className="px-4 pt-4 pb-24 space-y-4">
      <h1 className="text-xl font-bold text-[#2E5B34]">Analytics</h1>
      <p className="text-xs text-gray-500 -mt-2">Weekly farm performance</p>

      {/* Yield chart */}
      <div className="bg-[#FFFDF8] rounded-3xl shadow-md p-4">
        <h3 className="text-sm font-semibold text-[#2E5B34] mb-4">Yield (kg)</h3>
        <div className="flex items-end justify-between h-36 gap-2">
          {bars.map((h, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <div
                className="w-full rounded-t-lg bg-gradient-to-t from-[#2E5B34] to-[#5BA85A] transition-all duration-700"
                style={{ height: `${h}%` }}
              />
              <span className="text-[9px] text-gray-500">{days[i]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-[#FFFDF8] rounded-3xl shadow-sm p-4">
          <p className="text-xs text-gray-500">Avg moisture</p>
          <p className="text-2xl font-bold text-[#2E5B34]">74%</p>
          <p className="text-[10px] text-green-600">↑ 3% vs last week</p>
        </div>
        <div className="bg-[#FFFDF8] rounded-3xl shadow-sm p-4">
          <p className="text-xs text-gray-500">Water used</p>
          <p className="text-2xl font-bold text-[#4A90C4]">8.4k L</p>
          <p className="text-[10px] text-green-600">↓ 5% efficient</p>
        </div>
        <div className="bg-[#FFFDF8] rounded-3xl shadow-sm p-4">
          <p className="text-xs text-gray-500">Livestock health</p>
          <p className="text-2xl font-bold text-green-600">96%</p>
          <p className="text-[10px] text-gray-500">48 / 48 healthy</p>
        </div>
        <div className="bg-[#FFFDF8] rounded-3xl shadow-sm p-4">
          <p className="text-xs text-gray-500">Crop growth</p>
          <p className="text-2xl font-bold text-[#E8A838]">79%</p>
          <p className="text-[10px] text-gray-500">On track for harvest</p>
        </div>
      </div>

      {/* Simple line SVG */}
      <div className="bg-[#FFFDF8] rounded-3xl shadow-sm p-4">
        <h3 className="text-sm font-semibold text-[#2E5B34] mb-3">Soil nutrients</h3>
        <svg viewBox="0 0 300 80" className="w-full h-20">
          <polyline
            fill="none"
            stroke="#2E5B34"
            strokeWidth="2.5"
            strokeLinecap="round"
            points="0,60 50,45 100,55 150,30 200,40 250,20 300,25"
          />
          <polyline
            fill="none"
            stroke="#E8A838"
            strokeWidth="2"
            strokeDasharray="4 3"
            points="0,50 50,55 100,40 150,48 200,35 250,42 300,38"
          />
        </svg>
        <div className="flex gap-4 mt-2 text-[10px]">
          <span className="flex items-center gap-1"><span className="w-3 h-0.5 bg-[#2E5B34]" /> Nitrogen</span>
          <span className="flex items-center gap-1"><span className="w-3 h-0.5 bg-[#E8A838]" /> Phosphorus</span>
        </div>
      </div>
    </div>
  );
}
