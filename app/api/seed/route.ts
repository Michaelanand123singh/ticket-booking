import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

// Dummy concert data
const dummyConcerts = [
  {
    title: 'Taylor Swift - The Eras Tour',
    description: 'Join Taylor Swift for an unforgettable night featuring songs from all her eras. Experience the magic of her greatest hits live in concert.',
    category: 'CONCERT' as const,
    price: 299.99,
    quantity: 5000,
    available: 5000,
    image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800',
    venue: 'Madison Square Garden',
    date: new Date('2024-12-15T19:00:00'),
    time: '7:00 PM',
  },
  {
    title: 'Ed Sheeran - Mathematics Tour',
    description: 'Ed Sheeran brings his Mathematics Tour to town with his acoustic guitar and chart-topping hits. An intimate evening with one of the world\'s greatest songwriters.',
    category: 'CONCERT' as const,
    price: 199.99,
    quantity: 8000,
    available: 8000,
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800',
    venue: 'Staples Center',
    date: new Date('2024-12-20T20:00:00'),
    time: '8:00 PM',
  },
  {
    title: 'The Weeknd - After Hours Til Dawn Tour',
    description: 'Experience The Weeknd\'s mesmerizing performance featuring hits from After Hours and Dawn FM. A night of R&B and pop excellence.',
    category: 'CONCERT' as const,
    price: 249.99,
    quantity: 6000,
    available: 6000,
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800',
    venue: 'Barclays Center',
    date: new Date('2024-12-25T19:30:00'),
    time: '7:30 PM',
  },
  {
    title: 'Billie Eilish - Happier Than Ever Tour',
    description: 'Billie Eilish returns with her Happier Than Ever Tour. Witness her unique sound and captivating stage presence live.',
    category: 'CONCERT' as const,
    price: 229.99,
    quantity: 7000,
    available: 7000,
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800',
    venue: 'TD Garden',
    date: new Date('2025-01-05T20:00:00'),
    time: '8:00 PM',
  },
  {
    title: 'Coldplay - Music of the Spheres Tour',
    description: 'Join Coldplay for a spectacular night of music, lights, and color. Experience their iconic hits and new material in an immersive concert.',
    category: 'CONCERT' as const,
    price: 179.99,
    quantity: 10000,
    available: 10000,
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800',
    venue: 'Wembley Stadium',
    date: new Date('2025-01-10T19:00:00'),
    time: '7:00 PM',
  },
  {
    title: 'Bruno Mars - 24K Magic Tour',
    description: 'Bruno Mars brings his funky, soulful sound to the stage. Get ready to dance the night away with his infectious energy and hits.',
    category: 'CONCERT' as const,
    price: 219.99,
    quantity: 5500,
    available: 5500,
    image: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800',
    venue: 'T-Mobile Arena',
    date: new Date('2025-01-15T20:30:00'),
    time: '8:30 PM',
  },
  {
    title: 'Adele - 30 Tour',
    description: 'Adele\'s powerful voice and emotional ballads come to life in this intimate concert experience. A night you won\'t forget.',
    category: 'CONCERT' as const,
    price: 349.99,
    quantity: 4000,
    available: 4000,
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800',
    venue: 'The O2 Arena',
    date: new Date('2025-01-20T19:00:00'),
    time: '7:00 PM',
  },
  {
    title: 'Drake & 21 Savage - It\'s All A Blur Tour',
    description: 'Drake and 21 Savage team up for an epic night of hip-hop. Experience their biggest hits and collaborations live.',
    category: 'CONCERT' as const,
    price: 279.99,
    quantity: 6500,
    available: 6500,
    image: 'https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=800',
    venue: 'Scotiabank Arena',
    date: new Date('2025-01-25T20:00:00'),
    time: '8:00 PM',
  },
]

