import Link from 'next/link'
import { FiFacebook, FiTwitter, FiInstagram, FiLinkedin } from 'react-icons/fi'

export default function Footer() {
  return (
    <footer className="bg-black text-white mt-auto border-t border-white/10">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4 text-[#D4AF37]">Viagosport</h3>
            <p className="text-gray-400">
              Your trusted platform for sports experiences and athlete management.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-[#D4AF37]">Experiences</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/experiences/football" className="hover:text-white transition-colors">
                  Football
                </Link>
              </li>
              <li>
                <Link href="/experiences/cricket" className="hover:text-white transition-colors">
                  Cricket
                </Link>
              </li>
              <li>
                <Link href="/experiences/tennis" className="hover:text-white transition-colors">
                  Tennis
                </Link>
              </li>
              <li>
                <Link href="/experiences/basketball" className="hover:text-white transition-colors">
                  Basketball
                </Link>
              </li>
              <li>
                <Link href="/experiences/rugby" className="hover:text-white transition-colors">
                  Rugby
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-[#D4AF37]">Athlete</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/athlete/professional" className="hover:text-white transition-colors">
                  Professional
                </Link>
              </li>
              <li>
                <Link href="/athlete/recreational" className="hover:text-white transition-colors">
                  Recreational
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-[#D4AF37]">Explore</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/events" className="hover:text-white transition-colors">
                  Event Organiser
                </Link>
              </li>
              <li>
                <Link href="/news" className="hover:text-white transition-colors">
                  News & Blogs
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Viagosport. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

