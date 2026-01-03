import { SportEvent, SportCategory, TravelDemand, TicketDemand } from '@/types/events';

export const t20WorldCupEvents: SportEvent[] = [
    {
        id: 'cricket-t20-wc-2026',
        name: 'ICC T20 World Cup 2026',
        sport: SportCategory.CRICKET,
        subCategory: 'ICC T20 World Cup',
        dateRange: 'February 7 – March 8, 2026',
        startDate: new Date('2026-02-07'),
        endDate: new Date('2026-03-08'),
        country: 'India & Sri Lanka',
        venue: 'Multiple Stadiums',
        city: 'Multiple Cities',
        description: 'The biggest T20 cricket tournament featuring India vs Pakistan blockbuster and massive crowds.',
        imageUrl: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?q=80&w=1200',
        travelDemand: TravelDemand.HIGH,
        ticketDemand: TicketDemand.EXTREME,
        tags: ['T20 World Cup', 'India vs Pakistan', 'ICC Event', 'Massive Crowds'],
        highlights: [
            'India vs Pakistan on Feb 15 in Colombo',
            'Massive Indian crowds',
            'Final in Ahmedabad or Colombo',
            'Biggest T20 tournament'
        ],
        targetAudience: ['Cricket Fans', 'Indian Subcontinent Fans', 'T20 Enthusiasts']
    },
    {
        id: 'cricket-womens-t20-wc-2026',
        name: 'ICC Women\'s T20 World Cup 2026',
        sport: SportCategory.CRICKET,
        subCategory: 'Women\'s T20 World Cup',
        dateRange: 'June 14 – July 5, 2026',
        startDate: new Date('2026-06-14'),
        endDate: new Date('2026-07-05'),
        country: 'England',
        venue: 'Multiple Stadiums',
        city: 'Birmingham, London',
        description: 'Women\'s T20 World Cup in England featuring India vs Pakistan at Edgbaston and final at Lord\'s.',
        imageUrl: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=1200',
        travelDemand: TravelDemand.MEDIUM,
        ticketDemand: TicketDemand.HIGH,
        tags: ['Women\'s Cricket', 'T20 World Cup', 'Lord\'s Final', 'England'],
        highlights: [
            'India vs Pakistan at Edgbaston on June 14',
            'Final at Lord\'s on July 5',
            'Women\'s cricket showcase',
            'English summer cricket'
        ],
        targetAudience: ['Cricket Fans', 'Women\'s Sports Enthusiasts', 'British Cricket Fans']
    }
];

export const iplEvents: SportEvent[] = [
    {
        id: 'cricket-ipl-2026',
        name: 'Indian Premier League 2026',
        sport: SportCategory.CRICKET,
        subCategory: 'IPL',
        dateRange: 'March 22 – May 26, 2026',
        startDate: new Date('2026-03-22'),
        endDate: new Date('2026-05-26'),
        country: 'India',
        venue: 'All Major Indian Venues',
        city: 'Multiple Cities',
        description: 'The world\'s richest cricket league with star-studded teams and massive fan following.',
        imageUrl: 'https://images.unsplash.com/photo-1624526267942-ab0ff8a3e972?q=80&w=1200',
        travelDemand: TravelDemand.HIGH,
        ticketDemand: TicketDemand.EXTREME,
        tags: ['IPL', 'T20 League', 'Bollywood', 'Entertainment', 'Star Power'],
        highlights: [
            'World\'s richest cricket league',
            'Star-studded teams',
            'Massive fan following',
            'Grand final likely in Ahmedabad'
        ],
        targetAudience: ['Cricket Fans', 'Indian Fans', 'Entertainment Seekers', 'T20 Enthusiasts']
    }
];

