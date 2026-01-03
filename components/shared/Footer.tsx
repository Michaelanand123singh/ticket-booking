import Link from 'next/link'
import { FiTwitter, FiInstagram, FiLinkedin } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className="bg-black text-white mt-auto border-t border-white/10">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8 items-center">

          {/* Left Section */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left mx-auto lg:mx-0 max-w-sm lg:justify-self-start order-1">
            <h3 className="text-2xl font-bold mb-4 text-[#D4AF37]">Viagosport</h3>
            <p className="text-gray-400">
              Your trusted sports tourism platform for fan experiences and athlete logistics.
            </p>
          </div>

          {/* Middle Section - Socials */}
          <div className="flex justify-center items-center lg:justify-self-center order-3 lg:order-2 w-full">
            <div className="flex items-center gap-8">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#D4AF37] transition-colors">
                <FiInstagram size={24} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#D4AF37] transition-colors">
                <FiTwitter size={24} />
              </a>
              <a href="https://whatsapp.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#D4AF37] transition-colors">
                <FaWhatsapp size={24} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#D4AF37] transition-colors">
                <FiLinkedin size={24} />
              </a>
            </div>
          </div>

          {/* Right Section - Contact */}
          <div className="flex flex-col items-center lg:items-end text-center lg:text-right lg:justify-self-end order-2 lg:order-3 w-full lg:w-auto">
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-[#D4AF37] mb-1 uppercase tracking-wider">Get in TOUCH</h4>
              <h5 className="text-white font-bold mb-4 uppercase tracking-widest">VIAGO SPORTS</h5>
              <div className="space-y-1 text-gray-400 text-sm">
                <p>CONTACT@VIAGOSPORT.COM</p>
                <p>+91 98765 43210</p>
              </div>
            </div>
            <Link
              href="/enquiry/home"
              className="inline-block bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-black font-medium text-lg px-8 py-3 rounded transition-colors whitespace-nowrap"
            >
              Enquire Now
            </Link>
          </div>

        </div>

        <div className="border-t border-white/10 mt-12 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Viagosport. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

