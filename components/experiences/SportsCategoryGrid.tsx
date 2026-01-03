'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { SportCategory } from '@/types/events';
import { getEventsByCategory } from '@/lib/events';

const sportsCategories = [
    {
        id: 'motorsports',
        title: 'Motorsports',
        category: SportCategory.MOTORSPORTS,
        image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=1200',
        description: 'F1, MotoGP, Le Mans, and more',
        icon: '🏎️'
    },
    {
        id: 'tennis',
        title: 'Tennis',
        category: SportCategory.TENNIS,
        image: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?q=80&w=1200',
        description: 'Grand Slams, Masters 1000, ATP Finals',
        icon: '🎾'
    },
    {
        id: 'football',
        title: 'Football',
        category: SportCategory.FOOTBALL,
        image: 'https://images.unsplash.com/photo-1551958219-acbc608c6377?q=80&w=1200',
        description: 'World Cup, UEFA, Premier League',
        icon: '⚽'
    },
    {
        id: 'cricket',
        title: 'Cricket',
        category: SportCategory.CRICKET,
        image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?q=80&w=1200',
        description: 'T20 World Cup, IPL, Test Series',
        icon: '🏏'
    },
    {
        id: 'rugby',
        title: 'Rugby',
        category: SportCategory.RUGBY,
        image: 'https://images.unsplash.com/photo-1628891890467-b79f2c8ba9dc?q=80&w=1200',
        description: 'Six Nations, Super Rugby, World Cup',
        icon: '🏉'
    },
    {
        id: 'basketball',
        title: 'Basketball',
        category: SportCategory.BASKETBALL,
        image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=1200',
        description: 'NBA, NCAA, EuroLeague, FIBA',
        icon: '🏀'
    },
    {
        id: 'other',
        title: 'Other Sports',
        category: SportCategory.OTHER,
        image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?q=80&w=1200',
        description: 'Olympics, Asian Games, Tour de France',
        icon: '🎯'
    }
];

export default function SportsCategoryGrid() {
    return (
        <div className="px-10 md:px-20">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sportsCategories.map((sport) => {
                    const eventCount = getEventsByCategory(sport.category).length;

                    return (
                        <Link
                            key={sport.id}
                            href={`/experiences/${sport.id}`}
                            className="group relative bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-[#D4AF37]/50 transition-all duration-500 hover:shadow-2xl hover:shadow-[#D4AF37]/20 hover:-translate-y-2"
                        >
                            {/* Background Image */}
                            <div className="relative h-64 overflow-hidden">
                                <Image
                                    src={sport.image}
                                    alt={sport.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />

                                {/* Icon Badge */}
                                <div className="absolute top-4 right-4">
                                    <div className="w-16 h-16 rounded-full bg-[#D4AF37]/20 backdrop-blur-sm border border-[#D4AF37]/50 flex items-center justify-center text-3xl">
                                        {sport.icon}
                                    </div>
                                </div>

                                {/* Event Count Badge */}
                                <div className="absolute top-4 left-4">
                                    <div className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-semibold">
                                        {eventCount} Events
                                    </div>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-[#D4AF37] transition-colors duration-300">
                                    {sport.title}
                                </h3>
                                <p className="text-gray-400 text-sm mb-4">
                                    {sport.description}
                                </p>

                                {/* CTA */}
                                <div className="flex items-center gap-2 text-[#D4AF37] font-semibold text-sm group-hover:gap-3 transition-all duration-300">
                                    <span>Explore Events</span>
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </div>

                            {/* Hover Glow Effect */}
                            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#D4AF37]/10 to-transparent" />
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
