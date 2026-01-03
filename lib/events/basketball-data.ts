import { SportEvent, SportCategory, TravelDemand, TicketDemand } from '@/types/events';

export const nbaEvents: SportEvent[] = [
    {
        id: 'basketball-nba-allstar-2026',
        name: 'NBA All-Star Weekend 2026',
        sport: SportCategory.BASKETBALL,
        subCategory: 'NBA',
        dateRange: 'February 13–15, 2026',
        startDate: new Date('2026-02-13'),
        endDate: new Date('2026-02-15'),
        country: 'USA',
        venue: 'Intuit Dome',
        city: 'Los Angeles',
        description: 'NBA All-Star Weekend at the brand new Intuit Dome - Clippers\' state-of-the-art arena.',
        imageUrl: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=1200',
        travelDemand: TravelDemand.HIGH,
        ticketDemand: TicketDemand.EXTREME,
        tags: ['NBA', 'All-Star', 'Los Angeles', 'New Arena', 'Celebrity Event'],
        highlights: [
            'All-Star Game on Feb 15',
            'Brand new Intuit Dome',
            'Los Angeles entertainment',
            'Celebrity attendance',
            'High spenders and VIPs'
        ],
        targetAudience: ['NBA Fans', 'High Spenders', 'VIPs', 'Celebrity Watchers']
    },
    {
        id: 'basketball-nba-finals-2026',
        name: 'NBA Finals 2026',
        sport: SportCategory.BASKETBALL,
        subCategory: 'NBA',
        dateRange: 'June 4 – June 21, 2026',
        startDate: new Date('2026-06-04'),
        endDate: new Date('2026-06-21'),
        country: 'USA',
        venue: 'Home Arena of Top Seed',
        city: 'TBD',
        description: 'The pinnacle of professional basketball - NBA Championship series.',
        imageUrl: 'https://images.unsplash.com/photo-1504450758481-7338eba7524a?q=80&w=1200',
        travelDemand: TravelDemand.HIGH,
        ticketDemand: TicketDemand.EXTREME,
        tags: ['NBA', 'Finals', 'Championship', 'Elite Basketball'],
        highlights: [
            'NBA Championship series',
            'Best-of-7 format',
            'Global basketball audience',
            'High spenders and VIPs'
        ],
        targetAudience: ['NBA Fans', 'High Spenders', 'Basketball Enthusiasts', 'US Sports Fans']
    },
    {
        id: 'basketball-nba-paris-2026',
        name: 'NBA Global Games - Paris',
        sport: SportCategory.BASKETBALL,
        subCategory: 'NBA',
        dateRange: 'January 17, 2026',
        startDate: new Date('2026-01-17'),
        endDate: new Date('2026-01-17'),
        country: 'France',
        venue: 'Accor Arena',
        city: 'Paris',
        description: 'NBA regular season game in Paris - bringing American basketball to Europe.',
        imageUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1200',
        travelDemand: TravelDemand.MEDIUM,
        ticketDemand: TicketDemand.HIGH,
        tags: ['NBA', 'Global Games', 'Paris', 'International'],
        highlights: [
            'NBA in Paris',
            'Regular season game',
            'European basketball fans',
            'Families and youth appeal'
        ],
        targetAudience: ['European Basketball Fans', 'Families', 'Youth', 'NBA Enthusiasts']
    }
];

export const ncaaEvents: SportEvent[] = [
    {
        id: 'basketball-march-madness-2026',
        name: 'NCAA March Madness 2026',
        sport: SportCategory.BASKETBALL,
        subCategory: 'NCAA',
        dateRange: 'March 17–29, 2026',
        startDate: new Date('2026-03-17'),
        endDate: new Date('2026-03-29'),
        country: 'USA',
        venue: 'Multiple Arenas',
        city: 'Various US Cities',
        description: 'College basketball\'s biggest tournament - March Madness bracket excitement.',
        imageUrl: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=1200',
        travelDemand: TravelDemand.MEDIUM,
        ticketDemand: TicketDemand.HIGH,
        tags: ['NCAA', 'March Madness', 'College Basketball', 'Tournament'],
        highlights: [
            'First Round to Regionals',
            'Bracket excitement',
            'Cinderella stories',
            'College basketball passion'
        ],
        targetAudience: ['College Basketball Fans', 'US Sports Fans', 'Bracket Enthusiasts']
    },
    {
        id: 'basketball-ncaa-final-four-2026',
        name: 'NCAA Final Four 2026',
        sport: SportCategory.BASKETBALL,
        subCategory: 'NCAA',
        dateRange: 'April 4–6, 2026',
        startDate: new Date('2026-04-04'),
        endDate: new Date('2026-04-06'),
        country: 'USA',
        venue: 'Lucas Oil Stadium',
        city: 'Indianapolis',
        description: 'NCAA Men\'s Final Four and Championship in Indianapolis - atmosphere seekers\' paradise.',
        imageUrl: 'https://images.unsplash.com/photo-1504450758481-7338eba7524a?q=80&w=1200',
        travelDemand: TravelDemand.HIGH,
        ticketDemand: TicketDemand.EXTREME,
        tags: ['NCAA', 'Final Four', 'Championship', 'Indianapolis'],
        highlights: [
            'Final Four on April 4',
            'Championship on April 6',
            'Lucas Oil Stadium',
            'Atmosphere seekers paradise'
        ],
        targetAudience: ['College Basketball Fans', 'Atmosphere Seekers', 'US Sports Fans']
    }
];

