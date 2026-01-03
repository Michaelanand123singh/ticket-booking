import { SportEvent, SportCategory, TravelDemand, TicketDemand } from '@/types/events';

export const sixNationsEvents: SportEvent[] = [
    {
        id: 'rugby-six-nations-2026',
        name: 'Six Nations Championship 2026',
        sport: SportCategory.RUGBY,
        subCategory: 'Six Nations',
        dateRange: 'February 5 – March 14, 2026',
        startDate: new Date('2026-02-05'),
        endDate: new Date('2026-03-14'),
        country: 'Europe',
        venue: 'Multiple Stadiums',
        city: 'Paris, Dublin, London, Cardiff, Rome, Edinburgh',
        description: 'Biggest annual rugby attendance event featuring Europe\'s top rugby nations.',
        imageUrl: 'https://images.unsplash.com/photo-1628891890467-b79f2c8ba9dc?q=80&w=1200',
        travelDemand: TravelDemand.HIGH,
        ticketDemand: TicketDemand.EXTREME,
        tags: ['Six Nations', 'European Rugby', 'Historic Rivalry', 'Sold Out'],
        highlights: [
            'Biggest annual rugby attendance event',
            'France vs Ireland opener on Feb 5',
            'England vs Wales at Twickenham',
            'Super Saturday finale on March 14'
        ],
        targetAudience: ['Rugby Fans', 'European Sports Enthusiasts', 'Tradition Seekers']
    }
];

export const superRugbyEvents: SportEvent[] = [
    {
        id: 'rugby-super-rugby-pacific-2026',
        name: 'Super Rugby Pacific 2026',
        sport: SportCategory.RUGBY,
        subCategory: 'Super Rugby',
        dateRange: 'February 13 – May 30, 2026',
        startDate: new Date('2026-02-13'),
        endDate: new Date('2026-05-30'),
        country: 'Australia, New Zealand, Fiji',
        venue: 'Multiple Stadiums',
        city: 'Multiple Cities',
        description: 'Southern Hemisphere\'s premier club rugby competition with Grand Final on May 30.',
        imageUrl: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1200',
        travelDemand: TravelDemand.MEDIUM,
        ticketDemand: TicketDemand.MEDIUM,
        tags: ['Super Rugby', 'Southern Hemisphere', 'Club Rugby', 'Pacific'],
        highlights: [
            'Southern Hemisphere showcase',
            'Super Round in Christchurch (Apr 24-26)',
            'Grand Final on May 30',
            'Pacific island representation'
        ],
        targetAudience: ['Rugby Fans', 'Southern Hemisphere Supporters', 'Club Rugby Enthusiasts']
    }
];

export const nationsChampionshipEvents: SportEvent[] = [
    {
        id: 'rugby-nations-championship-july-2026',
        name: 'Nations Championship - July Window',
        sport: SportCategory.RUGBY,
        subCategory: 'International',
        dateRange: 'July 4–18, 2026',
        startDate: new Date('2026-07-04'),
        endDate: new Date('2026-07-18'),
        country: 'Australia, New Zealand, South Africa, Argentina',
        venue: 'Multiple Stadiums',
        city: 'Multiple Cities',
        description: 'Northern Hemisphere teams tour the South - Australia vs Ireland, New Zealand vs France.',
        imageUrl: 'https://images.unsplash.com/photo-1628891890467-b79f2c8ba9dc?q=80&w=1200',
        travelDemand: TravelDemand.HIGH,
        ticketDemand: TicketDemand.HIGH,
        tags: ['International Rugby', 'July Tours', 'North vs South'],
        highlights: [
            'Australia vs Ireland on July 4',
            'New Zealand vs France on July 4',
            'South Africa vs Scotland on July 11',
            'Packed stadiums in NZ, AUS, SA'
        ],
        targetAudience: ['Rugby Fans', 'International Travelers', 'Southern Hemisphere Supporters']
    },
    {
        id: 'rugby-nations-championship-nov-2026',
        name: 'Nations Championship - November Window',
        sport: SportCategory.RUGBY,
        subCategory: 'International',
        dateRange: 'November 6–29, 2026',
        startDate: new Date('2026-11-06'),
        endDate: new Date('2026-11-29'),
        country: 'UK, France, Ireland, Italy',
        venue: 'Multiple Stadiums',
        city: 'London, Paris, Dublin',
        description: 'Autumn Internationals - Europe hosts global giants with Finals Weekend at Twickenham.',
        imageUrl: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1200',
        travelDemand: TravelDemand.HIGH,
        ticketDemand: TicketDemand.HIGH,
        tags: ['Autumn Internationals', 'Europe', 'Finals Weekend', 'International Rugby'],
        highlights: [
            'England vs Australia at Twickenham on Nov 7',
            'England vs New Zealand on Nov 15',
            'France vs Argentina in Paris on Nov 21',
            'Finals Weekend Nov 27-29 at Twickenham'
        ],
        targetAudience: ['Rugby Fans', 'European Sports Enthusiasts', 'International Travelers']
    }
];

export const rugbyLeagueEvents: SportEvent[] = [
    {
        id: 'rugby-league-world-cup-2026',
        name: 'Rugby League World Cup 2026',
        sport: SportCategory.RUGBY,
        subCategory: 'Rugby League',
        dateRange: 'October 15 – November 15, 2026',
        startDate: new Date('2026-10-15'),
        endDate: new Date('2026-11-15'),
        country: 'Australia',
        venue: 'Multiple Stadiums',
        city: 'Sydney, Brisbane, Perth',
        description: 'Rugby League World Cup in Australia featuring men\'s and women\'s tournaments.',
        imageUrl: 'https://images.unsplash.com/photo-1628891890467-b79f2c8ba9dc?q=80&w=1200',
        travelDemand: TravelDemand.HIGH,
        ticketDemand: TicketDemand.HIGH,
        tags: ['Rugby League', 'World Cup', 'Australia', 'Men & Women'],
        highlights: [
            'Australia vs New Zealand opener on Oct 15',
            'England vs Tonga on Oct 17',
            'Men\'s & Women\'s finals on Nov 15 at Suncorp Stadium',
            'Australian rugby league passion'
        ],
        targetAudience: ['Rugby League Fans', 'Australian Sports Fans', 'International Travelers']
    }
];

export const rugbyEvents: SportEvent[] = [
    ...sixNationsEvents,
    ...superRugbyEvents,
    ...nationsChampionshipEvents,
    ...rugbyLeagueEvents
];
