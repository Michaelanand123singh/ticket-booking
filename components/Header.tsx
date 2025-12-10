'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuthStore } from '@/store/authStore'
import { FiUser, FiLogOut, FiMenu, FiX } from 'react-icons/fi'
import { Trophy, Music, Calendar, Newspaper, Briefcase, FileText, Mic, Activity, Home } from 'lucide-react'
import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navbar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const navItems = [
  {
    title: "Sports",
    items: [
      { title: "Football", href: "/experiences/football", icon: Trophy, description: "Latest football matches and news." },
      { title: "Basketball", href: "/experiences/basketball", icon: Activity, description: "NBA and local basketball events." },
      { title: "Tennis", href: "/experiences/tennis", icon: Trophy, description: "Grand Slam and ATP tournaments." },
      { title: "Cricket", href: "/experiences/cricket", icon: Activity, description: "International and league cricket." },
      { title: "Rugby", href: "/experiences/rugby", icon: Activity, description: "Intensity and passion on the field." },
    ]
  },
  {
    title: "Events",
    items: [
      { title: "Concerts", href: "#", icon: Music, description: "Live music performances." },
      { title: "Festivals", href: "#", icon: Calendar, description: "Cultural and music festivals." },
      { title: "Workshops", href: "#", icon: Briefcase, description: "Skill-building sessions." },
      { title: "Conferences", href: "#", icon: Mic, description: "Professional gatherings." },
    ]
  },
  {
    title: "News",
    items: [
      { title: "Latest News", href: "#", icon: Newspaper, description: "Breaking sports and event news." },
      { title: "Press Releases", href: "#", icon: FileText, description: "Official announcements." },
      { title: "Blog", href: "#", icon: FileText, description: "Stories and articles." },
    ]
  }
]

export default function Header() {
  const pathname = usePathname()
  const { user, isAuthenticated, logout } = useAuthStore()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
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
      (isScrolled || mobileMenuOpen) ? "bg-white shadow-md" : "bg-transparent"
    )}>
      <div className="container mx-auto px-4 py-4">

        <div className="flex items-center justify-end gap-6">
          {/* Desktop Navigation */}
          <div className="hidden md:flex">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild className={cn(
                    navigationMenuTriggerStyle(),
                    "!bg-transparent hover:!bg-transparent focus:!bg-transparent data-[active]:!bg-transparent data-[state=open]:!bg-transparent",
                    (isScrolled || mobileMenuOpen)
                      ? "text-black hover:text-black focus:text-black"
                      : "text-white hover:text-white focus:text-white data-[state=open]:text-white data-[active]:text-white"
                  )}>
                    <Link href="/">
                      Home
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                {navItems.map((section) => (
                  <NavigationMenuItem key={section.title}>
                    <NavigationMenuTrigger className={cn(
                      "!bg-transparent hover:!bg-transparent focus:!bg-transparent data-[active]:!bg-transparent data-[state=open]:!bg-transparent",
                      (isScrolled || mobileMenuOpen)
                        ? "text-black hover:text-black focus:text-black"
                        : "text-white hover:text-white focus:text-white data-[state=open]:text-white data-[active]:text-white"
                    )}>
                      {section.title}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className="bg-white">
                      <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                        {section.items.map((item) => (
                          <ListItem
                            key={item.title}
                            title={item.title}
                            href={item.href}
                            icon={item.icon}
                          >
                            {item.description}
                          </ListItem>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <DropdownMenu modal={false}>
                <DropdownMenuTrigger className={cn(
                  "flex items-center space-x-2 transition-colors outline-none cursor-pointer",
                  (isScrolled || mobileMenuOpen) ? "text-black hover:text-indigo-600" : "text-white hover:text-white"
                )}>
                  <FiUser />
                  <span>{user?.name}</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-white text-black border-gray-200">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-gray-200" />
                  {user?.role === 'ADMIN' && (
                    <DropdownMenuItem asChild className="focus:bg-gray-100 focus:text-black">
                      <Link href="/admin" className="cursor-pointer text-black hover:text-black">
                        Admin Dashboard
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem asChild className="focus:bg-gray-100 focus:text-black">
                    <Link href="/dashboard" className="cursor-pointer text-black hover:text-black">
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="focus:bg-gray-100 focus:text-black">
                    <Link href="/dashboard/bookings" className="cursor-pointer text-black hover:text-black">
                      My Tickets
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-gray-200" />
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600 hover:text-red-700 focus:bg-gray-100 focus:text-red-600">
                    <FiLogOut className="mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className={cn(
                    "text-sm font-medium transition-colors",
                    (isScrolled || mobileMenuOpen) ? "text-black hover:text-black/70" : "text-white hover:text-white/80"
                  )}
                >
                  Login
                </Link>
                <Link
                  href="/auth/register"
                  className={cn(
                    "flex items-center justify-center h-9 px-4 rounded-full text-sm font-medium transition-all duration-300",
                    (isScrolled || mobileMenuOpen)
                      ? "text-black hover:bg-black hover:text-white"
                      : "bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 shadow-lg"
                  )}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className={cn(
              "md:hidden",
              (isScrolled || mobileMenuOpen) ? "text-gray-700" : "text-white"
            )}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t pt-4 h-[calc(100vh-5rem)] overflow-y-auto">
            <nav className="flex flex-col space-y-4">
              <Link
                href="/"
                className="font-semibold text-gray-900"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              {navItems.map((section) => (
                <div key={section.title} className="flex flex-col space-y-2">
                  <span className="font-semibold text-gray-900">{section.title}</span>
                  {section.items.map((item) => (
                    <Link
                      key={item.title}
                      href={item.href}
                      className="text-gray-700 pl-4"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
              ))}
              {isAuthenticated ? (
                <>
                  {user?.role === 'ADMIN' && (
                    <Link
                      href="/admin"
                      className="text-gray-700"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Admin
                    </Link>
                  )}
                  <Link
                    href="/dashboard/bookings"
                    className="text-gray-700"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    My Tickets
                  </Link>
                  <Link
                    href="/dashboard"
                    className="text-gray-700"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout()
                      setMobileMenuOpen(false)
                    }}
                    className="text-left text-gray-700"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="text-gray-700"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    href="/auth/register"
                    className="text-gray-700 font-semibold"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { icon: React.ElementType }
>(({ className, title, children, icon: Icon, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="flex items-center gap-2 text-sm font-medium leading-none text-black">
            <Icon className="h-4 w-4" />
            {title}
          </div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
