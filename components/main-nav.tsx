import Link from "next/link"

import { siteConfig } from "@/config/site"
import { Icons } from "@/components/icons"
import { Square } from "lucide-react"

export function MainNav() {
  return (
    <div className="flex gap-6 md:gap-10">
      <Link href="/" className="flex items-center space-x-2">
        <Square className="h-9 w-9" />
        <span className="inline-block text-3xl font-bold">
          {siteConfig.name}
        </span>
      </Link>
    </div>
  )
}
