import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Filter } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function CategoryPage({ params }: { params: { slug: string } }) {
  // Find the category based on the slug
  const category = categories.find((cat) => cat.slug === params.slug)

  // Find products for this category
  const categoryProducts = products.filter((product) => product.category === category?.name)

  if (!category) {
    return <div className="container py-12 text-center">Category not found</div>
  }

  return (
    <div className="container px-4 py-12 md:px-6 md:py-16">
      <div className="flex items-center mb-8">
        <Link href="/categories" className="flex items-center text-green-700 hover:text-green-800">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Categories
        </Link>
      </div>
      <div className="flex flex-col items-start space-y-4 mb-8">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl text-green-800">{category.name}</h1>
        <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
          {category.description}
        </p>
      </div>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-1/4 space-y-6">
          <div className="border rounded-lg p-4 bg-white">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-lg">Filters</h3>
              <Button variant="ghost" size="sm" className="text-green-700 hover:text-green-800 hover:bg-green-50">
                Clear All
              </Button>
            </div>
            <div className="space-y-6">
              <div>
                <h4 className="font-medium mb-3">Price Range</h4>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="price-1" />
                    <Label htmlFor="price-1" className="text-sm font-normal">
                      Under $25
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="price-2" />
                    <Label htmlFor="price-2" className="text-sm font-normal">
                      $25 to $50
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="price-3" />
                    <Label htmlFor="price-3" className="text-sm font-normal">
                      $50 to $100
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="price-4" />
                    <Label htmlFor="price-4" className="text-sm font-normal">
                      Over $100
                    </Label>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-3">Brand</h4>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="brand-1" />
                    <Label htmlFor="brand-1" className="text-sm font-normal">
                      EcoLife
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="brand-2" />
                    <Label htmlFor="brand-2" className="text-sm font-normal">
                      GreenEarth
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="brand-3" />
                    <Label htmlFor="brand-3" className="text-sm font-normal">
                      NaturePure
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="brand-4" />
                    <Label htmlFor="brand-4" className="text-sm font-normal">
                      SustainCo
                    </Label>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-3">Rating</h4>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="rating-1" />
                    <Label htmlFor="rating-1" className="text-sm font-normal flex items-center">
                      4 Stars & Up
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="rating-2" />
                    <Label htmlFor="rating-2" className="text-sm font-normal flex items-center">
                      3 Stars & Up
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="rating-3" />
                    <Label htmlFor="rating-3" className="text-sm font-normal flex items-center">
                      2 Stars & Up
                    </Label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-3/4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <p className="text-gray-600 mb-4 sm:mb-0">
              Showing <span className="font-medium">{categoryProducts.length}</span> products
            </p>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="lg:hidden">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
              <Select defaultValue="featured">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="newest">Newest Arrivals</SelectItem>
                  <SelectItem value="bestselling">Best Selling</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryProducts.map((product) => (
              <Link key={product.id} href={`/products/${product.slug}`} className="group">
                <div className="overflow-hidden rounded-lg bg-white border">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    width={300}
                    height={300}
                    className="w-full h-60 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="mt-4 space-y-2">
                  <h3 className="font-medium text-gray-900 group-hover:text-green-700">{product.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-green-700">${product.price.toFixed(2)}</span>
                    {product.oldPrice && (
                      <span className="text-sm text-gray-500 line-through">${product.oldPrice.toFixed(2)}</span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// Mock data for categories with descriptions
const categories = [
  {
    id: 1,
    name: "Eco-Friendly Home",
    slug: "eco-friendly-home",
    productCount: 42,
    image: "/placeholder.svg?height=300&width=400",
    description:
      "Transform your living space with our collection of eco-friendly home products. From biodegradable cleaning supplies to energy-efficient appliances, we have everything you need to create a sustainable home environment.",
  },
  {
    id: 2,
    name: "Sustainable Fashion",
    slug: "sustainable-fashion",
    productCount: 36,
    image: "/placeholder.svg?height=300&width=400",
    description:
      "Discover our range of sustainable fashion items made from organic and recycled materials. Our collection includes clothing, accessories, and footwear that are stylish, comfortable, and kind to the planet.",
  },
  {
    id: 3,
    name: "Organic Food",
    slug: "organic-food",
    productCount: 28,
    image: "/placeholder.svg?height=300&width=400",
    description:
      "Nourish your body with our selection of organic food products. From fresh produce to pantry staples, all our food items are grown without synthetic pesticides or fertilizers, ensuring you get the best quality nutrition.",
  },
  {
    id: 4,
    name: "Natural Beauty",
    slug: "natural-beauty",
    productCount: 24,
    image: "/placeholder.svg?height=300&width=400",
    description:
      "Enhance your natural beauty with our range of organic and cruelty-free beauty products. From skincare to makeup, our products are free from harmful chemicals and never tested on animals.",
  },
  {
    id: 5,
    name: "Zero Waste",
    slug: "zero-waste",
    productCount: 18,
    image: "/placeholder.svg?height=300&width=400",
    description:
      "Reduce your environmental footprint with our zero waste products. From reusable containers to plastic-free alternatives, these products help minimize waste and promote a more sustainable lifestyle.",
  },
  {
    id: 6,
    name: "Eco-Friendly Gifts",
    slug: "eco-friendly-gifts",
    productCount: 15,
    image: "/placeholder.svg?height=300&width=400",
    description:
      "Find the perfect sustainable gift for your loved ones. Our eco-friendly gift collection includes unique items that are both thoughtful and environmentally conscious.",
  },
  {
    id: 7,
    name: "Sustainable Kids",
    slug: "sustainable-kids",
    productCount: 22,
    image: "/placeholder.svg?height=300&width=400",
    description:
      "Nurture your children with our range of sustainable kids' products. From organic clothing to eco-friendly toys, these items are safe for your children and the environment.",
  },
  {
    id: 8,
    name: "Green Technology",
    slug: "green-technology",
    productCount: 14,
    image: "/placeholder.svg?height=300&width=400",
    description:
      "Discover innovative green technology products that help reduce energy consumption and environmental impact. From solar-powered devices to energy-efficient gadgets, these products combine sustainability with cutting-edge technology.",
  },
  {
    id: 9,
    name: "Eco-Friendly Pets",
    slug: "eco-friendly-pets",
    productCount: 12,
    image: "/placeholder.svg?height=300&width=400",
    description:
      "Take care of your pets while being kind to the planet with our eco-friendly pet products. From biodegradable waste bags to sustainable toys and organic pet food, we have everything for your environmentally conscious pet.",
  },
]

// Mock data for products
const products = [
  {
    id: 1,
    name: "Bamboo Toothbrush Set",
    slug: "bamboo-toothbrush-set",
    category: "Eco-Friendly Home",
    price: 12.99,
    oldPrice: 16.99,
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 2,
    name: "Organic Cotton T-Shirt",
    slug: "organic-cotton-t-shirt",
    category: "Sustainable Fashion",
    price: 24.99,
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 3,
    name: "Reusable Produce Bags",
    slug: "reusable-produce-bags",
    category: "Eco-Friendly Home",
    price: 9.99,
    oldPrice: 14.99,
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 4,
    name: "Organic Herbal Tea",
    slug: "organic-herbal-tea",
    category: "Organic Food",
    price: 8.99,
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 5,
    name: "Recycled Glass Water Bottle",
    slug: "recycled-glass-water-bottle",
    category: "Eco-Friendly Home",
    price: 19.99,
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 6,
    name: "Natural Face Serum",
    slug: "natural-face-serum",
    category: "Natural Beauty",
    price: 29.99,
    oldPrice: 34.99,
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 7,
    name: "Biodegradable Phone Case",
    slug: "biodegradable-phone-case",
    category: "Green Technology",
    price: 15.99,
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 8,
    name: "Organic Baby Onesie",
    slug: "organic-baby-onesie",
    category: "Sustainable Kids",
    price: 18.99,
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 9,
    name: "Compostable Waste Bags",
    slug: "compostable-waste-bags",
    category: "Eco-Friendly Pets",
    price: 7.99,
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 10,
    name: "Beeswax Food Wraps",
    slug: "beeswax-food-wraps",
    category: "Zero Waste",
    price: 14.99,
    oldPrice: 19.99,
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 11,
    name: "Sustainable Gift Box",
    slug: "sustainable-gift-box",
    category: "Eco-Friendly Gifts",
    price: 39.99,
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 12,
    name: "Solar Powered Charger",
    slug: "solar-powered-charger",
    category: "Green Technology",
    price: 49.99,
    oldPrice: 59.99,
    image: "/placeholder.svg?height=300&width=300",
  },
]

