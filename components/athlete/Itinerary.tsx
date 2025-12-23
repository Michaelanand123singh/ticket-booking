'use client'

import React, { useState } from 'react'

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
        <section className="py-10 relative">
            <div className="container mx-auto px-[5%]">
                <h2 className="text-4xl md:text-5xl font-normal text-white mb-10 md:mb-20 text-left">Itinerary</h2>

                <div className="flex flex-col md:flex-row gap-8 md:gap-12 relative min-h-[400px] md:min-h-[600px]">

                    {/* Left Side: Interactive List */}
                    <div className="w-full md:w-1/3 flex flex-col gap-4 md:gap-6 relative z-20">
                        {items.map((item, index) => (
                            <div
                                key={index}
                                onMouseEnter={() => setSelectedIndex(index)}
                                // Click handler for mobile interactivity
                                onClick={() => setSelectedIndex(index)}
                                className={`
                                p-6 rounded-2xl cursor-pointer transition-all duration-300 border
                                ${selectedIndex === index
                                        ? 'bg-[#D4AF37] text-black border-[#D4AF37] scale-100 md:scale-105 shadow-[0_0_30px_rgba(212,175,55,0.3)]'
                                        : 'bg-white text-black border-white hover:bg-neutral-200'
                                    }
                            `}
                            >
                                <h3 className="text-lg md:text-xl font-normal text-center leading-tight">
                                    {item.title}
                                </h3>

                                {/* Mobile Only: Inline Description */}
                                <div className={`
                                mt-4 text-black/80 text-sm font-normal md:hidden overflow-hidden transition-all duration-500 ease-in-out
                                ${selectedIndex === index ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}
                            `}>
                                    <div className="h-0.5 w-12 bg-black/20 mx-auto my-3"></div>
                                    <p className="leading-relaxed">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Right Side: Description Display (Desktop Only) */}
                    <div className="hidden md:flex w-2/3 items-center justify-center relative">
                        {/* Active Description */}
                        {items.map((item, index) => (
                            <div
                                key={index}
                                className={`
                                absolute inset-0 flex items-center justify-center transition-all duration-500 ease-out
                                ${selectedIndex === index
                                        ? 'opacity-100 translate-x-0 pointer-events-auto'
                                        : 'opacity-0 translate-x-12 pointer-events-none'
                                    }
                            `}
                            >
                                <div className="bg-[#0f172a]/90 backdrop-blur-xl p-12 rounded-3xl border border-[#D4AF37]/30 max-w-2xl shadow-2xl relative overflow-hidden">
                                    {/* Decorative elements */}
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
                                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#D4AF37]/10 rounded-full blur-3xl -ml-16 -mb-16"></div>

                                    <h3 className="text-4xl font-normal text-white mb-6 relative z-10">
                                        {item.title}
                                    </h3>
                                    <div className="h-1 w-24 bg-[#D4AF37] mb-8 relative z-10"></div>
                                    <p className="text-gray-300 text-xl leading-relaxed relative z-10">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Decorative curved line (Desktop Only) */}
                    <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[1px] h-[80%] bg-gradient-to-b from-transparent via-[#D4AF37]/50 to-transparent hidden md:block"></div>
                </div>
            </div>
        </section>
    )
}
