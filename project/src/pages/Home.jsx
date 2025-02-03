import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'wouter';
import { SearchBar } from '../components/SearchBar';
import { ChannelCard } from '../components/ChannelCard';
import { searchChannels } from '../services/youtube';

export function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [, setLocation] = useLocation();

  const { data: channels, isLoading } = useQuery({
    queryKey: ['channels', searchQuery],
    queryFn: () => searchChannels(searchQuery),
    enabled: !!searchQuery,
  });

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleChannelClick = (channelId) => {
    setLocation(`/channel/${channelId}`);
  };

  return (
    <div className="max-w-6xl mx-auto px-4">
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-6 animate-gradient">
          Media Board Analytics
        </h1>
        <p className="text-xl text-gray-600 mb-12 max-w-2xl">
          Discover and analyze YouTube channels with powerful insights and real-time statistics
        </p>
        <div className="w-full max-w-2xl mx-auto">
          <SearchBar onSearch={handleSearch} />
        </div>
      </div>

      {isLoading && (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-200 border-t-purple-600"></div>
        </div>
      )}

      {channels && (
        <div className="grid grid-cols-1 gap-8 mt-8 mb-12">
          {channels.map((channel) => (
            <ChannelCard
              key={channel.id}
              channel={channel}
              onClick={handleChannelClick}
            />
          ))}
        </div>
      )}
    </div>
  );
}