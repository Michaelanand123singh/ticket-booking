import Hero from '@/components/home/Hero'
import WhatWeOffer from '@/components/home/WhatWeOffer'
import NewsSection from '@/components/home/NewsSection'
import TrendingTournaments from '@/components/home/TrendingTournaments'
import AthleteSelection from '@/components/home/AthleteSelection'
import TestimonialSection from '@/components/home/TestimonialSection'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 relative overflow-hidden">
      <Hero />
      <TrendingTournaments />
      <AthleteSelection />
      <WhatWeOffer />
      <TestimonialSection />
      <NewsSection />
    </div>
  )
}
