'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, MapPin, TrendingUp, Ticket } from 'lucide-react';
import { SportEvent, TravelDemand, TicketDemand } from '@/types/events';

interface EventCardProps {
    event: SportEvent;
}

export default function EventCard({ event }: EventCardProps) {
    // Determine badge color based on demand
    const getDemandBadgeColor = (demand: TravelDemand | TicketDemand) => {
        switch (demand) {
            case 'EXTREME':
                return 'bg-red-500/20 text-red-400 border-red-500/50';
            case 'HIGH':
                return 'bg-orange-500/20 text-orange-400 border-orange-500/50';
            case 'MEDIUM':
                return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50';
            case 'LOW':
                return 'bg-green-500/20 text-green-400 border-green-500/50';
            default:
                return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
        }
    };

    return (
        <div className="group relative bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-[#D4AF37]/50 transition-all duration-500 hover:shadow-2xl hover:shadow-[#D4AF37]/20 hover:-translate-y-2">
            {/* Image Container */}
            <div className="relative h-56 overflow-hidden">
                <Image
                    src={event.imageUrl}
                    alt={event.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80" />

                {/* Demand Badges */}
                <div className="absolute top-4 right-4 flex flex-col gap-2">
                    {event.ticketDemand === 'EXTREME' && (
                        <div className={`px-3 py-1 rounded-full text-xs font-semibold border backdrop-blur-sm ${getDemandBadgeColor(event.ticketDemand)} flex items-center gap-1`}>
                            <Ticket className="w-3 h-3" />
                            High Demand
                        </div>
                    )}
                    {event.travelDemand === 'HIGH' && (
                        <div className={`px-3 py-1 rounded-full text-xs font-semibold border backdrop-blur-sm ${getDemandBadgeColor(event.travelDemand)} flex items-center gap-1`}>
                            <TrendingUp className="w-3 h-3" />
                            Popular
                        </div>
                    )}
                </div>

                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                    <div className="px-3 py-1 rounded-full text-xs font-semibold bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/50 backdrop-blur-sm">
                        {event.subCategory || event.sport}
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-[#D4AF37] transition-colors duration-300">
                    {event.name}
                </h3>

                <p className="text-sm text-gray-400 mb-4 line-clamp-2">
                    {event.description}
                </p>

                {/* Event Details */}
                <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                        <Calendar className="w-4 h-4 text-[#D4AF37]" />
                        <span>{event.dateRange}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                        <MapPin className="w-4 h-4 text-[#D4AF37]" />
                        <span>{event.city || event.venue}, {event.country}</span>
                    </div>
                </div>

                {/* Tags */}
                {event.tags && event.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                        {event.tags.slice(0, 3).map((tag, index) => (
                            <span
                                key={index}
                                className="px-2 py-1 text-xs rounded-md bg-white/5 text-gray-400 border border-white/10"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-3">
                    <Link
                        href={`/experiences/event/${event.id}`}
                        className="flex-1 bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-black px-4 py-2.5 rounded-lg font-semibold text-sm hover:shadow-lg hover:shadow-[#D4AF37]/50 transition-all duration-300 hover:scale-105 active:scale-95 text-center"
                    >
                        View Details
                    </Link>
                    <Link
                        href={`/enquiry/experiences?event=${event.id}`}
                        className="flex-1 bg-white/10 border border-white/20 text-white px-4 py-2.5 rounded-lg font-semibold text-sm hover:bg-white/20 transition-all duration-300 text-center backdrop-blur-sm"
                    >
                        Enquire Now
                    </Link>
                </div>
            </div>

            {/* Hover Glow Effect */}
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#D4AF37]/10 to-transparent" />
            </div>
        </div>
    );
}
