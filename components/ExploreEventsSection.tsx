import React from 'react'
import { HeroSection } from '@/components/ExploreEventsCarousel'

export default function ExploreEventsSection() {
    const eventImages = [
        { src: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&q=80&w=1080", title: "Upcoming FIFA World Cup", subtitle: "Brazil VS Argentina" },
        { src: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&q=80&w=1080", title: "Major League Baseball", subtitle: "Yankees VS Red Sox" },
        { src: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&q=80&w=1080", title: "Olympic Track Finals", subtitle: "100m Sprint Men" },
        { src: "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&q=80&w=1080", title: "Crossfit Games 2025", subtitle: "Individual Finals" },
        { src: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=1080", title: "World Gymnastics", subtitle: "Team All-Around" },
    ]

    return (
        <section className="py-12 bg-background">
            <div className="container mx-auto px-4">
                <h2 className="text-center text-white font-light text-3xl mb-12 flex items-center justify-center gap-4">
                    <span className="font-thin text-white/50 tracking-tighter">&mdash;&mdash;&mdash;</span>
                    Explore Events
                    <span className="font-thin text-white/50 tracking-tighter">&mdash;&mdash;&mdash;</span>
                </h2>
                <HeroSection
                    title=""
                    subtitle=""
                    images={eventImages}
                />
            </div>
        </section>
    )
}
