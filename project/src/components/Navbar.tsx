import React from 'react';
import { Link } from 'wouter';
import { BarChart2 } from 'lucide-react';

export function Navbar() {
  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <BarChart2 className="w-8 h-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">YT Analytics</span>
          </Link>
          
          <div className="flex items-center space-x-6">
            <Link href="/" className="text-gray-600 hover:text-gray-900">
              Home
            </Link>
            <Link href="/trending" className="text-gray-600 hover:text-gray-900">
              Trending
            </Link>
            <Link href="/leaderboard" className="text-gray-600 hover:text-gray-900">
              Leaderboard
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}