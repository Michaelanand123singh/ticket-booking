'use client'

import React, { useRef, useEffect, useState } from 'react'
import { X } from 'lucide-react'

interface SignUpDropdownProps {
    isOpen: boolean
    onClose: () => void
}

export default function SignUpDropdown({ isOpen, onClose }: SignUpDropdownProps) {
    const dropdownRef = useRef<HTMLDivElement>(null)
    const [isLoginView, setIsLoginView] = useState(false)

    // Reset view when closed
    useEffect(() => {
        if (!isOpen) {
            // Small delay to reset after animation or immediate
            setIsLoginView(false)
        }
    }, [isOpen])

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                onClose()
            }
        }

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside)
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [isOpen, onClose])

    if (!isOpen) return null

    return (
        <div
            ref={dropdownRef}
            className="absolute top-full right-0 mt-4 w-[90vw] max-w-[340px] md:max-w-none md:w-[24rem] bg-black border border-white/10 rounded-xl p-8 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200 z-50"
        >
            {/* Close Button */}
            <button
                onClick={onClose}
                className="absolute top-4 right-4 text-white hover:text-[#D4AF37] hover:border-[#D4AF37] border border-white/20 rounded-full p-1 transition-colors cursor-pointer"
            >
                <X size={16} strokeWidth={1.5} />
            </button>

            {/* Heading */}
            <h2 className="text-2xl text-[#D4AF37] font-normal text-center mb-8 mt-2">
                {isLoginView ? 'Login' : 'Create you account'}
            </h2>

            {/* Form */}
            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                {/* Email Input */}
                <div className="relative group">
                    <input
                        type="email"
                        id="email-dropdown"
                        className="block w-full px-4 py-2.5 text-white bg-transparent border border-white/20 rounded-lg appearance-none focus:outline-none focus:ring-0 focus:border-[#D4AF37] peer text-sm"
                        placeholder=" "
                    />
                    <label
                        htmlFor="email-dropdown"
                        className="absolute text-sm text-gray-400 duration-300 transform -translate-y-4 scale-90 top-0 z-10 origin-[0] bg-black px-2 peer-focus:px-2 peer-focus:text-[#D4AF37] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-0 peer-focus:scale-90 peer-focus:-translate-y-4 left-3"
                    >
                        Email
                    </label>
                </div>

                {/* Password Input */}
                <div className="relative group">
                    <input
                        type="password"
                        id="password-dropdown"
                        className="block w-full px-4 py-2.5 text-white bg-transparent border border-white/20 rounded-lg appearance-none focus:outline-none focus:ring-0 focus:border-[#D4AF37] peer text-sm"
                        placeholder=" "
                    />
                    <label
                        htmlFor="password-dropdown"
                        className="absolute text-sm text-gray-400 duration-300 transform -translate-y-4 scale-90 top-0 z-10 origin-[0] bg-black px-2 peer-focus:px-2 peer-focus:text-[#D4AF37] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-0 peer-focus:scale-90 peer-focus:-translate-y-4 left-3"
                    >
                        Password
                    </label>
                </div>

                {/* Confirm Password Input (Only for Sign Up) */}
                {!isLoginView && (
                    <div className="relative group">
                        <input
                            type="password"
                            id="confirm-password-dropdown"
                            className="block w-full px-4 py-2.5 text-white bg-transparent border border-white/20 rounded-lg appearance-none focus:outline-none focus:ring-0 focus:border-[#D4AF37] peer text-sm"
                            placeholder=" "
                        />
                        <label
                            htmlFor="confirm-password-dropdown"
                            className="absolute text-sm text-gray-400 duration-300 transform -translate-y-4 scale-90 top-0 z-10 origin-[0] bg-black px-2 peer-focus:px-2 peer-focus:text-[#D4AF37] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-0 peer-focus:scale-90 peer-focus:-translate-y-4 left-3"
                        >
                            Confirm Password
                        </label>
                    </div>
                )}

                {/* Action Button */}
                <button
                    className="w-full bg-white text-black font-medium py-2.5 rounded-lg hover:bg-gray-100 transition-colors text-base mt-6 cursor-pointer"
                >
                    {isLoginView ? 'Login' : 'Sign up'}
                </button>

                {/* Footer */}
                <p className="text-center text-gray-400 text-xs mt-4">
                    {isLoginView ? "Don't have an account? " : "Already have an account? "}
                    <button
                        type="button"
                        onClick={() => setIsLoginView(!isLoginView)}
                        className="text-[#D4AF37] hover:underline cursor-pointer"
                    >
                        {isLoginView ? 'Create One' : 'Login'}
                    </button>
                </p>
            </form>
        </div>
    )
}
