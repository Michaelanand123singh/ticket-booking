'use client'

import React, { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

export default function EventJourneyLine() {
    const containerRef = useRef<HTMLDivElement>(null)
    const [svgHeight, setSvgHeight] = useState(1000)
    const [windowWidth, setWindowWidth] = useState(1000)
    const [windowHeight, setWindowHeight] = useState(800)

    // Update dimensions on mount and resize
    useEffect(() => {
        let timeoutId: NodeJS.Timeout

        const updateDimensions = () => {
            if (containerRef.current) {
                const height = document.body.scrollHeight
                // Ensure we have enough height for the loop, or use the full page height
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

    // Scroll progress animation
    const { scrollYProgress } = useScroll()
    const targetPathLength = useTransform(scrollYProgress, [0, 1], [0.7, 1])

    // Smooth out the scroll progress
    const pathLength = useSpring(targetPathLength, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    })

    // Calculate path points based on window width and height
    const w = windowWidth
    const h = svgHeight

    // Start a little left from top right
    const startX = w * 0.8
    const startY = -100 // Start off-screen

    let d = `M ${startX} ${startY}`

    d += ` C ${w * 0.05} ${startY + 100}, ${w * 0.01} ${h}, ${w * 0.83} ${h * 0.4}`

    // d += ` C ${w * 0.1} ${h * 0.6}, ${w * 0.6} ${h * 0.7}, ${w * 0.7} ${h * 0.4}`

    //d += ` S ${w * 1} ${h * 0.1}, ${w * 0.6} ${h * 0.1}`

    // d += ` S ${w * 0.4} ${h * 0.8}, ${w * 0.5} ${h * 0.9}`

    // Always visible once loaded (or animate opacity with pathLength)
    const opacity = useTransform(pathLength, [0, 0.05], [0, 1])

    return (
        <div
            ref={containerRef}
            className="absolute top-0 left-0 w-full z-10 pointer-events-none overflow-hidden"
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
                <defs>
                    <filter id="glow-event" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="12" result="blur1" />
                        <feGaussianBlur stdDeviation="6" result="blur2" />
                        <feMerge>
                            <feMergeNode in="blur1" />
                            <feMergeNode in="blur2" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                    <linearGradient id="lineGradientEvent" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#3b82f6" /> {/* Blue-500 */}
                        <stop offset="50%" stopColor="#60a5fa" /> {/* Blue-400 */}
                        <stop offset="100%" stopColor="#2563eb" /> {/* Blue-600 */}
                    </linearGradient>
                </defs>

                <motion.path
                    d={d}
                    stroke="url(#lineGradientEvent)"
                    strokeWidth="20"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                    filter="url(#glow-event)"
                    style={{ pathLength, opacity }}
                />
            </svg>
        </div>
    )
}
