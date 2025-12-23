import React from 'react';

const filters = [
    { id: 'all', label: 'All' },
    { id: 'news', label: 'News' },
    { id: 'events', label: 'Events' },
    { id: 'stories', label: 'Stories' },
    { id: 'other', label: 'Other' },
];

export default function NewsFilter() {
    return (
        <div className="flex flex-wrap gap-2 mb-8">
            {filters.map((filter, index) => (
                <button
                    key={filter.id}
                    className={`px-6 py-2 rounded-full text-xs font-semibold transition-all duration-300 border ${index === 0
                            ? 'bg-black text-white border-white'
                            : 'bg-transparent text-gray-400 border-gray-700 hover:border-white hover:text-white'
                        }`}
                >
                    {filter.label}
                </button>
            ))}
        </div>
    );
}
