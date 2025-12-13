import React from 'react'
import { HeroSection } from '@/components/ExploreEventsCarousel'

export default function ExploreEventsSection() {
    const eventImages = [
        { id: "507f1f77bcf86cd799439011", src: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&q=80&w=1080", title: "Upcoming FIFA World Cup", subtitle: "Brazil VS Argentina" },
        { id: "507f1f77bcf86cd799439012", src: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&q=80&w=1080", title: "Major League Baseball", subtitle: "Yankees VS Red Sox" },
        { id: "507f1f77bcf86cd799439013", src: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&q=80&w=1080", title: "Olympic Track Finals", subtitle: "100m Sprint Men" },
        { id: "507f1f77bcf86cd799439014", src: "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&q=80&w=1080", title: "Crossfit Games 2025", subtitle: "Individual Finals" },
        { id: "507f1f77bcf86cd799439015", src: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=1080", title: "World Gymnastics", subtitle: "Team All-Around" },
    ]

    return (
        <section className="pt-32 pb-12 bg-background relative">
            <div className="container mx-auto px-4 min-[425px]:px-12 relative z-20">
                <h2 className="text-left text-white font-light text-xl sm:text-3xl mb-12 flex items-center gap-2 sm:gap-4">
                    <span className="font-thin text-white/50 tracking-tighter">&mdash;&mdash;&mdash;</span>
                    <span>Explore <span className="font-semibold text-blue-600">Events</span></span>
                </h2>
                <HeroSection
                    title=""
                    subtitle=""
                    images={eventImages}
                />

                {/* More Events Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
                    {[1, 2, 3, 4].map((item) => (
                        <div key={item} className="bg-white rounded-3xl overflow-hidden shadow-lg group cursor-pointer hover:-translate-y-1 transition-transform duration-300">
                            {/* Image Container */}
                            <div className="relative h-48 overflow-hidden">
                                <img
                                    src="https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?q=80&w=1080&auto=format&fit=crop"
                                    alt="Tennis Event"
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                            </div>

                            {/* Content Container */}
                            <div className="p-6 relative">
                                {/* Date Badge */}
                                <div className="absolute -top-8 left-6 flex flex-col items-center rounded-lg overflow-hidden shadow-md">
                                    <div className="bg-[#2A9D8F] text-white text-xs font-bold px-3 py-1 uppercase tracking-wider">
                                        Dec
                                    </div>
                                    <div className="bg-white text-black text-xl font-bold px-3 py-2 w-full text-center">
                                        12
                                    </div>
                                </div>

                                <h3 className="text-black text-lg font-medium mb-3 mt-2 text-center">City Lights in New York</h3>
                                <p className="text-gray-500 text-[10px] leading-relaxed text-left">
                                    Tennis match held in New York, there was a clash between two teams, both teams won the match I mean it was a draw, they both are happy and living their life in peace.
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
