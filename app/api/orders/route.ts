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

    const orders = await prisma.order.findMany({
      where: { userId: payload.userId },
      include: {
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
        payment: {
          select: {
            transactionId: true,
            status: true,
            createdAt: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(orders)
  } catch (error) {
    console.error('Orders fetch error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '')

    if (!token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const payload = verifyToken(token)
    if (!payload) {
      return NextResponse.json({ message: 'Invalid token' }, { status: 401 })
    }

    const { ticketId, quantity } = await request.json()

    if (!ticketId || !quantity || quantity <= 0) {
      return NextResponse.json(
        { message: 'Invalid ticket ID or quantity' },
        { status: 400 }
      )
    }

    // Get ticket
    const ticket = await prisma.ticket.findUnique({
      where: { id: ticketId },
    })

    if (!ticket) {
      return NextResponse.json({ message: 'Ticket not found' }, { status: 404 })
    }

    if (ticket.available < quantity) {
      return NextResponse.json(
        { message: 'Not enough tickets available' },
        { status: 400 }
      )
    }

    // Create order
    const order = await prisma.order.create({
      data: {
        userId: payload.userId,
        totalAmount: ticket.price * quantity,
        status: 'PENDING',
        orderItems: {
          create: {
            ticketId,
            quantity,
            price: ticket.price,
          },
        },
      },
      include: {
        orderItems: {
          include: {
            ticket: true,
          },
        },
      },
    })

    // Update ticket availability
    await prisma.ticket.update({
      where: { id: ticketId },
      data: {
        available: ticket.available - quantity,
      },
    })

    return NextResponse.json(order, { status: 201 })
  } catch (error) {
    console.error('Order creation error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}

