"use client"

import React from 'react'
import Image from 'next/image'

const events = [
    {
        id: 1,
        title: "Edition 2026",
        subtitle: "BMW BERLIN MARATHON",
        description: "Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        image: "https://images.unsplash.com/photo-1559235270-2df4dcfb4eca?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        id: 2,
        title: "Edition 2026",
        subtitle: "BMW BERLIN MARATHON",
        description: "Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        image: "https://images.unsplash.com/photo-1559235270-2df4dcfb4eca?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        id: 3,
        title: "Edition 2026",
        subtitle: "BMW BERLIN MARATHON",
        description: "Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        image: "https://images.unsplash.com/photo-1559235270-2df4dcfb4eca?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    }
]

export default function RecreationalEvents() {
    return (
        <section className="py-20 bg-black text-white relative overflow-hidden">
            <div className="container mx-auto px-4 min-[425px]:px-12 relative z-10">
                <div className="flex flex-col gap-24">
                    {events.map((event) => (
                        <div key={event.id} className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
                            {/* Left: Image */}
                            <div className="w-full md:w-1/2 relative">
                                <div className="relative aspect-video w-full overflow-hidden transition-all duration-500 shadow-2xl shadow-black/50 [mask-image:linear-gradient(to_bottom,black_80%,transparent_100%),radial-gradient(circle,black_60%,transparent_100%)] webkit-mask-image-radial">
                                    <div className="w-full h-full [mask-image:radial-gradient(black_60%,transparent_100%)]">
                                        {/* Dark overlay for cinematic look */}
                                        <div className="absolute inset-0 bg-black/20 z-10"></div>
                                        <Image
                                            src={event.image}
                                            alt={event.subtitle}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Right: Content */}
                            <div className="w-full md:w-1/2 text-left">
                                <h3 className="text-xl md:text-2xl font-light text-gray-300 mb-2">
                                    {event.title}
                                </h3>
                                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 tracking-wide">
                                    {event.subtitle}
                                </h2>
                                <p className="text-gray-400 leading-relaxed text-sm md:text-base max-w-xl">
                                    {event.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
