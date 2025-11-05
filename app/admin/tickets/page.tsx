'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/authStore'
import { useAuthCheck } from '@/hooks/useAuthCheck'
import { FiPlus, FiEdit, FiTrash2, FiEye } from 'react-icons/fi'
import { formatPrice, formatDate } from '@/lib/utils'
import toast from 'react-hot-toast'
import Link from 'next/link'

interface Ticket {
  id: string
  title: string
  description: string
  category: string
  price: number
  quantity: number
  available: number
  image?: string | null
  venue: string
  date: string
  time: string
}

export default function AdminTicketsPage() {
  const router = useRouter()
  const { user, token } = useAuthStore()
  const { isChecking } = useAuthCheck('/login', true)
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isChecking && token) {
      fetchTickets()
    }
  }, [isChecking, token])

  const fetchTickets = async () => {
    try {
      const response = await fetch('/api/admin/tickets', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        const data = await response.json()
        setTickets(data)
      } else {
        toast.error('Failed to load tickets')
      }
    } catch (error) {
      toast.error('Failed to load tickets')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this ticket?')) return

    try {
      const response = await fetch(`/api/admin/tickets/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        toast.success('Ticket deleted successfully')
        fetchTickets()
      } else {
        toast.error('Failed to delete ticket')
      }
    } catch (error) {
      toast.error('Failed to delete ticket')
    }
  }

  if (isChecking || !user || user.role !== 'ADMIN') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Ticket Management</h1>
            <p className="text-gray-600">Manage all tickets</p>
          </div>
          <Link
            href="/admin/tickets/new"
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors flex items-center"
          >
            <FiPlus className="mr-2" />
            Add New Ticket
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Loading tickets...</p>
          </div>
        ) : tickets.length > 0 ? (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left py-3 px-4">Image</th>
                    <th className="text-left py-3 px-4">Title</th>
                    <th className="text-left py-3 px-4">Category</th>
                    <th className="text-left py-3 px-4">Price</th>
                    <th className="text-left py-3 px-4">Available</th>
                    <th className="text-left py-3 px-4">Date</th>
                    <th className="text-left py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {tickets.map((ticket) => (
                    <tr key={ticket.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">
                        {ticket.image ? (
                          <img
                            src={ticket.image}
                            alt={ticket.title}
                            className="w-16 h-16 object-cover rounded"
                          />
                        ) : (
                          <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center">
                            No Image
                          </div>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-semibold">{ticket.title}</div>
                        <div className="text-sm text-gray-500">{ticket.venue}</div>
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-1 rounded text-xs ${
                            ticket.category === 'SPORTS'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-purple-100 text-purple-800'
                          }`}
                        >
                          {ticket.category}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-semibold">
                        {formatPrice(ticket.price)}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`${
                            ticket.available < 10 ? 'text-red-600' : 'text-gray-600'
                          }`}
                        >
                          {ticket.available} / {ticket.quantity}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm">
                        {formatDate(ticket.date)}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-2">
                          <Link
                            href={`/tickets/${ticket.id}`}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                            title="View"
                          >
                            <FiEye />
                          </Link>
                          <Link
                            href={`/admin/tickets/${ticket.id}/edit`}
                            className="p-2 text-indigo-600 hover:bg-indigo-50 rounded"
                            title="Edit"
                          >
                            <FiEdit />
                          </Link>
                          <button
                            onClick={() => handleDelete(ticket.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded"
                            title="Delete"
                          >
                            <FiTrash2 />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <p className="text-gray-500 mb-4">No tickets found</p>
            <Link
              href="/admin/tickets/new"
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors inline-flex items-center"
            >
              <FiPlus className="mr-2" />
              Add Your First Ticket
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

