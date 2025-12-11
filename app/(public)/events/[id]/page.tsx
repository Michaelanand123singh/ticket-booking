import Image from 'next/image'
import { notFound } from 'next/navigation'
import EventJourneyLine from '@/components/EventJourneyLine'

const MOCK_EVENTS: Record<string, any> = {
  "507f1f77bcf86cd799439011": {
    id: "507f1f77bcf86cd799439011",
    title: "Upcoming FIFA World Cup",
    description: "Experience the thrill of the world's most popular sport as top teams clash for glory. This event promises high-octane action, skilled plays, and an unforgettable atmosphere.",
    date: new Date("2025-06-15"),
    time: "20:00",
    venue: "International Stadium",
    price: 150,
    available: 450,
    category: "SPORTS",
    image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&q=80&w=1080"
  },
  "507f1f77bcf86cd799439012": {
    id: "507f1f77bcf86cd799439012",
    title: "Major League Baseball",
    description: "Catch the excitement of America's pastime with this major league showdown. Expect home runs, stolen bases, and an electric crowd.",
    date: new Date("2025-07-04"),
    time: "18:30",
    venue: "Yankee Stadium",
    price: 80,
    available: 200,
    category: "SPORTS",
    image: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&q=80&w=1080"
  },
  "507f1f77bcf86cd799439013": {
    id: "507f1f77bcf86cd799439013",
    title: "Olympic Track Finals",
    description: "Witness history in the making at the Olympic Track Finals. The world's fastest athletes compete for gold in the 100m sprint.",
    date: new Date("2025-08-20"),
    time: "19:00",
    venue: "Olympic Stadium",
    price: 200,
    available: 100,
    category: "SPORTS",
    image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&q=80&w=1080"
  },
  "507f1f77bcf86cd799439014": {
    id: "507f1f77bcf86cd799439014",
    title: "Crossfit Games 2025",
    description: "The ultimate test of fitness. Watch top athletes push their limits in a series of grueling physical challenges.",
    date: new Date("2025-09-10"),
    time: "09:00",
    venue: "Crossfit Arena",
    price: 120,
    available: 300,
    category: "SPORTS",
    image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&q=80&w=1080"
  },
  "507f1f77bcf86cd799439015": {
    id: "507f1f77bcf86cd799439015",
    title: "World Gymnastics",
    description: "Grace, power, and precision. The World Gymnastics Championships feature the best gymnasts performing incredible routines.",
    date: new Date("2025-10-05"),
    time: "14:00",
    venue: "Gymnastics Hall",
    price: 90,
    available: 150,
    category: "SPORTS",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=1080"
  }
}

async function getTicket(id: string) {
  // Validate MongoDB ObjectID format
  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    notFound()
  }

  // MOCK DATA LOOKUP
  if (MOCK_EVENTS[id]) {
    return MOCK_EVENTS[id]
  }

  // Fallback for valid ID format but not in mock map (simulate DB not found or use default)
  // For now, return the first mock event as a safe fallback to avoid 404 during testing if ID is unknown
  return MOCK_EVENTS["507f1f77bcf86cd799439011"]

  // DATABASE QUERY when databse is ready
  /*
  const ticket = await prisma.ticket.findUnique({
    where: { id },
  })

  if (!ticket) {
    notFound()
  }

  return ticket
  */
}

export default async function TicketDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const ticket = await getTicket(id)

  return (
    <div className="min-h-screen bg-[#11212D] text-white font-sans pt-24 relative z-30">
      <EventJourneyLine />
      {/* Main Content Container */}
      <div className="container mx-auto px-4 py-8 max-w-5xl">

        {/* Hero Section */}
        <div className="relative w-full h-[400px] rounded-t-lg overflow-hidden z-20">
          <Image
            src={ticket.image}
            alt={ticket.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <h1 className="text-4xl md:text-6xl font-normal text-white text-center drop-shadow-lg">
              {ticket.title}
            </h1>
          </div>
        </div>

        {/* Info Bar & Description Card */}
        <div className="bg-white border border-gray-200 text-gray-900 rounded-b-lg p-8 shadow-2xl relative z-10 h-[400px] flex flex-col">

          {/* Info Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 border-b border-gray-100 pb-4 flex-shrink-0">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">{ticket.title}</h2>
              <div className="text-gray-500 text-lg font-medium">
                {ticket.time}
              </div>
            </div>
            <button className="mt-4 md:mt-0 px-8 py-3 bg-[#0f172a] text-white rounded-lg font-semibold text-sm hover:bg-opacity-90 transition-all shadow-lg">
              Book Tickets
            </button>
          </div>

          {/* Description */}
          <div className="prose max-w-lg text-black leading-snug text-sm font-bold overflow-hidden">
            <p className="line-clamp-4">
              {ticket.description} Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </p>
          </div>
        </div>

      </div>

    </div>
  )
}

