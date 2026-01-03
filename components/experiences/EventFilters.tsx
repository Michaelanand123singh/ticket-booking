'use client';

import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { SportCategory } from '@/types/events';

interface EventFiltersProps {
    selectedCategory: SportCategory | 'ALL';
    onCategoryChange: (category: SportCategory | 'ALL') => void;
    searchQuery: string;
    onSearchChange: (query: string) => void;
}

const categories = [
    { value: 'ALL', label: 'All Sports', icon: '🏆' },
    { value: SportCategory.MOTORSPORTS, label: 'Motorsports', icon: '🏎️' },
    { value: SportCategory.TENNIS, label: 'Tennis', icon: '🎾' },
    { value: SportCategory.FOOTBALL, label: 'Football', icon: '⚽' },
    { value: SportCategory.CRICKET, label: 'Cricket', icon: '🏏' },
    { value: SportCategory.RUGBY, label: 'Rugby', icon: '🏉' },
    { value: SportCategory.BASKETBALL, label: 'Basketball', icon: '🏀' },
    { value: SportCategory.OTHER, label: 'Other Sports', icon: '🎯' },
];

export default function EventFilters({
    selectedCategory,
    onCategoryChange,
    searchQuery,
    onSearchChange,
}: EventFiltersProps) {
    const [isSearchFocused, setIsSearchFocused] = useState(false);

    return (
        <div className="space-y-6">
            {/* Search Bar */}
            <div className="relative">
                <div
                    className={`relative flex items-center bg-white/5 backdrop-blur-sm rounded-xl border transition-all duration-300 ${isSearchFocused
                            ? 'border-[#D4AF37] shadow-lg shadow-[#D4AF37]/20'
                            : 'border-white/10'
                        }`}
                >
                    <Search className="absolute left-4 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search events, venues, or countries..."
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                        onFocus={() => setIsSearchFocused(true)}
                        onBlur={() => setIsSearchFocused(false)}
                        className="w-full pl-12 pr-4 py-4 bg-transparent text-white placeholder-gray-400 focus:outline-none"
                    />
                    {searchQuery && (
                        <button
                            onClick={() => onSearchChange('')}
                            className="absolute right-4 text-gray-400 hover:text-white transition-colors"
                        >
                            ✕
                        </button>
                    )}
                </div>
            </div>

            {/* Category Filters */}
            <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Filter className="w-4 h-4" />
                    <span>Filter by Sport</span>
                </div>

                {/* Desktop: Horizontal Scroll */}
                <div className="hidden md:flex gap-3 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
                    {categories.map((category) => (
                        <button
                            key={category.value}
                            onClick={() => onCategoryChange(category.value as SportCategory | 'ALL')}
                            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm whitespace-nowrap transition-all duration-300 ${selectedCategory === category.value
                                    ? 'bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-black shadow-lg shadow-[#D4AF37]/30 scale-105'
                                    : 'bg-white/5 text-gray-300 border border-white/10 hover:bg-white/10 hover:border-white/20'
                                }`}
                        >
                            <span className="text-lg">{category.icon}</span>
                            <span>{category.label}</span>
                        </button>
                    ))}
                </div>

                {/* Mobile: Grid */}
                <div className="grid grid-cols-2 gap-3 md:hidden">
                    {categories.map((category) => (
                        <button
                            key={category.value}
                            onClick={() => onCategoryChange(category.value as SportCategory | 'ALL')}
                            className={`flex flex-col items-center gap-2 px-4 py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${selectedCategory === category.value
                                    ? 'bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-black shadow-lg shadow-[#D4AF37]/30'
                                    : 'bg-white/5 text-gray-300 border border-white/10 hover:bg-white/10'
                                }`}
                        >
                            <span className="text-2xl">{category.icon}</span>
                            <span className="text-xs">{category.label}</span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
