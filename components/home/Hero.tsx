'use client'

import Image from 'next/image'
import heroImage from '@/public/images/freepik__35mm-film-photography-legend-player-emerging-from-__53997 1.jpg'
import { motion } from 'framer-motion'
import BlurText from '@/components/ui/BlurText'
import HeroJourneyLine from '@/components/home/HeroJourneyLine'

export default function Hero() {
    return (
        <div className="relative h-screen w-full overflow-hidden">
            <motion.div
                className="absolute inset-0"
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 6, ease: "easeOut" }}
            >
                <Image
                    src={heroImage}
                    alt="Hero Background"
                    fill
                    className="object-cover"
                    priority
                    placeholder="blur"
                />
            </motion.div>
            <div className="absolute inset-0 bg-black/20" /> {/* Optional overlay for better text contrast if needed later */}
            <HeroJourneyLine />
            <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-background via-background/60 to-transparent z-10" />
            <div className="w-full relative z-20 flex h-full flex-col justify-center items-end max-[375px]:items-center px-6 min-[425px]:px-12 md:px-12 text-white">
                <div className="w-auto text-left max-[375px]:text-center flex flex-col gap-1 translate-y-16">
                    <BlurText
                        text="YOUR NEXT"
                        delay={300}
                        animateBy="words"
                        direction="top"
                        className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-light leading-tight tracking-wide"
                    />
                    <BlurText
                        text="SPORTS"
                        delay={300}
                        animateBy="words"
                        direction="top"
                        className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-light leading-tight tracking-wide"
                    />
                    <BlurText
                        text="ADVENTURE"
                        delay={300}
                        animateBy="words"
                        direction="top"
                        className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-extrabold leading-tight tracking-wide"
                        childClassName="bg-gradient-to-r from-[#FDB931] via-[#FFFFAC] to-[#D4AF37] bg-clip-text text-transparent"
                    />
                    <BlurText
                        text="STARTS"
                        delay={300}
                        animateBy="words"
                        direction="top"
                        className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-light leading-tight tracking-wide"
                    />
                    <BlurText
                        text="HERE"
                        delay={150}
                        animateBy="words"
                        direction="top"
                        className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-light leading-tight tracking-wide"
                    />
                </div>
            </div>
        </div>
    )
}
