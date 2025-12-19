import AthleteSelection from '@/components/home/AthleteSelection'
import RecreationalEvents from '@/components/atheletes/RecreationalEvents'

export default function ReacreationalPage() {
    return (
        <div className="min-h-screen bg-black">
            <AthleteSelection activeType="recreational" variant="static" />
            <div className="h-24"></div> {/* Spacer for separation */}
            <RecreationalEvents />
        </div>
    )
}