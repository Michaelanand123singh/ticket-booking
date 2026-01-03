
"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import AnimatedContent from './AnimatedContent'
import { ArrowRight } from 'lucide-react'

const AthleteCard = ({ card }: { card: any }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="relative w-full h-[450px] rounded-none overflow-hidden border border-white/10 group">
            {/* Background Image - Full Color, No Hover Effects */}
            <Image
                src={card.image}
                alt={card.title}
                fill
                className="object-cover"
            />

            {/* Dark Gradient Overlay for Readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />

            {/* Content Overlay */}
            <div className="absolute inset-0 p-8 flex flex-col justify-end items-start text-left">
                <h3 className="text-2xl font-normal mb-2 text-white">{card.title}</h3>
                <h4 className="text-lg text-[#D4AF37] font-normal mb-4">{card.headline}</h4>

                <div className="mb-4 text-sm text-gray-200 font-light relative">
                    <p className={`${isExpanded ? '' : 'line-clamp-2'} transition-all duration-300`}>
                        {card.description}
                    </p>
                    {card.description.length > 80 && (
                        <button
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="text-[#D4AF37] text-xs mt-1 hover:underline inline-flex items-center gap-1 font-medium"
                        >
                            {isExpanded ? 'View Less' : 'View More'}
                        </button>
                    )}
                </div>

                <p className="text-sm text-gray-300 italic mb-6 font-light border-l-2 border-[#D4AF37] pl-3">
                    "{card.tagline}"
                </p>

                <Link
                    href={card.link}
                    className="inline-flex items-center gap-2 bg-[#D4AF37] text-black text-xs font-bold px-6 py-3 rounded-none uppercase tracking-wider hover:bg-white transition-all duration-300"
                >
                    {card.buttonText} <ArrowRight size={14} />
                </Link>
            </div>
        </div>
    )
}

export default function AthleteDisplaySection() {
    const cards = [
        {
            title: "Recreational Athletes",
            headline: "Marathon, Cycling, Triathlon",
            tagline: "Race ready. Stress-free. Finish strong.",
            description: "Marathon in Dubai? Cycling in Europe? Triathlon somewhere epic? We package race entries, travel, stays, and recovery support. You run. We handle everything else.",
            buttonText: "KNOW MORE",
            link: "/athlete?type=recreational",
            image: "https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?auto=format&fit=crop&q=80&w=1000" // Marathon (From RecreationalEvents)
        },
        {
            title: "Professional Athletes",
            headline: "Tournaments & Training Camps",
            tagline: "Tournament-ready travel. Performance-focused planning.",
            description: "Tournament dates locked in? Training camp planned? Share your schedule—we handle flights, accommodation, ground transfers, recovery spaces. Your focus stays on performing. Ours stays on supporting you.",
            buttonText: "KNOW MORE",
            link: "/athlete?type=professional",
            image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=1000&auto=format&fit=crop" // Pro athlete gym/training
        },
        {
            title: "Something Different?",
            headline: "We Design Around Your Reality",
            tagline: "If it involves sports and travel, we're in.",
            description: "Camps, trials, rehab trips, multi-athlete groups, fan+athlete combos—your situation is unique. Tell us what you're working with, and we'll design an end-to-end solution that fits your exact reality.",
            buttonText: "Tell Us More",
            link: "/enquiry/home",
            image: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?q=80&w=1000&auto=format&fit=crop" // Stadium/Custom
        }
    ]

    return (
        <section className="py-24 text-white relative overflow-hidden">
            <div className="container mx-auto px-4 min-[425px]:px-12 relative z-20">
                <AnimatedContent
                    distance={100}
                    direction="vertical"
                    duration={1}
                    ease="power3.out"
                    delay={0.1}
                >
                    <div className="mb-16">
                        <h2 className="text-xl sm:text-3xl font-normal text-left flex flex-wrap items-center gap-x-2 gap-y-1 mb-2">
                            For Athletes <span className="text-[#D4AF37]">on the Move</span>
                            <div className="h-[2px] sm:h-[4px] w-16 sm:w-24 bg-[#D4AF37] mt-1 hidden sm:block"></div>
                        </h2>
                        <h3 className="text-gray-400 text-sm sm:text-lg font-light italic">You focus on the game. We handle the rest.</h3>
                    </div>
                </AnimatedContent>

                <AnimatedContent
                    distance={100}
                    direction="vertical"
                    duration={1}
                    ease="power3.out"
                    delay={0.3}
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
                        {cards.map((card, index) => (
                            <AthleteCard key={index} card={card} />
                        ))}
                    </div>
                </AnimatedContent>
            </div>
        </section>
    )
}
