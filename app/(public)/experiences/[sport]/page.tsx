import SportHero from '@/components/experiences/SportHero'
import SportEventCard from '@/components/experiences/SportEventCard'
import { TrendingTournamentsCarousel } from '@/components/home/TrendingTournaments'
import Link from 'next/link'
import AnimatedContent from '@/components/home/AnimatedContent'
import { getEventsByCategory, SportCategory } from '@/lib/events'

// Map URL slugs to SportCategory and get real data
const sportMapping: Record<string, { category: SportCategory; title: string; description: string; heroImage: string }> = {
    'motorsports': {
        category: SportCategory.MOTORSPORTS,
        title: 'Motorsports Events 2026',
        description: 'Experience the thrill of Formula 1, MotoGP, Le Mans 24 Hours, and world-class endurance racing.',
        heroImage: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&q=80&w=1920'
    },
    'tennis': {
        category: SportCategory.TENNIS,
        title: 'Tennis Events 2026',
        description: 'Witness Grand Slam excellence, Masters 1000 tournaments, and the ATP Finals.',
        heroImage: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?auto=format&fit=crop&q=80&w=1920'
    },
    'football': {
        category: SportCategory.FOOTBALL,
        title: 'Football Events 2026',
        description: 'The FIFA World Cup 2026, UEFA Champions League, and elite football competitions.',
        heroImage: 'https://images.unsplash.com/photo-1551958219-acbc608c6377?auto=format&fit=crop&q=80&w=1920'
    },
    'cricket': {
        category: SportCategory.CRICKET,
        title: 'Cricket Events 2026',
        description: 'T20 World Cup, IPL 2026, Test Series, and international cricket tours.',
        heroImage: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&q=80&w=1920'
    },
    'rugby': {
        category: SportCategory.RUGBY,
        title: 'Rugby Events 2026',
        description: 'Six Nations, Super Rugby, Rugby League World Cup, and international championships.',
        heroImage: 'https://images.unsplash.com/photo-1628891890467-b79f2c8ba9dc?auto=format&fit=crop&q=80&w=1920'
    },
    'basketball': {
        category: SportCategory.BASKETBALL,
        title: 'Basketball Events 2026',
        description: 'NBA Finals, NCAA March Madness, EuroLeague, and FIBA tournaments.',
        heroImage: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&q=80&w=1920'
    },
    'other': {
        category: SportCategory.OTHER,
        title: 'Other Sports Events 2026',
        description: 'Winter Olympics, Asian Games, Tour de France, and multi-sport spectacles.',
        heroImage: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?auto=format&fit=crop&q=80&w=1920'
    }
};

export default async function SportPage({ params }: { params: Promise<{ sport: string }> }) {
    const { sport } = await params;
    const sportInfo = sportMapping[sport.toLowerCase()];

    // Get real events from our data
    const realEvents = sportInfo ? getEventsByCategory(sportInfo.category) : [];

    // Sort by date
    const sortedEvents = realEvents.sort((a, b) => a.startDate.getTime() - b.startDate.getTime());

    // Get top 5 high-demand events for trending carousel
    const trendingEvents = sortedEvents
        .filter(e => e.ticketDemand === 'EXTREME' || e.travelDemand === 'HIGH')
        .slice(0, 5)
        .map(event => ({
            name: event.name,
            src: event.imageUrl,
            link: `/experiences/event/${event.id}`,
            dateRange: event.dateRange,
            location: `${event.city || event.venue}, ${event.country}`,
            tagline: event.highlights?.[0] || event.description.substring(0, 50) + '...'
        }));

    // Convert real events to SportEventCard format for "Other Tournaments"
    const otherEvents = sortedEvents.slice(0, 16).map(event => {
        const monthNames = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
        return {
            id: event.id,
            title: event.name,
            date: {
                day: event.startDate.getDate().toString().padStart(2, '0'),
                month: monthNames[event.startDate.getMonth()]
            },
            location: `${event.city || event.venue}, ${event.country}`,
            description: event.description,
            image: event.imageUrl,
            link: `/experiences/event/${event.id}`
        };
    });

    return (
        <div className="min-h-screen bg-black text-white relative">
            {/* Hero Section */}
            <SportHero
                sport={sportInfo?.title || sport}
                description={sportInfo?.description || 'Discover amazing sporting events'}
                heroImage={sportInfo?.heroImage || 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&q=80&w=1920'}
                cardImage={sportInfo?.heroImage || 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&q=80&w=800'}
            />

            {/* Trending Tournaments Section */}
            <div className="w-full py-12 relative z-10">
                <div className="container mx-auto px-4 mb-8">
                    <AnimatedContent
                        distance={100}
                        direction="vertical"
                        duration={1}
                        ease="power3.out"
                        delay={0.1}
                    >
                        <h2 className="text-2xl md:text-3xl font-normal text-white text-left">
                            Trending {sport} tournaments
                        </h2>
                    </AnimatedContent>
                </div>
                <div className="container mx-auto px-4">
                    <AnimatedContent
                        distance={100}
                        direction="vertical"
                        duration={1}
                        ease="power3.out"
                        delay={0.3}
                    >
                        <TrendingTournamentsCarousel items={trendingEvents.length > 0 ? trendingEvents : [
                            {
                                name: `${sport} Events Coming Soon`,
                                src: sportInfo?.heroImage || "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&q=80&w=800",
                                link: `/experiences/${sport}`,
                                dateRange: "2026",
                                location: "Worldwide",
                                tagline: "Stay tuned for updates"
                            }
                        ]} />
                    </AnimatedContent>
                </div>
            </div>

            {/* Other Tournaments Section */}
            <div className="container mx-auto px-4 pb-20 relative z-10">
                <AnimatedContent
                    distance={100}
                    direction="vertical"
                    duration={1}
                    ease="power3.out"
                    delay={0.1}
                >
                    <h2 className="text-2xl md:text-3xl font-normal text-white text-left mb-8">
                        All {sport} Events 2026
                    </h2>
                </AnimatedContent>

                {/* Events Horizontal Scroll - 2 Rows */}
                <AnimatedContent
                    distance={100}
                    direction="vertical"
                    duration={1}
                    ease="power3.out"
                    delay={0.3}
                >
                    <div className="grid grid-rows-2 grid-flow-col gap-6 pb-8 overflow-x-auto snap-x [.::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                        {otherEvents.map((event) => (
                            <div key={event.id} className="min-w-[300px] w-[300px] md:min-w-[350px] md:w-[350px] snap-start">
                                <Link href={event.link} className="block cursor-pointer">
                                    <SportEventCard
                                        title={event.title}
                                        date={event.date}
                                        location={event.location}
                                        description={event.description}
                                        image={event.image}
                                    />
                                </Link>
                            </div>
                        ))}
                    </div>
                </AnimatedContent>
            </div>
        </div>
    )
}
