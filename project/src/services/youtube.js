import axios from 'axios';

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
const BASE_URL = 'https://www.googleapis.com/youtube/v3';

const youtubeApi = axios.create({
  baseURL: BASE_URL,
  params: {
    key: API_KEY,
  },
});

export async function searchChannels(query) {
  const response = await youtubeApi.get('/search', {
    params: {
      part: 'snippet',
      type: 'channel',
      q: query,
      maxResults: 10,
    },
  });

  const channelIds = response.data.items.map(item => item.id.channelId);
  const channelsData = await getChannelsData(channelIds);

  return channelsData;
}

export async function getChannelsData(channelIds) {
  const response = await youtubeApi.get('/channels', {
    params: {
      part: 'snippet,statistics',
      id: channelIds.join(','),
    },
  });

  return response.data.items.map(item => ({
    id: item.id,
    title: item.snippet.title,
    description: item.snippet.description,
    thumbnailUrl: item.snippet.thumbnails.default.url,
    subscriberCount: parseInt(item.statistics.subscriberCount),
    viewCount: parseInt(item.statistics.viewCount),
    videoCount: parseInt(item.statistics.videoCount),
    country: item.snippet.country,
    joinDate: item.snippet.publishedAt,
  }));
}

export async function getChannelStats(channelId) {
  // Mock implementation
  return {
    dailySubscriberGain: Math.floor(Math.random() * 1000),
    weeklySubscriberGain: Math.floor(Math.random() * 5000),
    monthlySubscriberGain: Math.floor(Math.random() * 20000),
    estimatedDailyEarnings: {
      min: Math.floor(Math.random() * 100),
      max: Math.floor(Math.random() * 1000),
    },
    estimatedMonthlyEarnings: {
      min: Math.floor(Math.random() * 3000),
      max: Math.floor(Math.random() * 30000),
    },
  };
}

export async function getChannelVideos(channelId) {
  const response = await youtubeApi.get('/search', {
    params: {
      part: 'snippet',
      channelId,
      order: 'date',
      type: 'video',
      maxResults: 50,
    },
  });

  const videoIds = response.data.items.map(item => item.id.videoId);
  const videosData = await getVideosData(videoIds);

  return videosData;
}

export async function getVideosData(videoIds) {
  const response = await youtubeApi.get('/videos', {
    params: {
      part: 'snippet,statistics',
      id: videoIds.join(','),
    },
  });

  return response.data.items.map(item => ({
    id: item.id,
    title: item.snippet.title,
    description: item.snippet.description,
    thumbnailUrl: item.snippet.thumbnails.medium.url,
    viewCount: parseInt(item.statistics.viewCount),
    likeCount: parseInt(item.statistics.likeCount),
    commentCount: parseInt(item.statistics.commentCount),
    publishedAt: item.snippet.publishedAt,
    channelId: item.snippet.channelId,
    channelTitle: item.snippet.channelTitle,
  }));
}