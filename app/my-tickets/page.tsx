'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/authStore'
import { useAuthCheck } from '@/hooks/useAuthCheck'
import { formatPrice, formatDate, formatDateTime } from '@/lib/utils'
import { FiCalendar, FiMapPin, FiClock, FiFileText, FiDownload, FiArrowLeft } from 'react-icons/fi'
import toast from 'react-hot-toast'
import Image from 'next/image'
import Link from 'next/link'

interface TicketItem {
  id: string
  title: string
  description: string
  image?: string | null
  venue: string
  date: string
  time: string
  category: string
}

interface OrderItem {
  ticket: TicketItem
  quantity: number
  price: number
}

interface BookedTicket {
  id: string
  orderId: string
  orderDate: string
  totalAmount: number
  status: string
  transactionId?: string
  ticket: TicketItem
  quantity: number
  price: number
}

export default function MyTicketsPage() {
  const router = useRouter()
  const { token, user } = useAuthStore()
  const { isChecking } = useAuthCheck()
  const [tickets, setTickets] = useState<BookedTicket[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isChecking && token) {
      fetchMyTickets()
    }
  }, [isChecking, token])

  const fetchMyTickets = async () => {
    try {
      const response = await fetch('/api/orders', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        const orders = await response.json()
        
        // Filter only confirmed/completed orders and flatten to individual tickets
        const bookedTickets: BookedTicket[] = []
        
        orders
          .filter((order: any) => order.status === 'CONFIRMED' || order.status === 'COMPLETED')
          .forEach((order: any) => {
            order.orderItems.forEach((item: OrderItem) => {
              bookedTickets.push({
                id: `${order.id}-${item.ticket.id}`,
                orderId: order.id,
                orderDate: order.createdAt,
                totalAmount: order.totalAmount,
                status: order.status,
                transactionId: order.payment?.transactionId,
                ticket: item.ticket,
                quantity: item.quantity,
                price: item.price,
              })
            })
          })
        
        // Sort by event date (upcoming first)
        bookedTickets.sort((a, b) => {
          const dateA = new Date(a.ticket.date).getTime()
          const dateB = new Date(b.ticket.date).getTime()
          return dateA - dateB
        })
        
        setTickets(bookedTickets)
      } else {
        toast.error('Failed to load tickets')
      }
    } catch (error) {
      toast.error('Failed to load tickets')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleDownloadTicket = (ticket: BookedTicket) => {
    // In production, this would generate a PDF ticket
    toast.success('Ticket download feature coming soon!')
  }

  if (isChecking || !user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center text-indigo-600 hover:text-indigo-700 mb-4"
          >
            <FiArrowLeft className="mr-2" />
            Back to Home
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">My Tickets</h1>
              <p className="text-gray-600">Welcome back, {user.name}!</p>
            </div>
            <div className="bg-indigo-100 p-3 rounded-full">
              <FiFileText className="text-indigo-600" size={32} />
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Loading your tickets...</p>
          </div>
        ) : tickets.length > 0 ? (
          <>
            {/* Stats Summary */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <p className="text-3xl font-bold text-indigo-600">{tickets.length}</p>
                  <p className="text-gray-600 mt-1">Total Tickets</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-green-600">
                    {tickets.filter(t => new Date(t.ticket.date) >= new Date()).length}
                  </p>
                  <p className="text-gray-600 mt-1">Upcoming Events</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-purple-600">
                    {formatPrice(tickets.reduce((sum, t) => sum + (t.price * t.quantity), 0))}
                  </p>
                  <p className="text-gray-600 mt-1">Total Spent</p>
                </div>
              </div>
            </div>

            {/* Tickets Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tickets.map((ticket) => {
                const isUpcoming = new Date(ticket.ticket.date) >= new Date()
                const isPast = new Date(ticket.ticket.date) < new Date()

                return (
                  <div
                    key={ticket.id}
                    className={`bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:shadow-lg ${
                      isPast ? 'opacity-75' : ''
                    }`}
                  >
                    {/* Ticket Image */}
                    {ticket.ticket.image && (
                      <div className="relative w-full h-48">
                        <Image
                          src={ticket.ticket.image}
                          alt={ticket.ticket.title}
                          fill
                          className="object-cover"
                        />
                        {isPast && (
                          <div className="absolute top-2 right-2 bg-gray-800 text-white px-3 py-1 rounded-full text-sm font-semibold">
                            Past Event
                          </div>
                        )}
                        {isUpcoming && (
                          <div className="absolute top-2 right-2 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                            Upcoming
                          </div>
                        )}
                      </div>
                    )}

                    {/* Ticket Content */}
                    <div className="p-6">
                      <div className="mb-4">
                        <h3 className="text-xl font-bold mb-2 line-clamp-2">
                          {ticket.ticket.title}
                        </h3>
                        <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                          {ticket.ticket.description}
                        </p>
                      </div>

                      {/* Event Details */}
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-sm text-gray-600">
                          <FiCalendar className="mr-2" />
                          {formatDate(ticket.ticket.date)}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <FiClock className="mr-2" />
                          {ticket.ticket.time}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <FiMapPin className="mr-2" />
                          {ticket.ticket.venue}
                        </div>
                      </div>

                      {/* Ticket Info */}
                      <div className="border-t pt-4 space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Quantity:</span>
                          <span className="font-semibold">{ticket.quantity} ticket(s)</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Price per ticket:</span>
                          <span className="font-semibold">{formatPrice(ticket.price)}</span>
                        </div>
                        <div className="flex justify-between text-sm font-bold pt-2 border-t">
                          <span>Total:</span>
                          <span className="text-indigo-600">
                            {formatPrice(ticket.price * ticket.quantity)}
                          </span>
                        </div>
                      </div>

                      {/* Order Info */}
                      <div className="mt-4 pt-4 border-t">
                        <p className="text-xs text-gray-500 mb-2">
                          Order #{ticket.orderId.slice(-8)} • {formatDate(ticket.orderDate)}
                        </p>
                        {ticket.transactionId && (
                          <p className="text-xs text-gray-500 font-mono">
                            Txn: {ticket.transactionId.slice(-12)}
                          </p>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="mt-4 flex gap-2">
                        {isUpcoming && (
                          <button
                            onClick={() => handleDownloadTicket(ticket)}
                            className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center text-sm font-medium"
                          >
                            <FiDownload className="mr-2" />
                            Download
                          </button>
                        )}
                        <button
                          onClick={() => router.push(`/dashboard/orders/${ticket.orderId}`)}
                          className="flex-1 border border-indigo-600 text-indigo-600 py-2 px-4 rounded-lg hover:bg-indigo-50 transition-colors text-sm font-medium"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </>
        ) : (
          /* Empty State */
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <FiFileText className="mx-auto text-gray-400 mb-4" size={64} />
            <h2 className="text-2xl font-bold mb-2">No Tickets Yet</h2>
            <p className="text-gray-600 mb-6">
              You haven't booked any tickets yet. Start exploring our amazing events!
            </p>
            <Link
              href="/"
              className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
            >
              Browse Events
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

