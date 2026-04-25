import { useState, useEffect } from "react"
import { Link, useSearchParams } from "react-router-dom"
import { useAuthStore } from "@/stores/auth-store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SlideOver } from "@/components/ui/slide-over"
import ContractNewModal from "./new"
import {
  Plus,
  Search,
  Filter,
  X,
  FileText,
  ArrowUpRight,
  Clock,
  CheckCircle2,
  AlertCircle,
  Eye,
  MoreHorizontal,
  Shield,
  CreditCard,
  Sparkles,
  PenLine,
} from "lucide-react"
import type { ContractStatus } from "@/types"

// ─── Mock contracts ─────────────────────────────────────

const mockContracts = [
  {
    id: "c1",
    number: "ESC-2026-001",
    title: "Logo & Brand Identity Design",
    clientName: "Rahman Studio",
    clientEmail: "info@rahmanstudio.com",
    spName: "Karim Ahmed",
    type: "service_agreement" as const,
    status: "active" as ContractStatus,
    totalValue: 50000,
    paidValue: 25000,
    milestoneCount: 3,
    milestonesCompleted: 1,
    createdAt: "2026-03-15",
    updatedAt: "2026-04-02",
  },
  {
    id: "c2",
    number: "ESC-2026-002",
    title: "Corporate Website Redesign",
    clientName: "TechCorp BD",
    clientEmail: "hello@techcorp.bd",
    spName: "Karim Ahmed",
    type: "service_nda" as const,
    status: "active" as ContractStatus,
    totalValue: 120000,
    paidValue: 40000,
    milestoneCount: 5,
    milestonesCompleted: 1,
    createdAt: "2026-03-01",
    updatedAt: "2026-04-01",
  },
  {
    id: "c3",
    number: "ESC-2026-003",
    title: "Brand Guidelines Document",
    clientName: "FoodPanda BD",
    clientEmail: "ops@foodpanda.bd",
    spName: "Karim Ahmed",
    type: "service_agreement" as const,
    status: "under_review" as ContractStatus,
    totalValue: 35000,
    paidValue: 0,
    milestoneCount: 2,
    milestonesCompleted: 0,
    createdAt: "2026-03-20",
    updatedAt: "2026-03-28",
  },
  {
    id: "c4",
    number: "ESC-2026-004",
    title: "Mobile App UI/UX Design",
    clientName: "ShopUp",
    clientEmail: "design@shopup.com",
    spName: "Karim Ahmed",
    type: "service_nda" as const,
    status: "signed" as ContractStatus,
    totalValue: 85000,
    paidValue: 85000,
    milestoneCount: 4,
    milestonesCompleted: 0,
    createdAt: "2026-02-15",
    updatedAt: "2026-03-25",
  },
  {
    id: "c5",
    number: "ESC-2026-005",
    title: "Social Media Kit Design",
    clientName: "Daraz BD",
    clientEmail: "marketing@daraz.bd",
    spName: "Karim Ahmed",
    type: "service_agreement" as const,
    status: "draft" as ContractStatus,
    totalValue: 28000,
    paidValue: 0,
    milestoneCount: 2,
    milestonesCompleted: 0,
    createdAt: "2026-03-28",
    updatedAt: "2026-03-28",
  },
  {
    id: "c6",
    number: "ESC-2026-006",
    title: "E-commerce Product Shoot",
    clientName: "Bata Bangladesh",
    clientEmail: "photo@bata.bd",
    spName: "Karim Ahmed",
    type: "service_agreement" as const,
    status: "completed" as ContractStatus,
    totalValue: 45000,
    paidValue: 45000,
    milestoneCount: 3,
    milestonesCompleted: 3,
    createdAt: "2026-01-10",
    updatedAt: "2026-02-28",
  },
  {
    id: "c7",
    number: "ESC-2026-007",
    title: "Annual Report Design",
    clientName: "BRAC",
    clientEmail: "comms@brac.net",
    spName: "Karim Ahmed",
    type: "nda_only" as const,
    status: "sent" as ContractStatus,
    totalValue: 60000,
    paidValue: 0,
    milestoneCount: 3,
    milestonesCompleted: 0,
    createdAt: "2026-04-01",
    updatedAt: "2026-04-01",
  },
]

