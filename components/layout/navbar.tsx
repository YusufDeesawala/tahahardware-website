"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-xl shadow-lg border-b border-gray-100"
          : "bg-white/90 backdrop-blur-md shadow-sm"
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center group-hover:bg-slate-700 transition-colors duration-300">
              <span className="text-white font-bold text-lg">TH</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-800">Taha Hardware</h1>
              <p className="text-xs text-slate-500">Industrial Solutions</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="font-medium text-slate-700 hover:text-blue-600 transition-colors duration-200">
              Home
            </Link>
            <Link
              href="/about"
              className="font-medium text-slate-700 hover:text-blue-600 transition-colors duration-200"
            >
              About
            </Link>
            <Link
              href="/catalogue"
              className="font-medium text-slate-700 hover:text-blue-600 transition-colors duration-200"
            >
              Catalogue
            </Link>
            <Link
              href="/contact"
              className="font-medium text-slate-700 hover:text-blue-600 transition-colors duration-200"
            >
              Contact
            </Link>
            <Link href="/admin">
              <Button variant="outline" size="sm" className="border-slate-300 text-slate-600 hover:bg-slate-50">
                Admin
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <Button variant="ghost" size="icon" className="md:hidden text-slate-700" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-gray-100 bg-white/95 backdrop-blur-xl">
            <div className="flex flex-col space-y-3">
              <Link href="/" className="text-slate-700 hover:text-blue-600 font-medium py-2">
                Home
              </Link>
              <Link href="/about" className="text-slate-700 hover:text-blue-600 font-medium py-2">
                About
              </Link>
              <Link href="/catalogue" className="text-slate-700 hover:text-blue-600 font-medium py-2">
                Catalogue
              </Link>
              <Link href="/contact" className="text-slate-700 hover:text-blue-600 font-medium py-2">
                Contact
              </Link>
              <Link href="/admin" className="text-slate-600 hover:text-slate-800 font-medium py-2">
                Admin
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
