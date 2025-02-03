import React from 'react';

export function StatsCard({ icon: Icon, label, value, color }) {
  const gradientClasses = {
    blue: 'from-blue-500/10 to-blue-500/5 text-blue-700',
    green: 'from-green-500/10 to-green-500/5 text-green-700',
    purple: 'from-purple-500/10 to-purple-500/5 text-purple-700',
    pink: 'from-pink-500/10 to-pink-500/5 text-pink-700',
  };

  return (
    <div className={`bg-gradient-to-br ${gradientClasses[color]} p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow`}>
      <div className="flex items-center space-x-3">
        <Icon className="w-6 h-6" />
        <h3 className="text-lg font-semibold">{label}</h3>
      </div>
      <p className="text-2xl font-bold mt-3">{value}</p>
    </div>
  );
}