const statusConfig: Record<ContractStatus, { label: string; color: string; icon: React.ComponentType<{ className?: string }> }> = {
  draft: { label: "Draft", color: "bg-muted text-muted-foreground", icon: FileText },
  sent: { label: "Sent", color: "bg-blue-50 text-blue-700", icon: ArrowUpRight },
  under_review: { label: "Under Review", color: "bg-amber-50 text-amber-700", icon: Eye },
  revision_sent: { label: "Revision Sent", color: "bg-orange-50 text-orange-700", icon: AlertCircle },
  signed: { label: "Signed", color: "bg-indigo-50 text-indigo-700", icon: CheckCircle2 },
  active: { label: "Active", color: "bg-emerald-50 text-emerald-700", icon: CheckCircle2 },
  completed: { label: "Completed", color: "bg-primary/10 text-primary", icon: CheckCircle2 },
  cancelled: { label: "Cancelled", color: "bg-red-50 text-red-700", icon: X },
}

const filterStatuses: ContractStatus[] = ["active", "draft", "sent", "under_review", "signed", "completed"]

export default function ContractsPage() {
  const { user } = useAuthStore()
  const mode = user?.activeMode ?? "sp"
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState<ContractStatus | "all">("all")
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [searchParams, setSearchParams] = useSearchParams()
  const [showNewModal, setShowNewModal] = useState(false)

  useEffect(() => {
    if (searchParams.get("new") === "true") {
      setShowNewModal(true)
    }
  }, [searchParams])

  const handleOpenNew = () => setShowNewModal(true)
  const handleCloseNew = () => {
    setShowNewModal(false)
    searchParams.delete("new")
    setSearchParams(searchParams, { replace: true })
  }

  const filtered = mockContracts.filter((c) => {
    const matchesSearch =
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.clientName.toLowerCase().includes(search.toLowerCase()) ||
      c.number.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = statusFilter === "all" || c.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const selected = mockContracts.find((c) => c.id === selectedId)

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      {/* Main list */}
      <div className="flex flex-1 flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5">
          <div>
            <h1 className="font-heading text-3xl text-foreground">Contracts</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {filtered.length} contract{filtered.length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>

        {/* Create Contract CTA Banner */}
        <div className="mx-6 mb-4">
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-[#2D6A4F]/[0.08] via-[#40916C]/[0.06] to-[#52B788]/[0.04] p-[1px]">
            <div className="relative flex items-center gap-4 rounded-[11px] bg-gradient-to-r from-[#2D6A4F]/[0.06] via-[#40916C]/[0.04] to-[#52B788]/[0.02] px-5 py-3.5">
              {/* Decorative glow */}
              <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-[#52B788]/[0.06] blur-2xl" />
              <div className="pointer-events-none absolute -left-4 -bottom-4 h-20 w-20 rounded-full bg-[#2D6A4F]/[0.05] blur-xl" />

              {/* Icon */}
              <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm ring-1 ring-border/50">
                <PenLine className="h-5 w-5 text-primary" />
              </div>

              {/* Text */}
              <div className="relative min-w-0 flex-1">
                <p className="text-sm font-semibold text-foreground">
                  Create a New Contract
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  Draft, send for e-signature, and get paid — all protected by escrow.
                </p>
              </div>

              {/* CTA Button */}
              <button
                onClick={handleOpenNew}
                className="relative inline-flex shrink-0 items-center gap-1.5 rounded-full border border-border/60 bg-white px-4 py-2 text-xs font-semibold text-foreground shadow-sm transition-all hover:border-primary/40 hover:shadow-md"
              >
                <Sparkles className="h-3.5 w-3.5 text-primary" />
                Create Contract
              </button>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-3 border-b border-border px-6 pb-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search contracts..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          <div className="flex items-center gap-1.5">
            <Filter className="h-4 w-4 text-muted-foreground" />
            {filterStatuses.map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(statusFilter === s ? "all" : s)}
                className={`rounded-full px-2.5 py-1 text-xs font-medium transition-colors ${
                  statusFilter === s
                    ? statusConfig[s].color
                    : "text-muted-foreground hover:bg-muted"
                }`}
              >
                {statusConfig[s].label}
              </button>
            ))}
            {statusFilter !== "all" && (
              <button
                onClick={() => setStatusFilter("all")}
                className="ml-1 rounded-full p-1 text-muted-foreground hover:bg-muted"
              >
                <X className="h-3 w-3" />
              </button>
            )}
          </div>
        </div>

        {/* Table */}
        <div className="flex-1 overflow-x-auto overflow-y-auto">
          <table className="w-full min-w-[700px]">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="px-6 py-3 text-xs font-medium text-muted-foreground">Contract</th>
                <th className="px-4 py-3 text-xs font-medium text-muted-foreground">
                  {mode === "sp" ? "Client" : "Service Provider"}
                </th>
                <th className="px-4 py-3 text-xs font-medium text-muted-foreground">Value</th>
                <th className="px-4 py-3 text-xs font-medium text-muted-foreground">Milestones</th>
                <th className="px-4 py-3 text-xs font-medium text-muted-foreground">Status</th>
                <th className="px-4 py-3 text-xs font-medium text-muted-foreground">Updated</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => {
                const cfg = statusConfig[c.status]
                return (
                  <tr
                    key={c.id}
                    onClick={() => setSelectedId(c.id)}
                    className={`cursor-pointer border-b border-border/50 transition-colors hover:bg-muted/30 ${
                      selectedId === c.id ? "bg-muted/50" : ""
                    }`}
                  >
                    <td className="px-6 py-3.5">
                      <p className="text-sm font-medium text-foreground">{c.title}</p>
                      <p className="mt-0.5 text-xs text-muted-foreground">{c.number}</p>
                    </td>
                    <td className="px-4 py-3.5">
                      <p className="text-sm text-foreground">{mode === "sp" ? c.clientName : c.spName}</p>
                    </td>
                    <td className="px-4 py-3.5">
                      <p className="text-sm font-medium text-foreground">৳{c.totalValue.toLocaleString("en-BD")}</p>
                      {c.paidValue > 0 && (
                        <p className="mt-0.5 text-xs text-muted-foreground">
                          ৳{c.paidValue.toLocaleString("en-BD")} paid
                        </p>
                      )}
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-16 rounded-full bg-muted">
                          <div
                            className="h-full rounded-full bg-primary"
                            style={{ width: `${c.milestoneCount > 0 ? (c.milestonesCompleted / c.milestoneCount) * 100 : 0}%` }}
                          />
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {c.milestonesCompleted}/{c.milestoneCount}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-medium ${cfg.color}`}>
                        {cfg.label}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-xs text-muted-foreground">
                      {new Date(c.updatedAt).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
                    </td>
                    <td className="px-4 py-3.5">
                      <button className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted">
                        <MoreHorizontal className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20">
              <FileText className="h-10 w-10 text-muted-foreground/30" />
              <p className="mt-3 text-sm text-muted-foreground">No contracts found</p>
            </div>
          )}
        </div>
      </div>

      <SlideOver
        open={!!selected}
        onClose={() => setSelectedId(null)}
        title={
          selected ? (
            <div>
              <p className="text-xs text-muted-foreground">{selected.number}</p>
              <h2 className="mt-0.5 font-heading text-xl text-foreground">{selected.title}</h2>
            </div>
          ) : undefined
        }
        footer={
          selected ? (
            <div className="flex gap-3">
              {mode === "sp" ? (
                <>
                  {selected.status === "draft" && <Button className="flex-1">Send to Client</Button>}
                  {selected.status === "active" && <Button className="flex-1">Submit Milestone</Button>}
                  {selected.status === "signed" && (
                    <Button className="flex-1">
                      <Shield className="mr-1.5 h-4 w-4" /> Request Escrow
                    </Button>
                  )}
                  <Button variant="outline" className="flex-1">View Contract</Button>
                </>
              ) : (
                <>
                  {selected.status === "active" && (
                    <>
                      <Button className="flex-1">
                        <CreditCard className="mr-1.5 h-4 w-4" /> Fund Escrow
                      </Button>
                      <Button variant="outline" className="flex-1">Approve Milestone</Button>
                    </>
                  )}
                  {selected.status === "under_review" && <Button className="flex-1">Review & Sign</Button>}
                  <Button variant="outline" className="flex-1">View Contract</Button>
                </>
              )}
            </div>
          ) : undefined
        }
      >
        {selected && (
          <div className="p-6 space-y-6">
            <WhatsNextBanner status={selected.status} />

            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg border border-border p-3.5">
                <p className="text-xs text-muted-foreground">Status</p>
                <span className={`mt-1.5 inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${statusConfig[selected.status].color}`}>
                  {statusConfig[selected.status].label}
                </span>
              </div>
              <div className="rounded-lg border border-border p-3.5">
                <p className="text-xs text-muted-foreground">Total Value</p>
                <p className="mt-1.5 font-heading text-lg text-foreground">
                  ৳{selected.totalValue.toLocaleString("en-BD")}
                </p>
              </div>
            </div>

            <div className="rounded-lg border border-border p-4">
              <p className="text-xs font-medium text-muted-foreground">
                {mode === "sp" ? "Client" : "Service Provider"}
              </p>
              <div className="mt-2 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                  {(mode === "sp" ? selected.clientName : selected.spName).charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {mode === "sp" ? selected.clientName : selected.spName}
                  </p>
                  <p className="text-xs text-muted-foreground">{selected.clientEmail}</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-foreground">Milestones</h3>
              <div className="mt-3 space-y-2">
                {Array.from({ length: selected.milestoneCount }, (_, i) => {
                  const completed = i < selected.milestonesCompleted
                  const current = i === selected.milestonesCompleted
                  return (
                    <div
                      key={i}
                      className={`flex items-center justify-between rounded-lg border p-3 ${
                        completed
                          ? "border-emerald-200 bg-emerald-50/50"
                          : current
                            ? "border-primary/30 bg-primary/5"
                            : "border-border"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        {completed ? (
                          <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                        ) : current ? (
                          <Clock className="h-4 w-4 text-primary" />
                        ) : (
                          <div className="h-4 w-4 rounded-full border-2 border-muted-foreground/20" />
                        )}
                        <span className="text-sm text-foreground">Milestone {i + 1}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        ৳{Math.round(selected.totalValue / selected.milestoneCount).toLocaleString("en-BD")}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-medium text-foreground">Details</h3>
              <div className="grid grid-cols-2 gap-y-3 text-sm">
                <span className="text-muted-foreground">Type</span>
                <span className="text-foreground capitalize">{selected.type.replace(/_/g, " ")}</span>
                <span className="text-muted-foreground">Created</span>
                <span className="text-foreground">
                  {new Date(selected.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                </span>
                <span className="text-muted-foreground">Paid</span>
                <span className="text-foreground">
                  ৳{selected.paidValue.toLocaleString("en-BD")} of ৳{selected.totalValue.toLocaleString("en-BD")}
                </span>
              </div>
            </div>
          </div>
        )}
      </SlideOver>

      {/* New Contract Modal */}
      <ContractNewModal open={showNewModal} onClose={handleCloseNew} />
    </div>
  )
}

function WhatsNextBanner({ status }: { status: ContractStatus }) {
  const messages: Partial<Record<ContractStatus, { text: string; color: string }>> = {
    draft: { text: "This contract is a draft. Review and send it to your client.", color: "bg-muted border-muted-foreground/20" },
    sent: { text: "Waiting for the client to review and sign this contract.", color: "bg-blue-50 border-blue-200" },
    under_review: { text: "The client is reviewing this contract. You'll be notified when they sign.", color: "bg-amber-50 border-amber-200" },
    signed: { text: "Contract signed! The client can now fund the escrow to begin work.", color: "bg-indigo-50 border-indigo-200" },
    active: { text: "Work is in progress. Submit milestones as you complete them.", color: "bg-emerald-50 border-emerald-200" },
    completed: { text: "This contract has been completed. All milestones delivered and paid.", color: "bg-primary/5 border-primary/20" },
  }
  const msg = messages[status]
  if (!msg) return null

  return (
    <div className={`rounded-lg border p-3.5 ${msg.color}`}>
      <p className="text-xs font-medium text-foreground/70">What's Next</p>
      <p className="mt-1 text-sm text-foreground/80">{msg.text}</p>
    </div>
  )
}
