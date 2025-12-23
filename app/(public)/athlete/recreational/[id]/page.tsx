import { recreationalEvents } from '@/lib/data'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import Itinerary from '@/components/athlete/Itinerary'

export async function generateStaticParams() {
    return recreationalEvents.map((event) => ({
        id: event.id.toString(),
    }))
}

export default async function RecreationalEventPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const event = recreationalEvents.find((evt) => evt.id === parseInt(id))

    if (!event) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">Event Not Found</h1>
                    <Link href="/athlete?type=recreational" className="text-[#D4AF37] hover:underline">
                        Return to Athletes
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <main className="min-h-screen bg-black text-white font-sans">
            {/* Header / Navigation */}


            {/* Hero Section */}
            <div className="relative w-full h-[85vh] min-h-[600px] flex items-end">
                <div className="absolute inset-0 z-0">
                    <Image
                        src={event.image}
                        alt={event.subtitle}
                        fill
                        className="object-cover"
                        priority
                    />
                    {/* Gradient Overlay specific to the design */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                </div>

                <div className="relative z-10 container mx-auto px-[5%] pb-24">
                    <Link
                        href="/athlete?type=recreational"
                        className="inline-flex items-center gap-2 text-white/80 hover:text-[#D4AF37] transition-colors mb-8 text-sm uppercase tracking-widest bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/10"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Athletes
                    </Link>

                    <h2 className="text-2xl md:text-3xl font-light text-white mb-2 shadow-black drop-shadow-lg">
                        {event.title}
                    </h2>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-wide max-w-4xl shadow-black drop-shadow-xl mb-8">
                        {event.subtitle}
                    </h1>
                </div>
            </div>

            {/* Description & Button Section */}
            <div className="container mx-auto px-[5%] -mt-10 relative z-20">
                <div className="flex flex-col lg:flex-row justify-between items-start gap-12">
                    <div className="w-full lg:w-2/3">
                        <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-8 max-w-2xl">
                            {event.description}
                        </p>
                    </div>
                    <div className="w-full lg:w-1/3 flex justify-start lg:justify-end">
                        <button className="bg-[#D4AF37] text-black font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-[#b08d26] transition-colors uppercase tracking-wider">
                            Book this event
                        </button>
                    </div>
                </div>
            </div>

            {/* Itinerary Section */}
            {event.itinerary && (
                <div className="mt-20">
                    <Itinerary items={event.itinerary} />
                </div>
            )}

            {/* Contact Section (handled by footer/layout, but adding spacer if needed) */}
            <div className="h-20"></div>
        </main>
    )
}
