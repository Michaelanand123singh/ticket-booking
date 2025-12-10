'use client'

import React, { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

export default function JourneyLine() {
    const containerRef = useRef<HTMLDivElement>(null)
    const [svgHeight, setSvgHeight] = useState(2000)
    const [windowWidth, setWindowWidth] = useState(1000)
    const [windowHeight, setWindowHeight] = useState(800)

    // Update dimensions on mount and resize
    useEffect(() => {
        const updateDimensions = () => {
            if (containerRef.current && containerRef.current.parentElement) {
                const height = containerRef.current.parentElement.scrollHeight
                setSvgHeight(height)
                setWindowWidth(window.innerWidth)
                setWindowHeight(window.innerHeight)
            }
        }

        updateDimensions()
        window.addEventListener('resize', updateDimensions)
        // Also update after a short delay to allow content to load
        const timer = setTimeout(updateDimensions, 1000)

        return () => {
            window.removeEventListener('resize', updateDimensions)
            clearTimeout(timer)
        }
    }, [])

    const { scrollYProgress } = useScroll()
    const [isLoaded, setIsLoaded] = useState(false)

    // Calculate initial progress needed to cover the first screen (Hero)
    // The path has 4.5 segments, and the Hero is the first segment (1.0)
    // So the progress needed is 1 / 4.5
    const initialProgress = 1 / 4.5

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

    // Use windowHeight for the section height to ensure alignment with Hero section
    const sectionHeight = windowHeight
    const startOffset = sectionHeight * 0.04

    let d = `M ${w} ${startOffset}`

    d += ` C ${w * 0.9} ${sectionHeight * 0.09}, ${w * 0.5} ${sectionHeight * 0.3}, ${w * 0.17} ${sectionHeight}`

    // Segment 2: Explore Sports (1 -> 2)
    // Curve from Bottom-Left to Bottom-Right
    d += ` S ${w * 0.5} ${sectionHeight * 1.5}, ${w * 0.9} ${sectionHeight * 2}`

    // Segment 3: Explore Events (2 -> 3)
    // Curve from Bottom-Right to Bottom-Left
    d += ` S ${w * 0.5} ${sectionHeight * 2.5}, ${w * 0.1} ${sectionHeight * 3}`

    // Segment 4: What We Offer (3 -> 4)
    // Curve from Bottom-Left to Bottom-Right
    d += ` S ${w * 0.5} ${sectionHeight * 3.5}, ${w * 0.9} ${sectionHeight * 4}`

    // Segment 5: News (4 -> 5)
    // Curve from Bottom-Right to Bottom-Left
    d += ` S ${w * 0.5} ${sectionHeight * 4.5}, ${w * 0.1} ${sectionHeight * 5}`


    // Map stroke width to path length so it thickens as it draws the first segment
    // Starts thin (4px) and reaches max thickness (32px) by the end of the Hero section
    // It stays thick (32px) for the rest of the journey
    // const strokeWidth = useTransform(pathLength, [0, initialProgress, 1], [4, 32, 32])

    // Hide the band when pathLength is 0 to prevent the initial "dot" from round linecap
    const opacity = useTransform(pathLength, [0, 0.01], [0, 1])

    return (
        <div
            ref={containerRef}
            className="absolute top-0 left-0 w-full z-15 pointer-events-none overflow-hidden"
            style={{ height: svgHeight }}
        >
            <svg
                width="100%"
                height={svgHeight}
                viewBox={`0 0 ${windowWidth} ${svgHeight}`}
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full"
            >
                {/* Glow Effect Filter */}
                <defs>
                    <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="12" result="blur1" />
                        <feGaussianBlur stdDeviation="6" result="blur2" />
                        <feMerge>
                            <feMergeNode in="blur1" />
                            <feMergeNode in="blur2" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                    <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#3b82f6" /> {/* Blue-500 */}
                        <stop offset="50%" stopColor="#60a5fa" /> {/* Blue-400 */}
                        <stop offset="100%" stopColor="#2563eb" /> {/* Blue-600 */}
                    </linearGradient>
                </defs>

                {/* The Animated Path */}
                <motion.path
                    d={d}
                    stroke="url(#lineGradient)"
                    strokeWidth="20"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                    filter="url(#glow)"
                    style={{ pathLength, opacity }} // Link drawing to scroll and opacity
                />
            </svg>
        </div>
    )
}
