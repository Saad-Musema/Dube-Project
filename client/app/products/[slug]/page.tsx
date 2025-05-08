import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Heart, ShoppingCart, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ProductPage({ params }: { params: { slug: string } }) {
  // Find the product based on the slug
  const product = products.find((p) => p.slug === params.slug)

  if (!product) {
    return <div className="container py-12 text-center">Product not found</div>
  }

  // Find related products from the same category
  const relatedProducts = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4)

  return (
    <div className="container px-4 py-12 md:px-6 md:py-16">
      <div className="flex items-center mb-8">
        <Link href="/products" className="flex items-center text-green-700 hover:text-green-800">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Products
        </Link>
      </div>
      <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
        <div className="space-y-6">
          <div className="overflow-hidden rounded-lg bg-white border">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              width={600}
              height={600}
              className="w-full aspect-square object-cover"
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            <div className="overflow-hidden rounded-lg bg-white border cursor-pointer">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={`${product.name} thumbnail 1`}
                width={150}
                height={150}
                className="w-full aspect-square object-cover"
              />
            </div>
            <div className="overflow-hidden rounded-lg bg-white border cursor-pointer">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={`${product.name} thumbnail 2`}
                width={150}
                height={150}
                className="w-full aspect-square object-cover"
              />
            </div>
            <div className="overflow-hidden rounded-lg bg-white border cursor-pointer">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={`${product.name} thumbnail 3`}
                width={150}
                height={150}
                className="w-full aspect-square object-cover"
              />
            </div>
            <div className="overflow-hidden rounded-lg bg-white border cursor-pointer">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={`${product.name} thumbnail 4`}
                width={150}
                height={150}
                className="w-full aspect-square object-cover"
              />
            </div>
          </div>
        </div>
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold tracking-tight text-green-800">{product.name}</h1>
            <div className="flex items-center gap-4">
              <div className="flex items-center">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <Star className="h-5 w-5 text-gray-300" />
                <span className="ml-2 text-sm text-gray-600">(42 reviews)</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-3xl font-bold text-green-700">${product.price.toFixed(2)}</div>
              {product.oldPrice && (
                <div className="text-lg text-gray-500 line-through">${product.oldPrice.toFixed(2)}</div>
              )}
              {product.oldPrice && (
                <div className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                  Save ${(product.oldPrice - product.price).toFixed(2)}
                </div>
              )}
            </div>
            <p className="text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl
              nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl. Sed euismod, nisl vel ultricies lacinia, nisl
              nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.
            </p>
          </div>
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="color" className="text-base">
                Color
              </Label>
              <RadioGroup id="color" defaultValue="green" className="flex gap-2">
                <Label
                  htmlFor="color-green"
                  className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-green-50 [&:has(:checked)]:border-green-600"
                >
                  <RadioGroupItem id="color-green" value="green" />
                  Green
                </Label>
                <Label
                  htmlFor="color-blue"
                  className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-green-50 [&:has(:checked)]:border-green-600"
                >
                  <RadioGroupItem id="color-blue" value="blue" />
                  Blue
                </Label>
                <Label
                  htmlFor="color-natural"
                  className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-green-50 [&:has(:checked)]:border-green-600"
                >
                  <RadioGroupItem id="color-natural" value="natural" />
                  Natural
                </Label>
              </RadioGroup>
            </div>
            <div className="space-y-2">
              <Label htmlFor="size" className="text-base">
                Size
              </Label>
              <Select defaultValue="m">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="xs">Extra Small</SelectItem>
                  <SelectItem value="s">Small</SelectItem>
                  <SelectItem value="m">Medium</SelectItem>
                  <SelectItem value="l">Large</SelectItem>
                  <SelectItem value="xl">Extra Large</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="quantity" className="text-base">
                Quantity
              </Label>
              <Select defaultValue="1">
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="2">2</SelectItem>
                  <SelectItem value="3">3</SelectItem>
                  <SelectItem value="4">4</SelectItem>
                  <SelectItem value="5">5</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-green-600 hover:bg-green-700 flex-1">
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add to Cart
              </Button>
              <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
                <Heart className="mr-2 h-4 w-4" />
                Add to Wishlist
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-16">
        <Tabs defaultValue="description">
          <TabsList className="w-full border-b justify-start rounded-none h-auto p-0">
            <TabsTrigger
              value="description"
              className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-green-600 data-[state=active]:text-green-700 py-3 px-4"
            >
              Description
            </TabsTrigger>
            <TabsTrigger
              value="details"
              className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-green-600 data-[state=active]:text-green-700 py-3 px-4"
            >
              Details & Specifications
            </TabsTrigger>
            <TabsTrigger
              value="reviews"
              className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-green-600 data-[state=active]:text-green-700 py-3 px-4"
            >
              Reviews (42)
            </TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="pt-6">
            <div className="space-y-4">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl
                nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl. Sed euismod, nisl vel ultricies lacinia, nisl
                nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.
              </p>
              <p>
                Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.
                Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.
              </p>
              <h3 className="text-lg font-medium mt-4">Features</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Made from 100% sustainable materials</li>
                <li>Eco-friendly manufacturing process</li>
                <li>Biodegradable and compostable</li>
                <li>Reduces plastic waste</li>
                <li>Durable and long-lasting</li>
              </ul>
            </div>
          </TabsContent>
          <TabsContent value="details" className="pt-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Product Specifications</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border-b pb-2">
                  <span className="font-medium">Material:</span> Organic Cotton
                </div>
                <div className="border-b pb-2">
                  <span className="font-medium">Dimensions:</span> 10 x 5 x 2 inches
                </div>
                <div className="border-b pb-2">
                  <span className="font-medium">Weight:</span> 0.5 lbs
                </div>
                <div className="border-b pb-2">
                  <span className="font-medium">Country of Origin:</span> USA
                </div>
                <div className="border-b pb-2">
                  <span className="font-medium">Certifications:</span> Fair Trade, GOTS
                </div>
                <div className="border-b pb-2">
                  <span className="font-medium">Care Instructions:</span> Hand wash cold
                </div>
              </div>
              <h3 className="text-lg font-medium mt-4">Shipping Information</h3>
              <p>
                This product ships in plastic-free, recyclable packaging. We use carbon-neutral shipping methods to
                reduce our environmental impact.
              </p>
            </div>
          </TabsContent>
          <TabsContent value="reviews" className="pt-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Customer Reviews</h3>
                <Button className="bg-green-600 hover:bg-green-700">Write a Review</Button>
              </div>
              <div className="space-y-6">
                <div className="border-b pb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    </div>
                    <span className="font-medium">Amazing product!</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    By Sarah J. on <span className="text-gray-900">March 15, 2024</span>
                  </p>
                  <p>
                    I absolutely love this product! It's exactly what I was looking for and the quality is outstanding.
                    Highly recommend to anyone considering it.
                  </p>
                </div>
                <div className="border-b pb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <Star className="h-4 w-4 text-gray-300" />
                    </div>
                    <span className="font-medium">Great eco-friendly option</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    By Michael T. on <span className="text-gray-900">February 28, 2024</span>
                  </p>
                  <p>
                    This product is a great eco-friendly alternative. It works well and I feel good about reducing my
                    environmental impact. The only reason for 4 stars instead of 5 is that it took a little getting used
                    to.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      <div className="mt-16">
        <h2 className="text-2xl font-bold tracking-tight text-green-800 mb-8">You May Also Like</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedProducts.map((relatedProduct) => (
            <Link key={relatedProduct.id} href={`/products/${relatedProduct.slug}`} className="group">
              <div className="overflow-hidden rounded-lg bg-white border">
                <Image
                  src={relatedProduct.image || "/placeholder.svg"}
                  alt={relatedProduct.name}
                  width={300}
                  height={300}
                  className="w-full h-60 object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="mt-4 space-y-2">
                <h3 className="font-medium text-gray-900 group-hover:text-green-700">{relatedProduct.name}</h3>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-green-700">${relatedProduct.price.toFixed(2)}</span>
                  {relatedProduct.oldPrice && (
                    <span className="text-sm text-gray-500 line-through">${relatedProduct.oldPrice.toFixed(2)}</span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

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

