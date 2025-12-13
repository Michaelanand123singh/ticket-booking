"use client"
import React, { useState } from 'react'
import { ArrowDown } from 'lucide-react'

// --- Types ---
type NewsItem = {
    id: string
    title: string
    description: string
    image?: string
    date?: { month: string, day: string }
    location?: string
}

type NewsPage = {
    main: NewsItem
    side: NewsItem[]
    highlight: NewsItem
}

// --- Fake Data ---
const newsPages: NewsPage[] = [
    {
        main: {
            id: 'm1',
            title: "City Lights in New York",
            description: "Tennis match held in New York, there was a clash between two teams. both teams won the match i mean it was a draw. they both are happy and living their life in peace.\n\nTennis match held in New York, there was a clash between two teams. both teams won the match i mean it was a draw. they both are happy and living their life in peace.",
            image: "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?auto=format&fit=crop&q=80&w=800",
            date: { month: "DEC", day: "12" }
        },
        side: [
            {
                id: 's1',
                title: "The most epic match of the season",
                description: "Tennis match held in New York, there was a clash between two teams. both teams won the match i mean it was a draw. they both are happy and living their life in peace.",
                image: "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?auto=format&fit=crop&q=80&w=800"
            },
            {
                id: 's2',
                title: "The most epic match of the season",
                description: "Tennis match held in New York, there was a clash between two teams. both teams won the match i mean it was a draw. they both are happy and living their life in peace.",
                image: "https://images.unsplash.com/photo-1599586120429-48281b6f0ece?auto=format&fit=crop&q=80&w=800"
            },
            {
                id: 's3',
                title: "The most epic match of the season",
                description: "Tennis match held in New York, there was a clash between two teams. both teams won the match i mean it was a draw. they both are happy and living their life in peace.",
                image: "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?auto=format&fit=crop&q=80&w=800"
            }
        ],
        highlight: {
            id: 'h1',
            title: "India vs Australia",
            description: "India is set to face Australia in a thrilling encounter. Experts predict a high-scoring game with both teams in top form.",
            image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&q=80&w=800"
        }
    },
    {
        main: {
            id: 'm2',
            title: "Championship Finals 2025",
            description: "The grand finale is set to take place in London. Fans from all over the world are gathering to witness this historic event. The atmosphere is electric and the players are ready.\n\nExpect high intensity and world-class performance from both sides.",
            image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=800",
            date: { month: "JAN", day: "15" }
        },
        side: [
            {
                id: 's4',
                title: "New Record Set in Swimming",
                description: "A new world record was set today in the 100m freestyle. The crowd went wild as the swimmer touched the wall.",
                image: "https://images.unsplash.com/photo-1530549387789-4c1017266635?auto=format&fit=crop&q=80&w=800"
            },
            {
                id: 's5',
                title: "Basketball League Updates",
                description: "The latest standings show a tight race for the playoffs. Every game counts from now on.",
                image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&q=80&w=800"
            },
            {
                id: 's6',
                title: "Marathon Preparation Tips",
                description: "Preparing for a marathon? Here are some essential tips to help you cross the finish line strong.",
                image: "https://images.unsplash.com/photo-1552674605-46d536d2e609?auto=format&fit=crop&q=80&w=800"
            }
        ],
        highlight: {
            id: 'h2',
            title: "Lakers vs Warriors",
            description: "The classic rivalry continues this weekend. Who will come out on top? Watch the game live.",
            image: "https://images.unsplash.com/photo-1504450758481-7338eba7524a?auto=format&fit=crop&q=80&w=800"
        }
    }
]

export default function NewsSection() {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isFlipping, setIsFlipping] = useState(false)

    const handleNext = () => {
        if (isFlipping) return
        setIsFlipping(true)
        setTimeout(() => {
            setCurrentIndex((prev) => (prev + 1) % newsPages.length)
            setIsFlipping(false)
        }, 500) // Wait for full collapse
    }

    const currentData = newsPages[currentIndex]

    return (
        <section className="py-8 bg-white w-full relative z-20">
            <div className="container mx-auto px-4 min-[425px]:px-12">
                <h2 className="text-3xl font-normal text-black mb-4">News</h2>

                {/* Content Container with Flip Effect */}
                <div
                    className={`grid grid-cols-1 lg:grid-cols-3 gap-4 lg:h-[60vh] h-auto transition-all duration-500 ease-in-out transform ${isFlipping ? 'opacity-0 scale-y-0' : 'opacity-100 scale-y-100'
                        }`}
                >
                    {/* Left Column: Main Card */}
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 flex flex-col h-[450px] lg:h-full">
                        <div className="h-1/2 relative">
                            <img
                                src={currentData.main.image}
                                alt={currentData.main.title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="p-4 flex flex-1 gap-4">
                            <div className="flex-shrink-0">
                                <div className="w-14 h-14 bg-teal-600 text-white flex flex-col items-center justify-center rounded-lg shadow-sm">
                                    <span className="text-[10px] font-bold uppercase">{currentData.main.date?.month}</span>
                                    <span className="text-xl font-bold">{currentData.main.date?.day}</span>
                                </div>
                            </div>
                            <div className="flex-grow">
                                <h3 className="text-xl font-medium text-gray-900 mb-2 leading-tight">
                                    {currentData.main.title}
                                </h3>
                                <div className="text-xs text-gray-500 space-y-2 leading-relaxed line-clamp-4">
                                    {currentData.main.description.split('\n\n').map((para, idx) => (
                                        <p key={idx}>{para}</p>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Middle Column: Stacked Side Cards */}
                    <div className="flex flex-col gap-3 h-auto lg:h-full">
                        {currentData.side.map((item, idx) => (
                            <div key={item.id} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 flex h-32 lg:h-1/3">
                                <div className="w-1/3 relative">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="w-2/3 p-3 flex flex-col justify-center">
                                    <h4 className="text-sm font-bold text-gray-900 mb-1 line-clamp-2">
                                        {item.title}
                                    </h4>
                                    <p className="text-[10px] text-gray-500 line-clamp-2 leading-relaxed">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Right Column: Highlight Card (Improved Design) */}
                    <div className="relative rounded-2xl shadow-lg overflow-hidden h-[450px] lg:h-full group">
                        {/* Background Image */}
                        <img
                            src={currentData.highlight.image}
                            alt={currentData.highlight.title}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />

                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

                        {/* Content */}
                        <div className="relative z-10 h-full flex flex-col justify-end p-6 text-white">
                            <div className="mb-auto">
                                <span className="inline-block px-3 py-1 bg-red-600 text-white text-[10px] font-bold uppercase tracking-wider rounded-full mb-4">
                                    Trending
                                </span>
                            </div>

                            <h3 className="text-2xl font-bold mb-3 leading-tight">
                                {currentData.highlight.title}
                            </h3>
                            <p className="text-xs text-gray-200 leading-relaxed mb-4 line-clamp-4">
                                {currentData.highlight.description}
                            </p>

                            <button className="text-xs font-semibold uppercase tracking-wide border-b border-white/30 pb-1 hover:border-white transition-colors w-max">
                                Read More
                            </button>
                        </div>
                    </div>
                </div>

                {/* Arrow Button */}
                <div className="flex justify-center mt-6">
                    <button
                        onClick={handleNext}
                        className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-white hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                        aria-label="Next news"
                    >
                        <ArrowDown className={`w-5 h-5 transition-transform duration-300 ${isFlipping ? 'rotate-180' : ''}`} />
                    </button>
                </div>
            </div>
        </section>
    )
}
