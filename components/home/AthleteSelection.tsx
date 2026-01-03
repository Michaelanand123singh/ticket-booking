import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import AnimatedContent from './AnimatedContent'

interface AthleteSelectionProps {
    activeType?: 'professional' | 'recreational';
    variant?: 'default' | 'static';
    showLabels?: boolean;
    onTypeSelect?: (type: 'professional' | 'recreational') => void;
}

export default function AthleteSelection({ activeType, variant = 'default', showLabels = false, onTypeSelect }: AthleteSelectionProps) {
    const isProfessionalActive = activeType === 'professional';
    const isRecreationalActive = activeType === 'recreational';
    const isStatic = variant === 'static';
    const shouldShowLabels = variant === 'default' || showLabels;

    const CardContent = ({ type, isActive }: { type: 'professional' | 'recreational', isActive: boolean }) => (
        <>
            <div className={`relative w-full h-[150px] md:h-[500px] transition-all duration-1000 ease-out rounded-3xl ${isActive ? 'shadow-[0_0_150px_rgba(212,175,55,0.2)]' : (isStatic && !onTypeSelect ? '' : 'group-hover:shadow-[0_0_150px_rgba(212,175,55,0.2)]')}`}>
                {/* Card Background / Blur Effect */}
                <div className={`absolute -inset-8 bg-gradient-to-r from-[#D4AF37] to-[#AA8C2C] rounded-[3rem] blur-2xl transition duration-1000 ${isActive ? 'opacity-15' : (isStatic && !onTypeSelect ? 'opacity-0' : 'opacity-0 group-hover:opacity-15')}`}></div>

                <div className="relative w-full h-full overflow-hidden [mask-image:linear-gradient(to_bottom,black_80%,transparent_100%),radial-gradient(circle,black_60%,transparent_100%)] webkit-mask-image-radial">
                    {/* Using a radical gradient mask to blur the edges */}
                    <div className="w-full h-full [mask-image:radial-gradient(black_60%,transparent_100%)]">
                        <Image
                            src={type === 'professional'
                                ? "https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=1000&auto=format&fit=crop"
                                : "https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?auto=format&fit=crop&q=80&w=1000" // Marathon (Matches Home Page)
                            }
                            alt={`${type === 'professional' ? 'Professional' : 'Recreational'} Athlete`}
                            fill
                            className={`object-cover transition-all duration-1000 ${isActive ? 'grayscale-0' : (isStatic && !onTypeSelect ? 'grayscale' : 'grayscale group-hover:grayscale-0')}`}
                        />
                    </div>
                </div>
            </div>
            {shouldShowLabels && (
                <h3 className="text-[#D4AF37] text-lg sm:text-3xl font-normal mt-4 md:mt-6 tracking-wide text-center">
                    {type === 'professional' ? 'Professional' : 'Recreational'}
                </h3>
            )}
        </>
    );

    return (
        <section className={`${isStatic ? 'pt-36 pb-0' : 'py-16'} text-white relative overflow-hidden`}>
            <div className="container mx-auto px-4 min-[425px]:px-12 relative z-20">
                {/* Heading */}
                {!isStatic && (
                    <AnimatedContent
                        distance={100}
                        direction="vertical"
                        duration={1}
                        ease="power3.out"
                        delay={0.1}
                    >
                        <h2 className="text-2xl sm:text-4xl font-normal text-left flex items-center gap-4 mb-12">
                            Athlete
                            <div className="h-[4px] w-24 bg-[#D4AF37] mt-2"></div>
                        </h2>
                    </AnimatedContent>
                )}

                {/* Content */}
                <AnimatedContent
                    distance={100}
                    direction="vertical"
                    duration={1}
                    ease="power3.out"
                    delay={0.3}
                >
                    <div className="flex flex-row justify-center items-center md:items-start gap-4 md:gap-24 w-full">

                        {/* Professional */}
                        {onTypeSelect ? (
                            <div onClick={() => onTypeSelect('professional')} className="group cursor-pointer flex flex-col items-center flex-1 max-w-[45%] md:max-w-2xl">
                                <CardContent type="professional" isActive={isProfessionalActive} />
                            </div>
                        ) : (
                            isStatic ? (
                                <div className="flex flex-col items-center flex-1 max-w-[45%] md:max-w-2xl">
                                    <CardContent type="professional" isActive={isProfessionalActive} />
                                </div>
                            ) : (
                                <Link href="/athlete?type=professional" className="group cursor-pointer flex flex-col items-center flex-1 max-w-[45%] md:max-w-2xl">
                                    <CardContent type="professional" isActive={isProfessionalActive} />
                                </Link>
                            )
                        )}

                        {/* Recreational */}
                        {onTypeSelect ? (
                            <div onClick={() => onTypeSelect('recreational')} className="group cursor-pointer flex flex-col items-center flex-1 max-w-[45%] md:max-w-2xl">
                                <CardContent type="recreational" isActive={isRecreationalActive} />
                            </div>
                        ) : (
                            isStatic ? (
                                <div className="flex flex-col items-center flex-1 max-w-[45%] md:max-w-2xl pointer-events-none">
                                    <CardContent type="recreational" isActive={isRecreationalActive} />
                                </div>
                            ) : (
                                <Link href="/athlete?type=recreational" className="group cursor-pointer flex flex-col items-center flex-1 max-w-[45%] md:max-w-2xl">
                                    <CardContent type="recreational" isActive={isRecreationalActive} />
                                </Link>
                            )
                        )}

                    </div>
                </AnimatedContent>
            </div>
        </section>
    )
}
