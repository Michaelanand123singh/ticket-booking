import Image from 'next/image'

export default function Hero() {
    return (
        <div className="relative h-screen w-full">
            <Image
                src="/freepik__35mm-film-photography-legend-player-emerging-from-__53997 1.jpg"
                alt="Hero Background"
                fill
                className="object-cover"
                priority
            />
            <div className="absolute inset-0 bg-black/20" /> {/* Optional overlay for better text contrast if needed later */}
            <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-background via-background/60 to-transparent z-20" />
            <div className="w-full relative z-10 flex h-full flex-col justify-center items-end max-[375px]:items-center px-6 md:px-12 text-white">
                <div className="w-auto text-left max-[375px]:text-center">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-light leading-tight tracking-wide">
                        YOUR NEXT <br />
                        SPORTS <br />
                        <span className="font-extrabold text-blue-600">ADVENTURE</span> <br />
                        STARTS <br />
                        HERE
                    </h1>
                </div>
            </div>
        </div>
    )
}
