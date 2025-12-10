"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

import Link from "next/link"

interface NewsCardProps {
  title: string
  description: string
  image: string
  link: string
  className?: string
}

export function NewsCard({
  title,
  description,
  image,
  link,
  className,
}: NewsCardProps) {
  return (
    <Link href={link} className="block w-full">
      <motion.div
        className={cn(
          "relative w-[90%] h-[400px] rounded-2xl overflow-hidden cursor-pointer group bg-white mr-auto flex flex-col",
          className
        )}
        whileHover={{ y: -5 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {/* Image Container */}
        <div className="relative h-40 overflow-hidden">
          <motion.img
            src={image}
            alt={title}
            className="h-full w-full object-cover"
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Content */}
        <div className="p-4 space-y-2">
          <h3 className="text-3xl font-normal text-black leading-tight">
            {title}
          </h3>
          <p className="text-[10px] text-black/80 font-normal leading-relaxed">
            {description}
          </p>
        </div>
      </motion.div>
    </Link>
  )
}
