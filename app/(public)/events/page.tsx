"use client"

import React from 'react'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import Image from "next/image"
import PartnershipForm from "@/components/events/PartnershipForm"
import AnimatedContent from "@/components/home/AnimatedContent"

export default function EventsPage() {
    const [showHowWeWork, setShowHowWeWork] = React.useState(false)
    const [showWhyPartner, setShowWhyPartner] = React.useState(false)

    return (
        <div className="bg-black text-white min-h-screen font-sans selection:bg-yellow-500/30">

            {/* Hero Section */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden">
                {/* Hero Image */}
                <div className="absolute inset-0 z-0 select-none">
                    <Image
                        src="/images/events-hero.png"
                        alt="Stadium at night"
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
                        <h1 className="text-4xl md:text-7xl font-normal max-w-4xl tracking-tight leading-tight">
                            India&apos;s Sports <br />
                            Movement <br />
                            Needs Smart <br />
                            Partners.
                        </h1>
                    </AnimatedContent>
                </div>
            </section>

            {/* How we work */}
            <section className="py-20 bg-black">
                <div className="container mx-auto px-6 md:px-24">
                    {/* Header moved outside image */}
                    <div className="mb-8">
                        <AnimatedContent distance={100} direction="vertical" animateOpacity duration={0.8}>
                            <h2 className="text-2xl md:text-4xl font-normal mb-6 text-white flex items-center gap-6">
                                How we work
                                <div className="h-[3px] w-12 md:h-[4px] md:w-20 bg-yellow-600 mt-2" />
                            </h2>
                        </AnimatedContent>
                    </div>
                </div>

                {/* Full Width Image Section with Blurs */}
                <div className="relative w-full h-auto min-h-[600px] select-none">
                    <Image
                        src="/images/how-we-work-night.png"
                        alt="Sports event crowd"
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
                                    <div className={`${showHowWeWork ? '' : 'line-clamp-4 md:line-clamp-none'} transition-all duration-300`}>
                                        <p className="text-neutral-100 text-lg md:text-2xl leading-relaxed font-normal mb-8">
                                            India&apos;s sports events boom is real. Marathons, cycling sportives, triathlons, and
                                            grassroots tournaments are exploding across every state, urban centers and emerging
                                            towns alike. At Virgil Sports, we partner with organizers building this movement today.
                                        </p>

                                        {showHowWeWork && (
                                            <p className="text-neutral-300 text-sm md:text-lg leading-relaxed font-normal animate-in fade-in duration-500">
                                                From your event&apos;s first registration to the finish line, we handle the heavy lifting:
                                                permits, logistics, participant travel, venue coordination, sponsorship activation, and
                                                ground execution. You focus on the mission. We handle the complexity. Whether you&apos;re
                                                running your first event or scaling up a flagship tournament, we&apos;ve got the playbook built
                                                for India&apos;s unique landscape.
                                            </p>
                                        )}
                                    </div>

                                    <button
                                        onClick={() => setShowHowWeWork(!showHowWeWork)}
                                        className="mt-4 text-[#D4AF37] hover:text-[#b3922b] text-sm md:hidden font-medium mb-12"
                                    >
                                        {showHowWeWork ? 'Show Less' : 'View More'}
                                    </button>

                                    <div className="hidden md:block">
                                        <p className="text-neutral-300 text-sm md:text-lg leading-relaxed font-normal">
                                            From your event&apos;s first registration to the finish line, we handle the heavy lifting:
                                            permits, logistics, participant travel, venue coordination, sponsorship activation, and
                                            ground execution. You focus on the mission. We handle the complexity. Whether you&apos;re
                                            running your first event or scaling up a flagship tournament, we&apos;ve got the playbook built
                                            for India&apos;s unique landscape.
                                        </p>
                                    </div>
                                </AnimatedContent>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why partner with us */}
            <section className="pb-20 pt-10 bg-black">
                <div className="container mx-auto px-6 md:px-24">
                    <AnimatedContent distance={100} direction="vertical" animateOpacity duration={0.8}>
                        <h2 className="text-2xl md:text-4xl font-normal mb-12 text-white flex items-center gap-6">
                            Why partner with us
                            <div className="h-[3px] w-12 md:h-[4px] md:w-20 bg-yellow-600 mt-2" />
                        </h2>
                    </AnimatedContent>

                    <div className="max-w-5xl">
                        <AnimatedContent distance={100} direction="vertical" animateOpacity duration={0.8} delay={0.2}>
                            <div className={`${showWhyPartner ? '' : 'line-clamp-4'} transition-all duration-300 space-y-8`}>
                                <p className="text-neutral-400 leading-relaxed font-normal text-base md:text-lg">
                                    Because organizing a quality event shouldn&apos;t mean sleepless nights or
                                    compromised quality. We&apos;ve built networks of trusted partners, hotels, and
                                    transport operators. Timing companies, medical teams, and event specialists
                                    across India&apos;s major cities and emerging event hubs.
                                </p>

                                <p className="text-neutral-400 leading-relaxed font-normal text-base md:text-lg">
                                    But here&apos;s what sets us apart: we bring participant travel and experience support. Participants don&apos;t just register for
                                    your event; they experience a seamless journey. We also strive to keep costs transparent: no hidden fees, honest
                                    pricing, value for every rupee invested. When budgets are tight, we help optimize. When corporate partnerships feel
                                    overwhelming, we simplify it. Your success is our success, and we price accordingly.
                                </p>
                            </div>

                            <button
                                onClick={() => setShowWhyPartner(!showWhyPartner)}
                                className="mt-4 text-[#D4AF37] hover:text-[#b3922b] text-sm font-medium"
                            >
                                {showWhyPartner ? 'Show Less' : 'View More'}
                            </button>
                        </AnimatedContent>
                    </div>
                </div>
            </section>

            {/* What's next */}
            <section className="py-20 bg-black">
                <div className="container mx-auto px-6 md:px-24">
                    <AnimatedContent distance={100} direction="vertical" animateOpacity duration={0.8}>
                        <h2 className="text-2xl md:text-4xl font-normal mb-8 text-white flex items-center gap-6">
                            What&apos;s next
                            <div className="h-[3px] w-12 md:h-[4px] md:w-20 bg-yellow-600 mt-2" />
                        </h2>
                    </AnimatedContent>

                    <AnimatedContent distance={100} direction="vertical" animateOpacity duration={0.8} delay={0.2}>
                        <p className="text-neutral-400 max-w-3xl leading-relaxed font-normal">
                            Whether you&apos;re planning your first event or scaling a growing existing one, the process starts with us
                            understanding your community, your goals, your challenges. Fill in the form below so we can handle, refine
                            and grow this fairly together. No jargon. No pressure. Just a conversation about building something that changes lives
                            and cities.
                        </p>
                    </AnimatedContent>
                </div>
            </section>

            {/* Partnership Form */}
            <section className="py-20 bg-black pb-32">
                <div className="container mx-auto px-6 md:px-24">
                    <AnimatedContent distance={100} direction="vertical" animateOpacity duration={0.8}>
                        <h2 className="text-2xl md:text-4xl font-normal mb-12 text-white flex items-center gap-6">
                            Partnership form
                            <div className="h-[3px] w-12 md:h-[4px] md:w-20 bg-yellow-600 mt-2" />
                        </h2>
                    </AnimatedContent>

                    <div className="max-w-4xl">
                        <AnimatedContent distance={100} direction="vertical" animateOpacity duration={0.8} delay={0.1}>
                            <h3 className="text-xl md:text-2xl font-normal text-white mb-2">The event you envision. The execution we deliver.</h3>
                            <p className="text-neutral-400 mb-12 font-normal text-sm md:text-base">Tell us the vision. We handle the logistics, tech, safety, and operations manuals that make it real. Smooth, scalable, sweat-proof.</p>
                        </AnimatedContent>

                        <PartnershipForm />
                    </div>
                </div>
            </section>
        </div>
    )
}
