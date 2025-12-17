import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prismaClientV7: PrismaClient | undefined
}

// Ensure DATABASE_URL has a database name
function ensureDatabaseName(url: string | undefined): string {
  if (!url) {
    if (typeof window === 'undefined' && (process.env.NEXT_PHASE === 'phase-production-build' || process.argv.some(arg => arg.includes('build') || arg.includes('prisma')))) {
      return 'mongodb://localhost:27017/temp'
    }
    throw new Error('DATABASE_URL environment variable is not set. Please configure it in your environment variables.')
  }

  // Remove surrounding quotes if present
  let cleanUrl = url.replace(/^["']|["']$/g, '');

  console.log('Checking DATABASE_URL:', cleanUrl.replace(/:([^:@]+)@/, ':****@'));

  // Check if URL already has a database name using a simplified robust check
  const urlPath = cleanUrl.split('?')[0];
  const protocolIndex = urlPath.indexOf('://');
  if (protocolIndex === -1) return cleanUrl;

  const pathStartIndex = protocolIndex + 3;
  const firstSlashAfterProtocol = urlPath.indexOf('/', pathStartIndex);

  if (firstSlashAfterProtocol !== -1 && firstSlashAfterProtocol < urlPath.length - 1) {
    console.log('Database name detected in URL.');
    // If we are in development, FORCE strip query params to avoid "replica set" requirement for standalone
    if (process.env.NODE_ENV !== 'production') {
      return cleanUrl.split('?')[0];
    }
    return cleanUrl;
  }

  console.log('No database name detected. Appending ticketsystem...');

  // Extract base URL (everything before the last / or ?)
  const baseUrl = cleanUrl.split('?')[0].replace(/\/$/, '')

  // Add database name, NO query params in dev
  const databaseName = 'ticketsystem'

  if (process.env.NODE_ENV !== 'production') {
    return `${baseUrl}/${databaseName}`
  }

  // In prod, preserve existing params or add defaults ONLY if needed
  const queryParams = cleanUrl.includes('?') ? '?' + cleanUrl.split('?')[1] : '?retryWrites=true&w=majority'
  return `${baseUrl}/${databaseName}${queryParams}`
}

// Get and validate DATABASE_URL (with fallback for build time)
const databaseUrl = ensureDatabaseName(process.env.DATABASE_URL)

// Override the environment variable for Prisma
if (typeof process !== 'undefined' && process.env) {
  process.env.DATABASE_URL = databaseUrl
}

export const prisma = globalForPrisma.prismaClientV7 ?? new PrismaClient({
  datasources: {
    db: {
      url: databaseUrl,
    },
  },
})

if (process.env.NODE_ENV !== 'production') globalForPrisma.prismaClientV7 = prisma
