"use client"
import React, { ReactNode } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// --- TYPES ---
interface HeroProps extends Omit<React.ComponentPropsWithoutRef<'div'>, 'title'> {
  title: ReactNode;
  subtitle: string;
  images: { src: string; title: string; subtitle: string; }[];
}

// --- HERO SECTION COMPONENT ---
export const HeroSection = React.forwardRef<HTMLDivElement, HeroProps>(
  ({ title, subtitle, images, className, ...props }, ref) => {
    const [currentIndex, setCurrentIndex] = React.useState(Math.floor(images.length / 2));

    const handleNext = React.useCallback(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, [images.length]);

    const handlePrev = () => {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    React.useEffect(() => {
      const timer = setInterval(() => {
        handleNext();
      }, 4000);
      return () => clearInterval(timer);
    }, [handleNext]);

    return (
      <div
        ref={ref}
        className={cn(
          'relative w-full flex flex-col items-center justify-center overflow-hidden bg-transparent text-foreground',
          className
        )}
        {...props}
      >

        {/* Content */}
        <div className="z-10 flex w-full flex-col items-center text-center space-y-0">
          {/* Header Section */}
          {(title || subtitle) && (
            <div className="space-y-4 mb-8">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter max-w-4xl">
                {title}
              </h1>
              <p className="max-w-2xl mx-auto text-muted-foreground md:text-xl">
                {subtitle}
              </p>
            </div>
          )}

          {/* Main Showcase Section */}
          <div className="relative w-full h-72 md:h-96 flex items-center justify-center">
            {/* Carousel Wrapper */}
            <div className="relative w-full h-full flex items-center justify-center [perspective:1000px]">
              {images.map((image, index) => {
                const offset = index - currentIndex;
                const total = images.length;
                let pos = (offset + total) % total;
                if (pos > Math.floor(total / 2)) {
                  pos = pos - total;
                }

                const isCenter = pos === 0;
                const isAdjacent = Math.abs(pos) === 1;

                return (
                  <div
                    key={index}
                    className={cn(
                      'absolute w-[85vw] max-w-[350px] md:max-w-none h-[280px] md:w-[700px] md:h-[380px] transition-all duration-500 ease-in-out',
                      'flex items-center justify-center'
                    )}
                    style={{
                      transform: `
                        translateX(${(pos) * 45}%) 
                        scale(${isCenter ? 1 : isAdjacent ? 0.85 : 0.7})
                        rotateY(${(pos) * -10}deg)
                      `,
                      zIndex: isCenter ? 10 : isAdjacent ? 5 : 1,
                      opacity: isCenter ? 1 : isAdjacent ? 0.4 : 0,
                      filter: 'blur(0px)',
                      visibility: Math.abs(pos) > 1 ? 'hidden' : 'visible',
                    }}
                  >
                    <div className="relative w-full h-full rounded-3xl overflow-hidden border-2 border-foreground/10 shadow-2xl">
                      <img
                        src={image.src}
                        alt={image.title}
                        className="object-cover w-full h-full"
                      />
                      <div className="absolute bottom-0 left-0 p-4 md:p-8 bg-gradient-to-t from-black/90 via-black/50 to-transparent w-full">
                        <h3 className="text-white text-xl sm:text-2xl md:text-4xl font-light text-left leading-tight">{image.title}</h3>
                        <p className="text-white/90 text-sm sm:text-base md:text-2xl font-light text-left mt-1 md:mt-2">{image.subtitle}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Navigation Buttons */}
            <Button
              variant="outline"
              size="icon"
              className="absolute left-2 sm:left-8 top-1/2 -translate-y-1/2 rounded-full h-10 w-10 z-20 bg-background/50 backdrop-blur-sm"
              onClick={handlePrev}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-2 sm:right-8 top-1/2 -translate-y-1/2 rounded-full h-10 w-10 z-20 bg-background/50 backdrop-blur-sm"
              onClick={handleNext}
            >
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    );
  }
);

HeroSection.displayName = 'HeroSection';