export const euroleagueEvents: SportEvent[] = [
    {
        id: 'basketball-euroleague-final-four-2026',
        name: 'EuroLeague Final Four 2026',
        sport: SportCategory.BASKETBALL,
        subCategory: 'EuroLeague',
        dateRange: 'May 22–24, 2026',
        startDate: new Date('2026-05-22'),
        endDate: new Date('2026-05-24'),
        country: 'Greece',
        venue: 'OAKA Arena',
        city: 'Athens',
        description: 'European club basketball\'s pinnacle event in historic Athens.',
        imageUrl: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?q=80&w=1200',
        travelDemand: TravelDemand.HIGH,
        ticketDemand: TicketDemand.HIGH,
        tags: ['EuroLeague', 'Final Four', 'Athens', 'European Basketball'],
        highlights: [
            'European club basketball pinnacle',
            'Historic Athens venue',
            'Passionate European fans',
            'Atmosphere seekers event'
        ],
        targetAudience: ['European Basketball Fans', 'Atmosphere Seekers', 'Greek Culture Enthusiasts']
    }
];

export const fibaEvents: SportEvent[] = [
    {
        id: 'basketball-fiba-u17-wc-2026',
        name: 'FIBA U17 World Cup 2026',
        sport: SportCategory.BASKETBALL,
        subCategory: 'FIBA',
        dateRange: 'June 27 – July 5, 2026',
        startDate: new Date('2026-06-27'),
        endDate: new Date('2026-07-05'),
        country: 'Turkey',
        venue: 'Multiple Arenas',
        city: 'Istanbul',
        description: 'Men\'s U17 Basketball World Cup showcasing future stars.',
        imageUrl: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=1200',
        travelDemand: TravelDemand.LOW,
        ticketDemand: TicketDemand.MEDIUM,
        tags: ['FIBA', 'U17', 'Youth Basketball', 'Istanbul'],
        highlights: [
            'Future basketball stars',
            'Youth tournament',
            'Istanbul venue',
            'Families and youth appeal'
        ],
        targetAudience: ['Families', 'Youth Basketball Fans', 'Turkish Sports Fans']
    },
    {
        id: 'basketball-fiba-womens-wc-2026',
        name: 'FIBA Women\'s World Cup 2026',
        sport: SportCategory.BASKETBALL,
        subCategory: 'FIBA',
        dateRange: 'September 4–13, 2026',
        startDate: new Date('2026-09-04'),
        endDate: new Date('2026-09-13'),
        country: 'Germany',
        venue: 'Multiple Arenas',
        city: 'Berlin',
        description: 'Women\'s Basketball World Cup in Berlin with final at Mercedes-Benz Arena.',
        imageUrl: 'https://images.unsplash.com/photo-1519861531473-9200262188bf?q=80&w=1200',
        travelDemand: TravelDemand.MEDIUM,
        ticketDemand: TicketDemand.MEDIUM,
        tags: ['FIBA', 'Women\'s Basketball', 'World Cup', 'Berlin'],
        highlights: [
            'Women\'s Basketball World Cup',
            'Final on Sep 13 at Mercedes-Benz Arena',
            'Berlin venue',
            'Families and youth appeal'
        ],
        targetAudience: ['Women\'s Sports Fans', 'Families', 'Youth', 'German Sports Fans']
    }
];

export const basketballEvents: SportEvent[] = [
    ...nbaEvents,
    ...ncaaEvents,
    ...euroleagueEvents,
    ...fibaEvents
];
