'use client';

import { useEffect, useState } from "react";
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { fetchProducts } from "@/lib/api"

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
        setLoading(false);
      } catch (err: any) {
        setError(err?.message || 'An error occurred');
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="container px-4 py-12 md:px-6 md:py-16">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-800"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container px-4 py-12 md:px-6 md:py-16">
        <div className="text-center text-red-600">
          <p>Error loading products: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container px-4 py-12 md:px-6 md:py-16">
      <div className="flex flex-col items-start space-y-4 mb-8">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl text-green-800">All Products</h1>
        <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
          Browse our complete collection of eco-friendly and sustainable products
        </p>
      </div>
      <div className="mb-6">
        <Input 
          type="search" 
          placeholder="Search products..." 
          className="w-full max-w-md" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredProducts.map((product) => (
          <div key={product._id} className="border rounded-lg overflow-hidden shadow-sm bg-white">
            <Link href={`/products/${product._id}`}>
              <Image
                src={product.image || '/placeholder-product.jpg'}
                alt={product.name}
                width={400}
                height={400}
                className="w-full h-64 object-cover"
              />
            </Link>
            <div className="p-4 space-y-2">
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-sm text-gray-600">{product.description}</p>
              <div className="flex items-center justify-between">
                <span className="font-bold text-green-700">${product.price}</span>
                <Button size="sm">Add to Cart</Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

