
import Hero from '@/components/home/Hero'
import WhatWeOffer from '@/components/home/WhatWeOffer'
import NewsSection from '@/components/home/NewsSection'
import TrendingTournaments from '@/components/home/TrendingTournaments'
import TestimonialSection from '@/components/home/TestimonialSection'
import AthleteSelection from '@/components/home/AthleteSelection'

import MainJourneyLine from '@/components/home/MainJourneyLine'

export default function Home() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <MainJourneyLine />
      <Hero />
      <TrendingTournaments />
      <AthleteSelection />
      <WhatWeOffer />
      <TestimonialSection />
      <NewsSection />
    </div>
  )
}
