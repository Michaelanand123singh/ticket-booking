'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/authStore'
import { useAuthCheck } from '@/hooks/useAuthCheck'
import { formatPrice, formatDate, formatDateTime } from '@/lib/utils'
import { FiPackage, FiEye, FiDownload, FiFilter, FiRefreshCw } from 'react-icons/fi'
import toast from 'react-hot-toast'
import Link from 'next/link'

interface Order {
  id: string
  totalAmount: number
  status: string
  createdAt: string
  user: {
    name: string
    email: string
  }
  orderItems: Array<{
    ticket: {
      title: string
    }
    quantity: number
    price: number
  }>
  payment?: {
    transactionId: string
    status: string
  }
}

export default function AdminOrdersPage() {
  const router = useRouter()
  const { user, token } = useAuthStore()
  const { isChecking } = useAuthCheck('/login', true)
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED'>('all')

  useEffect(() => {
    if (!isChecking && token) {
      fetchOrders()
    }
  }, [isChecking, token, filter])

  const fetchOrders = async () => {
    try {
      const response = await fetch(`/api/admin/orders?filter=${filter}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        const data = await response.json()
        setOrders(data)
      } else {
        toast.error('Failed to load orders')
      }
    } catch (error) {
      toast.error('Failed to load orders')
    } finally {
      setLoading(false)
    }
  }

  const handleStatusUpdate = async (orderId: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/admin/orders/${orderId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      })

      if (response.ok) {
        toast.success('Order status updated successfully')
        fetchOrders()
      } else {
        toast.error('Failed to update order status')
      }
    } catch (error) {
      toast.error('Failed to update order status')
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

  const filteredOrders = orders.filter((order) => {
    if (filter === 'all') return true
    return order.status === filter
  })

  const totalRevenue = filteredOrders
    .filter((o) => o.status === 'CONFIRMED' || o.status === 'COMPLETED')
    .reduce((sum, o) => sum + o.totalAmount, 0)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">Order Management</h1>
              <p className="text-gray-600">View and manage all customer orders</p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={fetchOrders}
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
                Export
              </button>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-gray-600 text-sm">Total Orders</p>
              <p className="text-2xl font-bold mt-1">{filteredOrders.length}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-gray-600 text-sm">Total Revenue</p>
              <p className="text-2xl font-bold mt-1 text-green-600">
                {formatPrice(totalRevenue)}
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-gray-600 text-sm">Pending Orders</p>
              <p className="text-2xl font-bold mt-1 text-yellow-600">
                {filteredOrders.filter((o) => o.status === 'PENDING').length}
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-gray-600 text-sm">Completed Orders</p>
              <p className="text-2xl font-bold mt-1 text-green-600">
                {filteredOrders.filter((o) => o.status === 'COMPLETED').length}
              </p>
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
                onClick={() => setFilter('PENDING')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  filter === 'PENDING'
                    ? 'bg-yellow-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Pending
              </button>
              <button
                onClick={() => setFilter('CONFIRMED')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  filter === 'CONFIRMED'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Confirmed
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
                onClick={() => setFilter('CANCELLED')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  filter === 'CANCELLED'
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Cancelled
              </button>
            </div>
          </div>
        </div>

        {/* Orders Table */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Loading orders...</p>
          </div>
        ) : filteredOrders.length > 0 ? (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left py-3 px-4">Order ID</th>
                    <th className="text-left py-3 px-4">Customer</th>
                    <th className="text-left py-3 px-4">Items</th>
                    <th className="text-left py-3 px-4">Amount</th>
                    <th className="text-left py-3 px-4">Status</th>
                    <th className="text-left py-3 px-4">Date</th>
                    <th className="text-left py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order) => (
                    <tr key={order.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4 font-mono text-sm">#{order.id.slice(-8)}</td>
                      <td className="py-3 px-4">
                        <div>
                          <p className="font-semibold">{order.user.name}</p>
                          <p className="text-sm text-gray-500">{order.user.email}</p>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="text-sm">
                          {order.orderItems.map((item, idx) => (
                            <p key={idx}>
                              {item.ticket.title} x {item.quantity}
                            </p>
                          ))}
                        </div>
                      </td>
                      <td className="py-3 px-4 font-semibold">
                        {formatPrice(order.totalAmount)}
                      </td>
                      <td className="py-3 px-4">
                        <select
                          value={order.status}
                          onChange={(e) => handleStatusUpdate(order.id, e.target.value)}
                          className={`px-2 py-1 rounded text-xs border ${
                            order.status === 'COMPLETED'
                              ? 'bg-green-100 text-green-800 border-green-300'
                              : order.status === 'PENDING'
                              ? 'bg-yellow-100 text-yellow-800 border-yellow-300'
                              : order.status === 'CANCELLED'
                              ? 'bg-red-100 text-red-800 border-red-300'
                              : 'bg-blue-100 text-blue-800 border-blue-300'
                          }`}
                        >
                          <option value="PENDING">PENDING</option>
                          <option value="CONFIRMED">CONFIRMED</option>
                          <option value="COMPLETED">COMPLETED</option>
                          <option value="CANCELLED">CANCELLED</option>
                        </select>
                      </td>
                      <td className="py-3 px-4 text-sm">{formatDateTime(order.createdAt)}</td>
                      <td className="py-3 px-4">
                        <Link
                          href={`/admin/orders/${order.id}`}
                          className="text-indigo-600 hover:text-indigo-700"
                        >
                          <FiEye />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <FiPackage className="mx-auto text-gray-400 mb-4" size={64} />
            <h2 className="text-2xl font-bold mb-2">No Orders Found</h2>
            <p className="text-gray-600">
              {filter === 'all' ? "No orders yet." : `No ${filter.toLowerCase()} orders found.`}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

