"use client"

// import { useRouter, useSearchParams } from "next/router"
import { useRouter, useSearchParams } from "next/navigation"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"

const filters = [
  {
    id: "category",
    name: "Category",
    options: [
      { value: "alcoholic", label: "Alcoholic" },
      { value: "non-alcoholic", label: "Non-Alcoholic" },
    ],
  },
  {
    id: "type",
    name: "Type",
    options: [
      { value: "water", label: "Water" },
      { value: "soft-drink", label: "Soft-Drink" },
      { value: "juice", label: "Juice" },
      { value: "beer", label: "Beer" },
      { value: "mix", label: "Mix" },
      { value: "rum", label: "Rum" },
      { value: "gin", label: "Gin" },
      { value: "vodka", label: "Vodka" },
      { value: "tequila", label: "Tequila" },
      { value: "liqueur", label: "Liqueur" },
      { value: "wine", label: "Wine" },
      { value: "whiskey", label: "Whiskey" },
      { value: "mead", label: "Mead" },
      { value: "energy-drink", label: "Energy-drink" },
    ],
  },
]

export function ProductFilters() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const searchValues = Array.from(searchParams.entries())

  return (
    <form className="sticky top-20">
      <h3 className="sr-only">Filter</h3>

      {filters.map((section, i) => (
        <Accordion key={i} type="single" collapsible>
          <AccordionItem value={`item-${i}`}>
            <AccordionTrigger>
              <span className="text-xl">
                {section.name}
                {""}
                <span className="ml-1 text-sm font-extrabold uppercase tracking-tight">
                  {searchParams.get(section.id)
                    ? `(${searchParams.get(section.id)})`
                    : ""}
                </span>
              </span>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4 text-lg">
                {section.options.map((option, optionIdx) => (
                  <div
                    key={option.value}
                    className="flex items-center space-x-2"
                  >
                    <Checkbox
                      checked={searchValues.some(
                        ([key, value]) =>
                          key === section.id && value === option.value
                      )}
                      id={`filter-${section.id}-${optionIdx}`}
                      onClick={(event) => {
                        const params = new URLSearchParams(searchParams)
                        const checked =
                          event.currentTarget.dataset.state === "checked"
                        checked
                          ? params.delete(section.id)
                          : params.set(section.id, option.value)
                        router.replace(`/?${params.toString()}`)
                      }}
                    />
                    <label
                      htmlFor={`filter-${section.id}-${optionIdx}`}
                      className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ))}
    </form>
  )
}
