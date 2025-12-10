import Hero from '@/components/Hero'
import WhatWeOffer from '@/components/WhatWeOffer'
import ContactSection from '@/components/ContactSection'
import ExploreSportsSection from '@/components/ExploreSportsSection'
import ExploreEventsSection from '@/components/ExploreEventsSection'
import NewsSection from '@/components/NewsSection'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Hero />
      <ExploreSportsSection />
      <ExploreEventsSection />
      <WhatWeOffer />
      <NewsSection />
      <ContactSection />
    </div>
  )
}
