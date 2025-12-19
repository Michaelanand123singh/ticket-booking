import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function AthleteSelection() {
    return (
        <section className="py-16 bg-black text-white relative">
            <div className="container mx-auto px-4 min-[425px]:px-12 relative z-20">
                {/* Heading */}
                <h2 className="text-2xl sm:text-4xl font-normal text-left flex items-center gap-4 mb-12">
                    Athlete
                    <div className="h-[4px] w-24 bg-[#D4AF37] mt-2"></div>
                </h2>

                {/* Content */}
                <div className="flex flex-col md:flex-row justify-between items-start gap-12 md:gap-24 w-full">

                    {/* Professional */}
                    <Link href="/atheletes/professional" className="group cursor-pointer flex flex-col items-center w-full md:flex-1 max-w-2xl">
                        <div className="relative w-full h-[300px] md:h-[500px] transition-all duration-1000 ease-out group-hover:shadow-[0_0_150px_rgba(212,175,55,0.2)] rounded-3xl">
                            {/* Card Background / Blur Effect */}
                            <div className="absolute -inset-8 bg-gradient-to-r from-[#D4AF37] to-[#AA8C2C] rounded-[3rem] blur-2xl opacity-0 group-hover:opacity-15 transition duration-1000"></div>

                            <div className="relative w-full h-full overflow-hidden [mask-image:linear-gradient(to_bottom,black_80%,transparent_100%),radial-gradient(circle,black_60%,transparent_100%)] webkit-mask-image-radial">
                                {/* Using a radical gradient mask to blur the edges */}
                                <div className="w-full h-full [mask-image:radial-gradient(black_60%,transparent_100%)]">
                                    <Image
                                        src="https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=1000&auto=format&fit=crop"
                                        alt="Professional Athlete"
                                        fill
                                        className="object-cover transition-all duration-1000 grayscale group-hover:grayscale-0"
                                    />
                                </div>
                            </div>
                        </div>
                        <h3 className="text-[#D4AF37] text-2xl sm:text-3xl font-normal mt-6 tracking-wide">
                            Professional
                        </h3>
                    </Link>

                    {/* Recreational */}
                    <Link href="/atheletes/recreational" className="group cursor-pointer flex flex-col items-center w-full md:flex-1 max-w-2xl mt-12 md:mt-0">
                        <div className="relative w-full h-[300px] md:h-[500px] transition-all duration-1000 ease-out group-hover:shadow-[0_0_150px_rgba(212,175,55,0.2)] rounded-3xl">
                            {/* Card Background / Blur Effect */}
                            <div className="absolute -inset-8 bg-gradient-to-r from-[#D4AF37] to-[#AA8C2C] rounded-[3rem] blur-2xl opacity-0 group-hover:opacity-15 transition duration-1000"></div>

                            <div className="relative w-full h-full overflow-hidden">
                                {/* Using a radical gradient mask to blur the edges */}
                                <div className="w-full h-full [mask-image:radial-gradient(black_60%,transparent_100%)]">
                                    <Image
                                        src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1000&auto=format&fit=crop"
                                        alt="Recreational Athlete"
                                        fill
                                        className="object-cover transition-all duration-1000 grayscale group-hover:grayscale-0"
                                    />
                                </div>
                            </div>
                        </div>
                        <h3 className="text-[#D4AF37] text-2xl sm:text-3xl font-normal mt-6 tracking-wide">
                            Recreational
                        </h3>
                    </Link>

                </div>
            </div>
        </section>
    )
}
