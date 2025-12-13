'use client'

import React, { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

export default function JourneyLine() {
    const containerRef = useRef<HTMLDivElement>(null)
    const [svgHeight, setSvgHeight] = useState(0)
    const [windowWidth, setWindowWidth] = useState(1000)
    const [windowHeight, setWindowHeight] = useState(800)

    // Update dimensions on mount and resize
    useEffect(() => {
        let timeoutId: NodeJS.Timeout

        const updateDimensions = () => {
            if (containerRef.current) {
                const height = containerRef.current.offsetHeight
                setSvgHeight(height)
                setWindowWidth(window.innerWidth)
                setWindowHeight(window.innerHeight)
            }
        }

        const debouncedUpdateDimensions = () => {
            clearTimeout(timeoutId)
            timeoutId = setTimeout(updateDimensions, 100)
        }

        updateDimensions()
        window.addEventListener('resize', debouncedUpdateDimensions)
        // Also update after a short delay to allow content to load
        const timer = setTimeout(updateDimensions, 1000)

        return () => {
            window.removeEventListener('resize', debouncedUpdateDimensions)
            clearTimeout(timer)
            clearTimeout(timeoutId)
        }
    }, [])

    const { scrollYProgress } = useScroll()
    const [isLoaded, setIsLoaded] = useState(false)

    // Calculate initial progress needed to cover the first screen (Hero)
    // The path has 4.5 segments, and the Hero is the first segment (1.0)
    // We want it to load 75% initially
    const initialProgress = (1 / 4.5) * 0.75

    // Scroll progress maps to the remaining part of the path
    const scrollPath = useTransform(scrollYProgress, [0, 1], [0, 1 - initialProgress])

    // Initial animation value
    // Faster initial animation but with higher damping to prevent overshoot
    const initialPath = useSpring(0, { stiffness: 20, damping: 20 })

    useEffect(() => {
        if (svgHeight > 0 && windowHeight > 0) {
            setIsLoaded(true)
            initialPath.set(initialProgress)
        }
    }, [initialPath, initialProgress, svgHeight, windowHeight])

    // Combine both values
    const pathLength = useTransform(() => initialPath.get() + scrollPath.get())

    // Calculate path points based on window width and height
    const w = windowWidth
    const h = svgHeight
    const isMobile = w < 768

    // Use svgHeight / 5 for the section height to ensure alignment with content
    // We divide by 5 because we have 5 distinct segments/sections we want to cover
    const sectionHeight = svgHeight / 5
    const startOffset = -100 // Start off-screen (above the top)

    // Adjust horizontal spread based on screen size
    // Mobile: keep it closer to the edges (0.1 to 0.9 range) to avoid covering center content
    // Desktop: use full width (0.05 to 0.95 range)
    const leftX = isMobile ? w * 0.1 : w * 0.05
    const rightX = isMobile ? w * 0.9 : w * 0.95
    const centerX = w * 0.5

    let d = `M ${w} ${startOffset}`

    // Segment 1: Hero (0 -> 1)
    // Smooth curve from top-right to bottom-left
    // Adjusted control points for smoother entry
    d += ` C ${rightX} ${sectionHeight * 0.2}, ${centerX} ${sectionHeight * 0.4}, ${leftX} ${sectionHeight}`

    // Segment 2: Explore Sports (1 -> 2)
    // Curve from Bottom-Left to Bottom-Right
    d += ` S ${centerX} ${sectionHeight * 1.6}, ${rightX} ${sectionHeight * 2}`

    // Segment 3: Explore Events (2 -> 3)
    // Curve from Bottom-Right to Bottom-Left
    d += ` S ${centerX} ${sectionHeight * 2.6}, ${leftX} ${sectionHeight * 3}`

    // Segment 4: What We Offer (3 -> 4)
    // Curve from Bottom-Left to Bottom-Right
    d += ` S ${centerX} ${sectionHeight * 3.6}, ${rightX} ${sectionHeight * 4}`

    // Segment 5: News (4 -> 5)
    // Curve from Bottom-Right to Bottom-Left
    d += ` S ${centerX} ${sectionHeight * 4.6}, ${leftX} ${sectionHeight * 5}`


    // Map stroke width to path length so it thickens as it draws the first segment
    // Starts thin (4px) and reaches max thickness (32px) by the end of the Hero section
    // It stays thick (32px) for the rest of the journey
    // const strokeWidth = useTransform(pathLength, [0, initialProgress, 1], [4, 32, 32])

    // Hide the band when pathLength is 0 to prevent the initial "dot" from round linecap
    // Hide the band when pathLength is 0 to prevent the initial "dot" from round linecap
    const opacity = useTransform(pathLength, [0, 0.01], [0, 1])

    const [mounted, setMounted] = useState(false)
    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    return (
        <div
            ref={containerRef}
            className="absolute top-0 left-0 w-full z-15 pointer-events-none overflow-hidden"
            style={{ height: '100%' }}
        >
            <svg
                width="100%"
                height={svgHeight}
                viewBox={`0 0 ${windowWidth} ${svgHeight}`}
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full"
                style={{ filter: 'none' }}
            >
                <defs>
                    <linearGradient id="cloudGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#3b82f6" />
                        <stop offset="50%" stopColor="#60a5fa" />
                        <stop offset="100%" stopColor="#2563eb" />
                    </linearGradient>
                </defs>

                {/* The Cloud Trail (Thick, Blurry Line) */}
                <motion.path
                    d={d}
                    stroke="url(#cloudGradient)"
                    strokeWidth={isMobile ? "40" : "85"}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                    className="blur-[20px] opacity-30 mix-blend-screen drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]"
                    style={{ pathLength }}
                />
            </svg>


        </div>
    )
}
