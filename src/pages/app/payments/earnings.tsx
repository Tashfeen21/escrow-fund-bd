import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowUpRight, Wallet, TrendingUp, X } from "lucide-react"
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts"

const monthlyData = [
  { month: "Jan", earnings: 45000 },
  { month: "Feb", earnings: 62000 },
  { month: "Mar", earnings: 38000 },
  { month: "Apr", earnings: 85000 },
  { month: "May", earnings: 72000 },
  { month: "Jun", earnings: 95000 },
]

const recentWithdrawals = [
  { id: "1", amount: 50000, method: "bKash", account: "017XXXXXXXX", date: "Apr 3, 2026", status: "completed" },
  { id: "2", amount: 30000, method: "Bank", account: "AB Bank ****1234", date: "Mar 25, 2026", status: "completed" },
  { id: "3", amount: 25000, method: "Nagad", account: "018XXXXXXXX", date: "Mar 15, 2026", status: "completed" },
]

export default function EarningsPage() {
  const [showWithdraw, setShowWithdraw] = useState(false)
  const [withdrawAmount, setWithdrawAmount] = useState("")
  const [withdrawMethod, setWithdrawMethod] = useState<string>("bkash")

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-3xl text-foreground">Earnings & Withdrawals</h1>
          <p className="mt-1 text-sm text-muted-foreground">Track your income and withdraw funds</p>
        </div>
        <Button onClick={() => setShowWithdraw(true)}>
          <Wallet className="mr-1.5 h-4 w-4" /> Withdraw
        </Button>
      </div>

      {/* Balance cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-border bg-card p-5">
          <p className="text-xs text-muted-foreground">Available Balance</p>
          <p className="mt-2 font-heading text-3xl text-foreground">৳95,000</p>
          <p className="mt-1 flex items-center gap-1 text-xs text-emerald-600"><ArrowUpRight className="h-3 w-3" /> Ready to withdraw</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-5">
          <p className="text-xs text-muted-foreground">Total Earned</p>
          <p className="mt-2 font-heading text-3xl text-foreground">৳3,97,000</p>
          <p className="mt-1 text-xs text-muted-foreground">Lifetime earnings</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-5">
          <p className="text-xs text-muted-foreground">Total Withdrawn</p>
          <p className="mt-2 font-heading text-3xl text-foreground">৳3,02,000</p>
          <p className="mt-1 text-xs text-muted-foreground">All time</p>
        </div>
      </div>

      {/* Chart */}
      <div className="rounded-xl border border-border bg-card p-5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium text-foreground">Monthly Earnings</h3>
            <p className="text-xs text-muted-foreground">Last 6 months</p>
          </div>
          <div className="flex items-center gap-1 text-xs text-emerald-600">
            <TrendingUp className="h-3.5 w-3.5" /> +18% vs previous period
          </div>
        </div>
        <div className="mt-5 h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: "var(--color-muted-foreground)" }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }} tickLine={false} axisLine={false} tickFormatter={(v) => `৳${(v / 1000).toFixed(0)}k`} />
              <Tooltip contentStyle={{ backgroundColor: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: "8px", fontSize: "12px" }} formatter={(v: number) => [`৳${v.toLocaleString("en-BD")}`, "Earnings"]} />
              <Bar dataKey="earnings" fill="#2D6A4F" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent withdrawals */}
      <div className="rounded-xl border border-border bg-card">
        <div className="px-5 pt-5 pb-3">
          <h3 className="text-sm font-medium text-foreground">Recent Withdrawals</h3>
        </div>
        <div className="border-t border-border">
          {recentWithdrawals.map((w) => (
            <div key={w.id} className="flex items-center justify-between border-b border-border/50 px-5 py-3.5 last:border-0">
              <div>
                <p className="text-sm font-medium text-foreground">৳{w.amount.toLocaleString("en-BD")}</p>
                <p className="text-xs text-muted-foreground">{w.method} · {w.account}</p>
              </div>
              <div className="text-right">
                <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-700 capitalize">{w.status}</span>
                <p className="mt-0.5 text-xs text-muted-foreground">{w.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Withdraw dialog */}
      {showWithdraw && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-xl bg-card border border-border p-6 space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="font-heading text-xl text-foreground">Withdraw Funds</h2>
              <button onClick={() => setShowWithdraw(false)} className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted"><X className="h-4 w-4" /></button>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Amount</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">৳</span>
                  <Input placeholder="Enter amount" value={withdrawAmount} onChange={(e) => setWithdrawAmount(e.target.value)} className="pl-7" />
                </div>
                <p className="text-xs text-muted-foreground">Available: ৳95,000</p>
              </div>
              <div className="space-y-2">
                <Label>Payment Method</Label>
                <div className="space-y-2">
                  {[
                    { v: "bkash", l: "bKash", desc: "Instant mobile transfer", c: "#e2136e" },
                    { v: "nagad", l: "Nagad", desc: "Digital financial service", c: "#f6921e" },
                    { v: "bank", l: "Bank", desc: "1-2 business days", c: "#2563eb" },
                  ].map((m) => (
                    <button
                      key={m.v}
                      onClick={() => setWithdrawMethod(m.v)}
                      className={`flex w-full items-center gap-3 rounded-xl border-2 p-3 text-left transition-all ${
                        withdrawMethod === m.v ? "border-primary bg-primary/[0.03] shadow-sm" : "border-border hover:border-primary/30"
                      }`}
                    >
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted/60">
                        <div className="h-3 w-3 rounded-full" style={{ background: m.c }} />
                      </div>
                      <div className="flex-1">
                        <p className={`text-sm font-medium ${withdrawMethod === m.v ? "text-primary" : "text-foreground"}`}>{m.l}</p>
                        <p className="text-[11px] text-muted-foreground">{m.desc}</p>
                      </div>
                      <div className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 ${
                        withdrawMethod === m.v ? "border-primary bg-primary" : "border-muted-foreground/30"
                      }`}>
                        {withdrawMethod === m.v && <div className="h-1.5 w-1.5 rounded-full bg-white" />}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={() => setShowWithdraw(false)}>Cancel</Button>
              <Button className="flex-1" onClick={() => setShowWithdraw(false)}>Withdraw</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
