import React from 'react'
import InteractiveImageBentoGallery from '@/components/bento-gallery'

const sportsItems = [
    {
        id: 1,
        title: "Football",
        desc: "Experience the thrill of the beautiful game.",
        url: "https://images.unsplash.com/photo-1551958219-acbc608c6377?auto=format&fit=crop&q=80&w=1080",
        span: "row-span-3",
    },
    {
        id: 2,
        title: "Basketball",
        desc: "Feel the energy of the court.",
        url: "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&q=80&w=1080",
        span: "md:col-span-2",
    },
    {
        id: 4,
        title: "Cricket",
        desc: "The gentleman's game in all its glory.",
        url: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&q=80&w=1080",
        span: "row-span-2",
    },
    {
        id: 5,
        title: "Rugby",
        desc: "Intensity and passion on the field.",
        url: "https://images.unsplash.com/photo-1628891890467-b79f2c8ba9dc?auto=format&fit=crop&q=80&w=1080",
        span: "md:col-span-1",
    },
    {
        id: 3,
        title: "Tennis",
        desc: "Witness the precision and power.",
        url: "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?auto=format&fit=crop&q=80&w=1080",
        span: "md:col-span-2",
    },
    {
        id: 6,
        title: "Volleyball",
        desc: "Spike your way to victory.",
        url: "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?auto=format&fit=crop&q=80&w=1080",
        span: "row-span-2",
    },
    {
        id: 11,
        title: "Demo Sport 1",
        desc: "Testing layout flow.",
        url: "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&q=80&w=1080",
        span: "md:col-span-1",
        href: "/#",
    },
    {
        id: 12,
        title: "Demo Sport 2",
        desc: "Testing vertical span.",
        url: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=1080",
        span: "row-span-2",
        href: "/#",
    },
    {
        id: 13,
        title: "Demo Sport 3",
        desc: "Testing horizontal span.",
        url: "https://images.unsplash.com/photo-1526676037777-05a232554f77?auto=format&fit=crop&q=80&w=1080",
        span: "md:col-span-2",
        href: "/#",
    },
    {
        id: 14,
        title: "Demo Sport 4",
        desc: "Testing standard card.",
        url: "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?auto=format&fit=crop&q=80&w=1080",
        span: "md:col-span-1",
        href: "/#",
    },
    {
        id: 15,
        title: "Demo Sport 5",
        desc: "Testing filler card.",
        url: "https://images.unsplash.com/photo-1530549387789-4c1017266635?auto=format&fit=crop&q=80&w=1080",
        span: "row-span-1",
        href: "/#",
    },
]

export default function ExploreSportsSection() {
    return (
        <section className="pt-20 pb-0 bg-background">
            <div className="container mx-auto px-4">
                <h2 className="text-left text-white font-light text-xl sm:text-3xl mb-2 pl-8 md:pl-16 flex flex-wrap items-center justify-start gap-4">
                    <span>Explore <span className="font-semibold text-blue-600">Sports</span></span>
                    <span className="font-thin text-white/50 tracking-tighter">&mdash;&mdash;&mdash;</span>
                </h2>
                <InteractiveImageBentoGallery
                    title=""
                    description=""
                    imageItems={sportsItems}
                />
            </div>
        </section>
    )
}
