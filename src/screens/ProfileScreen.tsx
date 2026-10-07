export function ProfileScreen() {
  return (
    <div className="px-4 pt-4 pb-24 space-y-4">
      <h1 className="text-xl font-bold text-[#2E5B34]">Profile</h1>

      <div className="bg-[#FFFDF8] rounded-3xl shadow-md p-6 flex flex-col items-center">
        <div className="w-20 h-20 rounded-full bg-[#2E5B34]/15 flex items-center justify-center text-4xl mb-3">
          🧑‍🌾
        </div>
        <p className="text-lg font-bold text-[#2E5B34]">Guest Farmer</p>
        <p className="text-xs text-gray-500">Green Valley Farm</p>
        <span className="mt-2 px-3 py-1 bg-[#2E5B34]/10 text-[#2E5B34] text-xs font-semibold rounded-full">
          Owner
        </span>
      </div>

      <div className="bg-[#FFFDF8] rounded-3xl shadow-sm divide-y divide-[#E8E2D6]">
        {[
          { icon: '🏞️', label: 'Farm size', value: '12.5 ha' },
          { icon: '📅', label: 'Member since', value: 'Mar 2024' },
          { icon: '🏆', label: 'Badges', value: '12 earned' },
          { icon: '⚙️', label: 'Settings', value: '' },
          { icon: '❓', label: 'Help & support', value: '' },
        ].map((item) => (
          <button
            key={item.label}
            className="w-full flex items-center gap-3 px-4 py-3.5 text-left hover:bg-[#F6F1E7]/50 transition-colors"
          >
            <span className="text-xl">{item.icon}</span>
            <span className="flex-1 text-sm font-medium text-[#2E5B34]">{item.label}</span>
            {item.value && <span className="text-xs text-gray-500">{item.value}</span>}
            <span className="text-gray-300">›</span>
          </button>
        ))}
      </div>

      <p className="text-center text-[10px] text-gray-400 pt-4">
        Green Valley Farm PWA v1.0.0 · Works offline 🌾
      </p>
    </div>
  );
}
