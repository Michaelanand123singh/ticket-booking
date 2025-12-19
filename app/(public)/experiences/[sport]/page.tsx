import SportHero from '@/components/experiences/SportHero'
import SportEventCard from '@/components/experiences/SportEventCard'
import TrendingTournamentsCarousel from '@/components/home/TrendingTournamentsCarousel'


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
        <div className="min-h-screen bg-black text-white relative">

            {/* Hero Section */}
            <SportHero
                sport={sport}
                description={data.description}
                heroImage={data.heroImage}
                cardImage={data.cardImage}
            />

            {/* Trending Tournaments Section - Full Width */}
            <div className="w-full py-12 relative z-10">
                <div className="container mx-auto px-4 mb-8">
                    <h2 className="text-2xl md:text-3xl font-normal text-white text-left">
                        Trending {sport} tournaments
                    </h2>
                </div>
                <div className="w-full">
                    <TrendingTournamentsCarousel items={[
                        { name: `Global ${sport} Cup`, src: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&q=80&w=800" },
                        { name: `National ${sport} League`, src: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&q=80&w=800" },
                        { name: `${sport} World Championship`, src: "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?auto=format&fit=crop&q=80&w=800" },
                        { name: `Regional ${sport} Finals`, src: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&q=80&w=800" },
                        { name: `Pro ${sport} Series`, src: "https://images.unsplash.com/photo-1624880357913-a8539238245b?auto=format&fit=crop&q=80&w=800" },
                    ]} />
                </div>
            </div>

            {/* Content Container */}
            <div className="container mx-auto px-4 pb-20 relative z-10">
                {/* Other Tournaments Heading */}
                <h2 className="text-2xl md:text-3xl font-normal text-white text-left mb-8">
                    Other Tournaments
                </h2>

                {/* Events Horizontal Scroll - 2 Rows */}
                <div className="grid grid-rows-2 grid-flow-col gap-6 pb-8 overflow-x-auto snap-x [.::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                    {data.events.map((event) => (
                        <div key={event.id} className="min-w-[300px] w-[300px] md:min-w-[350px] md:w-[350px] snap-start">
                            <SportEventCard
                                title={event.title}
                                date={event.date}
                                location={event.location}
                                description={event.description}
                                image={event.image}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
