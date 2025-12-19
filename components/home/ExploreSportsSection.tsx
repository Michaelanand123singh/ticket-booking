"use client"

//NOTE (IMPORTANT) -> This file is to be kept in the project as the component in this file is to be used inside the experience page, make sure you do not delete this component.
//-Minaal
import React, { useRef } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import Link from 'next/link'

const sportsItems = [
    {
        id: 1,
        title: "Football",
        desc: "Experience the thrill of the beautiful game.",
        url: "https://images.unsplash.com/photo-1551958219-acbc608c6377?auto=format&fit=crop&q=80&w=1080",
        span: "row-span-3",
    },
    {
        id: 2,
        title: "Basketball",
        desc: "Feel the energy of the court.",
        url: "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&q=80&w=1080",
        span: "md:col-span-2",
    },
    {
        id: 4,
        title: "Cricket",
        desc: "The gentleman's game in all its glory.",
        url: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&q=80&w=1080",
        span: "row-span-2",
    },
    {
        id: 5,
        title: "Rugby",
        desc: "Intensity and passion on the field.",
        url: "https://images.unsplash.com/photo-1628891890467-b79f2c8ba9dc?auto=format&fit=crop&q=80&w=1080",
        span: "md:col-span-1",
    },
    {
        id: 3,
        title: "Tennis",
        desc: "Witness the precision and power.",
        url: "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?auto=format&fit=crop&q=80&w=1080",
        span: "md:col-span-2",
    },
    {
        id: 6,
        title: "Volleyball",
        desc: "Spike your way to victory.",
        url: "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?auto=format&fit=crop&q=80&w=1080",
        span: "row-span-2",
    },
]

export default function ExploreSportsSection() {
    const [offset, setOffset] = React.useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (containerRef.current) {
            const containerWidth = containerRef.current.clientWidth;
            const contentWidth = 1280;
            const maxOffset = Math.max(0, contentWidth - containerWidth);
            const scrollAmount = 300;

            setOffset(prev => {
                if (direction === 'left') {
                    return Math.max(0, prev - scrollAmount);
                } else {
                    return Math.min(maxOffset, prev + scrollAmount);
                }
            });
        }
    };

    return (
        <section className="pt-20 pb-0 bg-background relative">
            <div className="container mx-auto px-4 min-[425px]:px-12 relative z-20">
                <div className="flex items-center justify-between mb-2 pl-8 md:pl-16 pr-4 max-w-[1280px] mx-auto">
                    <h2 className="text-left text-white font-light text-xl sm:text-3xl flex flex-wrap items-center justify-start gap-4">
                        <span>Explore <span className="font-semibold text-blue-600">Sports</span></span>
                        <span className="font-thin text-white/50 tracking-tighter">&mdash;&mdash;&mdash;</span>
                    </h2>
                </div>

                <div className="relative max-w-[1280px] mx-auto">
                    <Button
                        variant="outline"
                        size="icon"
                        className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full h-10 w-10 z-30 bg-background/50 backdrop-blur-sm border-white/10 text-white hover:bg-white/10 hover:text-white"
                        onClick={() => scroll('left')}
                        disabled={offset === 0}
                    >
                        <ArrowLeft className={`h-5 w-5 ${offset === 0 ? 'opacity-50' : ''}`} />
                    </Button>

                    <Button
                        variant="outline"
                        size="icon"
                        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full h-10 w-10 z-30 bg-background/50 backdrop-blur-sm border-white/10 text-white hover:bg-white/10 hover:text-white"
                        onClick={() => scroll('right')}
                    >
                        <ArrowRight className="h-5 w-5" />
                    </Button>

                    <div
                        ref={containerRef}
                        className="w-full overflow-hidden"
                    >
                        <div
                            className='relative w-[1280px] h-[700px] transition-transform duration-500 ease-in-out mx-auto'
                            style={{ transform: `translateX(-${offset}px)` }}
                        >
                            {/* Football - Tall Vertical */}
                            <Link href="/experiences/football" className='absolute top-20 left-10 w-60 h-80 rounded-xl overflow-hidden group block'>
                                <img
                                    src={sportsItems.find(s => s.id === 1)?.url}
                                    alt="Football"
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90" />
                                <div className="absolute bottom-0 left-0 p-4 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                                    <h3 className="text-3xl font-normal text-white">Football</h3>
                                </div>
                            </Link>

                            {/* Basketball - Wide Horizontal */}
                            <Link href="/experiences/basketball" className='absolute top-10 left-80 w-80 h-60 rounded-xl overflow-hidden group block'>
                                <img
                                    src={sportsItems.find(s => s.id === 2)?.url}
                                    alt="Basketball"
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90" />
                                <div className="absolute bottom-0 left-0 p-4">
                                    <h3 className="text-3xl font-normal text-white">Basketball</h3>
                                </div>
                            </Link>

                            {/* Cricket - Tall Vertical */}
                            <Link href="/experiences/cricket" className='absolute top-80 left-80 w-60 h-80 rounded-xl overflow-hidden group block'>
                                <img
                                    src={sportsItems.find(s => s.id === 4)?.url}
                                    alt="Cricket"
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90" />
                                <div className="absolute bottom-0 left-0 p-4">
                                    <h3 className="text-3xl font-normal text-white">Cricket</h3>
                                </div>
                            </Link>

                            {/* Volleyball - Tall Vertical */}
                            <Link href="/experiences/volleyball" className='absolute top-5 left-[720px] w-60 h-80 rounded-xl overflow-hidden group block'>
                                <img
                                    src={sportsItems.find(s => s.id === 6)?.url}
                                    alt="Volleyball"
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90" />
                                <div className="absolute bottom-0 left-0 p-4">
                                    <h3 className="text-3xl font-normal text-white">Volleyball</h3>
                                </div>
                            </Link>

                            {/* Tennis - Wide Horizontal */}
                            <Link href="/experiences/tennis" className='absolute top-[360px] left-[640px] w-80 h-60 rounded-xl overflow-hidden group block'>
                                <img
                                    src={sportsItems.find(s => s.id === 3)?.url}
                                    alt="Tennis"
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90" />
                                <div className="absolute bottom-0 left-0 p-4">
                                    <h3 className="text-3xl font-normal text-white">Tennis</h3>
                                </div>
                            </Link>

                            {/* Rugby - Tall Vertical */}
                            <Link href="/experiences/rugby" className='absolute top-[200px] left-[1000px] w-60 h-80 rounded-xl overflow-hidden group block'>
                                <img
                                    src={sportsItems.find(s => s.id === 5)?.url}
                                    alt="Rugby"
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90" />
                                <div className="absolute bottom-0 left-0 p-4">
                                    <h3 className="text-3xl font-normal text-white">Rugby</h3>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
