'use client'

import React, { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import AthleteSelection from '@/components/home/AthleteSelection'
import RecreationalEvents from '@/components/athlete/RecreationalEvents'
import ProfessionalEvents from '@/components/athlete/ProfessionalEvents'

function AtheletesContent() {
    const searchParams = useSearchParams()
    const typeParam = searchParams.get('type')
    const [activeTab, setActiveTab] = useState<'professional' | 'recreational'>('professional');

    useEffect(() => {
        if (typeParam === 'recreational' || typeParam === 'professional') {
            setActiveTab(typeParam)
        }
    }, [typeParam])

    return (
        <div className="min-h-screen bg-black">
            <AthleteSelection
                activeType={activeTab}
                variant="static"
                showLabels={true}
                onTypeSelect={setActiveTab}
            />

            <div className="mb-0 md:mb-56 mt-24 md:mt-12 relative z-0 pointer-events-auto">
                {activeTab === 'professional' ? (
                    <ProfessionalEvents />
                ) : (
                    <RecreationalEvents />
                )}
            </div>
        </div>
    )
}

export default function AtheletesPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-black" />}>
            <AtheletesContent />
        </Suspense>
    )
}
