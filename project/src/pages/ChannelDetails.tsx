import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRoute } from 'wouter';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Users, TrendingUp, DollarSign } from 'lucide-react';
import { getChannelsData, getChannelStats, getChannelVideos } from '../services/youtube';
import { formatNumber, formatCurrency } from '../utils/format';

export function ChannelDetails() {
  const [, params] = useRoute('/channel/:id');
  const channelId = params?.id;

  const { data: channel } = useQuery({
    queryKey: ['channel', channelId],
    queryFn: () => getChannelsData([channelId!]).then(channels => channels[0]),
    enabled: !!channelId,
  });

  const { data: stats } = useQuery({
    queryKey: ['channelStats', channelId],
    queryFn: () => getChannelStats(channelId!),
    enabled: !!channelId,
  });

  const { data: videos } = useQuery({
    queryKey: ['channelVideos', channelId],
    queryFn: () => getChannelVideos(channelId!),
    enabled: !!channelId,
  });

  if (!channel || !stats) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex items-center space-x-6">
          <img
            src={channel.thumbnailUrl}
            alt={channel.title}
            className="w-24 h-24 rounded-full"
          />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{channel.title}</h1>
            <p className="text-gray-600 mt-2">{channel.description}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-blue-50 p-6 rounded-lg">
            <div className="flex items-center space-x-3">
              <Users className="w-6 h-6 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900">Subscribers</h3>
            </div>
            <p className="text-2xl font-bold text-blue-600 mt-2">
              {formatNumber(channel.subscriberCount)}
            </p>
            <p className="text-sm text-gray-600 mt-1">
              +{formatNumber(stats.dailySubscriberGain)} today
            </p>
          </div>

          <div className="bg-green-50 p-6 rounded-lg">
            <div className="flex items-center space-x-3">
              <TrendingUp className="w-6 h-6 text-green-600" />
              <h3 className="text-lg font-semibold text-gray-900">Views</h3>
            </div>
            <p className="text-2xl font-bold text-green-600 mt-2">
              {formatNumber(channel.viewCount)}
            </p>
          </div>

          <div className="bg-purple-50 p-6 rounded-lg">
            <div className="flex items-center space-x-3">
              <DollarSign className="w-6 h-6 text-purple-600" />
              <h3 className="text-lg font-semibold text-gray-900">Est. Earnings</h3>
            </div>
            <p className="text-2xl font-bold text-purple-600 mt-2">
              {formatCurrency(stats.estimatedMonthlyEarnings.min)} - {formatCurrency(stats.estimatedMonthlyEarnings.max)}
            </p>
            <p className="text-sm text-gray-600 mt-1">per month</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Subscriber Growth</h2>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={[
                { date: '7 days ago', subscribers: channel.subscriberCount - stats.weeklySubscriberGain },
                { date: 'Today', subscribers: channel.subscriberCount },
              ]}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="subscribers" stroke="#2563eb" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {videos && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Videos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {videos.slice(0, 6).map((video) => (
              <div key={video.id} className="flex space-x-4">
                <img
                  src={video.thumbnailUrl}
                  alt={video.title}
                  className="w-48 h-27 object-cover rounded"
                />
                <div>
                  <h3 className="font-semibold text-gray-900 line-clamp-2">{video.title}</h3>
                  <p className="text-sm text-gray-600 mt-2">
                    {formatNumber(video.viewCount)} views
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}