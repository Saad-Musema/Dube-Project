"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!email.trim()) {
      setError("Email is required")
      return
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Email is invalid")
      return
    }

    setError("")
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setIsSubmitted(true)
    }, 1500)
  }

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <Link href="/sign-in" className="absolute left-4 top-4 md:left-8 md:top-8 text-green-700 hover:text-green-600">
        ← Back to sign in
      </Link>
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight text-green-800">Reset your password</h1>
          <p className="text-sm text-muted-foreground">
            Enter your email address and we&apos;ll send you a link to reset your password
          </p>
        </div>

        {isSubmitted ? (
          <div className="bg-green-50 p-4 rounded-md">
            <h3 className="font-medium text-green-800 mb-2">Check your email</h3>
            <p className="text-sm text-green-700">
              We&apos;ve sent a password reset link to <span className="font-medium">{email}</span>. Please check your
              inbox and follow the instructions.
            </p>
            <div className="mt-4">
              <Link href="/sign-in">
                <Button className="w-full bg-green-600 hover:bg-green-700">Return to sign in</Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid gap-6">
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value)
                      if (error) setError("")
                    }}
                    className={error ? "border-red-500" : ""}
                  />
                  {error && <p className="text-xs text-red-500">{error}</p>}
                </div>
                <Button type="submit" className="bg-green-600 hover:bg-green-700" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending reset link...
                    </>
                  ) : (
                    "Send reset link"
                  )}
                </Button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}

