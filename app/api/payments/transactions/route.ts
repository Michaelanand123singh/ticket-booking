import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { verifyToken } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '')

    if (!token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const payload = verifyToken(token)
    if (!payload) {
      return NextResponse.json({ message: 'Invalid token' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const filter = searchParams.get('filter') || 'all'

    // Get user's orders
    const orders = await prisma.order.findMany({
      where: { userId: payload.userId },
      include: {
        payment: true,
        orderItems: {
          include: {
            ticket: {
              select: {
                id: true,
                title: true,
                description: true,
                image: true,
                venue: true,
                date: true,
                time: true,
                category: true,
              },
            },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    })

    // Filter payments by status
    const payments = orders
      .filter((order) => order.payment !== null)
      .map((order) => ({
        id: order.payment!.id,
        transactionId: order.payment!.transactionId || '',
        amount: order.payment!.amount,
        paymentMethod: order.payment!.paymentMethod,
        status: order.payment!.status,
        createdAt: order.payment!.createdAt,
        order: {
          id: order.id,
          orderItems: order.orderItems.map((item: any) => ({
            ticket: {
              id: item.ticket.id,
              title: item.ticket.title,
              description: item.ticket.description,
              image: item.ticket.image,
              venue: item.ticket.venue,
              date: item.ticket.date,
              time: item.ticket.time,
              category: item.ticket.category,
            },
            quantity: item.quantity,
            price: item.price,
          })),
        },
      }))

    let filteredPayments = payments
    if (filter !== 'all') {
      filteredPayments = payments.filter(
        (p) => p.status.toLowerCase() === filter.toUpperCase()
      )
    }

    return NextResponse.json(filteredPayments)
  } catch (error) {
    console.error('Transactions fetch error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}

