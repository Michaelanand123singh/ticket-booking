"use client"
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Carousel } from "@ark-ui/react/carousel"
import { ArrowRight } from "lucide-react"
import AnimatedContent from './AnimatedContent'

interface Tournament {
    src: string;
    name: string;
    link: string;
    dateRange: string;
    location: string;
    tagline: string;
}

export const TrendingTournamentsCarousel = ({ items }: { items?: Tournament[] }) => {
    const defaultTournaments: Tournament[] = [
        {
            src: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=1000&auto=format&fit=crop", // Cricket stadium
            name: "ICC MEN'S T20 WORLD CUP",
            dateRange: "Feb 7 – Mar 8, 2026",
            location: "India & Sri Lanka 🇮🇳 🇱🇰",
            tagline: "The tournament that unites a billion hearts.",
            link: "/experiences/cricket/t20-world-cup"
        },
        {
            src: "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?q=80&w=1000&auto=format&fit=crop", // Tennis court clay
            name: "FRENCH OPEN 2026",
            dateRange: "May 24 – Jun 7, 2026",
            location: "Paris, France 🇫🇷",
            tagline: "Grace, grit, and unforgettable moments.",
            link: "/experiences/tennis/french-open"
        },
        {
            src: "https://images.unsplash.com/photo-1551958219-acbc608c6377?auto=format&fit=crop&q=80&w=1000", // Football (Confirmed working from SportsCarousel)
            name: "UEFA FINAL – HUNGARY",
            dateRange: "May /June 2026",
            location: "Budapest, Hungary 🇭🇺",
            tagline: "The final. The dream. Make it yours.",
            link: "/experiences/football/uefa-final"
        },
        {
            src: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=1000&auto=format&fit=crop", // F1 Car/Track
            name: "MONACO GRAND PRIX",
            dateRange: "June 5–7, 2026",
            location: "Monte Carlo, Monaco 🇲🇨",
            tagline: "Feel the adrenaline. Experience the prestige.",
            link: "/experiences/f1/monaco-grand-prix"
        },
        {
            src: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?q=80&w=1000&auto=format&fit=crop", // F1/Racing generic
            name: "SILVERSTONE GRAND PRIX",
            dateRange: "July 4–6, 2026 (estimated)",
            location: "Silverstone, Great Britain 🇬🇧",
            tagline: "Speed, history, and pure racing passion.",
            link: "/experiences/f1/silverstone-grand-prix"
        },
    ];

    const tournaments = items || defaultTournaments;
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        if (isHovered) return;

        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % tournaments.length);
        }, 3000);
        return () => clearInterval(timer);
    }, [tournaments.length, isHovered]);

    return (
        <div
            className="w-full relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onTouchStart={() => setIsHovered(true)}
            onTouchEnd={() => setIsHovered(false)}
        >
            <Carousel.Root
                page={currentIndex}
                onPageChange={(d: any) => setCurrentIndex(d.page)}
                slideCount={tournaments.length}
                loop
                className="w-full"
            >
                <Carousel.ItemGroup className="overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent),linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] [mask-composite:intersect] [-webkit-mask-composite:source-in]">
                    {tournaments.map((tournament, index) => (
                        <Carousel.Item key={index} index={index}>
                            <div className="block relative w-full h-[350px] sm:h-[450px] lg:h-[500px] group cursor-default">
                                <img
                                    src={tournament.src}
                                    alt={tournament.name}
                                    className="w-full h-full object-cover"
                                />

                                {/* Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent flex flex-col justify-end p-6 md:p-10">
                                    <div className="space-y-4 max-w-4xl">

                                        <h3 className="text-white text-xl md:text-3xl font-bold uppercase tracking-tight">
                                            {tournament.name}
                                        </h3>

                                        <div className="flex flex-wrap items-center gap-2 md:gap-4 text-xs md:text-sm text-gray-200">
                                            <span className="text-[#D4AF37] font-semibold">{tournament.dateRange}</span>
                                            <span className="hidden sm:inline w-1.5 h-1.5 rounded-full bg-gray-500"></span>
                                            <span>{tournament.location}</span>
                                        </div>

                                        <p className="text-sm md:text-base text-gray-300 italic border-l-4 border-[#D4AF37] pl-4 py-1">
                                            {tournament.tagline}
                                        </p>

                                        <Link href={tournament.link} className="inline-flex items-center gap-2 bg-[#D4AF37] text-black text-xs font-bold px-6 py-2 rounded-none uppercase tracking-wider hover:bg-white transition-all duration-300 mt-4 cursor-pointer w-fit">
                                            Know More <ArrowRight size={14} />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </Carousel.Item>
                    ))}
                </Carousel.ItemGroup>

                <Carousel.IndicatorGroup className="flex justify-center gap-3 mt-6">
                    {tournaments.map((_, i) => (
                        <Carousel.Indicator
                            key={i}
                            index={i}
                            className="w-2 h-2 rounded-full bg-white/30 data-current:bg-[#D4AF37] data-current:w-8 transition-all duration-300 cursor-pointer"
                        />
                    ))}
                </Carousel.IndicatorGroup>
            </Carousel.Root>
        </div>
    );
}

export default function TrendingTournaments() {
    return (
        <section className="py-16 text-foreground relative">
            <div className="container mx-auto px-4 min-[425px]:px-12 relative z-20">
                <AnimatedContent
                    distance={100}
                    direction="vertical"
                    duration={1}
                    ease="power3.out"
                    delay={0.1}
                >
                    <div className="mb-8">
                        <h2 className="text-xl sm:text-3xl lg:text-4xl font-normal text-left mb-2">
                            TOP UPCOMING <span className="text-[#D4AF37] font-normal">EXPERIENCES</span>
                            <span className="inline-block h-[2px] sm:h-[4px] w-16 sm:w-24 bg-[#D4AF37] ml-3 sm:ml-4 align-middle"></span>
                        </h2>
                        <p className="text-gray-400 text-sm sm:text-lg italic">The match you dream of. The trip you deserve.</p>
                    </div>
                </AnimatedContent>
                <AnimatedContent
                    distance={100}
                    direction="vertical"
                    duration={1}
                    ease="power3.out"
                    delay={0.3}
                >
                    <div className="w-full">
                        <TrendingTournamentsCarousel />
                    </div>
                </AnimatedContent>
            </div>
        </section>
    )
}

