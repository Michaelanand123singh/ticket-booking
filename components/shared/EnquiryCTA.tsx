"use client"

import React from 'react'
import Link from 'next/link'
import AnimatedContent from "@/components/home/AnimatedContent"

interface EnquiryCTAProps {
    title: string;
    description: string;
    link: string;
    buttonLabel: string;
}

export default function EnquiryCTA({ title, description, link, buttonLabel }: EnquiryCTAProps) {
    return (
        <section className="bg-black py-20 border-t border-white/10">
            <div className="container mx-auto px-6 md:px-12">
                <AnimatedContent distance={50} direction="vertical" animateOpacity duration={0.6}>
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16 max-w-6xl mx-auto">
                        <div className="flex flex-col gap-4 text-center md:text-left">
                            <h2 className="text-3xl md:text-4xl font-normal text-white">
                                {title}
                            </h2>
                            <p className="text-neutral-400 text-lg max-w-xl">
                                {description}
                            </p>
                        </div>

                        <Link
                            href={link}
                            className="bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-black font-medium text-lg px-8 py-3 rounded transition-colors whitespace-nowrap"
                        >
                            {buttonLabel}
                        </Link>
                    </div>
                </AnimatedContent>
            </div>
        </section>
    )
}
