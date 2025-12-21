"use client"
import { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { cn } from "@/lib/utils";
import Link from "next/link";

export interface Tournament {
  src: string;
  name: string;
  link: string;
}

interface TrendingTournamentsCarouselProps {
  items?: Tournament[];
}

export default function BasicCarousel({ items }: TrendingTournamentsCarouselProps) {
  const defaultTournaments = [
    {
      src: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=1000&auto=format&fit=crop",
      name: "Champions League Final 2024",
      link: "/experiences/football/champions-league"
    },
    {
      src: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=1000&auto=format&fit=crop",
      name: "Wimbledon Championship",
      link: "/experiences/tennis/wimbledon"
    },
    {
      src: "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?q=80&w=1000&auto=format&fit=crop",
      name: "Qatar World Cup",
      link: "/experiences/football/world-cup"
    },
    {
      src: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?q=80&w=1000&auto=format&fit=crop",
      name: "Super Bowl LVIII",
      link: "/experiences/rugby/super-bowl"
    },
    {
      src: "https://images.unsplash.com/photo-1624880357913-a8539238245b?q=80&w=1000&auto=format&fit=crop",
      name: "NBA Finals",
      link: "/experiences/basketball/nba-finals"
    },
  ];

  const tournaments = items || defaultTournaments;

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'start',
    skipSnaps: false,
  }, [Autoplay({ delay: 4000, stopOnInteraction: false })])

  const [selectedIndex, setSelectedIndex] = useState(0)

  const onSelect = useCallback((api: any) => {
    setSelectedIndex(api.selectedScrollSnap())
  }, [])

  useEffect(() => {
    if (!emblaApi) return
    onSelect(emblaApi)
    emblaApi.on('reInit', onSelect)
    emblaApi.on('select', onSelect)
  }, [emblaApi, onSelect])

  return (
    <div className="w-full relative">
      <div className="overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent),linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] [mask-composite:intersect] [-webkit-mask-composite:source-in]" ref={emblaRef}>
        <div className="flex">
          {tournaments.map((tournament, index) => (
            <div className="flex-[0_0_100%] min-w-0 relative" key={index}>
              <Link href={tournament.link} className="block relative w-full h-[500px] sm:h-[600px] lg:h-[700px]">
                <img
                  src={tournament.src}
                  alt={tournament.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8 md:p-16">
                  <h3 className="text-white text-3xl md:text-5xl font-normal mb-2">{tournament.name}</h3>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center items-center mt-4 gap-2">
        {tournaments.map((_, index) => (
          <button
            key={index}
            className={cn(
              "w-2 h-2 rounded-full transition-colors cursor-pointer",
              index === selectedIndex ? "bg-[#D4AF37]" : "bg-gray-300 dark:bg-gray-600"
            )}
            onClick={() => emblaApi?.scrollTo(index)}
          />
        ))}
      </div>
    </div>
  );
}
