"use client"
import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

interface SportHeroProps {
    sport: string
    description: string
    heroImage: string
    cardImage?: string
}

export default function SportHero({ sport, description, heroImage, cardImage }: SportHeroProps) {
    // Use cardImage if provided, otherwise fallback to heroImage
    const displayCardImage = cardImage || heroImage
    const titleRef = useRef<HTMLHeadingElement>(null)
    const descRef = useRef<HTMLParagraphElement>(null)

    useEffect(() => {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 1 } })

        if (titleRef.current) {
            tl.fromTo(titleRef.current,
                { y: 100, opacity: 0 },
                { y: 0, opacity: 1, delay: 0.1 }
            )
        }

        if (descRef.current) {
            tl.fromTo(descRef.current,
                { y: 100, opacity: 0 },
                { y: 0, opacity: 1 },
                "-=0.8" // Overlap slightly
            )
        }
    }, [])

    return (
        <div className="relative w-full min-h-screen flex items-center overflow-hidden bg-black">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <img
                    src={heroImage}
                    alt={`${sport} hero`}
                    className="w-full h-full object-cover opacity-60"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black" />
            </div>

            {/* Content */}
            <div className="relative z-10 container mx-auto px-4 pt-32 pb-20 flex flex-col justify-center h-full">

                <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-16 max-w-6xl">
                    {/* Image Card */}
                    <div className="flex-shrink-0 w-full md:w-64 lg:w-80 h-[400px] md:h-[500px] rounded-xl overflow-hidden shadow-2xl relative group">
                        <img
                            src={displayCardImage}
                            alt={`${sport} card`}
                            className="w-full h-full object-cover transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    </div>

                    {/* Text Content */}
                    <div className="flex-grow text-center md:text-left">
                        <h1 ref={titleRef} className="text-2xl md:text-4xl font-normal capitalize tracking-tighter mb-6 relative z-10 w-full break-words leading-[0.9]">
                            <span>
                                {sport}
                            </span>
                        </h1>

                        <p ref={descRef} className="text-sm md:text-base lg:text-lg text-gray-300 max-w-xl leading-relaxed backdrop-blur-sm bg-black/10 p-4 rounded-xl border-l-2 border-[#D4AF37]">
                            {description}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
