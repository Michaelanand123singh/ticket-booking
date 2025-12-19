import AthleteSelection from '@/components/home/AthleteSelection'
import SportsCarousel from '@/components/atheletes/SportsCarousel'

export default function AtheletePage() {
    return (
        <div className="min-h-screen bg-black">
            <AthleteSelection activeType="professional" variant="static" />
            <div className="mt-12 relative z-10 pointer-events-auto">
                <SportsCarousel hideHeading={true} />
            </div>
        </div>
    )
}
