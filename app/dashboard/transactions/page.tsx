'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/authStore'
import { useAuthCheck } from '@/hooks/useAuthCheck'
import { formatPrice, formatDateTime, formatDate } from '@/lib/utils'
import { FiDollarSign, FiArrowLeft, FiDownload, FiFilter, FiEye, FiFileText } from 'react-icons/fi'
import toast from 'react-hot-toast'
import Link from 'next/link'

interface Transaction {
  id: string
  transactionId: string
  amount: number
  paymentMethod: string
  status: string
  createdAt: string
  order: {
    id: string
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
}

export default function TransactionsPage() {
  const router = useRouter()
  const { token } = useAuthStore()
  const { isChecking } = useAuthCheck()
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'completed' | 'failed' | 'refunded'>('all')

  useEffect(() => {
    if (!isChecking && token) {
      fetchTransactions()
    }
  }, [isChecking, token, filter])

  const fetchTransactions = async () => {
    try {
      const response = await fetch(`/api/payments/transactions?filter=${filter}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        const data = await response.json()
        setTransactions(data)
      } else {
        toast.error('Failed to load transactions')
      }
    } catch (error) {
      toast.error('Failed to load transactions')
    } finally {
      setLoading(false)
    }
  }

  const handleExport = () => {
    // In production, this would generate a CSV/PDF
    toast.success('Export feature coming soon!')
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

  if (isChecking) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    )
  }

  const filteredTransactions = transactions.filter((t) => {
    if (filter === 'all') return true
    return t.status.toLowerCase() === filter.toUpperCase()
  })

  const totalAmount = filteredTransactions.reduce((sum, t) => sum + t.amount, 0)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <Link
          href="/dashboard"
          className="inline-flex items-center text-indigo-600 hover:text-indigo-700 mb-6"
        >
          <FiArrowLeft className="mr-2" />
          Back to Dashboard
        </Link>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">Transaction History</h1>
              <p className="text-gray-600">View all your payment transactions</p>
            </div>
            <button
              onClick={handleExport}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center"
            >
              <FiDownload className="mr-2" />
              Export
            </button>
          </div>

          {/* Summary Card */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Transactions</p>
                <p className="text-2xl font-bold mt-1">{filteredTransactions.length}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Total Amount</p>
                <p className="text-2xl font-bold mt-1 text-green-600">
                  {formatPrice(totalAmount)}
                </p>
              </div>
              <div className="bg-indigo-100 p-3 rounded-full">
                <FiDollarSign className="text-indigo-600" size={32} />
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-lg shadow-md p-4 mb-6">
            <div className="flex items-center space-x-4">
              <FiFilter className="text-gray-600" />
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  filter === 'all'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilter('completed')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  filter === 'completed'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Completed
              </button>
              <button
                onClick={() => setFilter('failed')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  filter === 'failed'
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Failed
              </button>
              <button
                onClick={() => setFilter('refunded')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  filter === 'refunded'
                    ? 'bg-yellow-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Refunded
              </button>
            </div>
          </div>
        </div>

        {/* Transactions List */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Loading transactions...</p>
          </div>
        ) : filteredTransactions.length > 0 ? (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left py-3 px-4">Transaction ID</th>
                    <th className="text-left py-3 px-4">Order & Tickets</th>
                    <th className="text-left py-3 px-4">Amount</th>
                    <th className="text-left py-3 px-4">Method</th>
                    <th className="text-left py-3 px-4">Status</th>
                    <th className="text-left py-3 px-4">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTransactions.map((transaction) => (
                    <tr key={transaction.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4 font-mono text-sm">
                        {transaction.transactionId.slice(-12)}
                      </td>
                      <td className="py-3 px-4">
                        <div>
                          <p className="font-semibold">Order #{transaction.order.id.slice(-8)}</p>
                          <p className="text-sm text-gray-500">
                            {transaction.order.orderItems[0]?.ticket.title} x{' '}
                            {transaction.order.orderItems[0]?.quantity}
                          </p>
                          {transaction.status === 'COMPLETED' && (
                            <div className="flex items-center space-x-2 mt-2">
                              <button
                                onClick={() => handleViewTickets(transaction.order.id)}
                                className="text-indigo-600 hover:text-indigo-700 text-sm flex items-center"
                              >
                                <FiEye className="mr-1" size={14} />
                                View
                              </button>
                              <button
                                onClick={() => handleDownloadTickets(transaction.order.id)}
                                className="text-green-600 hover:text-green-700 text-sm flex items-center"
                              >
                                <FiDownload className="mr-1" size={14} />
                                Download
                              </button>
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-4 font-semibold">
                        {formatPrice(transaction.amount)}
                      </td>
                      <td className="py-3 px-4 capitalize">{transaction.paymentMethod}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-1 rounded text-xs ${
                            transaction.status === 'COMPLETED'
                              ? 'bg-green-100 text-green-800'
                              : transaction.status === 'FAILED'
                              ? 'bg-red-100 text-red-800'
                              : transaction.status === 'REFUNDED'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {transaction.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm">
                        {formatDateTime(transaction.createdAt)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <FiDollarSign className="mx-auto text-gray-400 mb-4" size={64} />
            <h2 className="text-2xl font-bold mb-2">No Transactions Found</h2>
            <p className="text-gray-600 mb-6">
              {filter === 'all'
                ? "You haven't made any transactions yet."
                : `No ${filter} transactions found.`}
            </p>
            {filter !== 'all' && (
              <button
                onClick={() => setFilter('all')}
                className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                View All Transactions
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

