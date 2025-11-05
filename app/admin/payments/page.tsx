'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/authStore'
import { useAuthCheck } from '@/hooks/useAuthCheck'
import { formatPrice, formatDateTime } from '@/lib/utils'
import { FiDollarSign, FiDownload, FiFilter, FiRefreshCw, FiTrendingUp } from 'react-icons/fi'
import toast from 'react-hot-toast'

interface Payment {
  id: string
  transactionId: string
  amount: number
  paymentMethod: string
  status: string
  createdAt: string
  order: {
    id: string
    user: {
      name: string
      email: string
    }
    totalAmount: number
  }
}

export default function AdminPaymentsPage() {
  const router = useRouter()
  const { user, token } = useAuthStore()
  const { isChecking } = useAuthCheck('/login', true)
  const [payments, setPayments] = useState<Payment[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'COMPLETED' | 'FAILED' | 'REFUNDED' | 'PENDING'>('all')

  useEffect(() => {
    if (!isChecking && token) {
      fetchPayments()
    }
  }, [isChecking, token, filter])

  const fetchPayments = async () => {
    try {
      const response = await fetch(`/api/admin/payments?filter=${filter}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        const data = await response.json()
        setPayments(data)
      } else {
        toast.error('Failed to load payments')
      }
    } catch (error) {
      toast.error('Failed to load payments')
    } finally {
      setLoading(false)
    }
  }

  const handleExport = () => {
    // In production, this would generate a CSV/PDF
    toast.success('Export feature coming soon!')
  }

  if (isChecking || !user || user.role !== 'ADMIN') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    )
  }

  const filteredPayments = payments.filter((payment) => {
    if (filter === 'all') return true
    return payment.status === filter
  })

  const totalRevenue = filteredPayments
    .filter((p) => p.status === 'COMPLETED')
    .reduce((sum, p) => sum + p.amount, 0)

  const totalTransactions = filteredPayments.length
  const successfulTransactions = filteredPayments.filter((p) => p.status === 'COMPLETED').length
  const failedTransactions = filteredPayments.filter((p) => p.status === 'FAILED').length

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">Payment Management</h1>
              <p className="text-gray-600">Track and manage all payment transactions</p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={fetchPayments}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center"
              >
                <FiRefreshCw className="mr-2" />
                Refresh
              </button>
              <button
                onClick={handleExport}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center"
              >
                <FiDownload className="mr-2" />
                Export Report
              </button>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Total Revenue</p>
                  <p className="text-2xl font-bold mt-1 text-green-600">
                    {formatPrice(totalRevenue)}
                  </p>
                </div>
                <div className="bg-green-100 p-3 rounded-full">
                  <FiDollarSign className="text-green-600" size={24} />
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Total Transactions</p>
                  <p className="text-2xl font-bold mt-1">{totalTransactions}</p>
                </div>
                <div className="bg-blue-100 p-3 rounded-full">
                  <FiTrendingUp className="text-blue-600" size={24} />
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Successful</p>
                  <p className="text-2xl font-bold mt-1 text-green-600">
                    {successfulTransactions}
                  </p>
                </div>
                <div className="bg-green-100 p-3 rounded-full">
                  <FiTrendingUp className="text-green-600" size={24} />
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Failed</p>
                  <p className="text-2xl font-bold mt-1 text-red-600">{failedTransactions}</p>
                </div>
                <div className="bg-red-100 p-3 rounded-full">
                  <FiTrendingUp className="text-red-600" size={24} />
                </div>
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
                onClick={() => setFilter('COMPLETED')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  filter === 'COMPLETED'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Completed
              </button>
              <button
                onClick={() => setFilter('FAILED')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  filter === 'FAILED'
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Failed
              </button>
              <button
                onClick={() => setFilter('REFUNDED')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  filter === 'REFUNDED'
                    ? 'bg-yellow-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Refunded
              </button>
              <button
                onClick={() => setFilter('PENDING')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  filter === 'PENDING'
                    ? 'bg-yellow-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Pending
              </button>
            </div>
          </div>
        </div>

        {/* Payments Table */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Loading payments...</p>
          </div>
        ) : filteredPayments.length > 0 ? (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left py-3 px-4">Transaction ID</th>
                    <th className="text-left py-3 px-4">Customer</th>
                    <th className="text-left py-3 px-4">Order ID</th>
                    <th className="text-left py-3 px-4">Amount</th>
                    <th className="text-left py-3 px-4">Method</th>
                    <th className="text-left py-3 px-4">Status</th>
                    <th className="text-left py-3 px-4">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPayments.map((payment) => (
                    <tr key={payment.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4 font-mono text-sm">
                        {payment.transactionId?.slice(-12) || 'N/A'}
                      </td>
                      <td className="py-3 px-4">
                        <div>
                          <p className="font-semibold">{payment.order.user.name}</p>
                          <p className="text-sm text-gray-500">{payment.order.user.email}</p>
                        </div>
                      </td>
                      <td className="py-3 px-4 font-mono text-sm">#{payment.order.id.slice(-8)}</td>
                      <td className="py-3 px-4 font-semibold">
                        {formatPrice(payment.amount)}
                      </td>
                      <td className="py-3 px-4 capitalize">{payment.paymentMethod}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-1 rounded text-xs ${
                            payment.status === 'COMPLETED'
                              ? 'bg-green-100 text-green-800'
                              : payment.status === 'FAILED'
                              ? 'bg-red-100 text-red-800'
                              : payment.status === 'REFUNDED'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {payment.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm">
                        {formatDateTime(payment.createdAt)}
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
            <h2 className="text-2xl font-bold mb-2">No Payments Found</h2>
            <p className="text-gray-600">
              {filter === 'all'
                ? 'No payments yet.'
                : `No ${filter.toLowerCase()} payments found.`}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

