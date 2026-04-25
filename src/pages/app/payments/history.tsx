import { useState } from "react"
import { Input } from "@/components/ui/input"
import { SlideOver } from "@/components/ui/slide-over"
import { Search, ArrowUpRight, ArrowDownLeft, Shield, CreditCard, X } from "lucide-react"

const transactions = [
  { id: "1", type: "released", title: "Milestone payment released", contract: "Logo Design", party: "Rahman Studio", amount: 25000, direction: "in" as const, method: "bKash", date: "Apr 3, 2026", status: "confirmed" as const },
  { id: "2", type: "escrow_funded", title: "Escrow funded by client", contract: "Website Redesign", party: "TechCorp BD", amount: 40000, direction: "in" as const, method: "Bank", date: "Apr 1, 2026", status: "confirmed" as const },
  { id: "3", type: "withdrawal", title: "Withdrawal to bKash", contract: "", party: "Self", amount: 50000, direction: "out" as const, method: "bKash", date: "Mar 30, 2026", status: "confirmed" as const },
  { id: "4", type: "released", title: "Milestone payment released", contract: "E-commerce Shoot", party: "Bata Bangladesh", amount: 15000, direction: "in" as const, method: "Nagad", date: "Mar 25, 2026", status: "confirmed" as const },
  { id: "5", type: "fee", title: "Platform fee", contract: "Logo Design", party: "EscrowBD", amount: 750, direction: "out" as const, method: "Auto", date: "Mar 25, 2026", status: "confirmed" as const },
  { id: "6", type: "escrow_funded", title: "Escrow funded by client", contract: "Mobile App UI/UX", party: "ShopUp", amount: 85000, direction: "in" as const, method: "Bank", date: "Mar 20, 2026", status: "confirmed" as const },
  { id: "7", type: "released", title: "Final payment released", contract: "E-commerce Shoot", party: "Bata Bangladesh", amount: 30000, direction: "in" as const, method: "bKash", date: "Mar 15, 2026", status: "confirmed" as const },
  { id: "8", type: "withdrawal", title: "Withdrawal to bank", contract: "", party: "Self", amount: 30000, direction: "out" as const, method: "Bank", date: "Mar 10, 2026", status: "confirmed" as const },
]

const typeFilter = ["all", "released", "escrow_funded", "withdrawal", "fee"] as const

export default function TransactionHistoryPage() {
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState<string>("all")
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const filtered = transactions.filter((t) => {
    const matchSearch = t.title.toLowerCase().includes(search.toLowerCase()) || t.contract.toLowerCase().includes(search.toLowerCase())
    const matchType = filter === "all" || t.type === filter
    return matchSearch && matchType
  })

  const selected = transactions.find((t) => t.id === selectedId)

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      <div className="flex flex-1 flex-col">
        <div className="px-6 py-5">
          <h1 className="font-heading text-3xl text-foreground">Transaction History</h1>
          <p className="mt-1 text-sm text-muted-foreground">{filtered.length} transactions</p>
        </div>

        <div className="flex items-center gap-3 border-b border-border px-6 pb-4">
          <div className="relative max-w-sm flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search transactions..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
          </div>
          <div className="flex gap-1.5">
            {typeFilter.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`rounded-full px-2.5 py-1 text-xs font-medium capitalize transition-colors ${
                  filter === f ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted"
                }`}
              >
                {f === "all" ? "All" : f.replace("_", " ")}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {filtered.map((t) => (
            <button
              key={t.id}
              onClick={() => setSelectedId(t.id)}
              className={`flex w-full items-center justify-between border-b border-border/50 px-6 py-4 text-left transition-colors hover:bg-muted/30 ${selectedId === t.id ? "bg-muted/50" : ""}`}
            >
              <div className="flex items-center gap-3">
                <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                  t.direction === "in" ? "bg-emerald-50" : "bg-red-50"
                }`}>
                  {t.direction === "in" ? (
                    <ArrowDownLeft className="h-4 w-4 text-emerald-600" />
                  ) : (
                    <ArrowUpRight className="h-4 w-4 text-red-500" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{t.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {t.contract && `${t.contract} · `}{t.date}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className={`text-sm font-medium ${t.direction === "in" ? "text-emerald-600" : "text-foreground"}`}>
                  {t.direction === "in" ? "+" : "-"}৳{t.amount.toLocaleString("en-BD")}
                </p>
                <p className="text-xs text-muted-foreground">{t.method}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      <SlideOver
        open={!!selected}
        onClose={() => setSelectedId(null)}
        title={<h2 className="font-heading text-lg text-foreground">Transaction Details</h2>}
        width="w-[420px]"
      >
        {selected && (
          <div className="p-6 space-y-6">
            <div className="text-center">
              <div className={`mx-auto flex h-14 w-14 items-center justify-center rounded-full ${selected.direction === "in" ? "bg-emerald-50" : "bg-red-50"}`}>
                {selected.direction === "in" ? <ArrowDownLeft className="h-6 w-6 text-emerald-600" /> : <ArrowUpRight className="h-6 w-6 text-red-500" />}
              </div>
              <p className={`mt-3 font-heading text-3xl ${selected.direction === "in" ? "text-emerald-600" : "text-foreground"}`}>
                {selected.direction === "in" ? "+" : "-"}৳{selected.amount.toLocaleString("en-BD")}
              </p>
              <span className="mt-2 inline-block rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-medium text-emerald-700 capitalize">{selected.status}</span>
            </div>
            <div className="space-y-3 rounded-lg border border-border p-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Type</span>
                <span className="capitalize text-foreground">{selected.type.replace("_", " ")}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Method</span>
                <span className="text-foreground">{selected.method}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Date</span>
                <span className="text-foreground">{selected.date}</span>
              </div>
              {selected.contract && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Contract</span>
                  <span className="text-foreground">{selected.contract}</span>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Party</span>
                <span className="text-foreground">{selected.party}</span>
              </div>
            </div>
          </div>
        )}
      </SlideOver>
    </div>
  )
}
