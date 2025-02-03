import React from 'react';
import { Users, Eye, Video } from 'lucide-react';
import { Channel } from '../types/youtube';
import { formatNumber } from '../utils/format';

interface ChannelCardProps {
  channel: Channel;
  onClick: (channelId: string) => void;
}

export function ChannelCard({ channel, onClick }: ChannelCardProps) {
  return (
    <div
      onClick={() => onClick(channel.id)}
      className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow"
    >
      <div className="flex items-center space-x-4">
        <img
          src={channel.thumbnailUrl}
          alt={channel.title}
          className="w-16 h-16 rounded-full"
        />
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900">{channel.title}</h3>
          <p className="text-sm text-gray-500 line-clamp-2">{channel.description}</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mt-6">
        <div className="flex items-center space-x-2">
          <Users className="w-5 h-5 text-blue-500" />
          <div>
            <p className="text-sm text-gray-500">Subscribers</p>
            <p className="font-semibold">{formatNumber(channel.subscriberCount)}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Eye className="w-5 h-5 text-green-500" />
          <div>
            <p className="text-sm text-gray-500">Views</p>
            <p className="font-semibold">{formatNumber(channel.viewCount)}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Video className="w-5 h-5 text-purple-500" />
          <div>
            <p className="text-sm text-gray-500">Videos</p>
            <p className="font-semibold">{formatNumber(channel.videoCount)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}