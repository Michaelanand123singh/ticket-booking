"use client"

import React, { useRef } from "react"
import {
  motion,
  useScroll,
  useTransform,
  Variants,
} from "framer-motion"
import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button"
import Link from "next/link"

// Defines the structure for each image item in the gallery
type ImageItem = {
  id: number | string
  title: string
  desc: string
  url: string
  span: string // Tailwind CSS grid span classes (e.g., "md:col-span-2")
  href?: string
}

// Defines the props for the main gallery component
interface InteractiveImageBentoGalleryProps {
  imageItems: ImageItem[]
  title: string
  description: string
}

// Main gallery component
const InteractiveImageBentoGallery: React.FC<
  InteractiveImageBentoGalleryProps
> = ({ imageItems, title, description }) => {
  const targetRef = useRef<HTMLDivElement>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)



  // Framer Motion scroll animations
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  })
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0, 0.2], [30, 0])

  return (
    <section
      ref={targetRef}
      className="relative w-full overflow-hidden bg-transparent py-0"
    >
      <motion.div
        style={{ opacity, y }}
        className="container mx-auto px-4 text-center"
      >
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {title}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          {description}
        </p>
      </motion.div>

      <div className="relative container mx-auto px-4 mt-2">


        <div
          ref={scrollContainerRef}
          className="overflow-x-auto pb-0 scrollbar-hide"
        >
          <motion.div
            className="grid grid-flow-col grid-rows-2 md:grid-rows-3 gap-4 w-max px-12"
            initial="visible"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {imageItems.map((item) => (
              <motion.div
                key={item.id}
                className={cn(
                  "group relative flex h-full min-h-[8rem] w-[160px] md:w-[260px] items-end overflow-hidden rounded-xl bg-card p-4 shadow-sm transition-shadow duration-300 ease-in-out hover:shadow-lg",
                  item.span.includes("md:col-span-2") ? "md:col-span-2 md:w-[540px]" : "md:col-span-1",
                  item.span.includes("row-span-3") ? "row-span-3" : item.span.includes("row-span-2") ? "row-span-2" : "row-span-1"
                )}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Link href={item.href || `/experiences/${item.title.toLowerCase()}`} className="absolute inset-0 z-20" />
                <img
                  src={item.url}
                  alt={item.title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-opacity duration-500" />
                <div className="relative z-10 transition-all duration-500">
                  <h3 className="text-xl sm:text-2xl font-light text-white">{item.title}</h3>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>


      </div>
    </section>
  )
}

export default InteractiveImageBentoGallery