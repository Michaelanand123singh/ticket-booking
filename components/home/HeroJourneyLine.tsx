'use client'

import { gsap } from 'gsap'
import { useRef, useEffect } from 'react'

export default function HeroJourneyLine() {
    const pathRef = useRef<SVGPathElement>(null)

    useEffect(() => {
        if (!pathRef.current) return

        const length = pathRef.current.getTotalLength()

        // Set initial state to hide the line
        gsap.set(pathRef.current, {
            strokeDasharray: length,
            strokeDashoffset: length,
            opacity: 1
        })

        // Animate the line drawing
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } })

        tl.to(pathRef.current, {
            strokeDashoffset: 0,
            duration: 2.5,
            delay: 0.5
        })
    }, [])

    return (
        <div className="absolute top-0 left-0 w-full h-[120%] pointer-events-none mix-blend-screen z-10">
            <svg
                width="100%"
                height="100%"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                className="w-full h-full"
            >
                <defs>
                    <linearGradient id="gold-gradient" x1="100%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#FDB931" stopOpacity="0.8" />
                        <stop offset="50%" stopColor="#FFFFAC" stopOpacity="1" />
                        <stop offset="100%" stopColor="#D4AF37" stopOpacity="0.8" />
                    </linearGradient>
                    <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="1" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>
                <path
                    ref={pathRef}
                    d="M 100 8 C 80 20, 30 50, 5 115"
                    fill="none"
                    stroke="url(#gold-gradient)"
                    strokeWidth="1"
                    strokeLinecap="round"
                    filter="url(#glow)"
                />
            </svg>
        </div>
    )
}
