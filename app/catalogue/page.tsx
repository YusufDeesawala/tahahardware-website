"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, Grid, List, Package, Eye, SlidersHorizontal, Star, Sparkles } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { supabase } from "@/lib/supabase"
import SpecificationsModal from "@/components/specifications-modal"

export default function CataloguePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("name")
  const [products, setProducts] = useState<any[]>([])
  const [categories, setCategories] = useState<any[]>([])
  const [filteredProducts, setFilteredProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [isSpecModalOpen, setIsSpecModalOpen] = useState(false)

  useEffect(() => {
    fetchCategories()
    fetchProducts()
  }, [])

  useEffect(() => {
    filterAndSortProducts()
  }, [searchTerm, selectedCategory, sortBy, products])

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase.from("categories").select("*")
      if (error) throw error
      setCategories(data || [])
    } catch (error) {
      console.error("Error fetching categories:", error)
    }
  }

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from("products")
        .select(`
          *,
          categories(id, name)
        `)
        .order("created_at", { ascending: false })

      if (error) throw error
      setProducts(data || [])
    } catch (error) {
      console.error("Error fetching products:", error)
    } finally {
      setLoading(false)
    }
  }

  const filterAndSortProducts = () => {
    let filtered = products

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter((product) => product.categories?.id === selectedCategory)
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description?.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name)
        case "newest":
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        case "featured":
          return b.is_featured - a.is_featured
        default:
          return 0
      }
    })

    setFilteredProducts(filtered)
  }

  const handleViewSpecs = (product: any) => {
    setSelectedProduct(product)
    setIsSpecModalOpen(true)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center pt-20">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-slate-600 rounded-full animate-spin mx-auto mb-4 flex items-center justify-center">
            <div className="w-8 h-8 bg-white rounded-full"></div>
          </div>
          <p className="text-slate-600 text-lg">Loading products...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 pt-20">
      {/* Header */}
      <section className="py-20 bg-gradient-to-br from-blue-600 via-slate-700 to-slate-900 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-slate-400/20 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
        </div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <Badge className="mb-6 bg-white/20 text-white border-white/30 backdrop-blur-sm px-6 py-2">
            <Sparkles className="w-4 h-4 mr-2" />
            Product Catalogue
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-100 via-white to-blue-200 bg-clip-text text-transparent">
              Industrial Solutions
            </span>
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Explore our comprehensive range of industrial hardware solutions designed for excellence
          </p>
        </div>
      </section>

      <div className="container mx-auto px-6 py-12">
        {/* Filters and Search */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500 bg-white/50 backdrop-blur-sm"
              />
            </div>

            {/* Filters */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-slate-500" />
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-48 bg-white/50 backdrop-blur-sm">
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4 text-slate-500" />
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40 bg-white/50 backdrop-blur-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">Name A-Z</SelectItem>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="featured">Featured First</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-1 border border-gray-300 rounded-lg p-1 bg-white/50 backdrop-blur-sm">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className={viewMode === "grid" ? "bg-blue-600 hover:bg-blue-700" : ""}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className={viewMode === "list" ? "bg-blue-600 hover:bg-blue-700" : ""}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-slate-600">
            Showing <span className="font-semibold text-blue-600">{filteredProducts.length}</span> of{" "}
            <span className="font-semibold">{products.length}</span> products
          </p>
        </div>

        {/* Products Grid/List */}
        {filteredProducts.length > 0 ? (
          viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  index={index}
                  onViewSpecs={() => handleViewSpecs(product)}
                />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredProducts.map((product, index) => (
                <ProductListItem
                  key={product.id}
                  product={product}
                  index={index}
                  onViewSpecs={() => handleViewSpecs(product)}
                />
              ))}
            </div>
          )
        ) : (
          <div className="text-center py-20">
            <div className="text-slate-400 mb-6">
              <Package className="h-20 w-20 mx-auto" />
            </div>
            <h3 className="text-2xl font-semibold text-slate-800 mb-4">
              {products.length === 0 ? "No products available" : "No products found"}
            </h3>
            <p className="text-slate-600 text-lg">
              {products.length === 0
                ? "Products will appear here once they are added through the admin panel."
                : "Try adjusting your search or filter criteria"}
            </p>
          </div>
        )}
      </div>

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
      className="border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-white/80 backdrop-blur-sm h-full group"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <CardContent className="p-0 h-full flex flex-col">
        <div className="relative overflow-hidden rounded-t-lg">
          <Image
            src={product.image_url || "/placeholder.svg?height=200&width=300"}
            alt={product.name}
            width={300}
            height={200}
            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          {product.is_featured && (
            <Badge className="absolute top-3 left-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
              <Star className="w-3 h-3 mr-1" />
              Featured
            </Badge>
          )}
          <Badge className="absolute top-3 right-3 bg-white/90 text-slate-700 backdrop-blur-sm">
            {product.categories?.name || "Product"}
          </Badge>
        </div>

        <div className="p-4 flex-1 flex flex-col">
          <h3 className="text-lg font-semibold mb-2 text-slate-800 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {product.name}
          </h3>
          <p className="text-slate-600 text-sm mb-4 flex-1 line-clamp-2">{product.description}</p>

          {/* Specifications Section */}
          {product.specifications && Object.keys(product.specifications).length > 0 && (
            <div className="mb-4">
              <Button
                variant="outline"
                size="sm"
                onClick={onViewSpecs}
                className="mb-2 text-blue-600 border-blue-200 hover:bg-blue-50 text-xs transform hover:scale-105 transition-all duration-200"
              >
                <Eye className="h-3 w-3 mr-1" />
                View Specs
              </Button>
            </div>
          )}

          <div className="mt-auto">
            <Link href="/contact">
              <Button className="w-full bg-gradient-to-r from-blue-600 to-slate-600 hover:from-blue-700 hover:to-slate-700 text-white text-sm transform hover:scale-105 transition-all duration-200">
                Get Quote
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Product List Item Component
function ProductListItem({ product, index, onViewSpecs }: { product: any; index: number; onViewSpecs: () => void }) {
  return (
    <Card
      className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm group"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="relative">
            <Image
              src={product.image_url || "/placeholder.svg?height=150&width=200"}
              alt={product.name}
              width={200}
              height={150}
              className="w-full md:w-48 h-32 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
            />
            {product.is_featured && (
              <Badge className="absolute top-2 left-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs">
                <Star className="w-3 h-3 mr-1" />
                Featured
              </Badge>
            )}
          </div>

          <div className="flex-1">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors">
                  {product.name}
                </h3>
                <Badge className="bg-blue-100 text-blue-800 text-xs mb-2">
                  {product.categories?.name || "Product"}
                </Badge>
                <p className="text-slate-600">{product.description}</p>
              </div>
              <div className="ml-6 flex flex-col gap-2">
                {product.specifications && Object.keys(product.specifications).length > 0 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={onViewSpecs}
                    className="text-blue-600 border-blue-200 hover:bg-blue-50 transform hover:scale-105 transition-all duration-200"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    View Specs
                  </Button>
                )}
                <Link href="/contact">
                  <Button className="bg-gradient-to-r from-blue-600 to-slate-600 hover:from-blue-700 hover:to-slate-700 text-white transform hover:scale-105 transition-all duration-200">
                    Get Quote
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
