import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

export default function CategoriesPage() {
  return (
    <div className="container px-4 py-12 md:px-6 md:py-16 lg:py-24">
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-green-800">
            Product Categories
          </h1>
          <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Browse our wide range of eco-friendly and sustainable products
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/categories/${category.slug}`}
            className="group relative overflow-hidden rounded-lg"
          >
            <Image
              src={category.image || "/placeholder.svg"}
              alt={category.name}
              width={400}
              height={300}
              className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h3 className="text-xl font-bold text-white">{category.name}</h3>
              <p className="text-sm text-white/80">{category.productCount} Products</p>
              <div className="mt-2 flex items-center text-white">
                <span className="text-sm">View Category</span>
                <ArrowRight className="ml-1 h-4 w-4" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

// Mock data for all categories
const categories = [
  {
    id: 1,
    name: "Eco-Friendly Home",
    slug: "eco-friendly-home",
    productCount: 42,
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: 2,
    name: "Sustainable Fashion",
    slug: "sustainable-fashion",
    productCount: 36,
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: 3,
    name: "Organic Food",
    slug: "organic-food",
    productCount: 28,
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: 4,
    name: "Natural Beauty",
    slug: "natural-beauty",
    productCount: 24,
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: 5,
    name: "Zero Waste",
    slug: "zero-waste",
    productCount: 18,
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: 6,
    name: "Eco-Friendly Gifts",
    slug: "eco-friendly-gifts",
    productCount: 15,
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: 7,
    name: "Sustainable Kids",
    slug: "sustainable-kids",
    productCount: 22,
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: 8,
    name: "Green Technology",
    slug: "green-technology",
    productCount: 14,
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: 9,
    name: "Eco-Friendly Pets",
    slug: "eco-friendly-pets",
    productCount: 12,
    image: "/placeholder.svg?height=300&width=400",
  },
]

