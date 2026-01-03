"use client"
import React, { useState } from 'react'
import AnimatedContent from './AnimatedContent'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

export default function WhatWeOffer() {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <section className="py-16 text-foreground relative overflow-hidden">
            <div className="container mx-auto px-4 min-[425px]:px-12 relative z-20">
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start">
                    {/* Left Column - Image */}
                    <div className="w-full lg:w-5/12 relative">
                        <AnimatedContent
                            distance={100}
                            direction="horizontal"
                            reverse={true}
                            duration={1}
                            ease="power3.out"
                            delay={0.1}
                        >
                            <div className="relative aspect-[4/5] w-full max-w-[400px] mx-auto lg:mx-0 rounded-none overflow-hidden shadow-xl border border-white/10">
                                <Image
                                    src="/images/who-we-are.jpg" // Stadium/Fans (Reliable replacement)
                                    alt="Who we are"
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                            </div>
                        </AnimatedContent>
                    </div>

                    {/* Right Column - Text */}
                    <div className="w-full lg:w-7/12 flex flex-col justify-center pt-4">
                        <AnimatedContent
                            distance={100}
                            direction="horizontal"
                            duration={1}
                            ease="power3.out"
                            delay={0.3}
                        >
                            <h2 className="text-xl sm:text-3xl font-normal mb-2">
                                Who we <span className="text-[#D4AF37]">are</span>
                            </h2>
                            <h3 className="text-lg sm:text-xl font-normal text-gray-400 mb-6">
                                We've lived both stories.
                            </h3>

                            <div className="space-y-6 text-base text-gray-300 font-light leading-relaxed">
                                <p>
                                    We know what it feels like to stand in a stadium: heart racing, moment approaching, logistics stolen your focus. We know the athlete's side too: the pressure to perform, the logistical chaos before the race starts, the energy drained by travel stress instead of saved for competition.
                                </p>

                                <div className={`space-y-6 overflow-hidden transition-all duration-500 ${isExpanded ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                                    <p>
                                        We've been fans chasing that perfect match day experience. We've been athletes navigating the maze of flights, hotels, team coordination, trying to stay sharp when everything around us felt chaotic.
                                    </p>

                                    <div className="py-2 border-l-2 border-[#D4AF37] pl-4">
                                        <h4 className="text-xl sm:text-2xl font-medium text-white italic">"This is why we exist."</h4>
                                    </div>

                                    <div className="space-y-4">
                                        <p>
                                            People remember how you made them feel. In sports, that feeling starts before the whistle blows. It starts with someone who understands.
                                        </p>
                                        <p className="text-white font-medium text-lg">
                                            We are those someones for you.
                                        </p>
                                    </div>
                                </div>

                                <button
                                    onClick={() => setIsExpanded(!isExpanded)}
                                    className="text-[#D4AF37] text-sm font-medium hover:text-white transition-colors flex items-center gap-2 mt-2"
                                >
                                    {isExpanded ? 'View Less' : 'View More'}
                                    <ArrowRight size={16} className={`transition-transform duration-300 ${isExpanded ? '-rotate-90' : 'rotate-90'}`} />
                                </button>
                            </div>
                        </AnimatedContent>
                    </div>
                </div>
            </div>
        </section>
    )
}
