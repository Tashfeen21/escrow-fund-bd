import { useState } from "react"
import { useAuthStore } from "@/stores/auth-store"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { SlideOver } from "@/components/ui/slide-over"
import { Search, Plus, Mail, Phone, FileText, X, ExternalLink } from "lucide-react"

const mockClients = [
  { id: "1", name: "Rahman Studio", email: "info@rahmanstudio.com", phone: "01711111111", organization: "Rahman Studio Ltd.", contractCount: 3, totalValue: 185000, lastActive: "2 days ago", initial: "R" },
  { id: "2", name: "TechCorp BD", email: "hello@techcorp.bd", phone: "01722222222", organization: "TechCorp Bangladesh", contractCount: 2, totalValue: 240000, lastActive: "1 week ago", initial: "T" },
  { id: "3", name: "FoodPanda BD", email: "ops@foodpanda.bd", phone: "01733333333", organization: "FoodPanda Bangladesh", contractCount: 1, totalValue: 35000, lastActive: "2 weeks ago", initial: "F" },
  { id: "4", name: "ShopUp", email: "design@shopup.com", phone: "01744444444", organization: "ShopUp Inc.", contractCount: 1, totalValue: 85000, lastActive: "3 weeks ago", initial: "S" },
  { id: "5", name: "Daraz BD", email: "marketing@daraz.bd", phone: "01755555555", organization: "Daraz Bangladesh", contractCount: 1, totalValue: 28000, lastActive: "1 month ago", initial: "D" },
  { id: "6", name: "BRAC", email: "comms@brac.net", phone: "01766666666", organization: "BRAC International", contractCount: 1, totalValue: 60000, lastActive: "1 week ago", initial: "B" },
]

export default function ClientsPage() {
  const { user } = useAuthStore()
  const mode = user?.activeMode ?? "sp"
  const [search, setSearch] = useState("")
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const label = mode === "sp" ? "Clients" : "Vendors"
  const data = mockClients
  const filtered = data.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) || c.email.toLowerCase().includes(search.toLowerCase())
  )
  const selected = data.find((c) => c.id === selectedId)

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      <div className="flex flex-1 flex-col">
        <div className="flex items-center justify-between px-6 py-5">
          <div>
            <h1 className="font-heading text-3xl text-foreground">{label}</h1>
            <p className="mt-1 text-sm text-muted-foreground">{filtered.length} {label.toLowerCase()}</p>
          </div>
          <Button><Plus className="mr-1.5 h-4 w-4" /> Add {mode === "sp" ? "Client" : "Vendor"}</Button>
        </div>

        <div className="border-b border-border px-6 pb-4">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder={`Search ${label.toLowerCase()}...`} value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedId(c.id)}
                className={`flex flex-col rounded-xl border p-5 text-left transition-all hover:shadow-sm ${
                  selectedId === c.id ? "border-primary bg-primary/5" : "border-border bg-card hover:border-primary/30"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 font-heading text-sm text-primary">
                    {c.initial}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-foreground">{c.name}</p>
                    <p className="truncate text-xs text-muted-foreground">{c.email}</p>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-3 border-t border-border/50 pt-4">
                  <div>
                    <p className="text-xs text-muted-foreground">Contracts</p>
                    <p className="mt-0.5 text-sm font-medium text-foreground">{c.contractCount}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Total Value</p>
                    <p className="mt-0.5 text-sm font-medium text-foreground">৳{(c.totalValue / 1000).toFixed(0)}k</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Last Active</p>
                    <p className="mt-0.5 text-xs text-foreground">{c.lastActive}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
          {filtered.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20">
              <p className="text-sm text-muted-foreground">No {label.toLowerCase()} found</p>
            </div>
          )}
        </div>
      </div>

      <SlideOver
        open={!!selected}
        onClose={() => setSelectedId(null)}
        title={undefined}
        width="w-[420px]"
        footer={<Button className="w-full">Create Contract</Button>}
      >
        {selected && (
          <>
            {/* Profile banner — dark green header with overlapping avatar */}
            <div className="relative">
              <div className="h-28 bg-gradient-to-br from-[#1B4332] via-[#2D6A4F] to-[#40916C]" />
              <div className="absolute -bottom-10 left-6 flex h-20 w-20 items-center justify-center rounded-full border-4 border-card bg-white font-heading text-2xl text-primary shadow-lg">
                {selected.initial}
              </div>
              <button
                onClick={() => setSelectedId(null)}
                className="absolute right-3 top-3 rounded-lg p-2 text-white/70 hover:bg-white/10 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="px-6 pt-14 pb-6 space-y-6">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-heading text-xl text-foreground">{selected.name}</h2>
                  <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-medium text-emerald-700">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Active
                  </span>
                </div>
                <p className="mt-0.5 text-sm text-muted-foreground">{selected.organization}</p>
              </div>

              <div className="rounded-xl border border-border overflow-hidden">
                <div className="grid grid-cols-2 divide-x divide-border">
                  <div className="p-4">
                    <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Email</p>
                    <p className="mt-1.5 truncate text-sm text-foreground">{selected.email}</p>
                  </div>
                  <div className="p-4">
                    <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Phone</p>
                    <p className="mt-1.5 text-sm text-foreground">{selected.phone}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 divide-x divide-border border-t border-border">
                  <div className="p-4">
                    <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Contracts</p>
                    <p className="mt-1.5 font-heading text-lg text-foreground">{selected.contractCount}</p>
                  </div>
                  <div className="p-4">
                    <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Total Value</p>
                    <p className="mt-1.5 font-heading text-lg text-foreground">৳{selected.totalValue.toLocaleString("en-BD")}</p>
                  </div>
                </div>
                <div className="border-t border-border p-4">
                  <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Last Active</p>
                  <p className="mt-1.5 text-sm text-foreground">{selected.lastActive}</p>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-foreground">Recent Contracts</h3>
                <div className="mt-3 space-y-2">
                  {["Logo Design", "Web Redesign"].map((t) => (
                    <div key={t} className="flex items-center justify-between rounded-lg border border-border p-3 hover:bg-muted/30 transition-colors">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-foreground">{t}</span>
                      </div>
                      <ExternalLink className="h-3.5 w-3.5 text-muted-foreground" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </SlideOver>
    </div>
  )
}
