"use client"

import React, { useState, useEffect } from 'react'
import { Star, Quote } from 'lucide-react'
import Image from 'next/image'

const testimonials = [
    {
        id: 1,
        name: "Sarah Johnson",
        role: "Professional Tennis Player",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
        text: "The platform completely revolutionized how I manage my tournaments. The interface is intuitive and the support team is incredible. I've never felt more connected to my fans and organizers.",
        rating: 5
    },
    {
        id: 2,
        name: "Michael Chen",
        role: "Event Organizer",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
        text: "Managing large-scale sports events used to be a nightmare. With this tool, everything from ticketing to participant management is seamless. It's a game-changer for our organization.",
        rating: 5
    },
    {
        id: 3,
        name: "Emily Davis",
        role: "Basketball Coach",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop",
        text: "I can easily track my team's progress and find local tournaments. The community aspect is wonderful, helping us connect with other teams for friendly matches.",
        rating: 4
    },
    {
        id: 4,
        name: "David Wilson",
        role: "Sports Enthusiast",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
        text: "Finding recreational games in my area was always hit or miss. Now I have a reliable way to stay active and meet new people who share my passion for sports.",
        rating: 5
    }
]

export default function TestimonialSection() {
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prev) => prev + 1);
        }, 5000); // Rotate every 5 seconds

        return () => clearInterval(interval);
    }, []);

    // Use activeIndex with modulo for content selection
    const activeDataIndex = activeIndex % testimonials.length;
    const activeTestimonial = testimonials[activeDataIndex];

    return (
        <section className="py-20 bg-black text-white overflow-hidden relative">
            {/* Background Elements */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#D4AF37]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>

            <div className="container mx-auto px-4 min-[425px]:px-12 relative z-10">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">

                    {/* Left Side: Content */}
                    <div className="w-full lg:w-1/2 flex flex-col items-start z-20">
                        <div className="flex items-center gap-4 mb-8">
                            <h2 className="text-4xl md:text-5xl font-light">Testimonials</h2>
                            <div className="h-[2px] w-16 bg-[#D4AF37]"></div>
                        </div>

                        <div className="min-h-[300px] transition-all duration-500 ease-in-out">
                            <Quote className="w-12 h-12 text-[#D4AF37] mb-6 opacity-50" />

                            <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-8 italic animate-in fade-in slide-in-from-bottom-2 duration-500" key={activeDataIndex}>
                                "{activeTestimonial.text}"
                            </p>

                            <div className="flex items-center gap-4">
                                <div>
                                    <h3 className="text-xl font-semibold text-white">{activeTestimonial.name}</h3>
                                    <p className="text-[#D4AF37] text-sm">{activeTestimonial.role}</p>
                                </div>
                                <div className="flex gap-1 ml-4">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`w-4 h-4 ${i < activeTestimonial.rating ? 'fill-[#D4AF37] text-[#D4AF37]' : 'text-gray-600'}`}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Visuals */}
                    <div className="hidden lg:flex w-full lg:w-1/2 relative h-[600px] items-center justify-end overflow-visible">
                        {/* Orbiting Images Container - Positioned to the right */}
                        <div className="relative w-[800px] h-[800px] flex-shrink-0 aspect-square translate-x-1/2">

                            {/* Central Background Circle (Gold Curve) */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[660px] h-[660px] rounded-full border-2 border-[#D4AF37] bg-black shadow-[0_0_120px_rgba(212,175,55,0.3)] z-0"></div>

                            {/* Orbiting Images */}
                            {testimonials.map((testimonial, index) => {
                                const total = testimonials.length;

                                // We want the system to rotate so active is always at 0 degrees (left side relative to the circle center, pointing towards content).
                                // Actually, typically in these designs, the "active" item is facing the content.
                                // If the circle is on the right, the content is on the left. So active item should be near 180 degrees (Left) or similar?
                                // Let's stick to the rotation logic but adjust positions.

                                // Revert to even 360 degree distribution for continuous loop
                                const step = (2 * Math.PI) / total;
                                const angle = (index - activeIndex) * step + Math.PI;

                                // Position math
                                const radius = 330; // Reduced to 330 to fit inside container without clipping
                                const x = Math.cos(angle) * radius;
                                const y = Math.sin(angle) * radius;

                                // Check if this item is currently the "active" one based on modulo math
                                const activeDataIndex = activeIndex % testimonials.length;
                                // Fix modulo for negative numbers if activeIndex keeps increasing, positive is fine.
                                const isActive = (index === activeDataIndex);

                                return (
                                    <div
                                        key={testimonial.id}
                                        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-700 ease-in-out`}
                                        style={{
                                            transform: `translate(${x}px, ${y}px) scale(${isActive ? 1.5 : 0.8})`,
                                            zIndex: isActive ? 20 : 10,
                                            opacity: isActive ? 1 : 0.5
                                        }}
                                    >
                                        <div className={`relative rounded-full overflow-hidden border-4 ${isActive ? 'border-[#D4AF37] shadow-[0_0_30px_rgba(212,175,55,0.4)]' : 'border-gray-600'}`}>
                                            <div className="w-32 h-32 bg-gray-800">
                                                <Image
                                                    src={testimonial.image}
                                                    alt={testimonial.name}
                                                    width={128}
                                                    height={128}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}
