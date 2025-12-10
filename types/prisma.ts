// Type definitions based on Prisma schema
// These match the Prisma schema and can be used before Prisma client is generated

export type UserRole = 'USER' | 'ADMIN'
export type TicketCategory = 'SPORTS' | 'CONCERT'
export type OrderStatus = 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED'

export interface User {
  id: string
  email: string
  name: string
  password: string | null
  role: UserRole
  image: string | null
  emailVerified: boolean
  createdAt: Date
  updatedAt: Date
  googleId: string | null
}

export interface Ticket {
  id: string
  title: string
  description: string
  category: TicketCategory
  price: number
  quantity: number
  available: number
  image: string | null
  venue: string
  date: Date
  time: string
  createdAt: Date
  updatedAt: Date
}

export interface Order {
  id: string
  userId: string
  totalAmount: number
  status: OrderStatus
  createdAt: Date
  updatedAt: Date
}

export interface OrderItem {
  id: string
  orderId: string
  ticketId: string
  quantity: number
  price: number
  createdAt: Date
}


