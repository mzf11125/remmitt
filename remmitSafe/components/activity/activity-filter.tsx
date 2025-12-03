"use client"

import { ChevronDownIcon } from "@/components/icons"
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
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
        </svg>
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
