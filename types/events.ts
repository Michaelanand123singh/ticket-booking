export enum SportCategory {
    MOTORSPORTS = 'Motorsports',
    TENNIS = 'Tennis',
    FOOTBALL = 'Football',
    CRICKET = 'Cricket',
    RUGBY = 'Rugby',
    BASKETBALL = 'Basketball',
    OTHER = 'Other Sports'
}

export enum TravelDemand {
    HIGH = 'HIGH',
    MEDIUM = 'MEDIUM',
    LOW = 'LOW'
}

export enum TicketDemand {
    EXTREME = 'EXTREME',
    HIGH = 'HIGH',
    MEDIUM = 'MEDIUM',
    LOW = 'LOW'
}

export interface SportEvent {
    id: string;
    name: string;
    sport: SportCategory;
    subCategory?: string; // e.g., "F1", "Grand Slam", "UEFA"
    dateRange: string;
    startDate: Date;
    endDate: Date;
    country: string;
    venue: string;
    city?: string;
    description: string;
    imageUrl: string;
    travelDemand: TravelDemand;
    ticketDemand: TicketDemand;
    tags: string[]; // e.g., ["Sprint Weekend", "Night Race", "VIP Available"]
    highlights?: string[];
    targetAudience?: string[]; // e.g., ["High Spenders", "Families", "Asian Markets"]
}
