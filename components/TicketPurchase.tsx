'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/authStore'
import { formatPrice } from '@/lib/utils'
import { FiShoppingCart, FiMinus, FiPlus } from 'react-icons/fi'
import toast from 'react-hot-toast'

interface TicketPurchaseProps {
  ticket: {
    id: string
    title: string
    price: number
    available: number
  }
}

export default function TicketPurchase({ ticket }: TicketPurchaseProps) {
  const router = useRouter()
  const { isAuthenticated, token } = useAuthStore()
  const [quantity, setQuantity] = useState(1)

  const handlePurchase = async () => {
    if (!isAuthenticated) {
      toast.error('Please login to purchase tickets')
      router.push('/login')
      return
    }

    if (quantity > ticket.available) {
      toast.error('Not enough tickets available')
      return
    }

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ticketId: ticket.id,
          quantity,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        toast.success('Order created successfully!')
        router.push('/dashboard/bookings')
      } else {
        toast.error(data.message || 'Failed to create order')
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.')
    }
  }

  const total = ticket.price * quantity

  return (
    <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
      <h2 className="text-2xl font-bold mb-6">Purchase Tickets</h2>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <span className="text-gray-600">Price per ticket</span>
          <span className="text-xl font-bold">{formatPrice(ticket.price)}</span>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Quantity</label>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              disabled={quantity <= 1}
              className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FiMinus />
            </button>
            <span className="text-lg font-semibold w-12 text-center">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(Math.min(ticket.available, quantity + 1))}
              disabled={quantity >= ticket.available}
              className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FiPlus />
            </button>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            {ticket.available} tickets available
          </p>
        </div>

        <div className="border-t pt-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600">Subtotal</span>
            <span className="text-gray-900 font-semibold">
              {formatPrice(total)}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold">Total</span>
            <span className="text-2xl font-bold text-indigo-600">
              {formatPrice(total)}
            </span>
          </div>
        </div>
      </div>

      <button
        onClick={handlePurchase}
        disabled={ticket.available === 0}
        className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
      >
        <FiShoppingCart className="mr-2" />
        {ticket.available === 0 ? 'Sold Out' : 'Purchase Tickets'}
      </button>
    </div>
  )
}

