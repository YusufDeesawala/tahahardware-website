"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Plus, Users, ShoppingCart, TrendingUp, Eye, EyeOff, BarChart3, Edit, Trash2, Lock, X } from "lucide-react"
import { supabase, type Database } from "@/lib/supabase"
import Image from "next/image"

// Define interfaces for type safety
type Product = Database["public"]["Tables"]["products"]["Row"] & {
  categories?: { name: string }
}
type Category = Database["public"]["Tables"]["categories"]["Row"]
type Brand = Database["public"]["Tables"]["brands"]["Row"]
type Lead = Database["public"]["Tables"]["leads"]["Row"]

interface SizeSpec {
  size: string
  pressure: string
  temperature: string
  bend_radius: string
}

interface PerformanceSpecs {
  operating_pressure: string
  flow_rate: string
  temperature_range: string
  connection_size: string
  material: string
  mounting: string
}

interface AvailableOptions {
  grades: string[]
  sizes: string[]
  thickness: string[]
  hardness: string[]
}

interface HoseSpec {
  size: string
  working_pressure: string
  burst_pressure: string
  temperature: string
}

export default function AdminPage() {
  // State declarations
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [leads, setLeads] = useState<Lead[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [brands, setBrands] = useState<Brand[]>([])
  const [isAddProductOpen, setIsAddProductOpen] = useState(false)
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false)
  const [isAddBrandOpen, setIsAddBrandOpen] = useState(false)
  const [isAddLeadOpen, setIsAddLeadOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [editingBrand, setEditingBrand] = useState<Brand | null>(null)
  const [editingLead, setEditingLead] = useState<Lead | null>(null)
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    category_id: "",
    image_url: "",
    specifications: {} as Record<string, any>,
    is_featured: false,
  })
  const [newCategory, setNewCategory] = useState({
    name: "",
    description: "",
    image_url: "",
  })
  const [newBrand, setNewBrand] = useState({
    name: "",
    logo_url: "",
    website_url: "",
  })
  const [newLead, setNewLead] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    location: "",
    message: "",
    source: "website",
  })
  const [specKey, setSpecKey] = useState("")
  const [specValue, setSpecValue] = useState("")
  const [sizeSpecs, setSizeSpecs] = useState<SizeSpec[]>([])
  const [currentSizeSpec, setCurrentSizeSpec] = useState<SizeSpec>({
    size: "",
    pressure: "",
    temperature: "",
    bend_radius: "",
  })
  const [performanceSpecs, setPerformanceSpecs] = useState<PerformanceSpecs>({
    operating_pressure: "",
    flow_rate: "",
    temperature_range: "",
    connection_size: "",
    material: "",
    mounting: "",
  })
  const [availableOptions, setAvailableOptions] = useState<AvailableOptions>({
    grades: [],
    sizes: [],
    thickness: [],
    hardness: [],
  })
  const [newOption, setNewOption] = useState("")
  const [optionType, setOptionType] = useState<keyof AvailableOptions>("grades")
  const [analytics, setAnalytics] = useState({
    totalProducts: 0,
    totalLeads: 0,
    totalCategories: 0,
    totalBrands: 0,
    featuredProducts: 0,
    recentLeads: 0,
    leadsBySource: {} as Record<string, number>,
  })

  const [hoseSpecs, setHoseSpecs] = useState<HoseSpec[]>([])
  const [currentHoseSpec, setCurrentHoseSpec] = useState<HoseSpec>({
    size: "",
    working_pressure: "",
    burst_pressure: "",
    temperature: "",
  })
  const [pneumaticSpecs, setPneumaticSpecs] = useState({
    pressure: "",
    temperature: "",
  })

  // Load data when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      loadData().then(() => {
        calculateAnalytics()
      })
    }
  }, [isAuthenticated, products, leads, categories, brands])

  const handleLogin = async () => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    if (password === "taha@admin2024") {
      setIsAuthenticated(true)
      await loadData()
    } else {
      alert("Invalid password. Please try again.")
    }
    setIsLoading(false)
  }

  const loadData = async () => {
    try {
      // Load leads
      const { data: leadsData, error: leadsError } = await supabase
        .from("leads")
        .select("*")
        .order("created_at", { ascending: false })

      if (leadsError) {
        console.error("Error loading leads:", leadsError)
      } else if (leadsData) {
        setLeads(leadsData)
      }

      // Load categories
      const { data: categoriesData, error: categoriesError } = await supabase
        .from("categories")
        .select("*")
        .order("name")

      if (categoriesError) {
        console.error("Error loading categories:", categoriesError)
      } else if (categoriesData) {
        setCategories(categoriesData)
      }

      // Load products
      const { data: productsData, error: productsError } = await supabase
        .from("products")
        .select(`
          *,
          categories(name)
        `)
        .order("created_at", { ascending: false })

      if (productsError) {
        console.error("Error loading products:", productsError)
      } else if (productsData) {
        setProducts(productsData)
      }

      // Load brands
      const { data: brandsData, error: brandsError } = await supabase.from("brands").select("*").order("name")

      if (brandsError) {
        console.error("Error loading brands:", brandsError)
      } else if (brandsData) {
        setBrands(brandsData)
      }
    } catch (error) {
      console.error("Error loading data:", error)
      alert("Failed to load data. Please check your connection and try again.")
    }
  }

  const calculateAnalytics = () => {
    const leadsBySource = leads.reduce(
      (acc, lead) => {
        const source = lead.source || "unknown"
        acc[source] = (acc[source] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    )

    const recentLeads = leads.filter((lead) => {
      const leadDate = new Date(lead.created_at)
      const weekAgo = new Date()
      weekAgo.setDate(weekAgo.getDate() - 7)
      return leadDate >= weekAgo
    }).length

    setAnalytics({
      totalProducts: products.length,
      totalLeads: leads.length,
      totalCategories: categories.length,
      totalBrands: brands.length,
      featuredProducts: products.filter((p) => p.is_featured).length,
      recentLeads,
      leadsBySource,
    })
  }

  const addSpecification = () => {
    if (specKey.trim() && specValue.trim()) {
      setNewProduct({
        ...newProduct,
        specifications: {
          ...newProduct.specifications,
          [specKey.trim()]: specValue.trim(),
        },
      })
      setSpecKey("")
      setSpecValue("")
    }
  }

  const removeSpecification = (key: string) => {
    const newSpecs = { ...newProduct.specifications }
    delete newSpecs[key]
    setNewProduct({ ...newProduct, specifications: newSpecs })
  }

  const addSizeSpecification = () => {
    if (currentSizeSpec.size.trim()) {
      setSizeSpecs([...sizeSpecs, { ...currentSizeSpec }])
      setCurrentSizeSpec({ size: "", pressure: "", temperature: "", bend_radius: "" })
    }
  }

  const removeSizeSpecification = (index: number) => {
    setSizeSpecs(sizeSpecs.filter((_, i) => i !== index))
  }

  const addOption = () => {
    if (newOption.trim() && optionType) {
      setAvailableOptions({
        ...availableOptions,
        [optionType]: [...availableOptions[optionType], newOption.trim()],
      })
      setNewOption("")
    }
  }

  const removeOption = (type: keyof AvailableOptions, index: number) => {
    setAvailableOptions({
      ...availableOptions,
      [type]: availableOptions[type].filter((_, i) => i !== index),
    })
  }

  const getSelectedCategory = () => {
    return categories.find((cat) => cat.id === newProduct.category_id)
  }

  const addHoseSpecification = () => {
    if (currentHoseSpec.size.trim()) {
      setHoseSpecs([...hoseSpecs, { ...currentHoseSpec }])
      setCurrentHoseSpec({ size: "", working_pressure: "", burst_pressure: "", temperature: "" })
    }
  }

  const removeHoseSpecification = (index: number) => {
    setHoseSpecs(hoseSpecs.filter((_, i) => i !== index))
  }

  const buildSpecifications = () => {
    const selectedCategory = getSelectedCategory()
    const categoryName = selectedCategory?.name?.toLowerCase() || ""
    const specs = { ...newProduct.specifications }

    if (categoryName.includes("hose") && hoseSpecs.length > 0) {
      specs.hose_specifications = hoseSpecs
    }

    if (categoryName.includes("pneumatic")) {
      const validPneumaticSpecs = Object.fromEntries(
        Object.entries(pneumaticSpecs).filter(([_, value]) => value.trim() !== ""),
      )
      if (Object.keys(validPneumaticSpecs).length > 0) {
        specs.pneumatic_specs = validPneumaticSpecs
      }
    }

    // Remove brush specifications - no specs needed for brushes

    return specs
  }

  const handleAddProduct = async () => {
    try {
      if (!newProduct.name.trim() || !newProduct.category_id) {
        alert("Product name and category are required.")
        return
      }
      const specifications = buildSpecifications()
      const productData = { ...newProduct, specifications, name: newProduct.name.trim() }
      const { error } = await supabase.from("products").insert([productData])
      if (error) throw error
      alert("Product added successfully!")
      resetProductForm()
      setIsAddProductOpen(false)
      await loadData()
    } catch (error) {
      console.error("Error adding product:", error)
      alert("Error adding product. Please try again.")
    }
  }

  const handleUpdateProduct = async () => {
    try {
      if (!newProduct.name.trim() || !newProduct.category_id || !editingProduct) {
        alert("Product name and category are required.")
        return
      }
      const specifications = buildSpecifications()
      const productData = { ...newProduct, specifications, name: newProduct.name.trim() }
      const { error } = await supabase.from("products").update(productData).eq("id", editingProduct.id)
      if (error) throw error
      alert("Product updated successfully!")
      setEditingProduct(null)
      resetProductForm()
      setIsAddProductOpen(false)
      await loadData()
    } catch (error) {
      console.error("Error updating product:", error)
      alert("Error updating product. Please try again.")
    }
  }

  const handleDeleteProduct = async (id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      try {
        const { error } = await supabase.from("products").delete().eq("id", id)
        if (error) throw error
        alert("Product deleted successfully!")
        await loadData()
      } catch (error) {
        console.error("Error deleting product:", error)
        alert("Error deleting product. Please try again.")
      }
    }
  }

  const handleAddCategory = async () => {
    try {
      if (!newCategory.name.trim()) {
        alert("Category name is required.")
        return
      }
      const categoryData = { ...newCategory, name: newCategory.name.trim() }
      const { error } = await supabase.from("categories").insert([categoryData])
      if (error) throw error
      alert("Category added successfully!")
      setNewCategory({ name: "", description: "", image_url: "" })
      setIsAddCategoryOpen(false)
      await loadData()
    } catch (error) {
      console.error("Error adding category:", error)
      alert("Error adding category. Please try again.")
    }
  }

  const handleUpdateCategory = async () => {
    try {
      if (!newCategory.name.trim() || !editingCategory) {
        alert("Category name is required.")
        return
      }
      const categoryData = { ...newCategory, name: newCategory.name.trim() }
      const { error } = await supabase.from("categories").update(categoryData).eq("id", editingCategory.id)
      if (error) throw error
      alert("Category updated successfully!")
      setEditingCategory(null)
      setNewCategory({ name: "", description: "", image_url: "" })
      setIsAddCategoryOpen(false)
      await loadData()
    } catch (error) {
      console.error("Error updating category:", error)
      alert("Error updating category. Please try again.")
    }
  }

  const handleDeleteCategory = async (id: string) => {
    if (
      confirm(
        "Are you sure you want to delete this category? Products in this category will have their category set to null.",
      )
    ) {
      try {
        const { error } = await supabase.from("categories").delete().eq("id", id)
        if (error) throw error
        alert("Category deleted successfully!")
        await loadData()
      } catch (error) {
        console.error("Error deleting category:", error)
        alert("Error deleting category. Please try again.")
      }
    }
  }

  const handleAddBrand = async () => {
    try {
      if (!newBrand.name.trim()) {
        alert("Brand name is required.")
        return
      }
      const brandData = { ...newBrand, name: newBrand.name.trim() }
      const { error } = await supabase.from("brands").insert([brandData])
      if (error) throw error
      alert("Brand added successfully!")
      setNewBrand({ name: "", logo_url: "", website_url: "" })
      setIsAddBrandOpen(false)
      await loadData()
    } catch (error) {
      console.error("Error adding brand:", error)
      alert("Error adding brand. Please try again.")
    }
  }

  const handleUpdateBrand = async () => {
    try {
      if (!newBrand.name.trim() || !editingBrand) {
        alert("Brand name is required.")
        return
      }
      const brandData = { ...newBrand, name: newBrand.name.trim() }
      const { error } = await supabase.from("brands").update(brandData).eq("id", editingBrand.id)
      if (error) throw error
      alert("Brand updated successfully!")
      setEditingBrand(null)
      setNewBrand({ name: "", logo_url: "", website_url: "" })
      setIsAddBrandOpen(false)
      await loadData()
    } catch (error) {
      console.error("Error updating brand:", error)
      alert("Error updating brand. Please try again.")
    }
  }

  const handleDeleteBrand = async (id: string) => {
    if (confirm("Are you sure you want to delete this brand?")) {
      try {
        const { error } = await supabase.from("brands").delete().eq("id", id)
        if (error) throw error
        alert("Brand deleted successfully!")
        await loadData()
      } catch (error) {
        console.error("Error deleting brand:", error)
        alert("Error deleting brand. Please try again.")
      }
    }
  }

  const handleAddLead = async () => {
    try {
      if (!newLead.name.trim() || !newLead.email.trim()) {
        alert("Name and email are required.")
        return
      }
      const leadData = {
        ...newLead,
        name: newLead.name.trim(),
        email: newLead.email.trim(),
      }
      const { error } = await supabase.from("leads").insert([leadData])
      if (error) throw error
      alert("Lead added successfully!")
      setNewLead({ name: "", email: "", phone: "", company: "", location: "", message: "", source: "website" })
      setIsAddLeadOpen(false)
      await loadData()
    } catch (error) {
      console.error("Error adding lead:", error)
      alert("Error adding lead. Please try again.")
    }
  }

  const handleUpdateLead = async () => {
    try {
      if (!newLead.name.trim() || !newLead.email.trim() || !editingLead) {
        alert("Name and email are required.")
        return
      }
      const leadData = {
        ...newLead,
        name: newLead.name.trim(),
        email: newLead.email.trim(),
      }
      const { error } = await supabase.from("leads").update(leadData).eq("id", editingLead.id)
      if (error) throw error
      alert("Lead updated successfully!")
      setEditingLead(null)
      setNewLead({ name: "", email: "", phone: "", company: "", location: "", message: "", source: "website" })
      setIsAddLeadOpen(false)
      await loadData()
    } catch (error) {
      console.error("Error updating lead:", error)
      alert("Error updating lead. Please try again.")
    }
  }

  const handleDeleteLead = async (id: string) => {
    if (confirm("Are you sure you want to delete this lead?")) {
      try {
        const { error } = await supabase.from("leads").delete().eq("id", id)
        if (error) throw error
        alert("Lead deleted successfully!")
        await loadData()
      } catch (error) {
        console.error("Error deleting lead:", error)
        alert("Error deleting lead. Please try again.")
      }
    }
  }

  const resetProductForm = () => {
    setNewProduct({
      name: "",
      description: "",
      category_id: "",
      image_url: "",
      specifications: {},
      is_featured: false,
    })
    setHoseSpecs([])
    setPneumaticSpecs({
      pressure: "",
      temperature: "",
    })
    setAvailableOptions({
      grades: [],
      sizes: [],
      thickness: [],
      hardness: [],
    })
  }

  const startEditProduct = (product: Product) => {
    setEditingProduct(product)
    setNewProduct({
      name: product.name,
      description: product.description || "",
      category_id: product.category_id || "",
      image_url: product.image_url || "",
      specifications: product.specifications || {},
      is_featured: product.is_featured || false,
    })
    const specs = product.specifications || {}
    if (specs.hose_specifications) {
      setHoseSpecs(specs.hose_specifications)
    }
    if (specs.pneumatic_specs) {
      setPneumaticSpecs({ ...pneumaticSpecs, ...specs.pneumatic_specs })
    }
    if (specs.available_options) {
      setAvailableOptions({ ...availableOptions, ...specs.available_options })
    }
    setIsAddProductOpen(true)
  }

  const startEditCategory = (category: Category) => {
    setEditingCategory(category)
    setNewCategory({
      name: category.name,
      description: category.description || "",
      image_url: category.image_url || "",
    })
    setIsAddCategoryOpen(true)
  }

  const startEditBrand = (brand: Brand) => {
    setEditingBrand(brand)
    setNewBrand({
      name: brand.name,
      logo_url: brand.logo_url || "",
      website_url: brand.website_url || "",
    })
    setIsAddBrandOpen(true)
  }

  const startEditLead = (lead: Lead) => {
    setEditingLead(lead)
    setNewLead({
      name: lead.name,
      email: lead.email,
      phone: lead.phone || "",
      company: lead.company || "",
      location: lead.location || "",
      message: lead.message || "",
      source: lead.source || "website",
    })
    setIsAddLeadOpen(true)
  }

  // Authentication UI
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900">
        <Card className="w-full max-w-md shadow-2xl border-0">
          <CardHeader className="text-center pb-2">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Lock className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Admin Access
            </CardTitle>
            <p className="text-gray-600 text-sm">Enter your credentials to continue</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pr-10 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Enter admin password"
                  onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                </Button>
              </div>
            </div>
            <Button
              onClick={handleLogin}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white font-medium py-2.5"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Authenticating...
                </div>
              ) : (
                "Access Dashboard"
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Main dashboard UI
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Admin{" "}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Dashboard
            </span>
          </h1>
          <p className="text-gray-600">Manage your leads, products, categories, and brands</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-500 to-purple-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm font-medium">Total Products</p>
                  <p className="text-3xl font-bold">{analytics.totalProducts}</p>
                  <p className="text-xs text-blue-200">{analytics.featuredProducts} featured</p>
                </div>
                <ShoppingCart className="h-12 w-12 text-blue-200" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg bg-gradient-to-br from-green-500 to-cyan-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm font-medium">Total Inquiries</p>
                  <p className="text-3xl font-bold">{analytics.totalLeads}</p>
                </div>
                <Users className="h-12 w-12 text-green-200" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-500 to-emerald-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm font-medium">Categories</p>
                  <p className="text-3xl font-bold">{analytics.totalCategories}</p>
                </div>
                <TrendingUp className="h-12 w-12 text-purple-200" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-500 to-red-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm font-medium">Brand Partners</p>
                  <p className="text-3xl font-bold">{analytics.totalBrands}</p>
                </div>
                <BarChart3 className="h-12 w-12 text-orange-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="products" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white shadow-lg border-0">
            <TabsTrigger value="products" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              Products
            </TabsTrigger>
            <TabsTrigger value="categories" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              Categories
            </TabsTrigger>
            <TabsTrigger value="brands" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              Brands
            </TabsTrigger>
            <TabsTrigger value="inquiries" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              Inquiries
            </TabsTrigger>
          </TabsList>

          <TabsContent value="products">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-2xl font-bold">Product Management</CardTitle>
                  <Dialog open={isAddProductOpen} onOpenChange={setIsAddProductOpen}>
                    <DialogTrigger asChild>
                      <Button
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                        onClick={() => {
                          setEditingProduct(null)
                          resetProductForm()
                        }}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Product
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle className="text-2xl font-bold">
                          {editingProduct ? "Edit Product" : "Add New Product"}
                        </DialogTitle>
                      </DialogHeader>
                      <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="name">Product Name *</Label>
                            <Input
                              id="name"
                              value={newProduct.name}
                              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                              placeholder="Enter product name"
                            />
                          </div>
                          <div>
                            <Label htmlFor="category">Category *</Label>
                            <Select
                              value={newProduct.category_id}
                              onValueChange={(value) => setNewProduct({ ...newProduct, category_id: value })}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                              <SelectContent>
                                {categories.map((cat) => (
                                  <SelectItem key={cat.id} value={cat.id}>
                                    {cat.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="image">Image URL</Label>
                          <Input
                            id="image"
                            value={newProduct.image_url}
                            onChange={(e) => setNewProduct({ ...newProduct, image_url: e.target.value })}
                            placeholder="https://example.com/image.jpg"
                          />
                        </div>
                        <div>
                          <Label htmlFor="description">Description</Label>
                          <Textarea
                            id="description"
                            value={newProduct.description}
                            onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                            rows={3}
                            placeholder="Enter product description"
                          />
                        </div>
                        {getSelectedCategory()?.name?.toLowerCase().includes("hose") && (
                          <div>
                            <Label className="text-base font-semibold">Hose Specifications</Label>
                            <div className="space-y-4 mt-2">
                              <div className="grid grid-cols-4 gap-2">
                                <div>
                                  <Label className="text-sm">Size</Label>
                                  <Input
                                    placeholder="e.g., 1/4&quot;"
                                    value={currentHoseSpec.size}
                                    onChange={(e) => setCurrentHoseSpec({ ...currentHoseSpec, size: e.target.value })}
                                  />
                                </div>
                                <div>
                                  <Label className="text-sm">Working Pressure</Label>
                                  <Input
                                    placeholder="e.g., 250 BAR"
                                    value={currentHoseSpec.working_pressure}
                                    onChange={(e) =>
                                      setCurrentHoseSpec({ ...currentHoseSpec, working_pressure: e.target.value })
                                    }
                                  />
                                </div>
                                <div>
                                  <Label className="text-sm">Burst Pressure</Label>
                                  <Input
                                    placeholder="e.g., 1000 BAR"
                                    value={currentHoseSpec.burst_pressure}
                                    onChange={(e) =>
                                      setCurrentHoseSpec({ ...currentHoseSpec, burst_pressure: e.target.value })
                                    }
                                  />
                                </div>
                                <div>
                                  <Label className="text-sm">Temperature</Label>
                                  <Input
                                    placeholder="e.g., -40°C to +100°C"
                                    value={currentHoseSpec.temperature}
                                    onChange={(e) =>
                                      setCurrentHoseSpec({ ...currentHoseSpec, temperature: e.target.value })
                                    }
                                  />
                                </div>
                              </div>
                              <Button onClick={addHoseSpecification} type="button" variant="outline" className="w-full">
                                Add Hose Specification
                              </Button>
                              {hoseSpecs.length > 0 && (
                                <div className="border rounded-lg p-4">
                                  <h4 className="font-medium mb-3">Hose Specifications Table:</h4>
                                  <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                      <thead>
                                        <tr className="border-b">
                                          <th className="text-left p-2">Size</th>
                                          <th className="text-left p-2">Working Pressure</th>
                                          <th className="text-left p-2">Burst Pressure</th>
                                          <th className="text-left p-2">Temperature</th>
                                          <th className="text-left p-2">Action</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {hoseSpecs.map((spec, index) => (
                                          <tr key={index} className="border-b">
                                            <td className="p-2">{spec.size}</td>
                                            <td className="p-2">{spec.working_pressure}</td>
                                            <td className="p-2">{spec.burst_pressure}</td>
                                            <td className="p-2">{spec.temperature}</td>
                                            <td className="p-2">
                                              <Button
                                                onClick={() => removeHoseSpecification(index)}
                                                variant="ghost"
                                                size="sm"
                                                className="text-red-600 hover:text-red-700"
                                              >
                                                <X className="h-4 w-4" />
                                              </Button>
                                            </td>
                                          </tr>
                                        ))}
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                        {getSelectedCategory()?.name?.toLowerCase().includes("pneumatic") && (
                          <div>
                            <Label className="text-base font-semibold">Pneumatic Specifications</Label>
                            <div className="grid grid-cols-2 gap-4 mt-2">
                              <div>
                                <Label>Pressure</Label>
                                <Input
                                  placeholder="e.g., 1.5 to 10 BAR"
                                  value={pneumaticSpecs.pressure}
                                  onChange={(e) => setPneumaticSpecs({ ...pneumaticSpecs, pressure: e.target.value })}
                                />
                              </div>
                              <div>
                                <Label>Temperature</Label>
                                <Input
                                  placeholder="e.g., -10°C to +60°C"
                                  value={pneumaticSpecs.temperature}
                                  onChange={(e) =>
                                    setPneumaticSpecs({ ...pneumaticSpecs, temperature: e.target.value })
                                  }
                                />
                              </div>
                            </div>
                          </div>
                        )}
                        <div>
                          <Label className="text-base font-semibold">General Specifications</Label>
                          <div className="space-y-4 mt-2">
                            <div className="flex gap-2">
                              <Input
                                placeholder="Specification name (e.g., Material)"
                                value={specKey}
                                onChange={(e) => setSpecKey(e.target.value)}
                              />
                              <Input
                                placeholder="Specification value (e.g., Stainless Steel)"
                                value={specValue}
                                onChange={(e) => setSpecValue(e.target.value)}
                              />
                              <Button onClick={addSpecification} type="button" variant="outline">
                                Add
                              </Button>
                            </div>
                            {Object.entries(newProduct.specifications).length > 0 && (
                              <div className="border rounded-lg p-4 space-y-2">
                                {Object.entries(newProduct.specifications).map(([key, value]) => (
                                  <div key={key} className="flex justify-between items-center bg-gray-50 p-2 rounded">
                                    <span className="font-medium">
                                      {key}: {typeof value === "object" ? JSON.stringify(value) : String(value)}
                                    </span>
                                    <Button
                                      onClick={() => removeSpecification(key)}
                                      variant="ghost"
                                      size="sm"
                                      className="text-red-600 hover:text-red-700"
                                    >
                                      Remove
                                    </Button>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="featured"
                            checked={newProduct.is_featured}
                            onCheckedChange={(checked) => setNewProduct({ ...newProduct, is_featured: !!checked })}
                          />
                          <Label htmlFor="featured">Featured Product</Label>
                        </div>
                        <Button
                          onClick={editingProduct ? handleUpdateProduct : handleAddProduct}
                          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3"
                        >
                          {editingProduct ? "Update Product" : "Add Product"}
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Image</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Featured</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {products.map((product) => (
                        <TableRow key={product.id}>
                          <TableCell>
                            <Image
                              src={product.image_url || "/placeholder.svg?height=50&width=50"}
                              alt={product.name}
                              width={50}
                              height={50}
                              className="rounded object-cover"
                            />
                          </TableCell>
                          <TableCell className="font-medium">{product.name}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{product.categories?.name || "No Category"}</Badge>
                          </TableCell>
                          <TableCell>
                            {product.is_featured && <Badge className="bg-green-100 text-green-800">Featured</Badge>}
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline" onClick={() => startEditProduct(product)}>
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleDeleteProduct(product.id)}
                                className="text-red-600 hover:text-red-700"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="categories">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-2xl font-bold">Category Management</CardTitle>
                  <Dialog open={isAddCategoryOpen} onOpenChange={setIsAddCategoryOpen}>
                    <DialogTrigger asChild>
                      <Button
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                        onClick={() => {
                          setEditingCategory(null)
                          setNewCategory({ name: "", description: "", image_url: "" })
                        }}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Category
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle className="text-2xl font-bold">
                          {editingCategory ? "Edit Category" : "Add New Category"}
                        </DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="categoryName">Category Name *</Label>
                          <Input
                            id="categoryName"
                            value={newCategory.name}
                            onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                            placeholder="Enter category name"
                          />
                        </div>
                        <div>
                          <Label htmlFor="categoryDescription">Description</Label>
                          <Textarea
                            id="categoryDescription"
                            value={newCategory.description}
                            onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                            rows={3}
                            placeholder="Enter category description"
                          />
                        </div>
                        <div>
                          <Label htmlFor="categoryImage">Image URL</Label>
                          <Input
                            id="categoryImage"
                            value={newCategory.image_url}
                            onChange={(e) => setNewCategory({ ...newCategory, image_url: e.target.value })}
                            placeholder="https://example.com/image.jpg"
                          />
                        </div>
                        <Button
                          onClick={editingCategory ? handleUpdateCategory : handleAddCategory}
                          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3"
                        >
                          {editingCategory ? "Update Category" : "Add Category"}
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Products</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {categories.map((category) => (
                      <TableRow key={category.id}>
                        <TableCell className="font-medium">{category.name}</TableCell>
                        <TableCell>{category.description}</TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            {products.filter((p) => p.category_id === category.id).length} products
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline" onClick={() => startEditCategory(category)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleDeleteCategory(category.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="brands">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-2xl font-bold">Brand Management</CardTitle>
                  <Dialog open={isAddBrandOpen} onOpenChange={setIsAddBrandOpen}>
                    <DialogTrigger asChild>
                      <Button
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                        onClick={() => {
                          setEditingBrand(null)
                          setNewBrand({ name: "", logo_url: "", website_url: "" })
                        }}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Brand
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle className="text-2xl font-bold">
                          {editingBrand ? "Edit Brand" : "Add New Brand"}
                        </DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="brandName">Brand Name *</Label>
                          <Input
                            id="brandName"
                            value={newBrand.name}
                            onChange={(e) => setNewBrand({ ...newBrand, name: e.target.value })}
                            placeholder="Enter brand name"
                          />
                        </div>
                        <div>
                          <Label htmlFor="brandLogo">Logo URL</Label>
                          <Input
                            id="brandLogo"
                            value={newBrand.logo_url}
                            onChange={(e) => setNewBrand({ ...newBrand, logo_url: e.target.value })}
                            placeholder="https://example.com/logo.jpg"
                          />
                        </div>
                        <div>
                          <Label htmlFor="brandWebsite">Website URL</Label>
                          <Input
                            id="brandWebsite"
                            value={newBrand.website_url}
                            onChange={(e) => setNewBrand({ ...newBrand, website_url: e.target.value })}
                            placeholder="https://example.com"
                          />
                        </div>
                        <Button
                          onClick={editingBrand ? handleUpdateBrand : handleAddBrand}
                          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3"
                        >
                          {editingBrand ? "Update Brand" : "Add Brand"}
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Logo</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Website</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {brands.map((brand) => (
                      <TableRow key={brand.id}>
                        <TableCell>
                          <Image
                            src={brand.logo_url || "/placeholder.svg?height=40&width=60"}
                            alt={brand.name}
                            width={60}
                            height={40}
                            className="rounded object-contain"
                          />
                        </TableCell>
                        <TableCell className="font-medium">{brand.name}</TableCell>
                        <TableCell>
                          {brand.website_url && (
                            <a
                              href={brand.website_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-800 hover:underline"
                            >
                              Visit Website
                            </a>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline" onClick={() => startEditBrand(brand)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleDeleteBrand(brand.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="inquiries">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-2xl font-bold">Customer Inquiries</CardTitle>
                  <Dialog open={isAddLeadOpen} onOpenChange={setIsAddLeadOpen}>
                    <DialogTrigger asChild>
                      <Button
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                        onClick={() => {
                          setEditingLead(null)
                          setNewLead({
                            name: "",
                            email: "",
                            phone: "",
                            company: "",
                            location: "",
                            message: "",
                            source: "website",
                          })
                        }}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Lead
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle className="text-2xl font-bold">
                          {editingLead ? "Edit Lead" : "Add New Lead"}
                        </DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="leadName">Name *</Label>
                          <Input
                            id="leadName"
                            value={newLead.name}
                            onChange={(e) => setNewLead({ ...newLead, name: e.target.value })}
                            placeholder="Enter name"
                          />
                        </div>
                        <div>
                          <Label htmlFor="leadEmail">Email *</Label>
                          <Input
                            id="leadEmail"
                            type="email"
                            value={newLead.email}
                            onChange={(e) => setNewLead({ ...newLead, email: e.target.value })}
                            placeholder="Enter email"
                          />
                        </div>
                        <div>
                          <Label htmlFor="leadPhone">Phone</Label>
                          <Input
                            id="leadPhone"
                            value={newLead.phone}
                            onChange={(e) => setNewLead({ ...newLead, phone: e.target.value })}
                            placeholder="Enter phone number"
                          />
                        </div>
                        <div>
                          <Label htmlFor="leadCompany">Company</Label>
                          <Input
                            id="leadCompany"
                            value={newLead.company}
                            onChange={(e) => setNewLead({ ...newLead, company: e.target.value })}
                            placeholder="Enter company name"
                          />
                        </div>
                        <div>
                          <Label htmlFor="leadLocation">Location</Label>
                          <Input
                            id="leadLocation"
                            value={newLead.location}
                            onChange={(e) => setNewLead({ ...newLead, location: e.target.value })}
                            placeholder="Enter location"
                          />
                        </div>
                        <div>
                          <Label htmlFor="leadMessage">Message</Label>
                          <Textarea
                            id="leadMessage"
                            value={newLead.message}
                            onChange={(e) => setNewLead({ ...newLead, message: e.target.value })}
                            rows={3}
                            placeholder="Enter message"
                          />
                        </div>
                        <div>
                          <Label htmlFor="leadSource">Source</Label>
                          <Select
                            value={newLead.source}
                            onChange={(e) => setNewLead({ ...newLead, source: e.target.value })}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select source" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="website">Website</SelectItem>
                              <SelectItem value="email">Email</SelectItem>
                              <SelectItem value="phone">Phone</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <Button
                          onClick={editingLead ? handleUpdateLead : handleAddLead}
                          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3"
                        >
                          {editingLead ? "Update Lead" : "Add Lead"}
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Source</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {leads.map((lead) => (
                        <TableRow key={lead.id}>
                          <TableCell className="font-medium">{lead.name}</TableCell>
                          <TableCell>{lead.email}</TableCell>
                          <TableCell>{lead.phone || "N/A"}</TableCell>
                          <TableCell>{lead.company || "N/A"}</TableCell>
                          <TableCell>{lead.location || "N/A"}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{lead.source}</Badge>
                          </TableCell>
                          <TableCell>{new Date(lead.created_at).toLocaleDateString()}</TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline" onClick={() => startEditLead(lead)}>
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleDeleteLead(lead.id)}
                                className="text-red-600 hover:text-red-700"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
