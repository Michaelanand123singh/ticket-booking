require('dotenv').config();

function ensureDatabaseName(url) {
    if (!url) {
        return 'Missing URL';
    }

    console.log('Using regex: /mongodb\\+srv:\\/\\/[^/]+\\/[^/?]+/');
    // If URL ends with / or doesn't have a database name, add one
    if (url.endsWith('/') || !url.match(/mongodb\+srv:\/\/[^/]+\/[^/?]+/)) {
        console.log('Condition MET: Adding database name.');
        const baseUrl = url.split('?')[0].replace(/\/$/, '')
        const queryParams = url.includes('?') ? '?' + url.split('?')[1] : '?retryWrites=true&w=majority'
        const databaseName = 'ticketsystem'
        return `${baseUrl}/${databaseName}${queryParams}`
    } else {
        console.log('Condition NOT MET: URL deemed valid.');
    }

    if (!url.includes('?')) {
        return `${url}?retryWrites=true&w=majority`
    }

    return url
}

const rawUrl = process.env.DATABASE_URL;
console.log('--- DEBUG START ---');
if (rawUrl) {
    console.log('Raw URL length:', rawUrl.length);
    console.log('Raw URL (JSON stringify):', JSON.stringify(rawUrl));
    console.log('Masked:', rawUrl.replace(/:([^:@]+)@/, ':****@'));
} else {
    console.log('DATABASE_URL is undefined');
}

try {
    const processed = ensureDatabaseName(rawUrl);
    console.log('Processed URL (masked):', processed.replace(/:([^:@]+)@/, ':****@'));
} catch (e) {
    console.error('Error in processing:', e);
}
console.log('--- DEBUG END ---');
