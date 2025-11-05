import Link from 'next/link'
import { FiSearch, FiCalendar, FiMapPin } from 'react-icons/fi'
import TicketCard from '@/components/TicketCard'
import SeedButton from '@/components/SeedButton'
import { prisma } from '@/lib/db'
import { getCache, setCache } from '@/lib/redis'
import type { Ticket, TicketCategory } from '@/types/prisma'

// Dummy concert data to display when database is empty
const dummyConcerts: Ticket[] = [
  {
    id: '1',
    title: 'Taylor Swift - The Eras Tour',
    description: 'Join Taylor Swift for an unforgettable night featuring songs from all her eras. Experience the magic of her greatest hits live in concert.',
    category: 'CONCERT' as TicketCategory,
    price: 299.99,
    quantity: 5000,
    available: 5000,
    image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800',
    venue: 'Madison Square Garden',
    date: new Date('2024-12-15T19:00:00'),
    time: '7:00 PM',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    title: 'Ed Sheeran - Mathematics Tour',
    description: 'Ed Sheeran brings his Mathematics Tour to town with his acoustic guitar and chart-topping hits. An intimate evening with one of the world\'s greatest songwriters.',
    category: 'CONCERT' as TicketCategory,
    price: 199.99,
    quantity: 8000,
    available: 8000,
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800',
    venue: 'Staples Center',
    date: new Date('2024-12-20T20:00:00'),
    time: '8:00 PM',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '3',
    title: 'The Weeknd - After Hours Til Dawn Tour',
    description: 'Experience The Weeknd\'s mesmerizing performance featuring hits from After Hours and Dawn FM. A night of R&B and pop excellence.',
    category: 'CONCERT' as TicketCategory,
    price: 249.99,
    quantity: 6000,
    available: 6000,
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800',
    venue: 'Barclays Center',
    date: new Date('2024-12-25T19:30:00'),
    time: '7:30 PM',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '4',
    title: 'Billie Eilish - Happier Than Ever Tour',
    description: 'Billie Eilish returns with her Happier Than Ever Tour. Witness her unique sound and captivating stage presence live.',
    category: 'CONCERT' as TicketCategory,
    price: 229.99,
    quantity: 7000,
    available: 7000,
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800',
    venue: 'TD Garden',
    date: new Date('2025-01-05T20:00:00'),
    time: '8:00 PM',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '5',
    title: 'Coldplay - Music of the Spheres Tour',
    description: 'Join Coldplay for a spectacular night of music, lights, and color. Experience their iconic hits and new material in an immersive concert.',
    category: 'CONCERT' as TicketCategory,
    price: 179.99,
    quantity: 10000,
    available: 10000,
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800',
    venue: 'Wembley Stadium',
    date: new Date('2025-01-10T19:00:00'),
    time: '7:00 PM',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '6',
    title: 'Bruno Mars - 24K Magic Tour',
    description: 'Bruno Mars brings his funky, soulful sound to the stage. Get ready to dance the night away with his infectious energy and hits.',
    category: 'CONCERT' as TicketCategory,
    price: 219.99,
    quantity: 5500,
    available: 5500,
    image: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800',
    venue: 'T-Mobile Arena',
    date: new Date('2025-01-15T20:30:00'),
    time: '8:30 PM',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '7',
    title: 'Adele - 30 Tour',
    description: 'Adele\'s powerful voice and emotional ballads come to life in this intimate concert experience. A night you won\'t forget.',
    category: 'CONCERT' as TicketCategory,
    price: 349.99,
    quantity: 4000,
    available: 4000,
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800',
    venue: 'The O2 Arena',
    date: new Date('2025-01-20T19:00:00'),
    time: '7:00 PM',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '8',
    title: 'Drake & 21 Savage - It\'s All A Blur Tour',
    description: 'Drake and 21 Savage team up for an epic night of hip-hop. Experience their biggest hits and collaborations live.',
    category: 'CONCERT' as TicketCategory,
    price: 279.99,
    quantity: 6500,
    available: 6500,
    image: 'https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=800',
    venue: 'Scotiabank Arena',
    date: new Date('2025-01-25T20:00:00'),
    time: '8:00 PM',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

const dummySports: Ticket[] = [
  {
    id: '9',
    title: 'NBA Finals - Lakers vs Warriors',
    description: 'Watch the epic showdown between Los Angeles Lakers and Golden State Warriors in the NBA Finals. Witness basketball greatness!',
    category: 'SPORTS' as TicketCategory,
    price: 399.99,
    quantity: 20000,
    available: 20000,
    image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800',
    venue: 'Crypto.com Arena',
    date: new Date('2024-12-18T19:00:00'),
    time: '7:00 PM',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '10',
    title: 'NFL Championship - Super Bowl LVIII',
    description: 'The biggest game of the year! Watch the best teams battle for the championship title in this epic Super Bowl showdown.',
    category: 'SPORTS' as TicketCategory,
    price: 1299.99,
    quantity: 70000,
    available: 70000,
    image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800',
    venue: 'Allegiant Stadium',
    date: new Date('2025-02-09T18:30:00'),
    time: '6:30 PM',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '11',
    title: 'Premier League - Manchester United vs Liverpool',
    description: 'The historic rivalry continues! Watch Manchester United take on Liverpool in this thrilling Premier League match.',
    category: 'SPORTS' as TicketCategory,
    price: 149.99,
    quantity: 75000,
    available: 75000,
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800',
    venue: 'Old Trafford',
    date: new Date('2024-12-22T15:00:00'),
    time: '3:00 PM',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '12',
    title: 'UFC Championship - Heavyweight Title Fight',
    description: 'Witness the ultimate combat sports event! Two heavyweights clash for the championship belt in this electrifying fight night.',
    category: 'SPORTS' as TicketCategory,
    price: 449.99,
    quantity: 18000,
    available: 18000,
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800',
    venue: 'T-Mobile Arena',
    date: new Date('2025-01-12T20:00:00'),
    time: '8:00 PM',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

async function getTickets(category?: string): Promise<Ticket[]> {
  const cacheKey = category ? `tickets:${category}` : 'tickets:all'
  
  // Try to get from cache (non-blocking)
  try {
    const cached = await Promise.race([
      getCache(cacheKey),
      new Promise<null>((resolve) => setTimeout(() => resolve(null), 100))
    ])
    if (cached) return cached as Ticket[]
  } catch (error) {
    // Ignore cache errors during build
  }

  try {
    const where = category && (category === 'SPORTS' || category === 'CONCERT')
      ? { category: category as TicketCategory, available: { gt: 0 } }
      : { available: { gt: 0 } }
    
    const tickets = await prisma.ticket.findMany({
      where,
      orderBy: { date: 'asc' },
      take: 50, // Show more tickets
    })

    // Cache for 5 minutes (non-blocking)
    setCache(cacheKey, tickets, 300).catch(() => {
      // Ignore cache errors
    })
    
    return tickets
  } catch (error: any) {
    console.error('Error fetching tickets:', error)
    // Return empty array if database connection fails
    // This allows the page to render even if DB is not available
    return []
  }
}

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>
}) {
  const params = await searchParams
  let tickets = await getTickets(params.category)
  const dbHasData = tickets.length > 0
  
  // If no tickets from database, show dummy data based on category
  if (tickets.length === 0) {
    if (params.category === 'CONCERT') {
      tickets = dummyConcerts
    } else if (params.category === 'SPORTS') {
      tickets = dummySports
    } else {
      // Show all dummy data when no category selected
      tickets = [...dummyConcerts, ...dummySports]
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">
              Find Your Perfect Event
          </h1>
            <p className="text-xl mb-8 text-indigo-100">
              Discover and book tickets for the best sports events and concerts
            </p>
            
            {/* Search Bar */}
            <div className="bg-white rounded-lg p-2 flex items-center shadow-lg">
              <FiSearch className="text-gray-400 ml-4" size={20} />
              <input
                type="text"
                placeholder="Search events, artists, teams..."
                className="flex-1 px-4 py-3 text-gray-900 outline-none"
              />
              <button className="bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 transition-colors">
                Search
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            href="/"
            className={`px-6 py-3 rounded-full transition-colors font-medium ${
              !params.category
                ? 'bg-indigo-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-100 shadow'
            }`}
          >
            All Events
          </Link>
          <Link
            href="/?category=CONCERT"
            className={`px-6 py-3 rounded-full transition-colors font-medium ${
              params.category === 'CONCERT'
                ? 'bg-purple-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-purple-50 shadow'
            }`}
          >
            🎵 Concerts
          </Link>
          <Link
            href="/?category=SPORTS"
            className={`px-6 py-3 rounded-full transition-colors font-medium ${
              params.category === 'SPORTS'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-blue-50 shadow'
            }`}
          >
            ⚽ Sports
          </Link>
        </div>
      </section>

      {/* Seed Database Button - Only show if database is empty */}
      {!dbHasData && <SeedButton />}

      {/* Tickets Grid */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8 text-center">
          {params.category === 'CONCERT' 
            ? '🎵 Concerts' 
            : params.category === 'SPORTS' 
            ? '⚽ Sports Events' 
            : 'Available Tickets'}
        </h2>
        {tickets.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {tickets.map((ticket) => (
                <TicketCard key={ticket.id} ticket={ticket} />
              ))}
            </div>
            {tickets.length === 50 && (
              <div className="text-center mt-8">
                <p className="text-gray-500">Showing first 50 tickets. Use filters to find more.</p>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <p className="text-gray-500 text-lg mb-4">No tickets available at the moment.</p>
              <p className="text-gray-400 text-sm">
                {params.category === 'CONCERT' 
                  ? 'Check back soon for upcoming concerts!'
                  : params.category === 'SPORTS'
                  ? 'Check back soon for upcoming sports events!'
                  : 'Tickets will appear here once they are added to the system.'}
              </p>
            </div>
          </div>
        )}
      </section>

      {/* Features Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiCalendar className="text-indigo-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy Booking</h3>
              <p className="text-gray-600">
                Book your tickets in just a few clicks
              </p>
            </div>
            <div>
              <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiMapPin className="text-indigo-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Verified Events</h3>
              <p className="text-gray-600">
                All events are verified and authentic
              </p>
            </div>
            <div>
              <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiSearch className="text-indigo-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure Payment</h3>
              <p className="text-gray-600">
                Safe and secure payment processing
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
