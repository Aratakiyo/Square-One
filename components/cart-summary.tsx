"use client"

import { useState } from "react"
import { Loader2 } from "lucide-react"
import { formatCurrencyString, useShoppingCart } from "use-shopping-cart"

import { Button } from "@/components/ui/button"

export function CartSummary() {
  const {
    cartDetails,
    totalPrice,
    formattedTotalPrice,
    cartCount,
    redirectToCheckout,
  } = useShoppingCart()
  const [selectedDelivery, setSelectedDelivery] = useState("Pickup")
  const [isLoading, setLoading] = useState(false)
  const isDisabled = isLoading || cartCount! === 0
  const deliveryAmount = selectedDelivery === "Delivery" ? 2000 : 0
  const orderTotal = totalPrice! + deliveryAmount

  async function onCheckout() {
    setLoading(true)
    const response = await fetch("/api/checkout", {
      method: "POST",
      body: JSON.stringify({cartDetails, selectedDelivery}),
    })
    const data = await response.json()
    const result = redirectToCheckout(data.id)
    if ((result as { error?: string })?.error) {
      console.error(result)
    }
    setLoading(false)
  }

  const handleDeliveryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedDelivery(event.target.value)
  }

  return (
    <section
      aria-labelledby="summary-heading"
      className="mt-16 rounded-lg border-2 border-gray-200 bg-gray-50 px-4 py-6 shadow-md dark:border-gray-700 dark:bg-gray-900 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
    >
      <h2 id="summary-heading" className="text-lg font-medium">
        Order summary
      </h2>

      <dl className="mt-6 space-y-4">
        <div className="flex items-center justify-between">
          <dt className="text-lg">Subtotal</dt>
          <dd className="text-lg font-medium">{formattedTotalPrice}</dd>
        </div>
        <div className="flex items-center justify-between border-t border-gray-200 pt-4 dark:border-gray-600">
          <dt className="flex items-center text-lg">
            <span> Item Retrieval </span>
          </dt>
          <dd className="text-lg font-medium">
            {selectedDelivery === "Delivery"
              ? formatCurrencyString({ value: deliveryAmount, currency: "TTD" })
              : "TTD 0.00"}
          </dd>
        </div>
        <div className="flex items-center justify-between border-t border-gray-200 pt-4 dark:border-gray-600">
          <dt className="text-base font-medium">Order total</dt>
          <dd className="text-base font-medium">
            {formatCurrencyString({ value: orderTotal, currency: "TTD" })}
          </dd>
        </div>
      </dl>

      <div className="mt-4 flex justify-between border-t border-gray-200 pb-10 pt-7 text-lg dark:border-gray-600">
        <select
          className="rounded border border-gray-300 p-2"
          value={selectedDelivery}
          onChange={handleDeliveryChange}
        >
          <option value="Pickup">Pickup</option>
          <option value="Delivery">Delivery</option>
        </select>
      </div>

      <div className="mt-6">
        <Button onClick={onCheckout} className="w-full" disabled={isDisabled}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isLoading ? "Loading..." : "Checkout"}
        </Button>
      </div>
    </section>
  )
}
