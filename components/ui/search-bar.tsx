"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function SearchBar({onClick}: {onClick: any}) {
  return (
    <div className="flex w-full items-center space-x-2">
      <Input type="email" placeholder="Describe a situation that requires music" />
      <Button type="submit" onClick={onClick}>Submit</Button>
    </div>
  )
}
