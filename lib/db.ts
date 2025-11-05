import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Ensure DATABASE_URL has a database name
function ensureDatabaseName(url: string | undefined): string {
  if (!url) {
    throw new Error('DATABASE_URL environment variable is not set')
  }

  // If URL ends with / or doesn't have a database name, add one
  if (url.endsWith('/') || !url.match(/mongodb\+srv:\/\/[^/]+\/[^/?]+/)) {
    // Extract base URL (everything before the last / or ?)
    const baseUrl = url.split('?')[0].replace(/\/$/, '')
    const queryParams = url.includes('?') ? '?' + url.split('?')[1] : '?retryWrites=true&w=majority'
    
    // Add database name
    const databaseName = 'ticketsystem'
    return `${baseUrl}/${databaseName}${queryParams}`
  }

  // Ensure query parameters are present
  if (!url.includes('?')) {
    return `${url}?retryWrites=true&w=majority`
  }

  return url
}

// Get and validate DATABASE_URL
const databaseUrl = ensureDatabaseName(process.env.DATABASE_URL)

// Override the environment variable for Prisma
if (typeof process !== 'undefined' && process.env) {
  process.env.DATABASE_URL = databaseUrl
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  datasources: {
    db: {
      url: databaseUrl,
    },
  },
})

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

