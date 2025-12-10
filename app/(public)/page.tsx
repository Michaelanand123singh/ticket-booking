import Hero from '@/components/Hero'
import JourneyLine from '@/components/JourneyLine'
import WhatWeOffer from '@/components/WhatWeOffer'
import ExploreSportsSection from '@/components/ExploreSportsSection'
import ExploreEventsSection from '@/components/ExploreEventsSection'
import NewsSection from '@/components/NewsSection'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 relative overflow-hidden">
      <JourneyLine />
      <Hero />
      <ExploreSportsSection />
      <ExploreEventsSection />
      <WhatWeOffer />
      <NewsSection />
    </div>
  )
}
