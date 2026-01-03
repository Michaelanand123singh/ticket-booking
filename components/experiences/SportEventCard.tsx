interface SportEventCardProps {
    title: string
    date: { day: string, month: string }
    location: string
    description: string
    image: string
}

export default function SportEventCard({ title, date, location, description, image }: SportEventCardProps) {
    return (
        <div className="bg-[#11212D] rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 group">
            {/* Image Section */}
            <div className="relative h-48 overflow-hidden">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
            </div>

            {/* Content Section */}
            <div className="p-5 flex gap-4">
                {/* Date Badge */}
                <div className="flex-shrink-0 flex flex-col items-center justify-center w-12 h-14 border border-teal-500 rounded text-teal-600 bg-teal-50">
                    <span className="text-[10px] font-bold uppercase bg-teal-500 text-white w-full text-center py-0.5">{date.month}</span>
                    <span className="text-lg font-bold leading-none mt-1">{date.day}</span>
                </div>

                {/* Text Content */}
                <div className="flex-grow">
                    <h3 className="text-white font-semibold text-base mb-1">{title}</h3>
                    <p className="text-gray-400 text-xs mb-2 line-clamp-3">
                        {description}
                    </p>
                </div>
            </div>
        </div>
    )
}
