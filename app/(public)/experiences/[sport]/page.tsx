import SportHero from '@/components/experiences/SportHero'
import SportEventCard from '@/components/experiences/SportEventCard'
import { TrendingTournamentsCarousel } from '@/components/home/TrendingTournaments'
import Link from 'next/link'
import AnimatedContent from '@/components/home/AnimatedContent'


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

    const eventsData: Record<string, any[]> = {
        football: [
            { id: 1, title: "Summer Cup 2024", date: { day: "15", month: "JUN" }, location: "London, UK", description: "Annual summer amateur football tournament open to all local teams.", image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&q=80&w=800", link: `/experiences/football/summer-cup-2024` },
            { id: 2, title: "Youth League Finals", date: { day: "22", month: "JUL" }, location: "Manchester, UK", description: "The culmination of the regional youth leagues, featuring top U-18 talent.", image: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?auto=format&fit=crop&q=80&w=800", link: `/experiences/football/youth-league-finals` },
            { id: 3, title: "Corporate 5-a-side", date: { day: "05", month: "AUG" }, location: "Birmingham, UK", description: "Networking and competition combined in this popular corporate event.", image: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&q=80&w=800", link: `/experiences/football/corporate-5-a-side` },
            { id: 4, title: "Charity Shield", date: { day: "12", month: "AUG" }, location: "Liverpool, UK", description: "Fundraising match featuring local celebrities and former pros.", image: "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?auto=format&fit=crop&q=80&w=800", link: `/experiences/football/charity-shield` },
            { id: 5, title: "Winter Classic", date: { day: "10", month: "DEC" }, location: "Newcastle, UK", description: "Brave the cold in this tough winter tournament for semi-pro clubs.", image: "https://images.unsplash.com/photo-1551958219-acbc608c6377?auto=format&fit=crop&q=80&w=800", link: `/experiences/football/winter-classic` },
            { id: 6, title: "Spring Awakening", date: { day: "20", month: "MAR" }, location: "Leeds, UK", description: "Kicking off the spring season with a vibrant community tournament.", image: "https://images.unsplash.com/photo-1522778119026-d647f0565c6a?auto=format&fit=crop&q=80&w=800", link: `/experiences/football/spring-awakening` },
            { id: 7, title: "Veterans Cup", date: { day: "14", month: "SEP" }, location: "Glasgow, UK", description: "Celebrating the enduring spirit of football with over-40s teams.", image: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&q=80&w=800", link: `/experiences/football/veterans-cup` },
            { id: 8, title: "City Derby Series", date: { day: "30", month: "OCT" }, location: "Manchester, UK", description: "Local rivals face off in this intense mini-league format.", image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&q=80&w=800", link: `/experiences/football/city-derby-series` },
        ],
        basketball: [
            { id: 1, title: "3x3 Urban Jam", date: { day: "18", month: "JUN" }, location: "New York, USA", description: "High-energy 3x3 basketball tournament in the heart of the city.", image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&q=80&w=800", link: `/experiences/basketball/3x3-urban-jam` },
            { id: 2, title: "Summer Pro League", date: { day: "01", month: "JUL" }, location: "Los Angeles, USA", description: "Where upcoming stars showcase their skills for scouts.", image: "https://images.unsplash.com/photo-1519861531473-920026393112?auto=format&fit=crop&q=80&w=800", link: `/experiences/basketball/summer-pro-league` },
            { id: 3, title: "College Tip-Off", date: { day: "15", month: "NOV" }, location: "Chicago, USA", description: "Pre-season tournament featuring top local college teams.", image: "https://images.unsplash.com/photo-1504450758481-7338eba7524a?auto=format&fit=crop&q=80&w=800", link: `/experiences/basketball/college-tip-off` },
            { id: 4, title: "Streetball King", date: { day: "20", month: "AUG" }, location: "Miami, USA", description: "The legendary streetball competition returns to South Beach.", image: "https://images.unsplash.com/photo-1574623452334-1e0ac2b3ccb4?auto=format&fit=crop&q=80&w=800", link: `/experiences/basketball/streetball-king` },
            { id: 5, title: "Global Hoops Summit", date: { day: "05", month: "SEP" }, location: "Toronto, Canada", description: "International youth tournament fostering global talent.", image: "https://images.unsplash.com/photo-1505666287802-9311e0ddf8b7?auto=format&fit=crop&q=80&w=800", link: `/experiences/basketball/global-hoops-summit` },
            { id: 6, title: "Winter Dunk Fest", date: { day: "10", month: "JAN" }, location: "Boston, USA", description: "Indoor showcase featuring a spectacular slam dunk contest.", image: "https://images.unsplash.com/photo-1518063319789-7217e6706b04?auto=format&fit=crop&q=80&w=800", link: `/experiences/basketball/winter-dunk-fest` },
            { id: 7, title: "Spring Break Ball", date: { day: "25", month: "MAR" }, location: "San Diego, USA", description: "Combining basketball and beach vibes for college students.", image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&q=80&w=800", link: `/experiences/basketball/spring-break-ball` },
            { id: 8, title: "Midnight Madness", date: { day: "15", month: "OCT" }, location: "Brooklyn, USA", description: "Late-night tournament under the lights of Brooklyn.", image: "https://images.unsplash.com/photo-1519861531473-920026393112?auto=format&fit=crop&q=80&w=800", link: `/experiences/basketball/midnight-madness` },
        ],
        tennis: [
            { id: 1, title: "Grass Court Classic", date: { day: "25", month: "JUN" }, location: "London, UK", description: "Traditional grass court tournament preparing players for Wimbledon.", image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80&w=800", link: `/experiences/tennis/grass-court-classic` },
            { id: 2, title: "Clay Open", date: { day: "15", month: "MAY" }, location: "Paris, France", description: "Grueling clay court action in the spring sun.", image: "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?auto=format&fit=crop&q=80&w=800", link: `/experiences/tennis/clay-open` },
            { id: 3, title: "Hardcourt Series", date: { day: "10", month: "AUG" }, location: "New York, USA", description: "Fast-paced hardcourt tennis tournament.", image: "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?auto=format&fit=crop&q=80&w=800", link: `/experiences/tennis/hardcourt-series` },
            { id: 4, title: "Junior Championship", date: { day: "05", month: "SEP" }, location: "Melbourne, Australia", description: "Showcasing the next generation of tennis stars.", image: "https://images.unsplash.com/photo-1530910054832-628d052b6507?auto=format&fit=crop&q=80&w=800", link: `/experiences/tennis/junior-championship` },
            { id: 5, title: "Indoor Masters", date: { day: "12", month: "NOV" }, location: "Stockholm, Sweden", description: "Premier indoor tennis event to close out the season.", image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=800", link: `/experiences/tennis/indoor-masters` },
            { id: 6, title: "Desert Open", date: { day: "12", month: "MAR" }, location: "Palm Springs, USA", description: "Early season tournament in the California desert.", image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80&w=800", link: `/experiences/tennis/desert-open` },
            { id: 7, title: "Doubles Invitational", date: { day: "18", month: "JUL" }, location: "Hamburg, Germany", description: "A special event focused entirely on doubles play.", image: "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?auto=format&fit=crop&q=80&w=800", link: `/experiences/tennis/doubles-invitational` },
            { id: 8, title: "Next Gen Finals", date: { day: "05", month: "NOV" }, location: "Milan, Italy", description: "The top 21-and-under players compete for glory.", image: "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?auto=format&fit=crop&q=80&w=800", link: `/experiences/tennis/next-gen-finals` },
        ],
        cricket: [
            { id: 1, title: "T20 Blast Off", date: { day: "10", month: "MAY" }, location: "Mumbai, India", description: "Explosive T20 action to start the cricket season.", image: "https://images.unsplash.com/photo-1624526267942-ab0ff8a3e972?auto=format&fit=crop&q=80&w=800", link: `/experiences/cricket/t20-blast-off` },
            { id: 2, title: "Test Championship", date: { day: "01", month: "JUN" }, location: "London, UK", description: "The ultimate test of endurance and skill in white clothing.", image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&q=80&w=800", link: `/experiences/cricket/test-championship` },
            { id: 3, title: "Beach Cricket Fest", date: { day: "15", month: "DEC" }, location: "Sydney, Australia", description: "Fun, sun, and sand in this relaxed cricket festival.", image: "https://images.unsplash.com/photo-1593341646782-e0b495cffd32?auto=format&fit=crop&q=80&w=800", link: `/experiences/cricket/beach-cricket-fest` },
            { id: 4, title: "Corporate Cup", date: { day: "20", month: "OCT" }, location: "Dubai, UAE", description: "Business meets pleasure on the cricket pitch.", image: "https://images.unsplash.com/photo-1608245449230-4e79598bd6cd?auto=format&fit=crop&q=80&w=800", link: `/experiences/cricket/corporate-cup` },
            { id: 5, title: "Legends League", date: { day: "05", month: "MAR" }, location: "Doha, Qatar", description: "Retired greats return to the field for glory.", image: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&q=80&w=800", link: `/experiences/cricket/legends-league` },
            { id: 6, title: "County Clash", date: { day: "12", month: "AUG" }, location: "Nottingham, UK", description: "Traditional county cricket at its finest.", image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&q=80&w=800", link: `/experiences/cricket/county-clash` },
            { id: 7, title: "Women's Premier", date: { day: "01", month: "FEB" }, location: "Bangalore, India", description: "Top women cricketers showing their prowess.", image: "https://images.unsplash.com/photo-1624526267942-ab0ff8a3e972?auto=format&fit=crop&q=80&w=800", link: `/experiences/cricket/womens-premier` },
            { id: 8, title: "Sixes Tournament", date: { day: "10", month: "NOV" }, location: "Singapore", description: "Fast and furious six-a-side action.", image: "https://images.unsplash.com/photo-1593341646782-e0b495cffd32?auto=format&fit=crop&q=80&w=800", link: `/experiences/cricket/sixes-tournament` },
        ],
        rugby: [
            { id: 1, title: "Sevens Spectacular", date: { day: "05", month: "APR" }, location: "Hong Kong", description: "Fast-paced, high-scoring rugby sevens action.", image: "https://images.unsplash.com/photo-1519677584237-752f8853252e?auto=format&fit=crop&q=80&w=800", link: `/experiences/rugby/sevens-spectacular` },
            { id: 2, title: "Six Nations Derby", date: { day: "10", month: "FEB" }, location: "Cardiff, Wales", description: "A fierce rivalry match in the prestigious Six Nations.", image: "https://images.unsplash.com/photo-1628891890467-b79f2c8ba9dc?auto=format&fit=crop&q=80&w=800", link: `/experiences/rugby/six-nations-derby` },
            { id: 3, title: "Club Championship", date: { day: "25", month: "MAY" }, location: "Dublin, Ireland", description: "The top clubs in Europe battle for supremacy.", image: "https://images.unsplash.com/photo-1548842144-8f0cbd3afc89?auto=format&fit=crop&q=80&w=800", link: `/experiences/rugby/club-championship` },
            { id: 4, title: "Touch Rugby Open", date: { day: "15", month: "JUL" }, location: "Auckland, New Zealand", description: "Inclusive tournament for mixed teams and all ages.", image: "https://images.unsplash.com/photo-1534008797087-0b15f9394f71?auto=format&fit=crop&q=80&w=800", link: `/experiences/rugby/touch-rugby-open` },
            { id: 5, title: "Autumn International", date: { day: "12", month: "NOV" }, location: "Twickenham, UK", description: "Northern vs Southern hemisphere clash.", image: "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?auto=format&fit=crop&q=80&w=800", link: `/experiences/rugby/autumn-international` },
            { id: 6, title: "Super Rugby Round", date: { day: "22", month: "APR" }, location: "Cape Town, SA", description: "High intensity match from the Super Rugby league.", image: "https://images.unsplash.com/photo-1519677584237-752f8853252e?auto=format&fit=crop&q=80&w=800", link: `/experiences/rugby/super-rugby-round` },
            { id: 7, title: "Invitational Cup", date: { day: "08", month: "JUN" }, location: "Paris, France", description: "Select teams invited for a prestigious cup tie.", image: "https://images.unsplash.com/photo-1628891890467-b79f2c8ba9dc?auto=format&fit=crop&q=80&w=800", link: `/experiences/rugby/invitational-cup` },
            { id: 8, title: "Beach Rugby Challenge", date: { day: "18", month: "AUG" }, location: "Marseille, France", description: "Rugby on the sand, a test of stamina and speed.", image: "https://images.unsplash.com/photo-1534008797087-0b15f9394f71?auto=format&fit=crop&q=80&w=800", link: `/experiences/rugby/beach-rugby-challenge` },
        ],
    }

    const sportLower = sport.toLowerCase();
    const events = eventsData[sportLower] || eventsData.football.map(e => ({ ...e, link: `/experiences/${sportLower}/${e.link.split('/').pop()}` }));

    return {
        description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.`,
        heroImage: heroImages[sportLower] || heroImages.football,
        cardImage: cardImages[sportLower] || cardImages.football,
        events: events
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
                        <TrendingTournamentsCarousel items={[
                            {
                                name: `Global ${sport} Cup`,
                                src: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&q=80&w=800",
                                link: `/experiences/${sport}/global-cup`,
                                dateRange: "Coming Soon",
                                location: "International",
                                tagline: "The world's stage awaits."
                            },
                            {
                                name: `National ${sport} League`,
                                src: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&q=80&w=800",
                                link: `/experiences/${sport}/national-league`,
                                dateRange: "Season 2026",
                                location: "Nationwide",
                                tagline: "Defend your home turf."
                            },
                            {
                                name: `${sport} World Championship`,
                                src: "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?auto=format&fit=crop&q=80&w=800",
                                link: `/experiences/${sport}/world-championship`,
                                dateRange: "TBA 2026",
                                location: "Global",
                                tagline: "The ultimate prize."
                            },
                            {
                                name: `Regional ${sport} Finals`,
                                src: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&q=80&w=800",
                                link: `/experiences/${sport}/regional-finals`,
                                dateRange: "Quarter 3 2026",
                                location: "Regional",
                                tagline: "Local value, global spirit."
                            },
                            {
                                name: `Pro ${sport} Series`,
                                src: "https://images.unsplash.com/photo-1624880357913-a8539238245b?auto=format&fit=crop&q=80&w=800",
                                link: `/experiences/${sport}/pro-series`,
                                dateRange: "Monthly Events",
                                location: "Various Locations",
                                tagline: "Professional excellence."
                            },
                        ]} />
                    </AnimatedContent>
                </div>
            </div>

            {/* Content Container */}
            <div className="container mx-auto px-4 pb-20 relative z-10">
                {/* Other Tournaments Heading */}
                <AnimatedContent
                    distance={100}
                    direction="vertical"
                    duration={1}
                    ease="power3.out"
                    delay={0.1}
                >
                    <h2 className="text-2xl md:text-3xl font-normal text-white text-left mb-8">
                        Other Tournaments
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
                        {data.events.map((event) => (
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
