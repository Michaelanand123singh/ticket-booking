'use client'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useRef, useEffect } from 'react'

gsap.registerPlugin(ScrollTrigger)

export default function MainJourneyLine() {
    const pathRef = useRef<SVGPathElement>(null)

    useEffect(() => {
        if (!pathRef.current) return

        const length = pathRef.current.getTotalLength()

        // Simply set styles directly to ensure it's hidden immediately before GSAP takes over
        pathRef.current.style.strokeDasharray = `${length} ${length}`
        pathRef.current.style.strokeDashoffset = `${length}`
        pathRef.current.style.opacity = '1'

        const ctx = gsap.context(() => {
            gsap.to(pathRef.current, {
                strokeDashoffset: 0,
                ease: "none",
                scrollTrigger: {
                    trigger: document.body,
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 1,
                }
            })
        })

        return () => ctx.revert()
    }, [])

    return (
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
            <svg
                width="100%"
                height="100%"
                viewBox="0 0 100 120"
                preserveAspectRatio="none"
                className="w-full h-full"
            >
                <defs>
                    <linearGradient id="main-gold-gradient" x1="100%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#FDB931" stopOpacity="0.8" />
                        <stop offset="50%" stopColor="#FFFFAC" stopOpacity="1" />
                        <stop offset="100%" stopColor="#D4AF37" stopOpacity="0.8" />
                    </linearGradient>
                    <filter id="main-glow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="1" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>
                <path
                    ref={pathRef}
                    d="M 70 40 Q 9 75, 110 90"
                    fill="none"
                    stroke="url(#main-gold-gradient)"
                    strokeWidth="0.6"
                    strokeLinecap="round"
                    filter="url(#main-glow)"
                />
            </svg>
        </div>
    )
}
