import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { z } from 'zod';

const sportSchema = z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string().min(1, "Description is required"),
    imageUrl: z.string().optional(),
});

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json();
        const result = sportSchema.safeParse(body);

        if (!result.success) {
            return NextResponse.json({ error: result.error.issues }, { status: 400 });
        }

        const { name, description, imageUrl } = result.data;

        // Check if another sport with the same name exists (excluding current one)
        const existingSport = await prisma.sport.findFirst({
            where: {
                name,
                id: { not: id }
            }
        });

        if (existingSport) {
            return NextResponse.json({ error: 'Sport with this name already exists' }, { status: 409 });
        }

        const sport = await prisma.sport.update({
            where: { id },
            data: {
                name,
                description,
                imageUrl,
            },
        });

        return NextResponse.json(sport);
    } catch (error) {
        console.error('Error updating sport:', error);
        return NextResponse.json({ error: 'Failed to update sport' }, { status: 500 });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        await prisma.sport.delete({
            where: { id },
        });
        return NextResponse.json({ message: 'Sport deleted' });
    } catch (error) {
        console.error('Error deleting sport:', error);
        return NextResponse.json({ error: 'Failed to delete sport' }, { status: 500 });
    }
}
