"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, Phone, Mail } from "lucide-react"

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-purple-900 to-blue-900 text-white py-2 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-sm">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Phone className="h-4 w-4" />
              <span>+91 98765 43210</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="h-4 w-4" />
              <span>info@tahahardware.com</span>
            </div>
          </div>
          <div className="hidden md:block">
            <span>Mon - Sat: 9:00 AM - 6:00 PM</span>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav
        className={`fixed w-full z-50 transition-all duration-300 ${
          scrolled ? "bg-white/95 backdrop-blur-md shadow-lg" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">T</span>
              </div>
              <span className={`text-xl font-bold ${scrolled ? "text-gray-900" : "text-white"}`}>Taha Hardware</span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <Link
                href="/"
                className={`font-medium hover:text-purple-600 transition-colors ${
                  scrolled ? "text-gray-900" : "text-white"
                }`}
              >
                Home
              </Link>
              <Link
                href="/about"
                className={`font-medium hover:text-purple-600 transition-colors ${
                  scrolled ? "text-gray-900" : "text-white"
                }`}
              >
                About
              </Link>
              <Link
                href="/catalogue"
                className={`font-medium hover:text-purple-600 transition-colors ${
                  scrolled ? "text-gray-900" : "text-white"
                }`}
              >
                Catalogue
              </Link>
              <Link
                href="/contact"
                className={`font-medium hover:text-purple-600 transition-colors ${
                  scrolled ? "text-gray-900" : "text-white"
                }`}
              >
                Contact
              </Link>
              <Link href="/admin">
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                >
                  Admin
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-white border-t shadow-lg">
            <div className="px-4 py-2 space-y-2">
              <Link href="/" className="block py-2 text-gray-900 hover:text-purple-600">
                Home
              </Link>
              <Link href="/about" className="block py-2 text-gray-900 hover:text-purple-600">
                About
              </Link>
              <Link href="/catalogue" className="block py-2 text-gray-900 hover:text-purple-600">
                Catalogue
              </Link>
              <Link href="/contact" className="block py-2 text-gray-900 hover:text-purple-600">
                Contact
              </Link>
              <Link href="/admin" className="block py-2 text-gray-900 hover:text-purple-600">
                Admin
              </Link>
            </div>
          </div>
        )}
      </nav>
    </>
  )
}
