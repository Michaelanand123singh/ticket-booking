import React from 'react'

export default function ContactSection() {
    return (
        <section className="py-16 bg-background text-foreground relative overflow-hidden">
            {/* Background decoration to enhance glassmorphism effect */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
            </div>

            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                    {/* Left Side: Text */}
                    <div className="text-left md:pr-12 pt-2">
                        <h2 className="text-xl sm:text-3xl font-normal mb-6 text-white">Contact Us</h2>
                        <p className="text-sm text-white mb-8">
                            Have questions about our events or services? We're here to help!
                            Reach out to our team and we'll get back to you as soon as possible.
                        </p>
                        <p className="text-sm text-white mb-2">
                            Email: support@sportsevents.com
                        </p>
                        <p className="text-sm text-white">
                            Phone: +1 (555) 123-4567
                        </p>

                    </div>

                    {/* Right Side: Form */}
                    <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-8 shadow-lg">
                        <form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label htmlFor="name" className="block text-sm font-normal text-white">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        className="w-full px-3 py-1.5 bg-white/50 border border-gray-200 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="email" className="block text-sm font-normal text-white">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        className="w-full px-3 py-1.5 bg-white/50 border border-gray-200 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="john@example.com"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label htmlFor="phone" className="block text-sm font-normal text-white">
                                        Phone
                                    </label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        className="w-full px-3 py-1.5 bg-white/50 border border-gray-200 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="+1 (555) 000-0000"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="subject" className="block text-sm font-normal text-white">
                                    Subject
                                </label>
                                <textarea
                                    id="subject"
                                    rows={4}
                                    className="w-full px-3 py-1.5 bg-white/50 border border-gray-200 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="How can we help you?"
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className="w-full md:w-auto px-8 py-2 bg-background border border-foreground/20 hover:bg-background/80 text-foreground font-normal rounded-sm transition-colors"
                            >
                                Send
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}
