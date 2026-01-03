'use client'

import React, { useState, useEffect, Suspense, useRef } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import AthleteSelection from '@/components/home/AthleteSelection'
import RecreationalEvents from '@/components/athlete/RecreationalEvents'
import EnquiryCTA from '@/components/shared/EnquiryCTA'

function AtheletesContent() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const typeParam = searchParams.get('type')
    const [activeTab, setActiveTab] = useState<'professional' | 'recreational'>('professional');
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (typeParam === 'recreational' || typeParam === 'professional') {
            setActiveTab(typeParam)
        }
    }, [typeParam])

    const handleTypeSelect = (type: 'professional' | 'recreational') => {
        if (type === 'professional') {
            // Redirect to the dedicated professional page
            router.push('/athlete/professional');
        } else {
            setActiveTab(type);
            setTimeout(() => {
                contentRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
        }
    };

    return (
        <div className="min-h-screen bg-black">
            <AthleteSelection
                activeType={activeTab}
                variant="static"
                showLabels={true}
                onTypeSelect={handleTypeSelect}
            />

            <div
                ref={contentRef}
                className="mb-0 mt-24 md:mt-12 relative z-0 pointer-events-auto scroll-mt-32"
            >
                <RecreationalEvents />
            </div>

            <EnquiryCTA
                title="Train like a pro, play like a legend."
                description="Exclusive training camps and recreational tournaments tailored for you."
                link="/enquiry/athlete-recreational"
                buttonLabel="Enquire Now"
            />
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
