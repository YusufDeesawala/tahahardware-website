"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface SpecificationsModalProps {
  isOpen: boolean
  onClose: () => void
  product: any
}

export default function SpecificationsModal({ isOpen, onClose, product }: SpecificationsModalProps) {
  if (!product || !product.specifications) return null

  const categoryName = product.categories?.name?.toLowerCase() || ""
  const specs = product.specifications

  const renderHoseSpecifications = () => {
    // Check if we have size-specific data
    if (specs.size_specifications && Array.isArray(specs.size_specifications)) {
      return (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-blue-50 to-slate-50 p-4 rounded-lg">
            <h4 className="font-semibold text-slate-800 mb-2">Size-Specific Specifications</h4>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-semibold">Size</TableHead>
                  <TableHead className="font-semibold">Max Pressure</TableHead>
                  <TableHead className="font-semibold">Temperature Range</TableHead>
                  <TableHead className="font-semibold">Bend Radius</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {specs.size_specifications.map((item: any, index: number) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{item.size || "N/A"}</TableCell>
                    <TableCell>{item.pressure || "N/A"}</TableCell>
                    <TableCell>{item.temperature || "N/A"}</TableCell>
                    <TableCell>{item.bend_radius || "N/A"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Additional general specifications */}
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(specs)
              .filter(([key]) => key !== "size_specifications")
              .map(([key, value]) => (
                <div key={key} className="bg-gray-50 p-3 rounded-lg">
                  <span className="text-sm font-medium text-slate-700 capitalize block">{key.replace(/_/g, " ")}:</span>
                  <span className="text-slate-600">{value as string}</span>
                </div>
              ))}
          </div>
        </div>
      )
    }

    // Fallback to regular specifications if no size-specific data
    return renderDefaultSpecifications()
  }

  const renderPneumaticSpecifications = () => {
    // Check if we have performance specifications
    if (specs.performance_specs && typeof specs.performance_specs === "object") {
      const perfSpecs = specs.performance_specs
      return (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-blue-50 to-slate-50 p-4 rounded-lg">
            <h4 className="font-semibold text-slate-800 mb-4">Performance Specifications</h4>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-slate-600">Operating Pressure:</span>
                  <span className="font-medium">{perfSpecs.operating_pressure || "N/A"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Flow Rate:</span>
                  <span className="font-medium">{perfSpecs.flow_rate || "N/A"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Temperature Range:</span>
                  <span className="font-medium">{perfSpecs.temperature_range || "N/A"}</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-slate-600">Connection Size:</span>
                  <span className="font-medium">{perfSpecs.connection_size || "N/A"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Material:</span>
                  <span className="font-medium">{perfSpecs.material || "N/A"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Mounting:</span>
                  <span className="font-medium">{perfSpecs.mounting || "N/A"}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Additional specs */}
          <div className="grid grid-cols-3 gap-3">
            {Object.entries(specs)
              .filter(([key]) => key !== "performance_specs")
              .map(([key, value]) => (
                <div key={key} className="bg-gray-50 p-3 rounded-lg text-center">
                  <span className="text-xs font-medium text-slate-700 capitalize block">{key.replace(/_/g, " ")}</span>
                  <span className="text-sm text-slate-600">{value as string}</span>
                </div>
              ))}
          </div>
        </div>
      )
    }

    return renderDefaultSpecifications()
  }

  const renderNutsBoltsSpecifications = () => {
    // Check if we have grades and sizes data
    if (specs.available_options && typeof specs.available_options === "object") {
      const options = specs.available_options
      return (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-blue-50 to-slate-50 p-4 rounded-lg">
            <h4 className="font-semibold text-slate-800 mb-4">Available Options</h4>
            <div className="grid grid-cols-2 gap-6">
              {options.grades && (
                <div>
                  <h5 className="font-medium text-slate-700 mb-3">Material Grades</h5>
                  <div className="flex flex-wrap gap-2">
                    {options.grades.map((grade: string, index: number) => (
                      <Badge key={index} variant="outline" className="bg-white">
                        {grade}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              {options.sizes && (
                <div>
                  <h5 className="font-medium text-slate-700 mb-3">Available Sizes</h5>
                  <div className="flex flex-wrap gap-2">
                    {options.sizes.map((size: string, index: number) => (
                      <Badge key={index} variant="outline" className="bg-white">
                        {size}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {Object.entries(specs)
              .filter(([key]) => key !== "available_options")
              .map(([key, value]) => (
                <div key={key} className="bg-gray-50 p-3 rounded-lg">
                  <span className="text-sm font-medium text-slate-700 capitalize block">{key.replace(/_/g, " ")}:</span>
                  <span className="text-slate-600">{value as string}</span>
                </div>
              ))}
          </div>
        </div>
      )
    }

    return renderDefaultSpecifications()
  }

  const renderRubberSheetSpecifications = () => {
    // Check if we have thickness and hardness options
    if (specs.available_options && typeof specs.available_options === "object") {
      const options = specs.available_options
      return (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-blue-50 to-slate-50 p-4 rounded-lg">
            <h4 className="font-semibold text-slate-800 mb-4">Available Options</h4>
            <div className="grid grid-cols-2 gap-6">
              {options.thickness && (
                <div>
                  <h5 className="font-medium text-slate-700 mb-3">Thickness Options</h5>
                  <div className="grid grid-cols-4 gap-2">
                    {options.thickness.map((thickness: string, index: number) => (
                      <Badge key={index} variant="outline" className="bg-white text-center">
                        {thickness}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              {options.hardness && (
                <div>
                  <h5 className="font-medium text-slate-700 mb-3">Hardness Ratings</h5>
                  <div className="grid grid-cols-3 gap-2">
                    {options.hardness.map((rating: string, index: number) => (
                      <Badge key={index} variant="outline" className="bg-white text-center">
                        {rating}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {Object.entries(specs)
              .filter(([key]) => key !== "available_options")
              .map(([key, value]) => (
                <div key={key} className="bg-gray-50 p-3 rounded-lg">
                  <span className="text-sm font-medium text-slate-700 capitalize block">{key.replace(/_/g, " ")}:</span>
                  <span className="text-slate-600">{value as string}</span>
                </div>
              ))}
          </div>
        </div>
      )
    }

    return renderDefaultSpecifications()
  }

  const renderDefaultSpecifications = () => {
    return (
      <div className="grid grid-cols-2 gap-4">
        {Object.entries(specs).map(([key, value]) => (
          <div key={key} className="bg-gray-50 p-4 rounded-lg">
            <span className="text-sm font-medium text-slate-700 capitalize block mb-1">{key.replace(/_/g, " ")}:</span>
            <span className="text-slate-600">
              {typeof value === "object" ? JSON.stringify(value) : (value as string)}
            </span>
          </div>
        ))}
      </div>
    )
  }

  const renderSpecifications = () => {
    if (categoryName.includes("hose")) {
      return renderHoseSpecifications()
    } else if (categoryName.includes("brush")) {
      return renderDefaultSpecifications()
    } else if (categoryName.includes("pneumatic")) {
      return renderPneumaticSpecifications()
    } else if (categoryName.includes("nuts") || categoryName.includes("bolt")) {
      return renderNutsBoltsSpecifications()
    } else if (categoryName.includes("rubber")) {
      return renderRubberSheetSpecifications()
    } else {
      return renderDefaultSpecifications()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-slate-800 flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-slate-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm font-bold">S</span>
            </div>
            {product.name} - Specifications
          </DialogTitle>
          <Badge className="w-fit bg-blue-100 text-blue-800">{product.categories?.name || "Product"}</Badge>
        </DialogHeader>

        <div className="mt-6">{renderSpecifications()}</div>
      </DialogContent>
    </Dialog>
  )
}
