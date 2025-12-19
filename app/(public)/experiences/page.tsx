"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { Carousel } from "@ark-ui/react/carousel";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

/* ===================== DATA ===================== */

const trendingTournaments = [
    {
        src: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=1000&auto=format&fit=crop",
        name: "Champions League Final 2024",
    },
    {
        src: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=1000&auto=format&fit=crop",
        name: "Wimbledon Championship",
    },
    {
        src: "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?q=80&w=1000&auto=format&fit=crop",
        name: "Qatar World Cup",
    },
    {
        src: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?q=80&w=1000&auto=format&fit=crop",
        name: "Super Bowl LVIII",
    },
    {
        src: "https://images.unsplash.com/photo-1624880357913-a8539238245b?q=80&w=1000&auto=format&fit=crop",
        name: "NBA Finals",
    },
];

const sportsItems = [
    { id: 1, title: "Football", link: "/experiences/football", img: "https://images.unsplash.com/photo-1551958219-acbc608c6377?q=80&w=1080" },
    { id: 2, title: "Basketball", link: "/experiences/basketball", img: "https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=1080" },
    { id: 3, title: "Cricket", link: "/experiences/cricket", img: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?q=80&w=1080" },
    { id: 4, title: "Tennis", link: "/experiences/tennis", img: "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?q=80&w=1080" },
    { id: 5, title: "Volleyball", link: "/experiences/volleyball", img: "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?q=80&w=1080" },
    { id: 6, title: "Rugby", link: "/experiences/rugby", img: "https://images.unsplash.com/photo-1628891890467-b79f2c8ba9dc?q=80&w=1080" },
];

/* ===================== PAGE ===================== */

export default function ExperiencesPage() {
    /* --- Category slider logic --- */
    const containerRef = useRef<HTMLDivElement>(null);
    const [offset, setOffset] = useState(0);

    const scroll = (dir: "left" | "right") => {
        const step = 320;
        const max = 600;
        setOffset((p) => (dir === "left" ? Math.max(0, p - step) : Math.min(max, p + step)));
    };

    /* --- Trending carousel autoplay --- */
    const [currentIndex, setCurrentIndex] = useState(0);
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % trendingTournaments.length);
        }, 4000);
        return () => clearInterval(timer);
    }, []);

    return (
        <main className="bg-black text-white overflow-hidden">
            {/* ================= HERO ================= */}
            <section className="relative min-h-screen">
                <Image
                    src="https://images.unsplash.com/photo-1709389882434-f81ca82a21fb?q=80&w=1074"
                    alt="Stadium"
                    fill
                    priority
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/70 to-black" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent" />

                <div className="relative z-10 flex min-h-screen items-center px-10 md:px-20 max-w-3xl">
                    <p className="text-sm text-gray-300 leading-relaxed">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                        It has survived not only five centuries, but also the leap into electronic typesetting, remaining
                        essentially unchanged. It was popularised in the 1960s with the release of Letraset
                        sheets containing Lorem Ipsum passages, and more recently with desktop publishing software
                        like Aldus PageMaker including versions of Lorem Ipsu
                    </p>
                </div>
            </section>

            {/* ================= TRENDING TOURNAMENTS (UPDATED) ================= */}
            <section className="relative z-20 -mt-32 px-10 md:px-20 pb-24">
                <input
                    placeholder="Search event"
                    className="mb-8 max-w-md w-full rounded-md bg-gray-800/80 px-4 py-3 text-sm outline-none"
                />

                <h3 className="mb-6 text-lg font-semibold">Trending tournaments</h3>

                <Carousel.Root
                    page={currentIndex}
                    onPageChange={(d: any) => setCurrentIndex(d.page)}
                    slideCount={trendingTournaments.length}
                    loop
                    className="w-full"
                >
                    <Carousel.ItemGroup className="overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)]">
                        {trendingTournaments.map((item, index) => (
                            <Carousel.Item key={index} index={index}>
                                <div className="relative w-full h-[420px] sm:h-[520px] lg:h-[620px]">
                                    <img
                                        src={item.src}
                                        alt={item.name}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-8">
                                        <h3 className="text-2xl md:text-4xl font-normal">
                                            {item.name}
                                        </h3>
                                    </div>
                                </div>
                            </Carousel.Item>
                        ))}
                    </Carousel.ItemGroup>

                    <Carousel.IndicatorGroup className="flex justify-center gap-2 mt-4">
                        {trendingTournaments.map((_, i) => (
                            <Carousel.Indicator
                                key={i}
                                index={i}
                                className="w-2 h-2 rounded-full bg-gray-500 data-current:bg-[#D4AF37]"
                            />
                        ))}
                    </Carousel.IndicatorGroup>
                </Carousel.Root>
            </section>

            {/* ================= CATEGORY OF SPORTS ================= */}
            <section className="relative py-24">
                <h2 className="text-xl font-light pl-16 mb-8">
                    category of sports
                </h2>

                <Button size="icon" onClick={() => scroll("left")} className="absolute left-6 top-1/2 z-30 bg-black/50">
                    <ArrowLeft />
                </Button>
                <Button size="icon" onClick={() => scroll("right")} className="absolute right-6 top-1/2 z-30 bg-black/50">
                    <ArrowRight />
                </Button>

                <div className="overflow-hidden">
                    <div
                        ref={containerRef}
                        style={{ transform: `translateX(-${offset}px)` }}
                        className="relative w-[1300px] h-[700px] transition-transform duration-500 mx-auto"
                    >
                        {sportsItems.map((sport, i) => (
                            <Link
                                key={sport.id}
                                href={sport.link}
                                className={`absolute rounded-xl overflow-hidden group
                  ${i === 0 ? "top-20 left-10 w-60 h-80" :
                                        i === 1 ? "top-10 left-80 w-80 h-60" :
                                            i === 2 ? "top-80 left-80 w-60 h-80" :
                                                i === 3 ? "top-5 left-[720px] w-60 h-80" :
                                                    i === 4 ? "top-[360px] left-[640px] w-80 h-60" :
                                                        "top-[200px] left-[1000px] w-60 h-80"}`}
                            >
                                <img
                                    src={sport.img}
                                    alt={sport.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                                <h3 className="absolute bottom-4 left-4 text-2xl">
                                    {sport.title}
                                </h3>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
