import dotenv from 'dotenv';
dotenv.config();

function ensureDatabaseName(url: string | undefined): string {
    if (!url) {
        return 'Missing URL';
    }

    // If URL ends with / or doesn't have a database name, add one
    // Strict regex check for database name
    if (url.endsWith('/') || !url.match(/mongodb\+srv:\/\/[^/]+\/[^/?]+/)) {
        console.log('Detected URL without DB name or ending with slash.');
        // Extract base URL (everything before the last / or ?)
        const baseUrl = url.split('?')[0].replace(/\/$/, '')
        const queryParams = url.includes('?') ? '?' + url.split('?')[1] : '?retryWrites=true&w=majority'

        // Add database name
        const databaseName = 'ticketsystem'
        const result = `${baseUrl}/${databaseName}${queryParams}`;
        return result;
    }

    // Ensure query parameters are present
    if (!url.includes('?')) {
        return `${url}?retryWrites=true&w=majority`
    }

    return url
}

const rawUrl = process.env.DATABASE_URL;
console.log('Raw DATABASE_URL length:', rawUrl?.length);
if (rawUrl) {
    // Mask password for logging
    const masked = rawUrl.replace(/:([^:@]+)@/, ':****@');
    console.log('Raw DATABASE_URL (masked):', masked);

    // Check for quotes
    if (rawUrl.startsWith('"') || rawUrl.startsWith("'")) {
        console.log('WARNING: URL starts with quote!');
    }
}

const processed = ensureDatabaseName(rawUrl);
console.log('Processed URL (masked):', processed.replace(/:([^:@]+)@/, ':****@'));
