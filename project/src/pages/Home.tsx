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

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleChannelClick = (channelId: string) => {
    setLocation(`/channel/${channelId}`);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          YouTube Channel Analytics
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Search and analyze YouTube channels to get detailed statistics and insights
        </p>
        <SearchBar onSearch={handleSearch} />
      </div>

      {isLoading && (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        </div>
      )}

      {channels && (
        <div className="grid grid-cols-1 gap-6 mt-8">
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