import React from 'react';
import { Link } from 'wouter';
import { BarChart2, TrendingUp, Trophy, Home as HomeIcon } from 'lucide-react';

export function Navbar() {
  return (
    <nav className="bg-white/70 backdrop-blur-md shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-2 rounded-lg">
              <BarChart2 className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Media Board
            </span>
          </Link>
          
          <div className="flex items-center space-x-8">
            {[
              { href: '/', icon: HomeIcon, label: 'Home' },
              { href: '/trending', icon: TrendingUp, label: 'Trending' },
              { href: '/leaderboard', icon: Trophy, label: 'Leaderboard' },
            ].map(({ href, icon: Icon, label }) => (
              <Link
                key={href}
                href={href}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <Icon className="w-4 h-4" />
                <span>{label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}