import Image from "next/image";

export default function ExperiencesPage() {
    return (
        <main className="min-h-screen bg-black text-white">
            {/* HERO SECTION */}
            <section className="relative min-h-screen w-full overflow-hidden">
                {/* Background Image */}
                <Image
                    src="https://images.unsplash.com/photo-1709389882434-f81ca82a21fb?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Football Stadium"
                    fill
                    priority
                    className="object-cover"
                />

                {/* Overlays */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/70 to-black" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />

                {/* HERO CONTENT */}
                <div className="relative z-10 flex min-h-screen items-center px-10 md:px-20">
                    <div className="max-w-2xl">
                        <p className="mb-2 text-xs uppercase tracking-widest text-gray-300">
                            More about football section
                        </p>



                        <p className="text-sm text-gray-300 leading-relaxed">

                            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                            when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                            It has survived not only five centuries, but also the leap into electronic typesetting, remaining
                            essentially unchanged. It was popularised in the 1960s with the release of Letraset
                            sheets containing Lorem Ipsum passages, and more recently with desktop publishing software
                            like Aldus PageMaker including versions of Lorem Ipsu
                        </p>
                    </div>
                </div>
            </section>

            {/* SEARCH + TRENDING SECTION */}
            <section className="relative z-20 -mt-32 px-10 md:px-20 pb-24">
                {/* Search Bar */}
                <div className="mb-10 max-w-md">
                    <input
                        type="text"
                        placeholder="Search event"
                        className="w-full rounded-md bg-gray-800/80 px-4 py-3 text-sm text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-yellow-400"
                    />
                </div>

                {/* Title */}
                <h3 className="mb-6 text-lg font-semibold">
                    Trending tournaments
                </h3>

                {/* Tournament Card */}
                <div className="relative h-[420px] w-full overflow-hidden ">
                    <Image
                        src="https://images.unsplash.com/photo-1726070740693-24c287349c62?q=80&w=1280&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="Football Match"
                        fill
                        className="object-cover"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                    {/* Card Content */}


                </div>
            </section>
        </main>
    );
}
