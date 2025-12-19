import React from 'react'

const offers = [
    {
        title: 'Premium Events',
        description: 'Access exclusive sports and concert events with premium seating options.',
    },
    {
        title: 'Secure Booking',
        description: 'Experience 100% secure booking with instant ticket confirmation.',
    },
    {
        title: 'Instant Delivery',
        description: 'Get your tickets delivered instantly to your email and dashboard.',
    },
    {
        title: '24/7 Support',
        description: 'Our dedicated support team is available round the clock to assist you.',
    },
    {
        title: 'Best Prices',
        description: 'We guarantee competitive pricing with no hidden fees or charges.',
    },
    {
        title: 'Verified Sellers',
        description: 'All tickets are sourced from verified and trusted sellers only.',
    },
]

export default function WhatWeOffer() {
    return (
        <section className="py-16 bg-background text-foreground relative">
            <div className="container mx-auto px-4 min-[425px]:px-12 relative z-20">
                <h2 className="text-xl sm:text-3xl font-normal text-left mb-12">Who we <span className="text-[#D4AF37]">are</span></h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {offers.map((offer, index) => (
                        <div key={index} className="p-6 rounded-lg bg-white text-black">
                            <h3 className="text-xl font-normal mb-3">{offer.title}</h3>
                            <p className="text-sm text-gray-600">{offer.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
