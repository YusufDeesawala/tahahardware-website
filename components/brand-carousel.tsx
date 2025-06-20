"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, Building2, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

// Hardcoded brand data
const brands = [
  {
    id: 1,
    name: "TechFlow Industries",
    logo: "/placeholder.svg?height=80&width=120",
    description: "Leading manufacturer of industrial automation solutions",
    established: "1995",
    specialty: "Automation",
    rating: 4.8,
  },
  {
    id: 2,
    name: "PneumaTech Solutions",
    logo: "/placeholder.svg?height=80&width=120",
    description: "Premium pneumatic systems and components",
    established: "1988",
    specialty: "Pneumatics",
    rating: 4.9,
  },
  {
    id: 3,
    name: "FlexHose Dynamics",
    logo: "/placeholder.svg?height=80&width=120",
    description: "High-performance industrial hoses and fittings",
    established: "2001",
    specialty: "Hoses",
    rating: 4.7,
  },
  {
    id: 4,
    name: "BrushMaster Pro",
    logo: "/placeholder.svg?height=80&width=120",
    description: "Professional grade brushes for industrial applications",
    established: "1992",
    specialty: "Brushes",
    rating: 4.8,
  },
  {
    id: 5,
    name: "HydroForce Systems",
    logo: "/placeholder.svg?height=80&width=120",
    description: "Hydraulic power solutions and maintenance equipment",
    established: "1985",
    specialty: "Hydraulics",
    rating: 4.9,
  },
  {
    id: 6,
    name: "MetalCraft Industries",
    logo: "/placeholder.svg?height=80&width=120",
    description: "Precision metal fabrication and custom solutions",
    established: "1978",
    specialty: "Fabrication",
    rating: 4.6,
  },
  {
    id: 7,
    name: "PowerTool Dynamics",
    logo: "/placeholder.svg?height=80&width=120",
    description: "Industrial power tools and accessories",
    established: "1999",
    specialty: "Tools",
    rating: 4.8,
  },
  {
    id: 8,
    name: "SafeGuard Equipment",
    logo: "/placeholder.svg?height=80&width=120",
    description: "Safety equipment and protective gear solutions",
    established: "2003",
    specialty: "Safety",
    rating: 4.7,
  },
]

export function BrandCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % brands.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % brands.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + brands.length) % brands.length)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  // Get visible brands (3 at a time on desktop, 1 on mobile)
  const getVisibleBrands = () => {
    const visibleCount = 3
    const result = []
    for (let i = 0; i < visibleCount; i++) {
      const index = (currentIndex + i) % brands.length
      result.push(brands[index])
    }
    return result
  }

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-gray-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-slate-400/10 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-gradient-to-r from-blue-100 to-slate-100 text-slate-800 border-0 px-4 py-2">
            <Building2 className="w-4 h-4 mr-2" />
            Trusted Partners
          </Badge>
          <h2 className="text-4xl font-bold text-slate-800 mb-6">Premium Brand Partners</h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            We collaborate with industry-leading brands to deliver exceptional quality and reliability in every product.
          </p>
        </div>

        {/* Carousel Container */}
        <div
          className="relative"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {/* Navigation Buttons */}
          <Button
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white/90 backdrop-blur-sm border-slate-200 hover:bg-white hover:scale-110 transition-all duration-300 shadow-lg"
            onClick={prevSlide}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white/90 backdrop-blur-sm border-slate-200 hover:bg-white hover:scale-110 transition-all duration-300 shadow-lg"
            onClick={nextSlide}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>

          {/* Brand Cards */}
          <div className="mx-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {getVisibleBrands().map((brand, index) => (
                <Card
                  key={`${brand.id}-${currentIndex}`}
                  className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-0 shadow-lg bg-white"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <CardContent className="p-8 text-center">
                    {/* Brand Logo */}
                    <div className="mb-6 relative">
                      <div className="w-24 h-16 mx-auto mb-4 bg-gradient-to-r from-slate-100 to-blue-50 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm">
                        <Image
                          src={brand.logo || "/placeholder.svg"}
                          alt={`${brand.name} logo`}
                          width={120}
                          height={80}
                          className="max-w-full max-h-full object-contain"
                        />
                      </div>

                      {/* Rating Badge */}
                      <Badge className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-2 py-1">
                        <Star className="w-3 h-3 mr-1 fill-current" />
                        {brand.rating}
                      </Badge>
                    </div>

                    {/* Brand Info */}
                    <h3 className="text-xl font-bold mb-3 text-slate-800 group-hover:text-blue-600 transition-colors">
                      {brand.name}
                    </h3>

                    <p className="text-slate-600 mb-4 leading-relaxed">{brand.description}</p>

                    {/* Brand Details */}
                    <div className="flex justify-between items-center text-sm text-slate-500 mb-4">
                      <span className="bg-slate-100 px-3 py-1 rounded-full">Est. {brand.established}</span>
                      <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full">{brand.specialty}</span>
                    </div>

                    {/* Hover Effect Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-12 space-x-2">
            {brands.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-gradient-to-r from-blue-600 to-slate-600 scale-125"
                    : "bg-slate-300 hover:bg-slate-400"
                }`}
                onClick={() => goToSlide(index)}
              />
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { number: "50+", label: "Brand Partners" },
            { number: "20+", label: "Years Experience" },
            { number: "10K+", label: "Products Available" },
            { number: "99%", label: "Customer Satisfaction" },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl font-bold text-slate-800 mb-2 bg-gradient-to-r from-blue-600 to-slate-600 bg-clip-text text-transparent">
                {stat.number}
              </div>
              <div className="text-slate-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