// Dummy sports data
const dummySports = [
  {
    title: 'NBA Finals - Lakers vs Warriors',
    description: 'Watch the epic showdown between Los Angeles Lakers and Golden State Warriors in the NBA Finals. Witness basketball greatness!',
    category: 'SPORTS' as const,
    price: 399.99,
    quantity: 20000,
    available: 20000,
    image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800',
    venue: 'Crypto.com Arena',
    date: new Date('2024-12-18T19:00:00'),
    time: '7:00 PM',
  },
  {
    title: 'NFL Championship - Super Bowl LVIII',
    description: 'The biggest game of the year! Watch the best teams battle for the championship title in this epic Super Bowl showdown.',
    category: 'SPORTS' as const,
    price: 1299.99,
    quantity: 70000,
    available: 70000,
    image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800',
    venue: 'Allegiant Stadium',
    date: new Date('2025-02-09T18:30:00'),
    time: '6:30 PM',
  },
  {
    title: 'Premier League - Manchester United vs Liverpool',
    description: 'The historic rivalry continues! Watch Manchester United take on Liverpool in this thrilling Premier League match.',
    category: 'SPORTS' as const,
    price: 149.99,
    quantity: 75000,
    available: 75000,
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800',
    venue: 'Old Trafford',
    date: new Date('2024-12-22T15:00:00'),
    time: '3:00 PM',
  },
  {
    title: 'UFC Championship - Heavyweight Title Fight',
    description: 'Witness the ultimate combat sports event! Two heavyweights clash for the championship belt in this electrifying fight night.',
    category: 'SPORTS' as const,
    price: 449.99,
    quantity: 18000,
    available: 18000,
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800',
    venue: 'T-Mobile Arena',
    date: new Date('2025-01-12T20:00:00'),
    time: '8:00 PM',
  },
]

export async function POST(request: NextRequest) {
  try {
    console.log('🌱 Starting seed process...')
    
    const allTickets = [...dummyConcerts, ...dummySports]
    const createdTickets = []
    const skippedTickets = []
    const errors = []

    // Test database connection first by trying a simple query
    try {
      await prisma.ticket.findFirst()
      console.log('✅ Database connection verified')
    } catch (dbError: any) {
      console.error('❌ Database connection failed:', dbError)
      return NextResponse.json(
        {
          success: false,
          error: `Database connection failed: ${dbError.message}`,
          details: dbError.code,
        },
        { status: 500 }
      )
    }

    // Create tickets one by one (individual creates to avoid transaction issues)
    for (const ticket of allTickets) {
      try {
        // Check if ticket already exists by title
        const existing = await prisma.ticket.findFirst({
          where: {
            title: ticket.title,
          },
        })

        if (existing) {
          skippedTickets.push(ticket.title)
          console.log(`⏭️  Skipped (already exists): ${ticket.title}`)
          continue
        }

        // Create new ticket
        const newTicket = await prisma.ticket.create({
          data: {
            title: ticket.title,
            description: ticket.description,
            category: ticket.category,
            price: ticket.price,
            quantity: ticket.quantity,
            available: ticket.available,
            image: ticket.image,
            venue: ticket.venue,
            date: ticket.date,
            time: ticket.time,
          },
        })
        createdTickets.push(newTicket.title)
        console.log(`✅ Created: ${ticket.title} (ID: ${newTicket.id})`)
      } catch (error: any) {
        const errorMsg = `Error creating ${ticket.title}: ${error.message}`
        console.error(`❌ ${errorMsg}`, error.code)
        errors.push(errorMsg)
        // Continue with next ticket even if one fails
      }
    }

    return NextResponse.json({
      success: true,
      message: `Successfully created ${createdTickets.length} tickets`,
      created: createdTickets,
      skipped: skippedTickets.length > 0 ? skippedTickets : undefined,
      errors: errors.length > 0 ? errors : undefined,
      total: allTickets.length,
    })
  } catch (error: any) {
    console.error('❌ Seed error:', error)
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to seed database',
        details: error.stack,
      },
      { status: 500 }
    )
  }
}

