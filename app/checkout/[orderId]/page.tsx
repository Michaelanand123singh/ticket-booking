'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { useAuthStore } from '@/store/authStore'
import { useAuthCheck } from '@/hooks/useAuthCheck'
import { formatPrice } from '@/lib/utils'
import { FiCreditCard, FiCheckCircle } from 'react-icons/fi'
import toast from 'react-hot-toast'

interface Order {
  id: string
  totalAmount: number
  orderItems: Array<{
    ticket: {
      title: string
    }
    quantity: number
    price: number
  }>
}

export default function CheckoutPage() {
  const router = useRouter()
  const params = useParams()
  const { token } = useAuthStore()
  const { isChecking } = useAuthCheck()
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)
  const [processing, setProcessing] = useState(false)

  useEffect(() => {
    if (isChecking || !token) {
      return
    }

    // Wait for params to be available
    if (!params || !params.orderId) {
      return
    }

    const orderId = params.orderId as string
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

  const handlePayment = async () => {
    if (!order) return

    setProcessing(true)

    try {
      // In production, integrate with Stripe here
      // For now, we'll simulate a payment
      const response = await fetch(`/api/payments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          orderId: order.id,
          amount: order.totalAmount,
          paymentMethod: 'card',
        }),
      })

      const data = await response.json()

      if (response.ok) {
        toast.success('Payment successful! Your tickets have been booked.')
        router.push('/my-tickets')
      } else {
        toast.error(data.message || 'Payment failed')
      }
    } catch (error) {
      toast.error('An error occurred during payment')
    } finally {
      setProcessing(false)
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
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Checkout</h1>

          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-3 mb-6">
              {order.orderItems.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{item.ticket.title}</p>
                    <p className="text-sm text-gray-500">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                  <p className="font-semibold">
                    {formatPrice(item.quantity * item.price)}
                  </p>
                </div>
              ))}
            </div>
            <div className="border-t pt-4">
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold">Total</span>
                <span className="text-2xl font-bold text-indigo-600">
                  {formatPrice(order.totalAmount)}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
            <div className="space-y-4">
              <div className="border border-gray-300 rounded-lg p-4 flex items-center">
                <FiCreditCard className="mr-3 text-indigo-600" size={24} />
                <div>
                  <p className="font-medium">Credit/Debit Card</p>
                  <p className="text-sm text-gray-500">
                    Secure payment via Stripe
                  </p>
                </div>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-sm text-yellow-800">
                  <strong>Note:</strong> This is a demo. In production, you would
                  integrate with Stripe for secure payment processing.
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={handlePayment}
            disabled={processing}
            className="w-full bg-indigo-600 text-white py-4 rounded-lg font-semibold hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-lg"
          >
            {processing ? (
              'Processing...'
            ) : (
              <>
                <FiCheckCircle className="mr-2" />
                Complete Payment
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

