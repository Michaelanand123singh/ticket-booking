'use client'

import React from 'react'
import { cn } from "@/lib/utils"

export default function ExperienceEnquiryForm() {
    const [formData, setFormData] = React.useState({
        departureCity: "",
        adults: "",
        kids: "",
        specialRequest: "",
        name: "",
        email: "",
        phone: ""
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    return (
        <section className="py-0 relative">
            <div className="container mx-auto px-12 md:px-16">
                <div className="mb-8">
                    <h2 className="text-2xl sm:text-4xl font-normal text-white flex items-center gap-4 mb-4">
                        Experience enquiry form
                    </h2>
                    <p className="text-lg md:text-xl text-white font-normal mb-2">
                        The event you envision. The execution we deliver.
                    </p>
                    <p className="text-gray-400 text-sm">
                        You pick the event. We handle the magic—seats, travel, moments that matter.
                    </p>
                </div>

                <form className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">

                    {/* Who's joining the experience? */}
                    <div className="space-y-4">
                        <label className="text-xl text-white font-normal block mb-6">Who's joining the experience?</label>
                        <div className="space-y-3">
                            <label className="flex items-center gap-3 cursor-pointer group">
                                <input type="checkbox" className="w-5 h-5 rounded border-gray-600 bg-transparent text-[#D4AF37] accent-[#D4AF37] focus:ring-[#D4AF37] focus:ring-offset-black cursor-pointer" />
                                <span className="text-gray-300 group-hover:text-white transition-colors">Just me</span>
                            </label>
                            <label className="flex items-center gap-3 cursor-pointer group">
                                <input type="checkbox" className="w-5 h-5 rounded border-gray-600 bg-transparent text-[#D4AF37] accent-[#D4AF37] focus:ring-[#D4AF37] focus:ring-offset-black cursor-pointer" />
                                <span className="text-gray-300 group-hover:text-white transition-colors">Couple</span>
                            </label>
                            <label className="flex items-center gap-3 cursor-pointer group">
                                <input type="checkbox" className="w-5 h-5 rounded border-gray-600 bg-transparent text-[#D4AF37] accent-[#D4AF37] focus:ring-[#D4AF37] focus:ring-offset-black cursor-pointer" />
                                <span className="text-gray-300 group-hover:text-white transition-colors">Family</span>
                            </label>
                            <label className="flex items-center gap-3 cursor-pointer group">
                                <input type="checkbox" className="w-5 h-5 rounded border-gray-600 bg-transparent text-[#D4AF37] accent-[#D4AF37] focus:ring-[#D4AF37] focus:ring-offset-black cursor-pointer" />
                                <span className="text-gray-300 group-hover:text-white transition-colors">Friends / Team</span>
                            </label>
                        </div>
                    </div>

                    {/* Your departure city */}
                    <div className="space-y-4">
                        <label className="text-xl text-white font-normal block mb-6">Your departure city</label>
                        <input
                            type="text"
                            name="departureCity"
                            value={formData.departureCity}
                            onChange={handleChange}
                            placeholder="City and country"
                            className="w-full bg-transparent border-b border-gray-600 pb-2 text-white placeholder:text-gray-400 focus:outline-none focus:border-white text-sm"
                        />
                    </div>

                    {/* Your vibe? */}
                    <div className="space-y-4">
                        <label className="text-xl text-white font-normal block mb-6">Your vibe?</label>
                        <div className="space-y-4">
                            <label className="flex items-start gap-3 cursor-pointer group">
                                <input type="checkbox" className="w-5 h-5 rounded border-gray-600 bg-transparent text-[#D4AF37] accent-[#D4AF37] focus:ring-[#D4AF37] focus:ring-offset-black mt-1 cursor-pointer" />
                                <span className="text-gray-300 group-hover:text-white transition-colors text-sm">Smart & Great Value – great seats, no fuss</span>
                            </label>
                            <label className="flex items-start gap-3 cursor-pointer group">
                                <input type="checkbox" className="w-5 h-5 rounded border-gray-600 bg-transparent text-[#D4AF37] accent-[#D4AF37] focus:ring-[#D4AF37] focus:ring-offset-black mt-1 cursor-pointer" />
                                <span className="text-gray-300 group-hover:text-white transition-colors text-sm">Premium – comfort, access, extras that feel special</span>
                            </label>
                            <label className="flex items-start gap-3 cursor-pointer group">
                                <input type="checkbox" className="w-5 h-5 rounded border-gray-600 bg-transparent text-[#D4AF37] accent-[#D4AF37] focus:ring-[#D4AF37] focus:ring-offset-black mt-1 cursor-pointer" />
                                <span className="text-gray-300 group-hover:text-white transition-colors text-sm">VIP – hospitality, exclusive access, top-tier everything</span>
                            </label>
                        </div>
                    </div>

                    {/* Total travellers? */}
                    <div className="space-y-4">
                        <label className="text-xl text-white font-normal block mb-6">Total travellers?</label>
                        <div className="space-y-6">
                            <div className="flex items-center gap-4">
                                <span className="text-gray-300 text-sm w-20">Adults</span>
                                <input
                                    type="text"
                                    name="adults"
                                    value={formData.adults}
                                    onChange={handleChange}
                                    className="w-16 bg-transparent border-b border-gray-600 text-white text-center focus:outline-none focus:border-white"
                                />
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="text-gray-300 text-sm w-20">Kids (if any)</span>
                                <input
                                    type="text"
                                    name="kids"
                                    value={formData.kids}
                                    onChange={handleChange}
                                    className="w-16 bg-transparent border-b border-gray-600 text-white text-center focus:outline-none focus:border-white"
                                />
                            </div>
                        </div>
                    </div>

                    {/* What matters the most? */}
                    <div className="space-y-4">
                        <div className="flex items-baseline gap-2 mb-6">
                            <label className="text-xl text-white font-normal">What matters the most?</label>
                            <span className="text-xs text-gray-500">(Pick up to three)</span>
                        </div>
                        <div className="space-y-3">
                            <label className="flex items-center gap-3 cursor-pointer group">
                                <input type="checkbox" className="w-5 h-5 rounded border-gray-600 bg-transparent text-[#D4AF37] accent-[#D4AF37] focus:ring-[#D4AF37] focus:ring-offset-black cursor-pointer" />
                                <span className="text-gray-300 group-hover:text-white transition-colors text-sm">Best seats in the house</span>
                            </label>
                            <label className="flex items-center gap-3 cursor-pointer group">
                                <input type="checkbox" className="w-5 h-5 rounded border-gray-600 bg-transparent text-[#D4AF37] accent-[#D4AF37] focus:ring-[#D4AF37] focus:ring-offset-black cursor-pointer" />
                                <span className="text-gray-300 group-hover:text-white transition-colors text-sm">Stress-free, handled-for-you travel</span>
                            </label>
                            <label className="flex items-center gap-3 cursor-pointer group">
                                <input type="checkbox" className="w-5 h-5 rounded border-gray-600 bg-transparent text-[#D4AF37] accent-[#D4AF37] focus:ring-[#D4AF37] focus:ring-offset-black cursor-pointer" />
                                <span className="text-gray-300 group-hover:text-white transition-colors text-sm">Epic Hotel + location</span>
                            </label>
                            <label className="flex items-center gap-3 cursor-pointer group">
                                <input type="checkbox" className="w-5 h-5 rounded border-gray-600 bg-transparent text-[#D4AF37] accent-[#D4AF37] focus:ring-[#D4AF37] focus:ring-offset-black cursor-pointer" />
                                <span className="text-gray-300 group-hover:text-white transition-colors text-sm">Local experience & culture</span>
                            </label>
                            <label className="flex items-center gap-3 cursor-pointer group">
                                <input type="checkbox" className="w-5 h-5 rounded border-gray-600 bg-transparent text-[#D4AF37] accent-[#D4AF37] focus:ring-[#D4AF37] focus:ring-offset-black cursor-pointer" />
                                <span className="text-gray-300 group-hover:text-white transition-colors text-sm">Making it a celebration day</span>
                            </label>
                        </div>
                    </div>

                    {/* Any special request? */}
                    <div className="space-y-4">
                        <label className="text-xl text-white font-normal block mb-6">Any special request?</label>
                        <textarea
                            name="specialRequest"
                            value={formData.specialRequest}
                            onChange={handleChange}
                            className="w-full bg-transparent border border-gray-600 rounded-lg p-4 text-white placeholder:text-gray-600 text-sm focus:border-white focus:ring-0 min-h-[140px]"
                            placeholder="e.g., celebration, family trip, first big match, accessibility needs"
                        ></textarea>
                    </div>

                    {/* How we reach you? */}
                    <div className="space-y-4 md:col-span-2 w-full mt-8">
                        <label className="text-xl text-white font-normal block mb-6">How we reach you?</label>
                        <div className="space-y-6 max-w-md">
                            <div>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Name"
                                    className="w-full bg-transparent border-b border-gray-600 pb-2 text-white placeholder:text-gray-400 focus:outline-none focus:border-white text-sm"
                                />
                            </div>
                            <div>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Email"
                                    className="w-full bg-transparent border-b border-gray-600 pb-2 text-white placeholder:text-gray-400 focus:outline-none focus:border-white text-sm"
                                />
                            </div>
                            <div className="flex gap-4">
                                <div className="w-20">
                                    <input
                                        type="text"
                                        value="+91"
                                        readOnly
                                        className="w-full bg-transparent border-b border-gray-600 pb-2 text-white/50 focus:outline-none focus:border-white text-sm cursor-not-allowed"
                                    />
                                </div>
                                <div className="flex-1">
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="WhatsApp / phone"
                                        className="w-full bg-transparent border-b border-gray-600 pb-2 text-white placeholder:text-gray-400 focus:outline-none focus:border-white text-sm"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-center md:justify-end mt-12 w-full">
                            <button className="bg-[#D4AF37] text-black font-semibold px-8 py-3 rounded text-sm hover:bg-[#b5952f] transition-colors">
                                Create my experience
                            </button>
                        </div>

                        <div className="w-full flex justify-center mt-8">
                            <p className="text-center text-sm md:text-base text-gray-500 font-medium">
                                "We send you a custom plan with transparent pricing first. Zero booking pressure.<br />
                                You choose what feels right."
                            </p>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    )
}
