import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { z } from 'zod';

const sportSchema = z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string().min(1, "Description is required"),
    imageUrl: z.string().optional(),
});

export async function GET() {
    try {
        const sports = await prisma.sport.findMany({
            orderBy: { createdAt: 'desc' },
        });
        return NextResponse.json(sports);
    } catch (error) {
        console.error('Error fetching sports:', error);
        return NextResponse.json({ error: 'Failed to fetch sports', details: error instanceof Error ? error.message : String(error) }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const result = sportSchema.safeParse(body);

        if (!result.success) {
            return NextResponse.json({ error: result.error.issues }, { status: 400 });
        }

        const { name, description, imageUrl } = result.data;

        // Check if sport with same name exists
        const existingSport = await prisma.sport.findUnique({
            where: { name },
        });

        if (existingSport) {
            return NextResponse.json({ error: 'Sport with this name already exists' }, { status: 409 });
        }

        const sport = await prisma.sport.create({
            data: {
                name,
                description,
                imageUrl,
            },
        });

        return NextResponse.json(sport, { status: 201 });
    } catch (error) {
        console.error('Error creating sport:', error);
        return NextResponse.json({ error: 'Failed to create sport', details: error instanceof Error ? error.message : String(error) }, { status: 500 });
    }
}
