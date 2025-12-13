'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
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
      (isScrolled || mobileMenuOpen) ? "bg-black/20 backdrop-blur-md border-b border-white/10 shadow-lg" : "bg-transparent"
    )}>
      <div className="container mx-auto px-4 min-[425px]:px-12 py-2">

        <div className="flex items-center justify-between gap-6">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/logo.png"
              alt="Viagosport Logo"
              width={280}
              height={120}
              className="h-20 w-auto object-contain -mt-2 -mb-4"
              priority
            />
          </Link>

          <div className="flex items-center justify-end gap-6 flex-1">
            {/* Desktop Navigation */}
            <div className="hidden md:flex">
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuLink asChild className={cn(
                      navigationMenuTriggerStyle(),
                      "!bg-transparent hover:!bg-transparent focus:!bg-transparent data-[active]:!bg-transparent data-[state=open]:!bg-transparent",
                      "text-white hover:text-white/80 focus:text-white data-[state=open]:text-white data-[active]:text-white"
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
                        "text-white hover:text-white/80 focus:text-white data-[state=open]:text-white data-[active]:text-white"
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
      {mobileMenuOpen && (
        <div className="md:hidden w-full border-t border-white/10 bg-black/10 backdrop-blur-xl h-[calc(100vh-5rem)] overflow-y-auto">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              <Link
                href="/"
                className="font-semibold text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              {navItems.map((section) => (
                <div key={section.title} className="flex flex-col space-y-2">
                  <span className="font-semibold text-white">{section.title}</span>
                  {section.items.map((item) => (
                    <Link
                      key={item.title}
                      href={item.href}
                      className="text-gray-300 pl-4"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
              ))}
            </nav>
          </div>
        </div>
      )}
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

