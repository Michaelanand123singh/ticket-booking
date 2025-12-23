import Image from 'next/image'
import Link from 'next/link'
import { recreationalEvents } from '@/lib/data'

export default function RecreationalEvents() {
    return (
        <section className="py-8 md:py-20 bg-black text-white relative overflow-hidden">
            <div className="container mx-auto px-4 min-[425px]:px-12 relative z-10">
                <div className="flex flex-col gap-24">
                    {recreationalEvents.map((event) => (
                        <Link href={`/athlete/recreational/${event.id}`} key={event.id} className="group block">
                            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16 transition-all duration-300 group-hover:bg-white/5 rounded-3xl p-4 md:p-8">
                                {/* Left: Image */}
                                <div className="w-full md:w-1/2 relative">
                                    <div className="relative aspect-video w-full overflow-hidden transition-all duration-500 shadow-2xl shadow-black/50 [mask-image:linear-gradient(to_bottom,black_80%,transparent_100%),radial-gradient(circle,black_60%,transparent_100%)] webkit-mask-image-radial group-hover:scale-[1.02]">
                                        <div className="w-full h-full [mask-image:radial-gradient(black_60%,transparent_100%)]">
                                            {/* Dark overlay for cinematic look */}
                                            <div className="absolute inset-0 bg-black/20 z-10 transition-opacity duration-300 group-hover:opacity-0"></div>
                                            <Image
                                                src={event.image}
                                                alt={event.subtitle}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Right: Content */}
                                <div className="w-full md:w-1/2 text-left">
                                    <h3 className="text-xl md:text-2xl font-light text-gray-300 mb-2 group-hover:text-[#D4AF37] transition-colors">
                                        {event.title}
                                    </h3>
                                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 tracking-wide group-hover:text-[#D4AF37] transition-colors">
                                        {event.subtitle}
                                    </h2>
                                    <p className="text-gray-400 leading-relaxed text-sm md:text-base max-w-xl group-hover:text-gray-200 transition-colors">
                                        {event.description}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}
