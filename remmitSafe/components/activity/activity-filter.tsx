"use client"

import { ChevronDownIcon, FilterIcon } from "@/components/icons"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import type { TransactionFilter } from "@/lib/types"

interface ActivityFilterProps {
  filter: TransactionFilter
  onFilterChange: (filter: TransactionFilter) => void
}

const filterLabels: Record<TransactionFilter, string> = {
  all: "All Activities",
  send: "Send Only",
  receive: "Receive Only",
}

export function ActivityFilter({ filter, onFilterChange }: ActivityFilterProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2 px-4 py-2 bg-card text-card-foreground rounded-lg border border-border hover:border-primary transition-colors">
        <FilterIcon className="w-4 h-4" />
        {filterLabels[filter]}
        <ChevronDownIcon className="w-4 h-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuItem onClick={() => onFilterChange("all")}>All Activities</DropdownMenuItem>
        <DropdownMenuItem onClick={() => onFilterChange("receive")}>Receive Only</DropdownMenuItem>
        <DropdownMenuItem onClick={() => onFilterChange("send")}>Send Only</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
