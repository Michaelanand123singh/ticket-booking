"use client"
import { Carousel } from "@ark-ui/react/carousel";
import { useState, useEffect } from "react";

export interface Tournament {
  src: string;
  name: string;
}

interface TrendingTournamentsCarouselProps {
  items?: Tournament[];
}

export default function BasicCarousel({ items }: TrendingTournamentsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const defaultTournaments = [
    {
      src: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=1000&auto=format&fit=crop",
      name: "Champions League Final 2024"
    },
    {
      src: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=1000&auto=format&fit=crop",
      name: "Wimbledon Championship"
    },
    {
      src: "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?q=80&w=1000&auto=format&fit=crop",
      name: "Qatar World Cup"
    },
    {
      src: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?q=80&w=1000&auto=format&fit=crop",
      name: "Super Bowl LVIII"
    },
    {
      src: "https://images.unsplash.com/photo-1624880357913-a8539238245b?q=80&w=1000&auto=format&fit=crop",
      name: "NBA Finals"
    }
  ];

  const tournaments = items || defaultTournaments;

  // Manual autoplay implementation
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % tournaments.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [tournaments.length]);

  return (
    <Carousel.Root
      page={currentIndex}
      onPageChange={(details: any) => setCurrentIndex(details.page)}
      slideCount={tournaments.length}
      className="w-full"
      loop
    >
      {/* Controls removed as requested */}

      <Carousel.ItemGroup className="overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)]">
        {tournaments.map((tournament, index) => (
          <Carousel.Item key={index} index={index}>
            <div className="relative w-full h-[500px] sm:h-[600px] lg:h-[700px]">
              <img
                src={tournament.src}
                alt={tournament.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8 md:p-16">
                <h3 className="text-white text-3xl md:text-5xl font-normal mb-2">{tournament.name}</h3>
              </div>
            </div>
          </Carousel.Item>
        ))}
      </Carousel.ItemGroup>

      <Carousel.IndicatorGroup className="flex justify-center items-center mt-4 gap-2">
        {tournaments.map((_, index) => (
          <Carousel.Indicator
            key={index}
            index={index}
            className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-600 data-current:bg-[#D4AF37] transition-colors cursor-pointer"
          />
        ))}
      </Carousel.IndicatorGroup>
    </Carousel.Root>
  );
}
