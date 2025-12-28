'use client'

import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react'

interface ItineraryItem {
    title: string;
    description: string;
}

interface ItineraryProps {
    items: ItineraryItem[];
}

export default function Itinerary({ items }: ItineraryProps) {
    const [selectedIndex, setSelectedIndex] = useState<number>(0);

    return (
        <section className="py-0 relative mb-20">
            <div className="container mx-auto px-12 md:px-16">
                <h2 className="text-2xl sm:text-4xl font-normal text-white mb-6 text-left">Itinerary</h2>

                <div className="flex flex-col md:flex-row gap-8 md:gap-12 relative ml-2 md:ml-8">

                    {/* Left Side: Interactive List */}
                    <div className="w-full md:w-1/3 flex flex-col gap-4 md:gap-6 relative z-20">
                        {items.map((item, index) => (
                            <div
                                key={index}
                                onMouseEnter={() => setSelectedIndex(index)}
                                // Click handler for mobile interactivity
                                onClick={() => setSelectedIndex(index)}
                                className={`
                                p-4 md:p-6 rounded-2xl cursor-pointer transition-all duration-300 border
                                flex flex-col justify-center
                                ${selectedIndex === index
                                        ? 'bg-[#D4AF37] text-black border-transparent scale-100 md:scale-105 shadow-[0_0_30px_rgba(212,175,55,0.3)]'
                                        : 'bg-white text-black border-white hover:bg-neutral-200'
                                    }
                            `}
                            >
                                <div className="flex flex-col items-center gap-2">
                                    <h3 className="text-base md:text-lg font-normal text-center leading-tight">
                                        {item.title}
                                    </h3>
                                    {/* Mobile Only: Chevron Icon */}
                                    <ChevronDown
                                        className={`w-4 h-4 md:hidden transition-transform duration-300 ${selectedIndex === index ? 'rotate-180' : ''
                                            }`}
                                    />
                                </div>

                                {/* Mobile Only: Inline Description */}
                                <div className={`
                                mt-4 text-black/80 text-sm font-normal md:hidden overflow-hidden transition-all duration-500 ease-in-out
                                ${selectedIndex === index ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}
                            `}>

                                    <p className="leading-relaxed">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Right Side: Description Display (Desktop Only) */}
                    <div className="hidden md:flex w-2/3 items-start justify-center relative pl-8">
                        {/* Active Description */}
                        {items.map((item, index) => (
                            <div
                                key={index}
                                className={`
                                absolute inset-0 transition-all duration-500 ease-out
                                ${selectedIndex === index
                                        ? 'opacity-100 translate-x-0 pointer-events-auto'
                                        : 'opacity-0 translate-x-12 pointer-events-none'
                                    }
                            `}
                            >
                                <div className="bg-[#0f172a]/90 backdrop-blur-xl p-12 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden">
                                    <h3 className="text-xl sm:text-2xl font-normal text-white mb-6 relative z-10">
                                        {item.title}
                                    </h3>

                                    <p className="text-gray-300 text-sm md:text-base leading-relaxed relative z-10">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Decorative curved line (Desktop Only) */}

                </div>
            </div>
        </section>
    )
}
