'use client'

import React, { useRef, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function ProfessionalEvents() {
    // Refs for animation
    const containerRef = useRef<HTMLDivElement>(null)
    const leftCardRef = useRef<HTMLDivElement>(null)
    const centerCardRef = useRef<HTMLDivElement>(null)
    const rightCardRef = useRef<HTMLDivElement>(null)
    const bottomLeftCardRef = useRef<HTMLDivElement>(null)
    const bottomRightCardRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        let ctx = gsap.context(() => { });
        const sideCards = [leftCardRef.current, rightCardRef.current];
        const newCards = [bottomLeftCardRef.current, bottomRightCardRef.current];
        const allCards = [centerCardRef.current, ...sideCards, ...newCards];

        const mm = gsap.matchMedia();
        const container = containerRef.current;

        mm.add("(min-width: 768px)", () => {

            gsap.set(centerCardRef.current, { y: 300 });
            gsap.to(centerCardRef.current, {
                y: -300,
                ease: 'none',
                scrollTrigger: {
                    trigger: container,
                    start: 'top bottom',
                    end: 'center center',
                    scrub: 1,
                }
            });

            gsap.set(bottomLeftCardRef.current, { y: 400 });
            gsap.to(bottomLeftCardRef.current, {
                y: -400,
                ease: 'none',
                scrollTrigger: {
                    trigger: container,
                    start: 'center center',
                    end: 'bottom top',
                    scrub: 1,
                }
            });

            gsap.set(sideCards, { y: 0 });
            gsap.to(sideCards, {
                y: 200,
                ease: 'none',
                scrollTrigger: {
                    trigger: container,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 0.5,
                }
            });

            gsap.set(bottomRightCardRef.current, { y: -100 });
            gsap.to(bottomRightCardRef.current, {
                y: 100,
                ease: 'none',
                scrollTrigger: {
                    trigger: container,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 1,
                }
            });

            allCards.forEach((card) => {
                gsap.from(card, {
                    scale: 0,
                    opacity: 0,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: card,
                        start: "top bottom+=250",
                        once: true,
                    }
                })
            });
        });

        mm.add("(max-width: 767px)", () => {
            // Mobile Entrance: Robust fromTo to ensure visibility
            // Triggers immediately when container touches bottom of viewport
            gsap.fromTo(allCards,
                { opacity: 0, scale: 0 },
                {
                    opacity: 1,
                    scale: 1,
                    duration: 1,
                    ease: 'power3.out',
                    stagger: 0.1,
                    scrollTrigger: {
                        trigger: container,
                        start: "top bottom", // Trigger immediately
                        once: true,
                    }
                }
            );

            // Gentle float for mobile safe parallax
            gsap.set(allCards, { y: 0 });
            gsap.to(allCards, {
                y: -50,
                stagger: 0.1,
                ease: 'none',
                scrollTrigger: {
                    trigger: container,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 1
                }
            })
        });

        return () => mm.revert();
    }, [])

    return (
        <div className="flex flex-col items-center justify-center min-h-auto md:min-h-[80vh] px-4 md:px-0 gap-10 md:gap-0 w-full" ref={containerRef}>
            {/* Top Row */}
            <div className="flex flex-col md:flex-row gap-10 md:gap-10 justify-center flex-wrap items-center relative z-10 w-full">

                {/* Left: Tennis */}
                <div ref={leftCardRef} className='relative h-[450px] w-full max-w-[350px] md:h-135 md:w-72 overflow-hidden rounded-2xl'>
                    <Link href="/experiences/tennis" className="block w-full h-full relative group">
                        <Image
                            src="https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?q=80&w=1000&auto=format&fit=crop"
                            alt="Tennis"
                            fill
                            className="object-cover transition-all duration-500 group-hover:brightness-75"
                        />
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                            <h3 className="text-white text-3xl font-normal tracking-wider uppercase">Tennis</h3>
                        </div>
                    </Link>
                </div>

                {/* Center: Football */}
                <div ref={centerCardRef} className='relative h-[450px] w-full max-w-[350px] md:h-135 md:w-72 overflow-hidden rounded-2xl'>
                    <Link href="/experiences/football" className="block w-full h-full relative group">
                        <Image
                            src="https://images.unsplash.com/photo-1551958219-acbc608c6377?auto=format&fit=crop&q=80&w=1080"
                            alt="Football"
                            fill
                            className="object-cover transition-all duration-500 group-hover:brightness-75"
                        />
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                            <h3 className="text-white text-3xl font-normal tracking-wider uppercase">Football</h3>
                        </div>
                    </Link>
                </div>

                {/* Right: Cricket */}
                <div ref={rightCardRef} className='relative h-[450px] w-full max-w-[350px] md:h-135 md:w-72 overflow-hidden rounded-2xl'>
                    <Link href="/experiences/cricket" className="block w-full h-full relative group">
                        <Image
                            src="https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=1000&auto=format&fit=crop"
                            alt="Cricket"
                            fill
                            className="object-cover transition-all duration-500 group-hover:brightness-75"
                        />
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                            <h3 className="text-white text-3xl font-normal tracking-wider uppercase">Cricket</h3>
                        </div>
                    </Link>
                </div>
            </div>

            {/* Bottom Row */}
            <div className="flex flex-col md:flex-row gap-10 md:gap-10 justify-center flex-wrap items-center mt-10 md:mt-[-50px] relative z-20 w-full">

                {/* Bottom Left: Basketball */}
                <div ref={bottomLeftCardRef} className='relative h-[450px] w-full max-w-[350px] md:h-135 md:w-72 overflow-hidden rounded-2xl'>
                    <Link href="/experiences/basketball" className="block w-full h-full relative group">
                        <Image
                            src="https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&q=80&w=1080"
                            alt="Basketball"
                            fill
                            className="object-cover transition-all duration-500 group-hover:brightness-75"
                        />
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                            <h3 className="text-white text-3xl font-normal tracking-wider uppercase">Basketball</h3>
                        </div>
                    </Link>
                </div>

                {/* Bottom Right: Rugby */}
                <div ref={bottomRightCardRef} className='relative h-[450px] w-full max-w-[350px] md:h-135 md:w-72 overflow-hidden rounded-2xl'>
                    <Link href="/experiences/rugby" className="block w-full h-full relative group">
                        <Image
                            src="https://images.unsplash.com/photo-1628891890467-b79f2c8ba9dc?auto=format&fit=crop&q=80&w=1080"
                            alt="Rugby"
                            fill
                            className="object-cover transition-all duration-500 group-hover:brightness-75"
                        />
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                            <h3 className="text-white text-3xl font-normal tracking-wider uppercase">Rugby</h3>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}
