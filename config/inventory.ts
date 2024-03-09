import { Image } from "sanity"

interface InventoryProduct {
  id: string
  name: string
  image: string
  images: string[]
  categories: string[]
  types: string[]
  price: number
  currency: string
  description: string
  sku: string
}

export interface SanityProduct extends Omit<InventoryProduct, "images"> {
  _id: string
  _createdAt: Date
  slug: string
  images: Image[]
}

export const inventory: InventoryProduct[] = [
  {
    id: "88cf4cd8-1d2c-473b-88cd-997cad1f7bfb",
    sku: "carib",
    name: "Carib",
    description: `A drink`,
    price: 1100,
    image: "",
    images: [""],
    categories: ["alcoholic"],
    types: ["beer"],
    currency: "TTD",
  },
  {
    id: "e0efd8ec-d254-4e33-808a-5f8f78002113",
    sku: "stag",
    name: "Stag",
    description: `A drink`,
    price: 1100,
    image: "",
    images: [""],
    categories: ["alcoholic"],
    types: ["beer"],
    currency: "TTD",
  },
  {
    id: "fb59a201-d762-48d7-b0ea-d4ab5fccb537",
    sku: "redbull",
    name: "Redbull",
    description: `A energy drink`,
    price: 2000,
    image: "",
    images: [""],
    categories: ["non-alcoholic"],
    types: ["energy-drink"],
    currency: "TTD",
  },
  {
    id: "b631ba62-3e4b-42f6-b770-88f8bce400cc",
    sku: "sprite",
    name: "Sprite",
    description: `A soft drink`,
    price: 700,
    image: "",
    images: [""],
    categories: ["non-alcoholic"],
    types: ["soft-drink"],
    currency: "TTD",
  },
]
