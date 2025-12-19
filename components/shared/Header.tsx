'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useAuthStore } from '@/store/authStore'
import { FiMenu, FiX } from 'react-icons/fi'
import { cn } from "@/lib/utils"


export default function Header() {
  const pathname = usePathname()
  const { user, isAuthenticated: storeAuth, logout } = useAuthStore()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [hasMounted, setHasMounted] = useState(false)

  // Avoid hydration mismatch by only using the store auth state after mount
  const isAuthenticated = hasMounted ? storeAuth : false

  useEffect(() => {
    setHasMounted(true)
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLogout = () => {
    logout()
    window.location.href = '/'
  }

  return (
    <header className={cn(
      "fixed top-0 w-full z-50 transition-all duration-300",
      (isScrolled || mobileMenuOpen) ? "bg-black/90 backdrop-blur-md border-b border-white/10 shadow-lg" : "bg-transparent"
    )}>
      <div className="container mx-auto px-4 min-[425px]:px-12 py-2">

        <div className="flex items-center justify-between gap-6">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/images/logo.png"
              alt="Viagosport Logo"
              width={280}
              height={120}
              className="h-20 w-auto object-contain -mt-2 -mb-4"
              priority
            />
          </Link>

          <div className="flex items-center justify-end gap-6 flex-1">
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {/* Experiences Dropdown */}
              <div className="group relative h-full flex items-center">
                <Link
                  href="/experiences"
                  className="text-white hover:text-white/80 font-normal text-sm transition-colors py-4 inline-block"
                >
                  Experiences
                </Link>

                {/* Dropdown Menu */}
                <div className="absolute top-full left-0 pt-2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-left z-50">
                  <div className="bg-black/95 backdrop-blur-md border border-white/10 rounded-lg shadow-xl overflow-hidden flex flex-col py-2">
                    <Link href="/experiences/football" className="px-4 py-2 text-sm text-gray-300 hover:text-[#D4AF37] hover:bg-white/5 transition-colors">
                      Football
                    </Link>
                    <Link href="/experiences/cricket" className="px-4 py-2 text-sm text-gray-300 hover:text-[#D4AF37] hover:bg-white/5 transition-colors">
                      Cricket
                    </Link>
                    <Link href="/experiences/tennis" className="px-4 py-2 text-sm text-gray-300 hover:text-[#D4AF37] hover:bg-white/5 transition-colors">
                      Tennis
                    </Link>
                    <Link href="/experiences/basketball" className="px-4 py-2 text-sm text-gray-300 hover:text-[#D4AF37] hover:bg-white/5 transition-colors">
                      Basketball
                    </Link>
                    <Link href="/experiences/rugby" className="px-4 py-2 text-sm text-gray-300 hover:text-[#D4AF37] hover:bg-white/5 transition-colors">
                      Rugby
                    </Link>
                  </div>
                </div>
              </div>
              {/* Athlete Dropdown */}
              <div className="group relative h-full flex items-center">
                <Link
                  href="/athlete"
                  className="text-white hover:text-white/80 font-normal text-sm transition-colors py-4 inline-block"
                >
                  Athlete
                </Link>

                {/* Dropdown Menu */}
                <div className="absolute top-full left-0 pt-2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-left z-50">
                  <div className="bg-black/95 backdrop-blur-md border border-white/10 rounded-lg shadow-xl overflow-hidden flex flex-col py-2">
                    <Link href="/atheletes/professional" className="px-4 py-2 text-sm text-gray-300 hover:text-[#D4AF37] hover:bg-white/5 transition-colors">
                      Professional
                    </Link>
                    <Link href="/atheletes/recreational" className="px-4 py-2 text-sm text-gray-300 hover:text-[#D4AF37] hover:bg-white/5 transition-colors">
                      Recreational
                    </Link>
                  </div>
                </div>
              </div>
              <Link
                href="/events"
                className="text-white hover:text-white/80 font-normal text-sm transition-colors"
              >
                Event Organiser
              </Link>
              <Link
                href="/news"
                className="text-white hover:text-white/80 font-normal text-sm transition-colors"
              >
                News & blogs
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className={cn(
                "md:hidden",
                "text-white"
              )}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>

      </div>

      {/* Mobile Menu */}
      {
        mobileMenuOpen && (
          <div className="md:hidden w-full border-t border-white/10 bg-black/95 backdrop-blur-xl h-[calc(100vh-5rem)] overflow-y-auto">
            <div className="container mx-auto px-4 py-4">
              <nav className="flex flex-col space-y-6 mt-4">
                <Link
                  href="/"
                  className="text-lg font-semibold text-white"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <div className="flex flex-col gap-4">
                  <Link
                    href="/experiences"
                    className="text-lg font-semibold text-white"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Experiences
                  </Link>
                  <div className="flex flex-col pl-4 gap-3 border-l border-white/20 ml-2">
                    <Link
                      href="/experiences/football"
                      className="text-sm text-gray-300 hover:text-[#D4AF37]"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Football
                    </Link>
                    <Link
                      href="/experiences/cricket"
                      className="text-sm text-gray-300 hover:text-[#D4AF37]"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Cricket
                    </Link>
                    <Link
                      href="/experiences/tennis"
                      className="text-sm text-gray-300 hover:text-[#D4AF37]"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Tennis
                    </Link>
                    <Link
                      href="/experiences/basketball"
                      className="text-sm text-gray-300 hover:text-[#D4AF37]"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Basketball
                    </Link>
                    <Link
                      href="/experiences/rugby"
                      className="text-sm text-gray-300 hover:text-[#D4AF37]"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Rugby
                    </Link>
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <Link
                    href="/athlete"
                    className="text-lg font-semibold text-white"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Athlete
                  </Link>
                  <div className="flex flex-col pl-4 gap-3 border-l border-white/20 ml-2">
                    <Link
                      href="/atheletes/professional"
                      className="text-sm text-gray-300 hover:text-[#D4AF37]"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Professional
                    </Link>
                    <Link
                      href="/atheletes/recreational"
                      className="text-sm text-gray-300 hover:text-[#D4AF37]"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Recreational
                    </Link>
                  </div>
                </div>
                <Link
                  href="/events"
                  className="text-lg font-semibold text-white"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Event Organisers
                </Link>
                <Link
                  href="/news"
                  className="text-lg font-semibold text-white"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  News
                </Link>
              </nav>
            </div>
          </div>
        )
      }
    </header >
  )
}



