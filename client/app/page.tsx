'use client';

import { useEffect, useState } from "react";
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { fetchFeaturedCategories, fetchFeaturedProducts, Category, Product } from "@/lib/api"

export default function Home() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [categoriesData, productsData] = await Promise.all([
          fetchFeaturedCategories(),
          fetchFeaturedProducts()
        ]);
        setCategories(categoriesData);
        setProducts(productsData);
        setLoading(false);
      } catch (err: any) {
        setError(err?.message || 'Failed to load data');
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-800"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-600">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 w-full border-b bg-white">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-2xl text-green-700">
            <ShoppingBag className="h-6 w-6" />
            <span>GreenMart</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link href="/" className="font-medium text-green-700">
              Home
            </Link>
            <Link href="/categories" className="font-medium text-gray-600 hover:text-green-700">
              Categories
            </Link>
            <Link href="/products" className="font-medium text-gray-600 hover:text-green-700">
              All Products
            </Link>
            <Link href="/about" className="font-medium text-gray-600 hover:text-green-700">
              About
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/cart" className="relative">
              <ShoppingBag className="h-6 w-6 text-gray-600" />
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-green-600 text-xs text-white">
                0
              </span>
            </Link>
            <Link href="/sign-in">
              <Button variant="outline" className="hidden md:flex border-green-600 text-green-600 hover:bg-green-50">
                Sign In
              </Button>
            </Link>
            <Link href="/sign-up">
              <Button className="hidden md:flex bg-green-600 hover:bg-green-700">Sign Up</Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-green-50">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl text-green-800">
                    Eco-Friendly Shopping for a Greener Tomorrow
                  </h1>
                  <p className="max-w-[600px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Discover our curated collection of sustainable products that are good for you and the planet.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/categories">
                    <Button className="bg-green-600 hover:bg-green-700">
                      Shop Categories
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/products">
                    <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
                      View All Products
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex justify-center">
                <Image
                  src="/placeholder.svg?height=550&width=550"
                  width={550}
                  height={550}
                  alt="Hero Image"
                  className="rounded-lg object-cover"
                />
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-green-800">
                  Featured Categories
                </h2>
                <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Explore our most popular product categories
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
              {categories.map((category) => (
                <Link
                  key={category._id}
                  href={`/categories/${category.slug}`}
                  className="group relative overflow-hidden rounded-lg"
                >
                  <Image
                    src={category.image}
                    alt={category.name}
                    width={400}
                    height={300}
                    className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-xl font-bold text-white">{category.name}</h3>
                    <p className="text-sm text-white/80">{category.description}</p>
                  </div>
                </Link>
              ))}
            </div>
            <div className="flex justify-center mt-8">
              <Link href="/categories">
                <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
                  View All Categories
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-green-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-green-800">
                  Best Selling Products
                </h2>
                <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our customers' favorite picks
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
              {products.map((product) => (
                <Link key={product._id} href={`/products/${product._id}`} className="group">
                  <div className="overflow-hidden rounded-lg bg-white">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={300}
                      height={300}
                      className="w-full h-60 object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="mt-4 space-y-2">
                    <h3 className="font-medium text-gray-900 group-hover:text-green-700">{product.name}</h3>
                    <p className="text-sm text-gray-500">{product.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-green-700">${product.price.toFixed(2)}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <div className="flex justify-center mt-8">
              <Link href="/products">
                <Button className="bg-green-600 hover:bg-green-700">
                  Shop All Products
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t bg-white">
        <div className="container flex flex-col gap-6 py-8 md:py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <Link href="/" className="flex items-center gap-2 font-bold text-xl text-green-700">
                <ShoppingBag className="h-5 w-5" />
                <span>GreenMart</span>
              </Link>
              <p className="text-sm text-gray-600">Your one-stop shop for eco-friendly and sustainable products.</p>
            </div>
            <div className="space-y-4">
              <h3 className="font-medium text-green-800">Shop</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/categories" className="text-gray-600 hover:text-green-700">
                    Categories
                  </Link>
                </li>
                <li>
                  <Link href="/products" className="text-gray-600 hover:text-green-700">
                    All Products
                  </Link>
                </li>
                <li>
                  <Link href="/deals" className="text-gray-600 hover:text-green-700">
                    Deals & Offers
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="font-medium text-green-800">Company</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/about" className="text-gray-600 hover:text-green-700">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-600 hover:text-green-700">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-gray-600 hover:text-green-700">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="font-medium text-green-800">Customer Service</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/faq" className="text-gray-600 hover:text-green-700">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="/shipping" className="text-gray-600 hover:text-green-700">
                    Shipping & Returns
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-gray-600 hover:text-green-700">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center border-t pt-6">
            <p className="text-xs text-gray-600">© 2024 GreenMart. All rights reserved.</p>
            <div className="flex items-center gap-4 mt-4 md:mt-0">
              <Link href="#" className="text-gray-600 hover:text-green-700">
                Terms
              </Link>
              <Link href="#" className="text-gray-600 hover:text-green-700">
                Privacy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

