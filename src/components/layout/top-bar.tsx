import { Search, Menu } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { useAuthStore } from "@/stores/auth-store"
import { NotificationsDropdown } from "./notifications-dropdown"

interface TopBarProps {
  onMenuClick?: () => void
}

export function TopBar({ onMenuClick }: TopBarProps) {
  const { user } = useAuthStore()
  const mode = user?.activeMode ?? "sp"

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background-card px-4 md:px-8">
      <div className="flex items-center gap-3">
        {/* Hamburger — mobile only */}
        <button
          onClick={onMenuClick}
          className="rounded-lg p-2 text-muted-foreground hover:bg-muted lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="relative hidden w-80 sm:block">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-placeholder" />
          <Input
            placeholder="Search contracts, clients, payments..."
            className="pl-10"
          />
        </div>
      </div>

      <div className="flex items-center gap-3 md:gap-4">
        <Badge variant="outline" className="hidden border-primary/20 text-primary sm:inline-flex">
          {mode === "sp" ? "Service Provider" : "Client"} Mode
        </Badge>
        <NotificationsDropdown />
      </div>
    </header>
  )
}
