import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { verifyToken } from '@/lib/auth'
import type { Order } from '@/types/prisma'

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

    const [totalUsers, totalTickets, orders, recentOrders] = await Promise.all([
      prisma.user.count(),
      prisma.ticket.count(),
      prisma.order.findMany(),
      prisma.order.findMany({
        take: 10,
        orderBy: { createdAt: 'desc' },
        include: {
          user: {
            select: {
              name: true,
              email: true,
            },
          },
        },
      }),
    ])

    const totalOrders = orders.length
    const totalRevenue = orders
      .filter((order: Order) => order.status === 'COMPLETED' || order.status === 'CONFIRMED')
      .reduce((sum: number, order: Order) => sum + order.totalAmount, 0)

    return NextResponse.json({
      totalUsers,
      totalRevenue,
      totalOrders,
      totalTickets,
      recentOrders,
    })
  } catch (error) {
    console.error('Admin stats error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}

