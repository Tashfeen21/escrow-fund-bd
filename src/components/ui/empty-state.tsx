import { Button } from "@/components/ui/button"
import { FileText, Users, CreditCard, FolderOpen, Plus } from "lucide-react"

interface EmptyStateProps {
  icon?: React.ComponentType<{ className?: string }>
  title: string
  description: string
  actionLabel?: string
  onAction?: () => void
}

export function EmptyState({ icon: Icon = FileText, title, description, actionLabel, onAction }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-muted/60">
        <Icon className="h-7 w-7 text-muted-foreground/50" />
      </div>
      <h3 className="mt-5 font-heading text-lg text-foreground">{title}</h3>
      <p className="mt-2 max-w-sm text-sm text-muted-foreground">{description}</p>
      {actionLabel && onAction && (
        <Button className="mt-6" onClick={onAction}>
          <Plus className="mr-1.5 h-4 w-4" />
          {actionLabel}
        </Button>
      )}
    </div>
  )
}

// Pre-built empty states for common pages
export function NoContracts({ onAction }: { onAction?: () => void }) {
  return (
    <EmptyState
      icon={FileText}
      title="No contracts yet"
      description="Create your first contract to start working with escrow-protected payments."
      actionLabel="Create Contract"
      onAction={onAction}
    />
  )
}

export function NoClients({ onAction }: { onAction?: () => void }) {
  return (
    <EmptyState
      icon={Users}
      title="No clients yet"
      description="Add your first client or they'll appear here once you send them a contract."
      actionLabel="Add Client"
      onAction={onAction}
    />
  )
}

export function NoTransactions() {
  return (
    <EmptyState
      icon={CreditCard}
      title="No transactions yet"
      description="Transactions will appear here once escrow payments are processed."
    />
  )
}

export function NoDocuments({ onAction }: { onAction?: () => void }) {
  return (
    <EmptyState
      icon={FolderOpen}
      title="No documents yet"
      description="Contracts, NDAs, and receipts will appear here as you complete projects."
    />
  )
}
