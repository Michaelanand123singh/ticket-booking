import { SportEvent, SportCategory, TravelDemand, TicketDemand } from '@/types/events';

export const worldCupEvents: SportEvent[] = [
    {
        id: 'football-world-cup-2026',
        name: 'FIFA World Cup 2026',
        sport: SportCategory.FOOTBALL,
        subCategory: 'FIFA World Cup',
        dateRange: 'June 11 – July 19, 2026',
        startDate: new Date('2026-06-11'),
        endDate: new Date('2026-07-19'),
        country: 'USA, Canada, Mexico',
        venue: '16 Host Cities',
        city: 'Multiple Cities',
        description: 'The biggest sporting event on Earth - 48 teams across USA, Canada, and Mexico with unprecedented global travel.',
        imageUrl: 'https://images.unsplash.com/photo-1560272564-c83b66b1ad12?q=80&w=1200',
        travelDemand: TravelDemand.HIGH,
        ticketDemand: TicketDemand.EXTREME,
        tags: ['World Cup', '48 Teams', 'Historic', 'Multi-Nation Host'],
        highlights: [
            '48 teams for the first time',
            '16 host cities across 3 countries',
            'Unprecedented global travel',
            'Biggest sporting event on Earth'
        ],
        targetAudience: ['Football Fans Worldwide', 'International Travelers', 'Sports Pilgrims']
    }
];

export const uefaEvents: SportEvent[] = [
    {
        id: 'football-ucl-final-2026',
        name: 'UEFA Champions League Final',
        sport: SportCategory.FOOTBALL,
        subCategory: 'UEFA',
        dateRange: 'May 30, 2026',
        startDate: new Date('2026-05-30'),
        endDate: new Date('2026-05-30'),
        country: 'Hungary',
        venue: 'Puskás Aréna',
        city: 'Budapest',
        description: 'The pinnacle of European club football - massive global audience and travel.',
        imageUrl: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=1200',
        travelDemand: TravelDemand.HIGH,
        ticketDemand: TicketDemand.EXTREME,
        tags: ['Champions League', 'Final', 'European Football', 'Elite'],
        highlights: [
            'Pinnacle of European club football',
            'Massive global audience',
            'Budapest hosting',
            'Elite club competition'
        ],
        targetAudience: ['Football Fans', 'European Travelers', 'Club Football Enthusiasts']
    },
    {
        id: 'football-europa-final-2026',
        name: 'UEFA Europa League Final',
        sport: SportCategory.FOOTBALL,
        subCategory: 'UEFA',
        dateRange: 'May 20, 2026',
        startDate: new Date('2026-05-20'),
        endDate: new Date('2026-05-20'),
        country: 'Turkey',
        venue: 'TBD',
        city: 'Istanbul',
        description: 'Europa League final in historic Istanbul with passionate atmosphere.',
        imageUrl: 'https://images.unsplash.com/photo-1551958219-acbc608c6377?q=80&w=1200',
        travelDemand: TravelDemand.MEDIUM,
        ticketDemand: TicketDemand.HIGH,
        tags: ['Europa League', 'Final', 'Istanbul', 'European Football'],
        highlights: [
            'Historic Istanbul setting',
            'Passionate atmosphere',
            'European club competition',
            'Finals week event'
        ],
        targetAudience: ['Football Fans', 'Turkish Culture Enthusiasts', 'European Travelers']
    },
    {
        id: 'football-conference-final-2026',
        name: 'UEFA Conference League Final',
        sport: SportCategory.FOOTBALL,
        subCategory: 'UEFA',
        dateRange: 'May 27, 2026',
        startDate: new Date('2026-05-27'),
        endDate: new Date('2026-05-27'),
        country: 'Germany',
        venue: 'TBD',
        city: 'Leipzig',
        description: 'Conference League final in Leipzig - completing UEFA\'s finals week.',
        imageUrl: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1200',
        travelDemand: TravelDemand.MEDIUM,
        ticketDemand: TicketDemand.MEDIUM,
        tags: ['Conference League', 'Final', 'Leipzig', 'European Football'],
        highlights: [
            'Finals week completion',
            'Leipzig venue',
            'European club competition',
            'Growing tournament'
        ],
        targetAudience: ['Football Fans', 'German Culture Enthusiasts', 'European Travelers']
    }
];

export const leagueEvents: SportEvent[] = [
    {
        id: 'football-epl-2025-26-finale',
        name: 'Premier League 2025-26 Season Finale',
        sport: SportCategory.FOOTBALL,
        subCategory: 'Premier League',
        dateRange: 'May 17, 2026',
        startDate: new Date('2026-05-17'),
        endDate: new Date('2026-05-17'),
        country: 'England',
        venue: 'Multiple Stadiums',
        city: 'Various Cities',
        description: 'Dramatic final day of the Premier League season with all matches kicking off simultaneously.',
        imageUrl: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?q=80&w=1200',
        travelDemand: TravelDemand.HIGH,
        ticketDemand: TicketDemand.HIGH,
        tags: ['Premier League', 'Season Finale', 'Simultaneous Kickoffs', 'Drama'],
        highlights: [
            'All matches kick off at same time',
            'Title race drama',
            'Relegation battles',
            'Most-watched league finale'
        ],
        targetAudience: ['Premier League Fans', 'British Football Enthusiasts', 'Drama Seekers']
    },
    {
        id: 'football-laliga-2025-26-finale',
        name: 'La Liga 2025-26 Season Finale',
        sport: SportCategory.FOOTBALL,
        subCategory: 'La Liga',
        dateRange: 'May 24, 2026',
        startDate: new Date('2026-05-24'),
        endDate: new Date('2026-05-24'),
        country: 'Spain',
        venue: 'Multiple Stadiums',
        city: 'Various Cities',
        description: 'Final day of Spanish La Liga with potential El Clásico implications.',
        imageUrl: 'https://images.unsplash.com/photo-1553778263-73a83bab9b0c?q=80&w=1200',
        travelDemand: TravelDemand.MEDIUM,
        ticketDemand: TicketDemand.MEDIUM,
        tags: ['La Liga', 'Season Finale', 'Spanish Football'],
        highlights: [
            'Spanish league finale',
            'El Clásico implications',
            'European qualification drama'
        ],
        targetAudience: ['La Liga Fans', 'Spanish Football Enthusiasts']
    }
];

export const internationalEvents: SportEvent[] = [
    {
        id: 'football-euro-2028-qualifiers-march',
        name: 'EURO 2028 Qualifiers - Matchday 1-2',
        sport: SportCategory.FOOTBALL,
        subCategory: 'International',
        dateRange: 'March 2026',
        startDate: new Date('2026-03-01'),
        endDate: new Date('2026-03-31'),
        country: 'Europe',
        venue: 'Various Stadiums',
        city: 'Multiple Cities',
        description: 'Opening matchdays of EURO 2028 qualification across Europe.',
        imageUrl: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=1200',
        travelDemand: TravelDemand.MEDIUM,
        ticketDemand: TicketDemand.MEDIUM,
        tags: ['EURO Qualifiers', 'International Football', 'European Nations'],
        highlights: [
            'EURO 2028 qualification begins',
            'National team matches',
            'European football atmosphere'
        ],
        targetAudience: ['National Team Fans', 'European Football Enthusiasts']
    }
];

export const footballEvents: SportEvent[] = [
    ...worldCupEvents,
    ...uefaEvents,
    ...leagueEvents,
    ...internationalEvents
];
