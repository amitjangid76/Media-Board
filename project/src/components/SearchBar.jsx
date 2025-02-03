import React, { useState } from 'react';
import { Search } from 'lucide-react';

export function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative flex items-center">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for YouTube channels..."
          className="w-full px-6 py-4 pl-14 text-lg text-gray-900 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-lg"
        />
        <Search className="absolute left-4 text-gray-400 w-6 h-6" />
        <button
          type="submit"
          className="absolute right-3 px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:opacity-90 transition-opacity font-medium"
        >
          Search
        </button>
      </div>
    </form>
  );
}