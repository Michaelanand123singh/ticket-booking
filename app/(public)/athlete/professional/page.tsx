"use client"

import React from 'react'
import Image from "next/image"
import AnimatedContent from "@/components/home/AnimatedContent"
import EnquiryCTA from "@/components/shared/EnquiryCTA"

export default function ProfessionalPage() {
    const [showMainContent, setShowMainContent] = React.useState(false)

    return (
        <div className="bg-black text-white min-h-screen font-sans selection:bg-yellow-500/30">

            {/* Hero Section */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden">
                {/* Hero Image */}
                <div className="absolute inset-0 z-0 select-none">
                    <Image
                        src="/images/events-hero.png"
                        alt="Professional athlete in competition"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/60 z-10" />
                    {/* Bottom Blur Effect */}
                    <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent backdrop-blur-[2px] z-20" />
                </div>

                <div className="container mx-auto px-6 md:px-24 relative z-30">
                    <AnimatedContent distance={150} direction="vertical" animateOpacity duration={0.8}>
                        <h1 className="text-4xl md:text-7xl font-normal max-w-5xl tracking-tight leading-tight">
                            The competition <br />
                            is yours. <br />
                            Everything around <br />
                            it is ours.
                        </h1>
                    </AnimatedContent>
                </div>
            </section>

            {/* Main Value Proposition */}
            <section className="py-20 bg-black">
                <div className="container mx-auto px-6 md:px-24">
                    {/* Header */}
                    <div className="mb-8">
                        <AnimatedContent distance={100} direction="vertical" animateOpacity duration={0.8}>
                            <h2 className="text-2xl md:text-4xl font-normal mb-6 text-white flex items-center gap-6">
                                For professional athletes and teams
                                <div className="h-[3px] w-12 md:h-[4px] md:w-20 bg-yellow-600 mt-2" />
                            </h2>
                        </AnimatedContent>
                    </div>
                </div>

                {/* Full Width Image Section with Content */}
                <div className="relative w-full h-auto min-h-[600px] select-none">
                    <Image
                        src="/images/how-we-work-night.png"
                        alt="Athletes in training"
                        fill
                        className="object-cover"
                        sizes="100vw"
                    />
                    {/* Dark overlay for text readability */}
                    <div className="absolute inset-0 bg-black/60 z-10" />

                    {/* Top Blur Effect */}
                    <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black to-transparent backdrop-blur-[2px] z-20" />
                    {/* Bottom Blur Effect */}
                    <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent backdrop-blur-[2px] z-20" />

                    {/* Text Content in Container */}
                    <div className="absolute inset-0 z-30 flex items-start pt-24 md:pt-32">
                        <div className="container mx-auto px-6 md:px-24">
                            <div className="max-w-4xl">
                                <AnimatedContent distance={100} direction="vertical" animateOpacity duration={0.8} delay={0.2}>
                                    <div className={`${showMainContent ? '' : 'line-clamp-6 md:line-clamp-none'} transition-all duration-300`}>
                                        <p className="text-neutral-100 text-lg md:text-2xl leading-relaxed font-normal mb-8">
                                            You train for seconds, centimetres, points, rankings. The margins are small, and every distraction steals from your performance. This is where the partnership starts: you share your competition details—dates, location, schedule, team size—and the rest becomes our responsibility.
                                        </p>

                                        {showMainContent && (
                                            <>
                                                <p className="text-neutral-300 text-sm md:text-lg leading-relaxed font-normal mb-6 animate-in fade-in duration-500">
                                                    From end to end, travel, stays and on-ground logistics are designed around your performance needs, not around &quot;what&apos;s easiest to book&quot;. You don&apos;t need to chase hotels, compare flights, or negotiate check‑out times with reception. You don&apos;t need ten different WhatsApp threads trying to coordinate arrivals.
                                                </p>
                                                <p className="text-neutral-300 text-sm md:text-lg leading-relaxed font-normal animate-in fade-in duration-500">
                                                    You send us your competition plan; we turn it into a clear, affordable logistics plan that you can trust. You stay locked in on race strategy, match prep, and recovery. We stay locked in on getting you there, ready.
                                                </p>
                                            </>
                                        )}
                                    </div>

                                    <button
                                        onClick={() => setShowMainContent(!showMainContent)}
                                        className="mt-4 text-[#D4AF37] hover:text-[#b3922b] text-sm md:hidden font-medium mb-12"
                                    >
                                        {showMainContent ? 'Show Less' : 'View More'}
                                    </button>

                                    <div className="hidden md:block space-y-6">
                                        <p className="text-neutral-300 text-sm md:text-lg leading-relaxed font-normal">
                                            From end to end, travel, stays and on-ground logistics are designed around your performance needs, not around &quot;what&apos;s easiest to book&quot;. You don&apos;t need to chase hotels, compare flights, or negotiate check‑out times with reception. You don&apos;t need ten different WhatsApp threads trying to coordinate arrivals.
                                        </p>
                                        <p className="text-neutral-300 text-sm md:text-lg leading-relaxed font-normal">
                                            You send us your competition plan; we turn it into a clear, affordable logistics plan that you can trust. You stay locked in on race strategy, match prep, and recovery. We stay locked in on getting you there, ready.
                                        </p>
                                    </div>
                                </AnimatedContent>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why we can help */}
            <section className="pb-20 pt-10 bg-black">
                <div className="container mx-auto px-6 md:px-24">
                    <AnimatedContent distance={100} direction="vertical" animateOpacity duration={0.8}>
                        <h2 className="text-2xl md:text-4xl font-normal mb-12 text-white flex items-center gap-6">
                            Why we can help
                            <div className="h-[3px] w-12 md:h-[4px] md:w-20 bg-yellow-600 mt-2" />
                        </h2>
                    </AnimatedContent>

                    <div className="max-w-5xl space-y-12">
                        {/* Performance-first thinking */}
                        <AnimatedContent distance={100} direction="vertical" animateOpacity duration={0.8} delay={0.1}>
                            <div>
                                <h3 className="text-xl md:text-2xl font-normal mb-4 text-yellow-600">
                                    Performance-first thinking
                                </h3>
                                <p className="text-neutral-400 leading-relaxed font-normal text-base md:text-lg">
                                    Every choice—flight timing, hotel location, room sharing, meals, transfers—is made with one question in mind: &quot;Will this help the athlete be ready to perform?&quot;
                                </p>
                            </div>
                        </AnimatedContent>

                        {/* Affordable, not cheap */}
                        <AnimatedContent distance={100} direction="vertical" animateOpacity duration={0.8} delay={0.2}>
                            <div>
                                <h3 className="text-xl md:text-2xl font-normal mb-4 text-yellow-600">
                                    Affordable, not cheap
                                </h3>
                                <p className="text-neutral-400 leading-relaxed font-normal text-base md:text-lg">
                                    We protect your budget without cutting corners that cost you energy or focus. Smart routing, value stays, and negotiated rates mean your money works harder for you.
                                </p>
                            </div>
                        </AnimatedContent>

                        {/* End-to-end clarity */}
                        <AnimatedContent distance={100} direction="vertical" animateOpacity duration={0.8} delay={0.3}>
                            <div>
                                <h3 className="text-xl md:text-2xl font-normal mb-4 text-yellow-600">
                                    End-to-end clarity
                                </h3>
                                <p className="text-neutral-400 leading-relaxed font-normal text-base md:text-lg">
                                    One point of contact, one plan. You always know where you need to be, when, and how you&apos;re getting there. If something changes, we adjust—so you don&apos;t have to firefight.
                                </p>
                            </div>
                        </AnimatedContent>

                        {/* Human, not just "service" */}
                        <AnimatedContent distance={100} direction="vertical" animateOpacity duration={0.8} delay={0.4}>
                            <div>
                                <h3 className="text-xl md:text-2xl font-normal mb-4 text-yellow-600">
                                    Human, not just &quot;service&quot;
                                </h3>
                                <p className="text-neutral-400 leading-relaxed font-normal text-base md:text-lg">
                                    This is personal. Every competition has a story: a debut, a comeback, a qualifying standard, a final shot. We respect that. You&apos;re not just a booking; you&apos;re an athlete with a goal.
                                </p>
                            </div>
                        </AnimatedContent>
                    </div>
                </div>
            </section>

            {/* Closing Statement */}
            <section className="py-20 bg-black">
                <div className="container mx-auto px-6 md:px-24">
                    <AnimatedContent distance={100} direction="vertical" animateOpacity duration={0.8}>
                        <p className="text-neutral-100 text-xl md:text-3xl max-w-4xl leading-relaxed font-normal text-center mx-auto">
                            You focus on bringing medal back home. <br className="hidden md:block" />
                            We take care of everything around it.
                        </p>
                    </AnimatedContent>
                </div>
            </section>

            {/* Enquiry CTA */}
            <EnquiryCTA
                title="Elite logistics for elite performance."
                description="Focus on the game. We handle the travel, accommodation, and logistics."
                link="/enquiry/athlete-professional"
                buttonLabel="Enquire Now"
            />

        </div>
    )
}
