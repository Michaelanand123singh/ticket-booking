import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { z } from 'zod';

const eventSchema = z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string().min(1, "Description is required"),
    imageUrl: z.string().min(1, "Image URL is required"), // Mandatory as requested
    time: z.string().min(1, "Time is required"),
    sportId: z.string().min(1, "Sport is required"),
});

export async function GET() {
    try {
        const events = await prisma.event.findMany({
            include: { sport: true },
            orderBy: { createdAt: 'desc' },
        });
        return NextResponse.json(events);
    } catch (error) {
        console.error('Error fetching events:', error);
        return NextResponse.json({ error: 'Failed to fetch events', details: error instanceof Error ? error.message : String(error) }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const result = eventSchema.safeParse(body);

        if (!result.success) {
            return NextResponse.json({ error: result.error.issues }, { status: 400 });
        }

        const { name, description, imageUrl, time, sportId } = result.data;

        // Verify sport exists
        const sportExists = await prisma.sport.findUnique({
            where: { id: sportId }
        });

        if (!sportExists) {
            return NextResponse.json({ error: 'Selected sport does not exist' }, { status: 400 });
        }

        const event = await prisma.event.create({
            data: {
                name,
                description,
                imageUrl,
                time,
                sportId,
            },
            include: { sport: true }
        });

        return NextResponse.json(event, { status: 201 });
    } catch (error) {
        console.error('Error creating event:', error);
        return NextResponse.json({ error: 'Failed to create event', details: error instanceof Error ? error.message : String(error) }, { status: 500 });
    }
}
