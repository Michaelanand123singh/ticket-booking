import React from 'react'
import { NewsCard } from './NewsCard'

const newsData = [
    {
        title: "Upcoming Championship Finals",
        description: "Get ready for the biggest event of the year as the top teams clash in the championship finals. Tickets are selling fast, so secure your spot today to witness history in the making.",
        image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=800",
        link: "#"
    },
    {
        title: "New Training Facilities Open",
        description: "We are excited to announce the opening of our state-of-the-art training facilities. Equipped with the latest technology, these grounds will help athletes reach their peak performance.",
        image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&q=80&w=800",
        link: "#"
    },
    {
        title: "Community Sports Day Success",
        description: "Our annual Community Sports Day was a huge success, bringing together families and friends for a day of fun and fitness. Check out the highlights and photos from the event.",
        image: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&q=80&w=800",
        link: "#"
    }
]

export default function NewsSection() {
    return (
        <section className="py-24 bg-gray-200 w-full relative z-20">
            <div className="container mx-auto px-4 relative z-20">
                <h2 className="text-xl sm:text-3xl font-normal text-black mb-8">News</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {newsData.map((news, index) => (
                        <NewsCard
                            key={index}
                            title={news.title}
                            description={news.description}
                            image={news.image}
                            link={news.link}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}
