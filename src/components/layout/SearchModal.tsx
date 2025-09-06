"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Search, X, Clock, TrendingUp } from "lucide-react";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');

  const recentSearches = [
    'Issue tracking in Dhaka',
    'Transparency reports',
    'Fund allocation 2024',
    'NID verification'
  ];

  const trendingSearches = [
    'Road repair status',
    'Healthcare fund tracking',
    'Education project updates',
    'Water supply issues'
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-md animate-fadeInUp">
      <div className="container mx-auto px-4 pt-20">
        <div className="max-w-2xl mx-auto glass-modal rounded-2xl shadow-2xl overflow-hidden">
          {/* Search Header */}
          <div className="flex items-center gap-4 p-6 border-b border-gray-100">
            <Search className="h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search issues, projects, or transparency data..."
              className="flex-1 text-lg outline-none placeholder-gray-400"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoFocus
            />
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Search Content */}
          <div className="p-6 max-h-96 overflow-y-auto">
            {query ? (
              // Search Results
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Search Results</h3>
                <div className="space-y-2">
                  <div className="p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <div className="font-medium">Road Repair Project - Dhanmondi</div>
                    <div className="text-sm text-gray-500">Status: In Progress • Fund: ৳2.5M</div>
                  </div>
                  <div className="p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <div className="font-medium">Healthcare Transparency Report</div>
                    <div className="text-sm text-gray-500">Updated: 2 days ago • Views: 1.2K</div>
                  </div>
                </div>
              </div>
            ) : (
              // Recent & Trending
              <div className="space-y-6">
                {/* Recent Searches */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <h3 className="text-sm font-medium text-gray-500">Recent Searches</h3>
                  </div>
                  <div className="space-y-1">
                    {recentSearches.map((search, index) => (
                      <div
                        key={index}
                        className="p-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg cursor-pointer"
                        onClick={() => setQuery(search)}
                      >
                        {search}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Trending Searches */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <TrendingUp className="h-4 w-4 text-teal-500" />
                    <h3 className="text-sm font-medium text-gray-500">Trending</h3>
                  </div>
                  <div className="space-y-1">
                    {trendingSearches.map((search, index) => (
                      <div
                        key={index}
                        className="p-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg cursor-pointer"
                        onClick={() => setQuery(search)}
                      >
                        {search}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
