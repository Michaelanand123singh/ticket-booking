export default async function SportPage({ params }: { params: Promise<{ sport: string }> }) {
    const { sport } = await params;

    return (
        <div className="min-h-screen flex items-center justify-center">
            <h1 className="text-2xl font-bold capitalize">{sport} Experience Page Coming Soon</h1>
        </div>
    )
}
