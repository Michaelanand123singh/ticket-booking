import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { z } from 'zod';

const eventSchema = z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string().min(1, "Description is required"),
    imageUrl: z.string().min(1, "Image URL is required"),
    time: z.string().min(1, "Time is required"),
    sportId: z.string().min(1, "Sport is required"),
});

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const event = await prisma.event.findUnique({
            where: { id },
            include: { sport: true }
        });

        if (!event) {
            return NextResponse.json({ error: 'Event not found' }, { status: 404 });
        }

        return NextResponse.json(event);
    } catch (error) {
        console.error('Error fetching event:', error);
        return NextResponse.json({ error: 'Failed to fetch event' }, { status: 500 });
    }
}

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json();
        const result = eventSchema.safeParse(body);

        if (!result.success) {
            return NextResponse.json({ error: result.error.issues }, { status: 400 });
        }

        const { name, description, imageUrl, time, sportId } = result.data;

        // Verify sport exists
        if (sportId) {
            const sportExists = await prisma.sport.findUnique({
                where: { id: sportId }
            });
            if (!sportExists) {
                return NextResponse.json({ error: 'Selected sport does not exist' }, { status: 400 });
            }
        }

        const event = await prisma.event.update({
            where: { id },
            data: {
                name,
                description,
                imageUrl,
                time,
                sportId,
            },
            include: { sport: true }
        });

        return NextResponse.json(event);
    } catch (error) {
        console.error('Error updating event:', error);
        return NextResponse.json({ error: 'Failed to update event' }, { status: 500 });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        await prisma.event.delete({
            where: { id },
        });

        return NextResponse.json({ message: 'Event deleted successfully' });
    } catch (error) {
        console.error('Error deleting event:', error);
        return NextResponse.json({ error: 'Failed to delete event' }, { status: 500 });
    }
}
