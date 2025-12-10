'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import BlurText from './BlurText'

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
                    src="/freepik__35mm-film-photography-legend-player-emerging-from-__53997 1.jpg"
                    alt="Hero Background"
                    fill
                    className="object-cover"
                    priority
                />
            </motion.div>
            <div className="absolute inset-0 bg-black/20" /> {/* Optional overlay for better text contrast if needed later */}
            <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-background via-background/60 to-transparent z-10" />
            <div className="w-full relative z-20 flex h-full flex-col justify-center items-end max-[375px]:items-center px-6 md:px-12 text-white">
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
                        className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-extrabold text-blue-600 leading-tight tracking-wide"
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
