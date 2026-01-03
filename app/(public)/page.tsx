
import Hero from '@/components/home/Hero'
import WhatWeOffer from '@/components/home/WhatWeOffer'
import NewsSection from '@/components/home/NewsSection'
import TrendingTournaments from '@/components/home/TrendingTournaments'
import TestimonialSection from '@/components/home/TestimonialSection'
import AthleteDisplaySection from '@/components/home/AthleteDisplaySection'

import MainJourneyLine from '@/components/home/MainJourneyLine'
import EnquiryCTA from '@/components/shared/EnquiryCTA'

export default function Home() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <MainJourneyLine />
      <Hero />
      <TrendingTournaments />
      <AthleteDisplaySection />
      <WhatWeOffer />
      <TestimonialSection />
      <NewsSection />
      <EnquiryCTA
        title="Your sport, your journey."
        description="Whether you're an athlete, a fan, or an organiser, we have the expertise to make it happen."
        link="/enquiry/home"
        buttonLabel="Enquire Now"
      />
    </div>
  )
}
