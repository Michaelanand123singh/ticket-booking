import React from 'react';
import NewsHero from '@/components/news/NewsHero';
import NewsFilter from '@/components/news/NewsFilter';
import NewsGrid from '@/components/news/NewsGrid';
import { NewsArticle } from '@/types/news';

// --- Static Data Source ---
// This acts as your backend data for now.
// Add new items here. The logic below will automatically sort them and place the newest ones at the top.
const STATIC_NEWS_DATA: NewsArticle[] = [
    {
        id: '1',
        title: "Championship Finals 2025: What is expected from the top contenders?",
        image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=1600",
        tags: ["Football", "News"],
        readTime: "12 min read",
        date: "2024-10-29T10:00:00Z",
        publishedAt: "October 29, 2024",
        author: {
            name: "Jack Dorsey",
            avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100"
        }
    },
    {
        id: '2',
        title: "Transfer Market: Real Madrid Eyes New Striker for Next Season",
        image: "https://images.unsplash.com/photo-1579952363873-27f3bde9be51?auto=format&fit=crop&q=80&w=800",
        tags: ["Football", "News"],
        readTime: "5 min read",
        date: "2024-10-28T14:30:00Z"
    },
    {
        id: '3',
        title: "New World Record Set in 100m Sprint at Diamond League",
        image: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&q=80&w=800",
        tags: ["Athletics", "News"],
        readTime: "6 min read",
        date: "2024-10-28T09:15:00Z"
    },
    {
        id: '4',
        title: "The Line at Neom: Futuristic Stadium Plans Revealed for 2030 World Cup in Saudi Arabia",
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800",
        tags: ["Football", "World Cup"],
        readTime: "5 min read",
        date: "2024-10-27T11:00:00Z"
    },
    {
        id: '5',
        title: "AI in Coaching: How Top Teams are Using Machine Learning to Prevent Injuries",
        image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800",
        tags: ["Tech", "Analysis"],
        readTime: "5 min read",
        date: "2024-10-26T16:20:00Z"
    },
    {
        id: '6',
        title: "FAA Approves New Drone Coverage Regulations for Live Sports Broadcasting",
        image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=800",
        tags: ["Media", "News"],
        readTime: "5 min read",
        date: "2024-10-25T08:45:00Z"
    },
    {
        id: '7',
        title: "Michael Phelps: The Visionary Who Redefined Swimming Techniques Forever",
        image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=800",
        tags: ["Swimming", "Legend"],
        readTime: "5 min read",
        date: "2024-10-24T12:00:00Z"
    },
    {
        id: '8',
        title: "What is VAR, How Does it Work, and Why Does it Exist in Modern Football?",
        image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800",
        tags: ["Football", "Rules"],
        readTime: "5 min read",
        date: "2024-10-23T15:30:00Z"
    },
    {
        id: '9',
        title: "Fashion in Sports: How Top Brands are Designing High-Performance Kits",
        image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&q=80&w=800",
        tags: ["Gear", "Style"],
        readTime: "5 min read",
        date: "2024-10-22T10:00:00Z"
    }
];

export default function NewsPage() {
    // 1. Logic to sort data by date (Newest first)
    // When you have a backend, fetching logic goes here, and you'd just set the data state.
    const sortedNews = [...STATIC_NEWS_DATA].sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

    // 2. Logic to split data: Top 3 go to Hero, rest go to Grid
    const heroFeatured = sortedNews[0]; // Most recent #1
    const heroSide = sortedNews.slice(1, 3); // Next 2 recent
    const gridItems = sortedNews.slice(3); // The rest

    return (
        <main className="min-h-screen bg-black pt-24 pb-12">
            <div className="container mx-auto px-4 min-[425px]:px-12">

                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-2xl font-bold text-white">News & Blogs</h1>
                </div>

                {/* Dynamic Hero Section */}
                <NewsHero featured={heroFeatured} sideArticles={heroSide} />

                {/* Blog Section Header */}
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-white mb-2">Blog</h2>
                    <p className="text-gray-400 text-sm">The holy space for Vancouver Happenings, Sports News & Beyond</p>
                </div>

                {/* Filter and Right-aligned dropdown */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <NewsFilter />

                    <button className="flex items-center gap-2 px-4 py-2 bg-transparent text-white border border-gray-700 rounded-full text-xs hover:border-white transition-colors">
                        Newest
                        <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>

                {/* Dynamic Grid Section */}
                <NewsGrid items={gridItems} />

            </div>
        </main>
    );
}