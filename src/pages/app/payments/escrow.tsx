import { useAuthStore } from "@/stores/auth-store"
import { Shield, ArrowUpRight, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip,
} from "recharts"

const escrowContracts = [
  { id: "1", title: "Logo & Brand Identity", client: "Rahman Studio", escrowed: 25000, total: 50000, milestones: "1/3 funded" },
  { id: "2", title: "Website Redesign", client: "TechCorp BD", escrowed: 80000, total: 120000, milestones: "2/5 funded" },
  { id: "3", title: "Mobile App UI/UX", client: "ShopUp", escrowed: 85000, total: 85000, milestones: "4/4 funded" },
]

const donutData = [
  { name: "Funded", value: 190000 },
  { name: "Pending", value: 65000 },
  { name: "Released", value: 120000 },
]
const COLORS = ["#2D6A4F", "#D4A843", "#94a3b8"]

export default function EscrowPage() {
  const { user } = useAuthStore()
  const mode = user?.activeMode ?? "sp"
  const totalEscrow = escrowContracts.reduce((s, c) => s + c.escrowed, 0)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-3xl text-foreground">
          {mode === "sp" ? "Escrow Overview" : "Escrow Balances"}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {mode === "sp" ? "Funds held in escrow for your active contracts" : "Your escrowed funds across contracts"}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Summary cards */}
        <div className="space-y-4 lg:col-span-2">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-border bg-card p-5">
              <p className="text-xs text-muted-foreground">Total in Escrow</p>
              <p className="mt-2 font-heading text-3xl text-foreground">৳{totalEscrow.toLocaleString("en-BD")}</p>
              <p className="mt-1 text-xs text-muted-foreground">across {escrowContracts.length} contracts</p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5">
              <p className="text-xs text-muted-foreground">Pending Funding</p>
              <p className="mt-2 font-heading text-3xl text-amber-600">৳65,000</p>
              <p className="mt-1 text-xs text-muted-foreground">2 milestones</p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5">
              <p className="text-xs text-muted-foreground">Total Released</p>
              <p className="mt-2 font-heading text-3xl text-primary">৳1,20,000</p>
              <p className="mt-1 text-xs text-muted-foreground">this month</p>
            </div>
          </div>

          {/* Contracts table */}
          <div className="rounded-xl border border-border bg-card">
            <div className="px-5 pt-5 pb-3">
              <h3 className="text-sm font-medium text-foreground">Escrow by Contract</h3>
            </div>
            <div className="border-t border-border">
              {escrowContracts.map((c) => (
                <div key={c.id} className="flex items-center justify-between border-b border-border/50 px-5 py-4 last:border-0 hover:bg-muted/30 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                      <Shield className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{c.title}</p>
                      <p className="text-xs text-muted-foreground">{c.client} · {c.milestones}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-foreground">৳{c.escrowed.toLocaleString("en-BD")}</p>
                    <div className="mt-1 h-1.5 w-20 rounded-full bg-muted">
                      <div className="h-full rounded-full bg-primary" style={{ width: `${(c.escrowed / c.total) * 100}%` }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Donut chart */}
        <div className="rounded-xl border border-border bg-card p-5">
          <h3 className="text-sm font-medium text-foreground">Escrow Breakdown</h3>
          <div className="mt-4 h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={donutData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" paddingAngle={3}>
                  {donutData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
                </Pie>
                <Tooltip formatter={(v: number) => `৳${v.toLocaleString("en-BD")}`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 space-y-2">
            {donutData.map((d, i) => (
              <div key={d.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="h-2.5 w-2.5 rounded-full" style={{ background: COLORS[i] }} />
                  <span className="text-muted-foreground">{d.name}</span>
                </div>
                <span className="font-medium text-foreground">৳{d.value.toLocaleString("en-BD")}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
