import React from 'react'
import BasicCarousel from './TrendingTournamentsCarousel'
import AnimatedContent from './AnimatedContent'

export default function TrendingTournaments() {
    return (
        <section className="py-16 text-foreground relative">
            <div className="container mx-auto px-4 min-[425px]:px-12 relative z-20">
                <AnimatedContent
                    distance={100}
                    direction="vertical"
                    duration={1}
                    ease="power3.out"
                    delay={0.1}
                >
                    <h2 className="text-2xl sm:text-4xl font-normal text-left flex items-center gap-4 mb-8">
                        Trending <span className="text-[#D4AF37] font-normal">Tournaments</span>
                        <div className="h-[4px] w-24 bg-[#D4AF37] mt-2"></div>
                    </h2>
                </AnimatedContent>
                <AnimatedContent
                    distance={100}
                    direction="vertical"
                    duration={1}
                    ease="power3.out"
                    delay={0.3}
                >
                    <div className="w-full">
                        <BasicCarousel />
                    </div>
                </AnimatedContent>
            </div>
        </section>
    )
}

