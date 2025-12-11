import React from 'react'
import { ArrowUpDown, Filter } from 'lucide-react'
import SportHero from '../../../../components/SportHero'
import SportEventCard from '@/components/SportEventCard'

// Mock data generator based on sport
const getSportData = (sport: string) => {
    // Default images if specific ones aren't available
    const heroImages: Record<string, string> = {
        football: "https://images.unsplash.com/photo-1551958219-acbc608c6377?auto=format&fit=crop&q=80&w=1920",
        basketball: "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&q=80&w=1920",
        tennis: "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?auto=format&fit=crop&q=80&w=1920",
        cricket: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&q=80&w=1920",
        rugby: "https://images.unsplash.com/photo-1628891890467-b79f2c8ba9dc?auto=format&fit=crop&q=80&w=1920",
    }

    const eventImages: Record<string, string> = {
        football: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&q=80&w=800",
        basketball: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&q=80&w=800",
        tennis: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80&w=800",
        cricket: "https://images.unsplash.com/photo-1624526267942-ab0ff8a3e972?auto=format&fit=crop&q=80&w=800",
        rugby: "https://images.unsplash.com/photo-1519677584237-752f8853252e?auto=format&fit=crop&q=80&w=800",
    }

    const cardImages: Record<string, string> = {
        football: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&q=80&w=800",
        basketball: "https://images.unsplash.com/photo-1519861531473-920026393112?auto=format&fit=crop&q=80&w=800",
        tennis: "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?auto=format&fit=crop&q=80&w=800",
        cricket: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&q=80&w=800",
        rugby: "https://images.unsplash.com/photo-1519677584237-752f8853252e?auto=format&fit=crop&q=80&w=800",
    }

    return {
        description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.`,
        heroImage: heroImages[sport.toLowerCase()] || heroImages.football,
        cardImage: cardImages[sport.toLowerCase()] || cardImages.football,
        events: Array(8).fill(null).map((_, i) => ({
            id: i,
            title: "City Lights in New York",
            date: { day: "12", month: "DEC" },
            location: "New York City, USA",
            description: "Teams match held in New York, there was a clash between two teams, both teams won the match I mean it was a draw. they both are happy and living their life in peace.",
            image: eventImages[sport.toLowerCase()] || eventImages.football
        }))
    }
}

export default async function SportPage({ params }: { params: Promise<{ sport: string }> }) {
    const { sport } = await params
    const data = getSportData(sport)

    return (
        <div className="min-h-screen bg-[#11212D] text-white">
            {/* Hero Section */}
            <SportHero
                sport={sport}
                description={data.description}
                heroImage={data.heroImage}
                cardImage={data.cardImage}
            />

            {/* Content Container */}
            <div className="container mx-auto px-4 py-12 relative z-10">
                {/* Sort and Filter Buttons */}
                <div className="mb-12 flex gap-4">
                    <button className="flex items-center gap-2 px-6 py-3 bg-[#1e293b] border border-gray-700 rounded-lg text-white hover:bg-gray-800 transition-colors">
                        <ArrowUpDown className="w-4 h-4" />
                        Sort
                    </button>
                    <button className="flex items-center gap-2 px-6 py-3 bg-[#1e293b] border border-gray-700 rounded-lg text-white hover:bg-gray-800 transition-colors">
                        <Filter className="w-4 h-4" />
                        Filter
                    </button>
                </div>

                {/* Events Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
                    {data.events.map((event) => (
                        <SportEventCard
                            key={event.id}
                            title={event.title}
                            date={event.date}
                            location={event.location}
                            description={event.description}
                            image={event.image}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}
