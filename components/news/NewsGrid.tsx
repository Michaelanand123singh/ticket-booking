import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { NewsArticle } from '@/types/news';

interface NewsGridProps {
    items: NewsArticle[];
}

export default function NewsGrid({ items }: NewsGridProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => (
                <div key={item.id} className="group relative rounded-3xl overflow-hidden aspect-[4/3] bg-neutral-900 border border-white/5">
                    <img
                        src={item.image}
                        alt={item.title}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-60 group-hover:opacity-40"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                    <div className="absolute inset-0 p-6 flex flex-col justify-end">
                        {/* Top Tags */}
                        <div className="absolute top-6 left-6 flex gap-2">
                            {/*  AD Logic would go here if needed, keeping simple for now based on types */}
                            <span className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-[10px] font-semibold text-white border border-white/10">
                                {item.readTime}
                            </span>
                            {item.tags.map(tag => (
                                <span key={tag} className="px-3 py-1 bg-transparent backdrop-blur-md rounded-full text-[10px] font-semibold text-white border border-white/30">
                                    {tag}
                                </span>
                            ))}
                        </div>

                        {/* Top Right Arrow - can keep logic or remove, user asked for structure */}
                        <div className="absolute top-6 right-6 w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                            <ArrowUpRight size={16} />
                        </div>


                        <h3 className="text-lg font-bold text-white leading-snug line-clamp-4">
                            {item.title}
                        </h3>
                    </div>
                </div>
            ))}
        </div>
    );
}
