import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Ensure DATABASE_URL has a database name
function ensureDatabaseName(url: string | undefined): string {
  if (!url) {
    // During build time, use a dummy URL to allow Prisma client generation
    // Cloud build environments may not have DATABASE_URL set during build phase
    // This is safe because Prisma client generation only needs the schema, not a real connection
    if (typeof window === 'undefined' && (process.env.NEXT_PHASE === 'phase-production-build' || process.argv.some(arg => arg.includes('build') || arg.includes('prisma')))) {
      return 'mongodb://localhost:27017/temp'
    }
    // In runtime, throw error if DATABASE_URL is missing
    throw new Error('DATABASE_URL environment variable is not set. Please configure it in your environment variables.')
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

// Get and validate DATABASE_URL (with fallback for build time)
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

