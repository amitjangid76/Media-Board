import React from 'react';
import { Users, Eye, Video } from 'lucide-react';
import { formatNumber } from '../utils/format';
import { StatsCard } from './StatsCard';

export function ChannelCard({ channel, onClick }) {
  return (
    <div
      onClick={() => onClick(channel.id)}
      className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 cursor-pointer hover:shadow-xl transition-all hover:scale-[1.02] border border-gray-100"
    >
      <div className="flex items-center space-x-4">
        <img
          src={channel.thumbnailUrl}
          alt={channel.title}
          className="w-16 h-16 rounded-full ring-2 ring-purple-100"
        />
        <div className="flex-1">
          <h3 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            {channel.title}
          </h3>
          <p className="text-sm text-gray-600 line-clamp-2 mt-1">{channel.description}</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mt-6">
        <StatsCard
          icon={Users}
          label="Subscribers"
          value={formatNumber(channel.subscriberCount)}
          color="blue"
        />
        <StatsCard
          icon={Eye}
          label="Views"
          value={formatNumber(channel.viewCount)}
          color="green"
        />
        <StatsCard
          icon={Video}
          label="Videos"
          value={formatNumber(channel.videoCount)}
          color="purple"
        />
      </div>
    </div>
  );
}