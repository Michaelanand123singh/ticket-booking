'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuthStore } from '@/store/authStore'
import { useAuthCheck } from '@/hooks/useAuthCheck'
import { FiFileText, FiDollarSign, FiCalendar, FiPackage, FiEye, FiDownload } from 'react-icons/fi'
import { formatPrice, formatDate } from '@/lib/utils'
import toast from 'react-hot-toast'

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
      category: string
    }
    quantity: number
    price: number
  }>
}

export default function DashboardPage() {
  const router = useRouter()
  const { user, token } = useAuthStore()
  const { isChecking } = useAuthCheck()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalSpent: 0,
    upcomingEvents: 0,
    activeTickets: 0,
  })

  useEffect(() => {
    if (!isChecking && token) {
      fetchOrders()
      fetchStats()
    }
  }, [isChecking, token])

  const fetchOrders = async () => {
    try {
      const response = await fetch('/api/orders', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        const data = await response.json()
        setOrders(data)
      }
    } catch (error) {
      toast.error('Failed to load orders')
    } finally {
      setLoading(false)
    }
  }

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/orders/stats', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        const data = await response.json()
        setStats(data)
      }
    } catch (error) {
      console.error('Failed to load stats')
    }
  }

  const handleViewTickets = (orderId: string) => {
    router.push(`/dashboard/orders/${orderId}`)
  }

  const handleDownloadTickets = async (orderId: string) => {
    try {
      // Fetch order details with tickets
      const response = await fetch(`/api/orders/${orderId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        const order = await response.json()
        
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
      } else {
        toast.error('Failed to load ticket details')
      }
    } catch (error) {
      toast.error('Failed to download tickets')
    }
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
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
              <p className="text-gray-600">Welcome back, {user.name}!</p>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/dashboard/profile"
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Manage Profile
              </Link>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Link
            href="/my-tickets"
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <h3 className="text-lg font-semibold mb-2">My Tickets</h3>
            <p className="text-gray-600 text-sm">View all your booked tickets</p>
          </Link>
          <Link
            href="/dashboard/transactions"
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <h3 className="text-lg font-semibold mb-2">Transaction History</h3>
            <p className="text-gray-600 text-sm">View all your payment transactions</p>
          </Link>
          <Link
            href="/dashboard/profile"
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <h3 className="text-lg font-semibold mb-2">Profile Settings</h3>
            <p className="text-gray-600 text-sm">Manage your account settings</p>
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Orders</p>
                <p className="text-2xl font-bold mt-1">{stats.totalOrders}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <FiPackage className="text-blue-600" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Spent</p>
                <p className="text-2xl font-bold mt-1">
                  {formatPrice(stats.totalSpent)}
                </p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <FiDollarSign className="text-green-600" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Upcoming Events</p>
                <p className="text-2xl font-bold mt-1">{stats.upcomingEvents}</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-lg">
                <FiCalendar className="text-purple-600" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Active Tickets</p>
                <p className="text-2xl font-bold mt-1">{stats.activeTickets}</p>
              </div>
              <div className="bg-orange-100 p-3 rounded-lg">
                <FiFileText className="text-orange-600" size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Orders Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-6">Order History</h2>
          {loading ? (
            <div className="text-center py-8">
              <p className="text-gray-500">Loading orders...</p>
            </div>
          ) : orders.length > 0 ? (
            <div className="space-y-4">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="font-semibold">Order #{order.id.slice(-8)}</p>
                      <p className="text-sm text-gray-500">
                        {formatDate(order.createdAt)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg">{formatPrice(order.totalAmount)}</p>
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          order.status === 'COMPLETED'
                            ? 'bg-green-100 text-green-800'
                            : order.status === 'PENDING'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {order.orderItems.map((item, index) => (
                      <div key={index} className="flex items-center justify-between text-sm">
                        <span>
                          {item.ticket.title} x {item.quantity}
                        </span>
                        <span>{formatPrice(item.quantity * item.price)}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t flex items-center justify-between">
                    <button
                      onClick={() => router.push(`/dashboard/orders/${order.id}`)}
                      className="text-indigo-600 hover:text-indigo-700 text-sm font-medium flex items-center"
                    >
                      <FiEye className="mr-1" size={14} />
                      View Details
                    </button>
                    {(order.status === 'CONFIRMED' || order.status === 'COMPLETED') && (
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => handleViewTickets(order.id)}
                          className="text-indigo-600 hover:text-indigo-700 text-sm font-medium flex items-center"
                        >
                          <FiEye className="mr-1" size={14} />
                          View Tickets
                        </button>
                        <button
                          onClick={() => handleDownloadTickets(order.id)}
                          className="text-green-600 hover:text-green-700 text-sm font-medium flex items-center"
                        >
                          <FiDownload className="mr-1" size={14} />
                          Download
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">No orders yet</p>
              <button
                onClick={() => router.push('/')}
                className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Browse Tickets
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

