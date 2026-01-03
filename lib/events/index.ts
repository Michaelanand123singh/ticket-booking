import { SportEvent, SportCategory, TravelDemand, TicketDemand } from '@/types/events';
import { motorsportsEvents } from './motorsports-data';
import { tennisEvents } from './tennis-data';
import { footballEvents } from './football-data';
import { cricketEvents } from './cricket-data';
import { rugbyEvents } from './rugby-data';
import { basketballEvents } from './basketball-data';
import { otherSportsEvents } from './other-sports-data';

// ============= ALL EVENTS =============
export const allEvents2026: SportEvent[] = [
    ...motorsportsEvents,
    ...tennisEvents,
    ...footballEvents,
    ...cricketEvents,
    ...rugbyEvents,
    ...basketballEvents,
    ...otherSportsEvents
];

// ============= UTILITY FUNCTIONS =============

/**
 * Get events by sport category
 */
export const getEventsByCategory = (category: SportCategory): SportEvent[] => {
    return allEvents2026.filter(event => event.sport === category);
};

/**
 * Get events by month (1-12)
 */
export const getEventsByMonth = (month: number): SportEvent[] => {
    return allEvents2026.filter(event => {
        const eventMonth = event.startDate.getMonth() + 1; // getMonth() returns 0-11
        return eventMonth === month;
    });
};

/**
 * Get events by country
 */
export const getEventsByCountry = (country: string): SportEvent[] => {
    return allEvents2026.filter(event =>
        event.country.toLowerCase().includes(country.toLowerCase())
    );
};

/**
 * Get high demand events (HIGH travel demand or EXTREME/HIGH ticket demand)
 */
export const getHighDemandEvents = (): SportEvent[] => {
    return allEvents2026.filter(event =>
        event.travelDemand === TravelDemand.HIGH ||
        event.ticketDemand === TicketDemand.EXTREME ||
        event.ticketDemand === TicketDemand.HIGH
    );
};

/**
 * Search events by name, description, venue, or city
 */
export const searchEvents = (query: string): SportEvent[] => {
    const lowerQuery = query.toLowerCase();
    return allEvents2026.filter(event =>
        event.name.toLowerCase().includes(lowerQuery) ||
        event.description.toLowerCase().includes(lowerQuery) ||
        event.venue.toLowerCase().includes(lowerQuery) ||
        event.city?.toLowerCase().includes(lowerQuery) ||
        event.country.toLowerCase().includes(lowerQuery) ||
        event.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
    );
};

/**
 * Get events by date range
 */
export const getEventsByDateRange = (startDate: Date, endDate: Date): SportEvent[] => {
    return allEvents2026.filter(event =>
        event.startDate >= startDate && event.endDate <= endDate
    );
};

/**
 * Get upcoming events (from current date)
 */
export const getUpcomingEvents = (limit?: number): SportEvent[] => {
    const now = new Date();
    const upcoming = allEvents2026
        .filter(event => event.startDate >= now)
        .sort((a, b) => a.startDate.getTime() - b.startDate.getTime());

    return limit ? upcoming.slice(0, limit) : upcoming;
};

/**
 * Get events by subcategory (e.g., "F1", "Grand Slam", "UEFA")
 */
export const getEventsBySubCategory = (subCategory: string): SportEvent[] => {
    return allEvents2026.filter(event =>
        event.subCategory?.toLowerCase() === subCategory.toLowerCase()
    );
};

/**
 * Get featured/trending events (high demand + upcoming)
 */
export const getFeaturedEvents = (limit: number = 10): SportEvent[] => {
    const now = new Date();
    return allEvents2026
        .filter(event =>
            event.startDate >= now &&
            (event.travelDemand === TravelDemand.HIGH ||
                event.ticketDemand === TicketDemand.EXTREME)
        )
        .sort((a, b) => a.startDate.getTime() - b.startDate.getTime())
        .slice(0, limit);
};

/**
 * Get events by target audience
 */
export const getEventsByAudience = (audience: string): SportEvent[] => {
    return allEvents2026.filter(event =>
        event.targetAudience?.some(aud =>
            aud.toLowerCase().includes(audience.toLowerCase())
        )
    );
};

/**
 * Get event statistics
 */
export const getEventStats = () => {
    return {
        total: allEvents2026.length,
        byCategory: {
            motorsports: getEventsByCategory(SportCategory.MOTORSPORTS).length,
            tennis: getEventsByCategory(SportCategory.TENNIS).length,
            football: getEventsByCategory(SportCategory.FOOTBALL).length,
            cricket: getEventsByCategory(SportCategory.CRICKET).length,
            rugby: getEventsByCategory(SportCategory.RUGBY).length,
            basketball: getEventsByCategory(SportCategory.BASKETBALL).length,
            other: getEventsByCategory(SportCategory.OTHER).length,
        },
        highDemand: getHighDemandEvents().length,
        countries: [...new Set(allEvents2026.map(e => e.country))].length,
    };
};

// ============= EXPORTS =============
export {
    motorsportsEvents,
    tennisEvents,
    footballEvents,
    cricketEvents,
    rugbyEvents,
    basketballEvents,
    otherSportsEvents
};

// Re-export types for convenience
export { SportCategory, TravelDemand, TicketDemand } from '@/types/events';
export type { SportEvent } from '@/types/events';

export * from './motorsports-data';
export * from './tennis-data';
export * from './football-data';
export * from './cricket-data';
export * from './rugby-data';
export * from './basketball-data';
export * from './other-sports-data';
