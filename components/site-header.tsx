"use client"

import Link from "next/link"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Edit, ShoppingBag } from "lucide-react"
import { useShoppingCart } from "use-shopping-cart"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MainNav } from "@/components/main-nav"
import { ThemeToggle } from "@/components/theme-toggle"

export function SiteHeader() {
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()
  const { cartCount } = useShoppingCart()
  const defaultSeachQuery = searchParams.get("search") ?? ""

  if (pathname.startsWith("/studio")) return null

  function onSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)
    const search = formData.get("search")
    router.replace(`/?search=${search}`)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between space-x-4 px-6 sm:space-x-0">
        <MainNav />
        <form
          onSubmit={onSubmit}
          className="h-10 text-sm lg:w-[350px]"
        >
          <Input
            id="search"
            name="search"
            type="search"
            autoComplete="off"
            placeholder="Search products..."
            className="h-10 text-lg font-black lg:w-[350px]"
            defaultValue={defaultSeachQuery}
          />
        </form>
        <div className="flex items-center space-x-1">
          <Link href="/cart">
            <Button size="sm" variant="ghost">
              <ShoppingBag className="h-7 w-7" />
              <span className="ml-2 text-sm font-bold">{cartCount}</span>
              <span className="sr-only">Cart</span>
            </Button>
          </Link>
          <ThemeToggle />
          {process.env.NODE_ENV === "development" && (
            <Link href="/studio">
              <Button size="sm" variant="ghost">
                <Edit className="h-7 w-7" />
                <span className="sr-only">Admin</span>
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}