export const internationalCricketEvents: SportEvent[] = [
    {
        id: 'cricket-nz-tour-india-odi-2026',
        name: 'New Zealand Tour of India - ODI Series',
        sport: SportCategory.CRICKET,
        subCategory: 'International Tour',
        dateRange: 'January 11–18, 2026',
        startDate: new Date('2026-01-11'),
        endDate: new Date('2026-01-18'),
        country: 'India',
        venue: 'Baroda, Rajkot, Indore',
        city: 'Multiple Cities',
        description: 'Three ODI matches between India and New Zealand across Indian venues.',
        imageUrl: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?q=80&w=1200',
        travelDemand: TravelDemand.MEDIUM,
        ticketDemand: TicketDemand.MEDIUM,
        tags: ['ODI Series', 'India vs New Zealand', 'International Cricket'],
        highlights: [
            'India vs New Zealand rivalry',
            'ODI format',
            'Multiple Indian cities'
        ],
        targetAudience: ['Cricket Fans', 'Indian Fans', 'NZ Supporters']
    },
    {
        id: 'cricket-nz-tour-india-t20-2026',
        name: 'New Zealand Tour of India - T20I Series',
        sport: SportCategory.CRICKET,
        subCategory: 'International Tour',
        dateRange: 'January 21–31, 2026',
        startDate: new Date('2026-01-21'),
        endDate: new Date('2026-01-31'),
        country: 'India',
        venue: 'Nagpur, Raipur, Guwahati, Vizag, Trivandrum',
        city: 'Multiple Cities',
        description: 'Five T20I matches showcasing fast-paced cricket across India.',
        imageUrl: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=1200',
        travelDemand: TravelDemand.MEDIUM,
        ticketDemand: TicketDemand.MEDIUM,
        tags: ['T20I Series', 'India vs New Zealand', 'Fast-Paced Cricket'],
        highlights: [
            '5 T20I matches',
            'Fast-paced action',
            'Multiple Indian venues'
        ],
        targetAudience: ['Cricket Fans', 'T20 Enthusiasts', 'Indian Fans']
    },
    {
        id: 'cricket-eng-tour-india-2026',
        name: 'England Tour of India',
        sport: SportCategory.CRICKET,
        subCategory: 'International Tour',
        dateRange: 'July 10–25, 2026',
        startDate: new Date('2026-07-10'),
        endDate: new Date('2026-07-25'),
        country: 'England',
        venue: 'Various English Venues',
        city: 'England',
        description: 'India tours England for ODIs and T20Is in English summer.',
        imageUrl: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?q=80&w=1200',
        travelDemand: TravelDemand.MEDIUM,
        ticketDemand: TicketDemand.MEDIUM,
        tags: ['India Tour', 'England Cricket', 'Summer Series'],
        highlights: [
            '3 ODIs and 5 T20Is',
            'English summer cricket',
            'India-England rivalry'
        ],
        targetAudience: ['Cricket Fans', 'British Cricket Fans', 'Indian Diaspora']
    },
    {
        id: 'cricket-ind-tour-sl-2026',
        name: 'India Tour of Sri Lanka - Test Series',
        sport: SportCategory.CRICKET,
        subCategory: 'International Tour',
        dateRange: 'August 1–15, 2026',
        startDate: new Date('2026-08-01'),
        endDate: new Date('2026-08-15'),
        country: 'Sri Lanka',
        venue: 'Galle, Colombo (SSC)',
        city: 'Galle, Colombo',
        description: 'Two Test matches for World Test Championship in Sri Lankan conditions.',
        imageUrl: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?q=80&w=1200',
        travelDemand: TravelDemand.MEDIUM,
        ticketDemand: TicketDemand.MEDIUM,
        tags: ['Test Cricket', 'WTC', 'India vs Sri Lanka', 'Asian Cricket'],
        highlights: [
            'World Test Championship',
            '2 Test matches',
            'Historic Galle venue',
            'Asian cricket rivalry'
        ],
        targetAudience: ['Test Cricket Fans', 'Indian Fans', 'Sri Lankan Supporters']
    }
];

export const cricketEvents: SportEvent[] = [
    ...t20WorldCupEvents,
    ...iplEvents,
    ...internationalCricketEvents
];
