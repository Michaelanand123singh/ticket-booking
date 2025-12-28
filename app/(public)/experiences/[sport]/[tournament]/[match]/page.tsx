import { Calendar, MapPin } from 'lucide-react'
import Itinerary from '@/components/athlete/Itinerary'
import ExperienceEnquiryForm from '@/components/experiences/ExperienceEnquiryForm'

// Mock data generator for the match
const getMatchData = (sport: string, tournament: string, matchId: string) => {
    // Decode strings
    const decodedTournament = decodeURIComponent(tournament).replace(/-/g, ' ');

    // Mock matches data (Same as in tournament page for consistency)
    const matches = [
        {
            id: "match-1",
            title: "Thunder Strikers vs Eagle Warriors",
            team1: "Thunder Strikers",
            team2: "Eagle Warriors",
            date: "OCT 24, 2025",
            time: "18:00 Local",
            venue: "Grand Arena",
            description: "Experience the electrifying clash between the Thunder Strikers and the Eagle Warriors. Both teams are at the peak of their form, promising an unforgettable showdown filled with intense action and strategic plays.",
            price: 150,
            heroImage: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&q=80&w=1920",
        },
        {
            id: "match-2",
            title: "Crimson Tide vs Royal Knights",
            team1: "Crimson Tide",
            team2: "Royal Knights",
            date: "OCT 26, 2025",
            time: "20:30 Local",
            venue: "City Stadium",
            description: "Witness the Crimson Tide take on the Royal Knights in a battle for dominance. With high stakes and passionate fans, this match is set to be a classic encounter in the tournament's history.",
            price: 180,
            heroImage: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&q=80&w=1920",
        },
        {
            id: "match-3",
            title: "Golden Falcons vs Shadow Vipers",
            team1: "Golden Falcons",
            team2: "Shadow Vipers",
            date: "NOV 01, 2025",
            time: "16:15 Local",
            venue: "Olympia Park",
            description: "The Golden Falcons face off against the Shadow Vipers. Expect a tactical masterclass as two of the most disciplined teams in the league go head-to-head for crucial points.",
            price: 160,
            heroImage: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&q=80&w=1920",
        },
        {
            id: "match-4",
            title: "Iron Giants vs Neon Stars",
            team1: "Iron Giants",
            team2: "Neon Stars",
            date: "NOV 05, 2025",
            time: "19:00 Local",
            venue: "Central Dome",
            description: "A clash of styles as the sturdy Iron Giants meet the flashy Neon Stars. Will power prevail over speed? Find out in this exciting matchup at the Central Dome.",
            price: 140,
            heroImage: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&q=80&w=1920",
        }
    ];

    const matchData = matches.find(m => m.id === matchId) || matches[0];

    return {
        ...matchData,
        // Ensure some fields are always present if mock data changes
        heroImage: matchData.heroImage || "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&q=80&w=1920",
        location: matchData.venue,
        itinerary: [
            {
                title: "Day 1 – You Arrive, We Take Over",
                description: "Private pickup from the airport straight to your preferred hotel (riverfront, old city, or modern business district – you choose the vibe). Light city discovery based on your mood: Sabarmati riverfront stroll, quiet temple visit, or straight to local snacks and chai – you say how much you want to do, we dial the pace up or down. Evening suggestions tailored to you: simple local dinner, riverside café, or early night to reset for match day."
            },
            {
                title: "Day 2 – Match Day, At Your Pace",
                description: "Start with a relaxed breakfast or a pre-match vibe session. We handle your transfer to the stadium with premium access. Experience the match from your selected seats. Post-match, we ensure a smooth exit and transfer back to your hotel or a celebratory dinner spot."
            },
            {
                title: "Day 3 – City, Food & Flex Time",
                description: "Explore the city's hidden gems, culinary delights, or shopping districts. We provide a curated guide and private transport at your disposal. Whether you want a guided heritage tour or just want to wander the markets, the day is yours to design."
            },
            {
                title: "Day 4 – Your Flex Day & Farewell",
                description: "A leisurely start to the day. Last-minute souvenir shopping or a relaxing spa session before your private transfer to the airport. We ensure you leave with memories of a lifetime and zero stress."
            }
        ]
    }
}

export default async function MatchPage({ params }: { params: Promise<{ sport: string, tournament: string, match: string }> }) {
    const { sport, tournament, match } = await params
    const data = getMatchData(sport, tournament, match)

    return (
        <div className="min-h-screen bg-black text-white relative font-sans">

            {/* Custom Hero Section */}
            <div className="relative w-full h-[60vh] min-h-[500px] flex items-end">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <img
                        src={data.heroImage}
                        alt="Match Hero"
                        className="w-full h-full object-cover"
                    />
                    {/* Gradient Overlays matching the design */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black" />
                    <div className="absolute inset-0 bg-black/40" />
                </div>

                {/* Hero Content */}
                <div className="relative z-10 container mx-auto px-4 pb-12 w-full">
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-6">

                        {/* Circular Logo */}
                        <div className="flex-shrink-0">
                            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-white flex items-center justify-center p-2 shadow-lg">
                                <div className="text-center text-xs text-black font-semibold leading-tight">
                                    VS
                                </div>
                            </div>
                        </div>

                        {/* Text Info */}
                        <div className="flex-grow mb-2 md:mb-0">
                            <h1 className="text-3xl md:text-5xl font-bold text-white mb-2">
                                {data.title}
                            </h1>

                            <div className="flex flex-wrap items-center gap-4 text-sm md:text-base text-gray-200">
                                <span>{data.date}, {data.time}</span>

                                <span className="px-3 py-1 bg-[#84cc16] text-black text-xs font-bold uppercase tracking-wider rounded">
                                    Date Confirmed
                                </span>

                                <div className="flex items-center gap-1">
                                    <div className="w-2 h-2 rounded-full bg-white" />
                                    <span>{data.location}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Details Card Section */}
            <div className="relative z-10 container mx-auto px-4 mt-8 pb-16">
                <div className="bg-transparent backdrop-blur-none rounded-2xl p-8 md:p-12 border-0">
                    <div className="flex flex-col lg:flex-row gap-12">

                        {/* Left Column: Description */}
                        <div className="lg:w-2/3">
                            <h2 className="text-2xl sm:text-4xl font-normal text-white mb-2">
                                {data.title}
                            </h2>
                            <p className="text-gray-400 mb-8 text-sm">
                                {data.date}, {data.time}
                            </p>

                            <p className="text-gray-300 leading-relaxed text-sm md:text-base text-justify">
                                {data.description}
                            </p>
                        </div>

                        {/* Right Column: CTA */}
                        <div className="lg:w-1/3 flex flex-col justify-center items-start lg:items-end lg:text-right mt-8 lg:mt-0">
                            <p className="text-xl md:text-2xl text-white font-normal mb-4">
                                From {data.price} $ .
                            </p>

                            <button className="bg-[#D4AF37] hover:bg-[#b5952f] text-black font-semibold text-lg px-8 py-3 rounded-lg w-full md:w-auto transition-colors shadow-lg">
                                Buy Tickets
                            </button>

                            <p className="text-gray-500 text-xs mt-4">
                                Get your tickets 1 - 3 days before event.
                            </p>
                        </div>

                    </div>
                </div>
            </div>

            {/* Itinerary Section */}
            <div className="mt-0">
                <Itinerary items={data.itinerary} />
            </div>

            {/* Experience Enquiry Form */}
            <ExperienceEnquiryForm />

        </div>
    )
}
