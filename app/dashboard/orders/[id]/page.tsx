'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { useAuthStore } from '@/store/authStore'
import { useAuthCheck } from '@/hooks/useAuthCheck'
import { formatPrice, formatDate, formatDateTime } from '@/lib/utils'
import { FiDownload, FiCalendar, FiMapPin, FiClock, FiFileText } from 'react-icons/fi'
import toast from 'react-hot-toast'
import Image from 'next/image'

interface Order {
  id: string
  totalAmount: number
  status: string
  createdAt: string
  orderItems: Array<{
    ticket: {
      id: string
      title: string
      description: string
      image?: string | null
      venue: string
      date: string
      time: string
    }
    quantity: number
    price: number
  }>
  payment?: {
    transactionId: string
    status: string
    createdAt: string
  }
}

export default function OrderDetailPage() {
  const router = useRouter()
  const params = useParams()
  const { token } = useAuthStore()
  const { isChecking } = useAuthCheck()
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (isChecking || !token) {
      return
    }

    // Wait for params to be available
    if (!params || !params.id) {
      return
    }

    const orderId = params.id as string
    if (!orderId || orderId === 'undefined' || orderId === 'null') {
      toast.error('Invalid order ID')
      router.push('/dashboard')
      return
    }

    fetchOrder(orderId)
  }, [isChecking, router, params, token])

  const fetchOrder = async (orderId: string) => {
    if (!orderId || orderId === 'undefined') {
      toast.error('Invalid order ID')
      router.push('/dashboard')
      return
    }

    try {
      const response = await fetch(`/api/orders/${orderId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        const data = await response.json()
        setOrder(data)
      } else {
        toast.error('Failed to load order')
        router.push('/dashboard')
      }
    } catch (error) {
      toast.error('Failed to load order')
      router.push('/dashboard')
    } finally {
      setLoading(false)
    }
  }

  const handleDownloadTickets = async () => {
    if (!order) return

    try {
      // Generate ticket view/download
      const ticketWindow = window.open('', '_blank')
      if (ticketWindow) {
        ticketWindow.document.write(`
          <!DOCTYPE html>
          <html>
            <head>
              <title>Tickets - Order #${order.id.slice(-8)}</title>
              <style>
                body { font-family: Arial, sans-serif; padding: 20px; background: #f5f5f5; }
                .ticket-container { max-width: 800px; margin: 0 auto; }
                .ticket { background: white; border: 2px dashed #4F46E5; padding: 20px; margin: 20px 0; border-radius: 8px; }
                .ticket-header { border-bottom: 2px solid #4F46E5; padding-bottom: 10px; margin-bottom: 15px; }
                .ticket-title { font-size: 24px; font-weight: bold; color: #4F46E5; }
                .ticket-details { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin: 15px 0; }
                .detail-item { padding: 10px; background: #f9fafb; border-radius: 4px; }
                .detail-label { font-size: 12px; color: #6b7280; text-transform: uppercase; }
                .detail-value { font-size: 16px; font-weight: bold; color: #111827; margin-top: 5px; }
                .qr-placeholder { width: 150px; height: 150px; background: #e5e7eb; border: 2px dashed #9ca3af; display: flex; align-items: center; justify-content: center; margin: 20px auto; }
                @media print { body { background: white; } .ticket { page-break-after: always; } }
              </style>
            </head>
            <body>
              <div class="ticket-container">
                <h1 style="text-align: center; color: #4F46E5;">Your Tickets</h1>
                <p style="text-align: center; color: #6b7280;">Order #${order.id.slice(-8)}</p>
                ${order.orderItems.map((item: any, index: number) => `
                  ${Array(item.quantity).fill(0).map((_, qtyIndex) => `
                    <div class="ticket">
                      <div class="ticket-header">
                        <div class="ticket-title">${item.ticket.title}</div>
                        <div style="color: #6b7280; margin-top: 5px;">Ticket ${qtyIndex + 1} of ${item.quantity}</div>
                      </div>
                      <div class="ticket-details">
                        <div class="detail-item">
                          <div class="detail-label">Venue</div>
                          <div class="detail-value">${item.ticket.venue}</div>
                        </div>
                        <div class="detail-item">
                          <div class="detail-label">Date</div>
                          <div class="detail-value">${new Date(item.ticket.date).toLocaleDateString()}</div>
                        </div>
                        <div class="detail-item">
                          <div class="detail-label">Time</div>
                          <div class="detail-value">${item.ticket.time}</div>
                        </div>
                        <div class="detail-item">
                          <div class="detail-label">Category</div>
                          <div class="detail-value">${item.ticket.category}</div>
                        </div>
                      </div>
                      <div class="qr-placeholder">
                        <div style="text-align: center; color: #9ca3af;">
                          <div>QR Code</div>
                          <div style="font-size: 12px; margin-top: 5px;">Order: ${order.id.slice(-8)}</div>
                          <div style="font-size: 12px;">Ticket: ${index + 1}-${qtyIndex + 1}</div>
                        </div>
                      </div>
                      <div style="text-align: center; color: #6b7280; font-size: 12px; margin-top: 15px;">
                        Please present this ticket at the venue
                      </div>
                    </div>
                  `).join('')}
                `).join('')}
              </div>
              <div style="text-align: center; margin-top: 30px;">
                <button onclick="window.print()" style="background: #4F46E5; color: white; padding: 12px 24px; border: none; border-radius: 6px; cursor: pointer; font-size: 16px;">
                  Print Tickets
                </button>
              </div>
            </body>
          </html>
        `)
        ticketWindow.document.close()
      }
    } catch (error) {
      toast.error('Failed to download tickets')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    )
  }

  if (!order) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <button
          onClick={() => router.back()}
          className="text-indigo-600 hover:text-indigo-700 mb-6"
        >
          ← Back to Dashboard
        </button>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold mb-2">Order Details</h1>
                <p className="text-gray-600">Order #{order.id.slice(-8)}</p>
              </div>
              <span
                className={`px-4 py-2 rounded-full font-semibold ${
                  order.status === 'COMPLETED' || order.status === 'CONFIRMED'
                    ? 'bg-green-100 text-green-800'
                    : order.status === 'PENDING'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                {order.status}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <p className="text-sm text-gray-600 mb-1">Order Date</p>
                <p className="font-semibold">{formatDateTime(order.createdAt)}</p>
              </div>
              {order.payment && (
                <div>
                  <p className="text-sm text-gray-600 mb-1">Transaction ID</p>
                  <p className="font-semibold font-mono text-sm">
                    {order.payment.transactionId}
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">Tickets</h2>
            <div className="space-y-6">
              {order.orderItems.map((item, index) => (
                <div key={index} className="border-b pb-6 last:border-0">
                  <div className="flex flex-col md:flex-row gap-4">
                    {item.ticket.image && (
                      <div className="relative w-full md:w-32 h-48 md:h-32 rounded-lg overflow-hidden">
                        <Image
                          src={item.ticket.image}
                          alt={item.ticket.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2">
                        {item.ticket.title}
                      </h3>
                      <p className="text-gray-600 mb-4">{item.ticket.description}</p>
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-sm text-gray-600">
                          <FiCalendar className="mr-2" />
                          {formatDate(item.ticket.date)}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <FiClock className="mr-2" />
                          {item.ticket.time}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <FiMapPin className="mr-2" />
                          {item.ticket.venue}
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600">Quantity</p>
                          <p className="font-semibold">{item.quantity} tickets</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-600">Price</p>
                          <p className="font-semibold text-lg">
                            {formatPrice(item.quantity * item.price)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Total Amount</h2>
              <p className="text-3xl font-bold text-indigo-600">
                {formatPrice(order.totalAmount)}
              </p>
            </div>
            {(order.status === 'CONFIRMED' || order.status === 'COMPLETED') && (
              <button
                onClick={handleDownloadTickets}
                className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors flex items-center justify-center mt-4"
              >
                <FiDownload className="mr-2" />
                Download/View Tickets
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

