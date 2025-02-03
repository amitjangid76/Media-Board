export interface Channel {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  subscriberCount: number;
  viewCount: number;
  videoCount: number;
  country?: string;
  joinDate: string;
}

export interface Video {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  viewCount: number;
  likeCount: number;
  commentCount: number;
  publishedAt: string;
  channelId: string;
  channelTitle: string;
}

export interface ChannelStats {
  dailySubscriberGain: number;
  weeklySubscriberGain: number;
  monthlySubscriberGain: number;
  estimatedDailyEarnings: {
    min: number;
    max: number;
  };
  estimatedMonthlyEarnings: {
    min: number;
    max: number;
  };
}