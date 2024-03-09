import { NextResponse } from "next/server"
// @ts-ignore
import { validateCartItems } from "use-shopping-cart/utilities"

import { inventory } from "@/config/inventory"
import { stripe } from "@/lib/stripe"

export async function POST(request: Request) {
  const details = await request.json()
  const cartDetails = details.cartDetails
  const selectedDelivery = details.selectedDelivery
  const deliveryCost =
    selectedDelivery === "Delivery"
      ? "shr_1Os9ZC099bwuhoAtgRg5cEK1"
      : "shr_1OsFTi099bwuhoAtx6zvYVKq"
  const lineItems = validateCartItems(inventory, cartDetails)
  const origin = request.headers.get("origin")
  const session = await stripe.checkout.sessions.create({
    submit_type: "pay",
    mode: "payment",
    payment_method_types: ["card"],
    line_items: lineItems,
    shipping_address_collection: {
      allowed_countries: ["TT"],
    },
    shipping_options: [
      {
        shipping_rate: deliveryCost,
      },
    ],
    billing_address_collection: "auto",
    success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/cart`,
  })
  return NextResponse.json(session)
}
