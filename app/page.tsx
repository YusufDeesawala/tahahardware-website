"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Shield, Truck, Users, Eye, Award, Star, Zap, Sparkles } from "lucide-react"
import { supabase } from "@/lib/supabase"
import Link from "next/link"
import Image from "next/image"
import SpecificationsModal from "@/components/specifications-modal"
import { BrandCarousel } from "@/components/brand-carousel"

export default function HomePage() {
  const [brands, setBrands] = useState<any[]>([])
  const [featuredProducts, setFeaturedProducts] = useState<any[]>([])
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [isSpecModalOpen, setIsSpecModalOpen] = useState(false)

  useEffect(() => {
    fetchBrands()
    fetchFeaturedProducts()
  }, [])

  const fetchBrands = async () => {
    try {
      const { data, error } = await supabase.from("brands").select("*")
      if (error) throw error
      setBrands(data || [])
    } catch (error) {
      console.error("Error fetching brands:", error)
    }
  }

  const fetchFeaturedProducts = async () => {
    try {
      const { data, error } = await supabase
        .from("products")
        .select(`
          *,
          categories(name)
        `)
        .eq("is_featured", true)
        .limit(6)

      if (error) throw error
      setFeaturedProducts(data || [])
    } catch (error) {
      console.error("Error fetching featured products:", error)
    }
  }

  const handleViewSpecs = (product: any) => {
    setSelectedProduct(product)
    setIsSpecModalOpen(true)
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-600 via-slate-700 to-slate-900">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-slate-400/20 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
          <div className="absolute bottom-1/4 left-1/2 w-80 h-80 bg-blue-300/20 rounded-full blur-3xl animate-pulse animation-delay-4000"></div>
        </div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <Badge className="mb-8 bg-white/20 text-white border-white/30 backdrop-blur-sm px-6 py-2 animate-in fade-in slide-in-from-bottom-4 duration-1000">
              <Star className="w-4 h-4 mr-2" />
              Trusted Since 2004
            </Badge>

            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-200">
              <span className="bg-gradient-to-r from-blue-100 via-white to-blue-200 bg-clip-text text-transparent">
                Premium Industrial
              </span>
              <span className="bg-gradient-to-r from-blue-200 via-white to-slate-200 bg-clip-text text-transparent block">
                Solutions
              </span>
            </h1>

            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-12 leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-400">
              Quality brushes, hoses & pneumatic products for industries worldwide. Engineered for performance, built to
              last.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-600">
              <Link href="/catalogue">
                <Button
                  size="lg"
                  className="bg-white text-slate-800 hover:bg-blue-50 transform hover:scale-105 transition-all duration-300 shadow-2xl px-8 py-4 text-lg font-semibold group"
                >
                  Explore Products
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </Link>
              <Link href="/about">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-white/60 text-white hover:bg-white/20 backdrop-blur-sm transform hover:scale-105 transition-all duration-300 px-8 py-4 text-lg font-medium"
                >
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Brands Section */}
      <BrandCarousel />

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <section className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-gray-50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-blue-100 text-blue-800 border-blue-200 px-4 py-2">
                <Sparkles className="w-4 h-4 mr-2" />
                Featured Collection
              </Badge>
              <h2 className="text-4xl font-bold text-slate-800 mb-6">Premium Products</h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Discover our premium range of industrial-grade products designed for maximum performance and durability.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProducts.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  index={index}
                  onViewSpecs={() => handleViewSpecs(product)}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-gradient-to-r from-blue-100 to-slate-100 text-slate-800 border-0 px-4 py-2">
              <Zap className="w-4 h-4 mr-2" />
              Why Choose Us
            </Badge>
            <h2 className="text-4xl font-bold text-slate-800 mb-6">Excellence in Every Detail</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Experience the difference with our commitment to quality, service, and customer satisfaction.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Truck,
                title: "Fast Shipping",
                description: "Reliable delivery for all orders with real-time tracking and expedited options.",
                color: "from-blue-500 to-blue-600",
                bgColor: "from-blue-50 to-blue-100",
              },
              {
                icon: Users,
                title: "Bulk Discounts",
                description: "Competitive pricing for wholesale and bulk orders with flexible payment terms.",
                color: "from-green-500 to-green-600",
                bgColor: "from-green-50 to-green-100",
              },
              {
                icon: Award,
                title: "Quality Guaranteed",
                description: "Premium products backed by comprehensive warranty coverage and expert support.",
                color: "from-yellow-500 to-yellow-600",
                bgColor: "from-yellow-50 to-yellow-100",
              },
              {
                icon: Shield,
                title: "Trusted Reliability",
                description: "20+ years of consistent service and customer satisfaction across industries.",
                color: "from-purple-500 to-purple-600",
                bgColor: "from-purple-50 to-purple-100",
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className="border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 bg-white group"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <CardContent className="p-8 text-center">
                  <div
                    className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-r ${feature.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                  >
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center`}
                    >
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-slate-800 group-hover:text-blue-600 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-slate-800 via-blue-900 to-slate-900 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-slate-400/10 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
        </div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl font-bold text-white mb-8">Ready to Get Started?</h2>
          <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto">
            Contact us today for personalized solutions and competitive pricing tailored to your industry needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/contact">
              <Button
                size="lg"
                className="bg-white text-slate-800 hover:bg-blue-50 px-8 py-4 text-lg font-semibold transform hover:scale-105 transition-all duration-300 shadow-2xl"
              >
                Contact Us Today
              </Button>
            </Link>
            <Link href="/catalogue">
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-white text-white hover:bg-white hover:text-slate-800 px-8 py-4 text-lg font-semibold transform hover:scale-105 transition-all duration-300"
              >
                Browse Catalogue
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Specifications Modal */}
      <SpecificationsModal
        isOpen={isSpecModalOpen}
        onClose={() => setIsSpecModalOpen(false)}
        product={selectedProduct}
      />
    </div>
  )
}

// Product Card Component
function ProductCard({ product, index, onViewSpecs }: { product: any; index: number; onViewSpecs: () => void }) {
  return (
    <Card
      className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-0 shadow-lg bg-white h-full"
      style={{ animationDelay: `${index * 200}ms` }}
    >
      <CardContent className="p-0 h-full flex flex-col">
        <div className="relative overflow-hidden rounded-t-lg">
          <Image
            src={product.image_url || "/placeholder.svg?height=250&width=400"}
            alt={product.name}
            width={400}
            height={250}
            className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <Badge className="absolute top-4 left-4 bg-gradient-to-r from-blue-600 to-slate-600 text-white">
            {product.categories?.name || "Product"}
          </Badge>
          {product.is_featured && (
            <Badge className="absolute top-4 right-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
              <Star className="w-3 h-3 mr-1" />
              Featured
            </Badge>
          )}
        </div>

        <div className="p-6 flex-1 flex flex-col">
          <h3 className="text-xl font-bold mb-3 text-slate-800 group-hover:text-blue-600 transition-colors line-clamp-2">
            {product.name}
          </h3>
          <p className="text-slate-600 mb-4 flex-1 line-clamp-3">{product.description}</p>

          {/* Specifications Section */}
          {product.specifications && Object.keys(product.specifications).length > 0 && (
            <div className="mb-4">
              <Button
                variant="outline"
                size="sm"
                onClick={onViewSpecs}
                className="mb-3 text-blue-600 border-blue-200 hover:bg-blue-50 transform hover:scale-105 transition-all duration-200"
              >
                <Eye className="h-4 w-4 mr-2" />
                View Specifications
              </Button>
            </div>
          )}

          <div className="mt-auto">
            <Link href="/contact">
              <Button className="w-full bg-gradient-to-r from-blue-600 to-slate-600 hover:from-blue-700 hover:to-slate-700 text-white transform hover:scale-105 transition-all duration-200">
                Get Quote
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
