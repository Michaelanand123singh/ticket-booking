import React from 'react';
import { NewsArticle } from '@/types/news';

interface NewsHeroProps {
    featured: NewsArticle;
    sideArticles: NewsArticle[];
}

export default function NewsHero({ featured, sideArticles }: NewsHeroProps) {
    if (!featured) return null;

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
            {/* Main Featured Article - Spans 2 cols */}
            <div className="lg:col-span-2 relative h-[400px] lg:h-[500px] rounded-3xl overflow-hidden group cursor-pointer">
                <img
                    src={featured.image}
                    alt={featured.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90" />

                <div className="absolute bottom-0 left-0 right-0 p-8">
                    <div className="flex gap-3 mb-4">
                        <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-semibold text-white border border-white/20">
                            {featured.readTime}
                        </span>
                        {featured.tags.map((tag, idx) => (
                            <span key={idx} className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-semibold text-white border border-white/20">
                                {tag}
                            </span>
                        ))}
                    </div>

                    <h1 className="text-3xl lg:text-4xl font-bold text-white mb-6 leading-tight max-w-3xl">
                        {featured.title}
                    </h1>

                    <div className="flex items-center gap-8 text-sm text-gray-300 border-t border-white/20 pt-6">
                        {featured.author && (
                            <div>
                                <p className="text-xs text-gray-400 mb-1">Written by</p>
                                <div className="flex items-center gap-2">
                                    <img src={featured.author.avatar} className="w-6 h-6 rounded-full" alt={featured.author.name} />
                                    <span className="font-semibold text-white">{featured.author.name}</span>
                                </div>
                            </div>
                        )}
                        {featured.publishedAt && (
                            <div>
                                <p className="text-xs text-gray-400 mb-1">Published on</p>
                                <span className="font-semibold text-white">{featured.publishedAt}</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Side Articles */}
            <div className="flex flex-col gap-6">
                {sideArticles.map((article) => (
                    <div key={article.id} className="relative h-[240px] rounded-3xl overflow-hidden group cursor-pointer">
                        <img
                            src={article.image}
                            alt={article.title}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90" />
                        <div className="absolute bottom-0 left-0 right-0 p-6">
                            <div className="flex gap-2 mb-3">
                                <span className="px-2 py-0.5 bg-white/20 backdrop-blur-sm rounded-full text-[10px] font-semibold text-white border border-white/20">
                                    {article.readTime}
                                </span>
                                {article.tags.slice(0, 2).map((tag, idx) => (
                                    <span key={idx} className="px-2 py-0.5 bg-white/20 backdrop-blur-sm rounded-full text-[10px] font-semibold text-white border border-white/20">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            <h3 className="text-lg font-bold text-white leading-tight">
                                {article.title}
                            </h3>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

