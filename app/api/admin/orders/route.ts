import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { verifyToken } from '@/lib/auth'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '')

    if (!token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const payload = verifyToken(token)
    if (!payload || payload.role !== 'ADMIN') {
      return NextResponse.json({ message: 'Forbidden' }, { status: 403 })
    }

    const { searchParams } = new URL(request.url)
    const filter = searchParams.get('filter') || 'all'

    const where: any = {}
    if (filter !== 'all') {
      where.status = filter
    }

    const orders = await prisma.order.findMany({
      where,
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
        orderItems: {
          include: {
            ticket: {
              select: {
                title: true,
              },
            },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    })

    // Define types manually
    interface OrderWithDetails {
      id: string
      userId: string
      totalAmount: number
      status: string
      createdAt: Date
      updatedAt: Date
      user: {
        name: string
        email: string
      }
      orderItems: {
        ticket: {
          title: string
        }
      }[]
    }

    return NextResponse.json(orders as unknown as OrderWithDetails[])
  } catch (error) {
    console.error('Admin orders fetch error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}

