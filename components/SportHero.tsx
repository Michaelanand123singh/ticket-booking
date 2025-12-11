import React from 'react'

interface SportHeroProps {
    sport: string
    description: string
    heroImage: string
    cardImage?: string
}

export default function SportHero({ sport, description, heroImage, cardImage }: SportHeroProps) {
    // Use cardImage if provided, otherwise fallback to heroImage
    const displayCardImage = cardImage || heroImage

    return (
        <div className="relative w-full min-h-[80vh] flex items-center overflow-hidden bg-[#0f172a]">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <img
                    src={heroImage}
                    alt={`${sport} hero`}
                    className="w-full h-full object-cover opacity-60"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#0f172a]/90 via-[#0f172a]/70 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0f172a]/50 to-[#0f172a]" />
            </div>

            {/* Content */}
            <div className="relative z-10 container mx-auto px-4 py-20 flex flex-col justify-center h-full">

                <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-16 max-w-6xl">
                    {/* Image Card */}
                    <div className="flex-shrink-0 w-full md:w-64 lg:w-80 aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl relative group">
                        <img
                            src={displayCardImage}
                            alt={`${sport} card`}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    </div>

                    {/* Text Content */}
                    <div className="flex-grow text-center md:text-left pt-4">
                        <h1 className="text-5xl md:text-7xl font-normal text-white mb-2 capitalize tracking-tight">
                            {sport}
                        </h1>
                        <p className="text-lg text-blue-400 mb-6 capitalize font-medium tracking-wide">
                            more details about {sport} section
                        </p>
                        <p className="text-gray-300 text-base md:text-lg leading-relaxed max-w-2xl mb-10">
                            {description}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
