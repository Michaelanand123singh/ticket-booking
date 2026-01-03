import { SportEvent, SportCategory, TravelDemand, TicketDemand } from '@/types/events';

export const olympicsEvents: SportEvent[] = [
    {
        id: 'winter-olympics-2026',
        name: 'Winter Olympics 2026',
        sport: SportCategory.OTHER,
        subCategory: 'Olympics',
        dateRange: 'February 6–22, 2026',
        startDate: new Date('2026-02-06'),
        endDate: new Date('2026-02-22'),
        country: 'Italy',
        venue: 'Multiple Venues',
        city: 'Milan & Cortina d\'Ampezzo',
        description: 'The Winter Olympics in Italy featuring luxury ski destinations and winter sports excellence.',
        imageUrl: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?q=80&w=1200',
        travelDemand: TravelDemand.HIGH,
        ticketDemand: TicketDemand.EXTREME,
        tags: ['Olympics', 'Winter Sports', 'Italy', 'Luxury', 'Ski'],
        highlights: [
            'Winter Olympics in Italy',
            'Milan and Cortina d\'Ampezzo',
            'Luxury ski vacationers',
            'World-class winter sports'
        ],
        targetAudience: ['Luxury Travelers', 'Ski Enthusiasts', 'Winter Vacationers', 'Olympic Fans']
    }
];

export const asianGamesEvents: SportEvent[] = [
    {
        id: 'asian-games-2026',
        name: 'Asian Games 2026',
        sport: SportCategory.OTHER,
        subCategory: 'Multi-Sport',
        dateRange: 'September 19 – October 4, 2026',
        startDate: new Date('2026-09-19'),
        endDate: new Date('2026-10-04'),
        country: 'Japan',
        venue: 'Multiple Venues',
        city: 'Nagoya',
        description: 'The Asian Games in Nagoya featuring multiple sports and Asian culture celebration.',
        imageUrl: 'https://images.unsplash.com/photo-1480796927426-f609979314bd?q=80&w=1200',
        travelDemand: TravelDemand.MEDIUM,
        ticketDemand: TicketDemand.MEDIUM,
        tags: ['Asian Games', 'Multi-Sport', 'Japan', 'Culture'],
        highlights: [
            'Asian Games in Nagoya',
            'Multiple sports',
            'Asian families and culture tourists',
            'Japanese hospitality'
        ],
        targetAudience: ['Asian Families', 'Culture Tourists', 'Multi-Sport Fans', 'Japanese Culture Enthusiasts']
    }
];

export const cyclingEvents: SportEvent[] = [
    {
        id: 'tour-de-france-2026',
        name: 'Tour de France 2026',
        sport: SportCategory.OTHER,
        subCategory: 'Cycling',
        dateRange: 'July 4–26, 2026',
        startDate: new Date('2026-07-04'),
        endDate: new Date('2026-07-26'),
        country: 'Spain & France',
        venue: 'Multiple Locations',
        city: 'Barcelona (Grand Départ)',
        description: 'The world\'s most prestigious cycling race starting in Barcelona with summer tourism appeal.',
        imageUrl: 'https://images.unsplash.com/photo-1541625602330-2277a4c46182?q=80&w=1200',
        travelDemand: TravelDemand.HIGH,
        ticketDemand: TicketDemand.MEDIUM,
        tags: ['Cycling', 'Tour de France', 'Barcelona', 'Summer'],
        highlights: [
            'Grand Départ in Barcelona',
            'World\'s most prestigious cycling race',
            'Cycling fans and summer tourists',
            'European summer spectacle'
        ],
        targetAudience: ['Cycling Fans', 'Summer Tourists', 'European Travelers', 'Outdoor Enthusiasts']
    }
];

export const commonwealthGamesEvents: SportEvent[] = [
    {
        id: 'commonwealth-games-2026',
        name: 'Commonwealth Games 2026',
        sport: SportCategory.OTHER,
        subCategory: 'Multi-Sport',
        dateRange: 'July 23 – August 2, 2026',
        startDate: new Date('2026-07-23'),
        endDate: new Date('2026-08-02'),
        country: 'Scotland',
        venue: 'Multiple Venues',
        city: 'Glasgow',
        description: 'The Commonwealth Games in Glasgow featuring UK expats and fans from Australia and India.',
        imageUrl: 'https://images.unsplash.com/photo-1486299267070-83823f5448dd?q=80&w=1200',
        travelDemand: TravelDemand.MEDIUM,
        ticketDemand: TicketDemand.MEDIUM,
        tags: ['Commonwealth Games', 'Multi-Sport', 'Glasgow', 'UK'],
        highlights: [
            'Commonwealth Games in Glasgow',
            'Multiple sports',
            'UK expats and Australian/Indian fans',
            'Scottish hospitality'
        ],
        targetAudience: ['UK Expats', 'Australian Fans', 'Indian Fans', 'Multi-Sport Enthusiasts']
    }
];

export const otherSportsEvents: SportEvent[] = [
    ...olympicsEvents,
    ...asianGamesEvents,
    ...cyclingEvents,
    ...commonwealthGamesEvents
];
