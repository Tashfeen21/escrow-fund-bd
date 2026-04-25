import { useAuthStore } from "@/stores/auth-store"
import { OnboardingBanner } from "@/components/shared/onboarding-banner"
import {
  ArrowUpRight,
  ArrowDownRight,
  FileText,
  Shield,
  CreditCard,
  Clock,
  CheckCircle2,
  AlertCircle,
  Plus,
  ArrowRight,
  TrendingUp,
  PenTool,
  Upload,
  Users,
  Eye,
  ChevronRight,
  CircleDot,
  Banknote,
  MessageSquare,
  Calendar,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

// ─── Mock data ──────────────────────────────────────────

const spRevenueData = [
  { month: "Jan", revenue: 45000, escrow: 32000 },
  { month: "Feb", revenue: 62000, escrow: 48000 },
  { month: "Mar", revenue: 38000, escrow: 55000 },
  { month: "Apr", revenue: 85000, escrow: 42000 },
  { month: "May", revenue: 72000, escrow: 68000 },
  { month: "Jun", revenue: 95000, escrow: 75000 },
]

const clientSpendData = [
  { month: "Jan", spent: 55000, escrowed: 40000 },
  { month: "Feb", spent: 42000, escrowed: 35000 },
  { month: "Mar", spent: 78000, escrowed: 60000 },
  { month: "Apr", spent: 65000, escrowed: 50000 },
  { month: "May", spent: 90000, escrowed: 72000 },
  { month: "Jun", spent: 82000, escrowed: 65000 },
]

const spContracts = [
  { id: "1", title: "Logo Design", client: "Rahman Studio", value: 50000, status: "active" as const, date: "2 days ago" },
  { id: "2", title: "Web Redesign", client: "TechCorp BD", value: 120000, status: "active" as const, date: "5 days ago" },
  { id: "3", title: "Brand Guidelines", client: "FoodPanda BD", value: 35000, status: "review" as const, date: "1 week ago" },
  { id: "4", title: "App UI/UX", client: "ShopUp", value: 85000, status: "signed" as const, date: "2 weeks ago" },
  { id: "5", title: "Social Media Kit", client: "Daraz BD", value: 28000, status: "draft" as const, date: "3 weeks ago" },
]

const clientContracts = [
  { id: "1", title: "Website Development", vendor: "Karim Design", value: 150000, status: "active" as const, date: "3 days ago" },
  { id: "2", title: "Mobile App", vendor: "AppCraft BD", value: 250000, status: "active" as const, date: "1 week ago" },
  { id: "3", title: "SEO Optimization", vendor: "Digital Boost", value: 45000, status: "review" as const, date: "2 weeks ago" },
  { id: "4", title: "Content Writing", vendor: "WordSmith BD", value: 30000, status: "completed" as const, date: "3 weeks ago" },
]

const spActivity = [
  { id: "1", icon: CheckCircle2, text: "Milestone approved — Logo Design (Phase 2)", time: "2h ago", color: "text-emerald-500" },
  { id: "2", icon: CreditCard, text: "৳25,000 released to your bKash account", time: "5h ago", color: "text-blue-500" },
  { id: "3", icon: FileText, text: "Contract signed by TechCorp BD", time: "1d ago", color: "text-primary" },
  { id: "4", icon: AlertCircle, text: "Revision requested — Brand Guidelines", time: "2d ago", color: "text-amber-500" },
  { id: "5", icon: Shield, text: "৳85,000 deposited into escrow by ShopUp", time: "3d ago", color: "text-emerald-500" },
]

const clientActivity = [
  { id: "1", icon: FileText, text: "New contract received from Karim Design", time: "1h ago", color: "text-primary" },
  { id: "2", icon: Shield, text: "৳75,000 deposited into escrow", time: "4h ago", color: "text-emerald-500" },
  { id: "3", icon: CheckCircle2, text: "Milestone delivered — Website Development", time: "1d ago", color: "text-blue-500" },
  { id: "4", icon: CreditCard, text: "৳30,000 released to WordSmith BD", time: "2d ago", color: "text-amber-500" },
]

// ─── Component ──────────────────────────────────────────

export default function DashboardPage() {
  const { user } = useAuthStore()
  const mode = user?.activeMode ?? "sp"

  return (
    <div className="space-y-6">
      <OnboardingBanner />

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-3xl text-foreground">
            {mode === "sp" ? "Dashboard" : "Dashboard"}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Welcome back, {user?.fullName}
          </p>
        </div>
        <Button className="shrink-0 whitespace-nowrap inline-flex items-center" render={<Link to="/app/contracts/new" />}>
          <Plus className="mr-1.5 h-4 w-4 shrink-0" />
          <span>{mode === "sp" ? "New Contract" : "Request Contract"}</span>
        </Button>
      </div>

      {mode === "sp" ? <SPDashboard /> : <ClientDashboard />}
    </div>
  )
}

// ─── SP Dashboard ───────────────────────────────────────

function SPDashboard() {
  return (
    <>
      {/* Quick Actions */}
      <QuickActions
        heading="Get started with your next project"
        description="Create contracts, send for signature, and get paid — all protected by escrow."
        ctaLabel="New Contract"
        ctaLink="/app/contracts/new"
        actions={[
          {
            title: "Create & send contract",
            icon: FileText,
            link: "/app/contracts/new",
            buttonLabel: "Create Contract",
            illustration: (
              <div className="space-y-2">
                <div className="h-2.5 w-20 rounded bg-muted-foreground/10" />
                <div className="flex items-center gap-2">
                  <div className="h-2 w-32 rounded bg-muted-foreground/8" />
                  <div className="h-5 w-14 rounded-full border border-primary/30 bg-primary/5" />
                </div>
                <div className="h-2 w-24 rounded bg-muted-foreground/8" />
                <div className="flex gap-1.5 pt-1">
                  <div className="h-1.5 w-8 rounded-full bg-primary/20" />
                  <div className="h-1.5 w-8 rounded-full bg-muted-foreground/10" />
                  <div className="h-1.5 w-8 rounded-full bg-muted-foreground/10" />
                </div>
              </div>
            ),
          },
          {
            title: "Collect e-signature",
            icon: PenTool,
            link: "/app/contracts",
            buttonLabel: "View Contracts",
            illustration: (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center">
                    <PenTool className="h-3 w-3 text-primary/50" />
                  </div>
                  <div className="h-5 w-28 rounded border border-primary/20 bg-primary/5" />
                </div>
                <div className="h-2 w-32 rounded bg-muted-foreground/8" />
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3 w-3 text-emerald-400" />
                  <div className="h-2 w-16 rounded bg-muted-foreground/8" />
                </div>
              </div>
            ),
          },
          {
            title: "Fund escrow",
            icon: Shield,
            link: "/app/payments/escrow",
            buttonLabel: "Escrow Overview",
            illustration: (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="h-2.5 w-16 rounded bg-muted-foreground/10" />
                  <div className="h-2.5 w-12 rounded bg-emerald-200/60" />
                </div>
                <div className="h-2 w-full rounded-full bg-muted-foreground/8">
                  <div className="h-2 w-3/5 rounded-full bg-primary/20" />
                </div>
                <div className="grid grid-cols-3 gap-1.5">
                  <div className="h-4 rounded bg-emerald-100/60" />
                  <div className="h-4 rounded bg-primary/8" />
                  <div className="h-4 rounded bg-muted-foreground/6" />
                </div>
              </div>
            ),
          },
        ]}
      />

      {/* Stat cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Earnings"
          value="৳3,97,000"
          change="+12.5%"
          trend="up"
          icon={TrendingUp}
          subtitle="Last 6 months"
        />
        <StatCard
          title="Active Contracts"
          value="7"
          change="+2"
          trend="up"
          icon={FileText}
          subtitle="this month"
        />
        <StatCard
          title="In Escrow"
          value="৳1,25,000"
          change="+৳35,000"
          trend="up"
          icon={Shield}
          subtitle="across 3 contracts"
        />
        <StatCard
          title="Pending Approvals"
          value="3"
          change="-1"
          trend="down"
          icon={Clock}
          subtitle="milestones awaiting"
        />
      </div>

      {/* Chart + Activity */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <RevenueChart data={spRevenueData} label1="Revenue" label2="Escrow" dataKey1="revenue" dataKey2="escrow" />
        </div>
        <ActivityFeed items={spActivity} />
      </div>

      {/* Recent Contracts */}
      <RecentContracts contracts={spContracts} mode="sp" />
    </>
  )
}

// ─── Client Dashboard ───────────────────────────────────

function ClientDashboard() {
  return (
    <>
      {/* Quick Actions */}
      <QuickActions
        heading="Review & manage your projects"
        description="Review deliverables, approve milestones, and fund escrow for your active contracts."
        ctaLabel="View Contracts"
        ctaLink="/app/contracts"
        actions={[
          {
            title: "Review deliverables",
            icon: Eye,
            link: "/app/contracts",
            buttonLabel: "View Contracts",
            illustration: (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="h-5 w-5 rounded bg-amber-100 flex items-center justify-center">
                    <Eye className="h-3 w-3 text-amber-500/60" />
                  </div>
                  <div className="h-2.5 w-24 rounded bg-muted-foreground/10" />
                </div>
                <div className="h-2 w-32 rounded bg-muted-foreground/8" />
                <div className="h-2 w-28 rounded bg-muted-foreground/8" />
                <div className="flex gap-2 pt-1">
                  <div className="h-5 w-16 rounded-full bg-emerald-100/60" />
                  <div className="h-5 w-16 rounded-full bg-muted-foreground/8" />
                </div>
              </div>
            ),
          },
          {
            title: "Fund milestone",
            icon: CreditCard,
            link: "/app/payments/escrow",
            buttonLabel: "Fund Escrow",
            illustration: (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="h-2.5 w-20 rounded bg-muted-foreground/10" />
                  <div className="h-2.5 w-14 rounded bg-primary/15" />
                </div>
                <div className="h-2 w-full rounded-full bg-muted-foreground/8">
                  <div className="h-2 w-2/5 rounded-full bg-primary/20" />
                </div>
                <div className="flex items-center gap-2 pt-1">
                  <div className="h-4 w-4 rounded-full bg-primary/10" />
                  <div className="h-2 w-20 rounded bg-muted-foreground/8" />
                </div>
              </div>
            ),
          },
          {
            title: "Add vendor",
            icon: Users,
            link: "/app/vendors",
            buttonLabel: "Manage Vendors",
            illustration: (
              <div className="space-y-2">
                <div className="flex -space-x-2">
                  <div className="h-6 w-6 rounded-full bg-primary/10 border-2 border-card" />
                  <div className="h-6 w-6 rounded-full bg-emerald-100 border-2 border-card" />
                  <div className="h-6 w-6 rounded-full bg-amber-100 border-2 border-card" />
                  <div className="h-6 w-6 rounded-full bg-muted border-2 border-card flex items-center justify-center">
                    <Plus className="h-3 w-3 text-muted-foreground/40" />
                  </div>
                </div>
                <div className="h-2 w-28 rounded bg-muted-foreground/8" />
                <div className="h-2 w-20 rounded bg-muted-foreground/8" />
              </div>
            ),
          },
        ]}
      />

      {/* Pending Actions */}
      <PendingActions />

      {/* Stat cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Spent"
          value="৳4,12,000"
          change="+8.3%"
          trend="up"
          icon={CreditCard}
          subtitle="Last 6 months"
        />
        <StatCard
          title="Active Contracts"
          value="3"
          change="+1"
          trend="up"
          icon={FileText}
          subtitle="in progress"
        />
        <StatCard
          title="In Escrow"
          value="৳1,87,000"
          change="+৳72,000"
          trend="up"
          icon={Shield}
          subtitle="held securely"
        />
        <StatCard
          title="Pending Reviews"
          value="2"
          change=""
          trend="neutral"
          icon={Clock}
          subtitle="deliverables to review"
        />
      </div>

      {/* Chart + Activity */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <RevenueChart data={clientSpendData} label1="Spent" label2="Escrowed" dataKey1="spent" dataKey2="escrowed" />
        </div>
        <ActivityFeed items={clientActivity} />
      </div>

      {/* Recent Contracts */}
      <RecentContracts contracts={clientContracts} mode="client" />
    </>
  )
}

// ─── Pending Actions (Client only) ─────────────────────

interface PendingItem {
  id: string
  title: string
  description: string
  provider: string
  providerInitial: string
  providerColor: string
  type: "review" | "payment" | "sign" | "feedback"
  urgency: "urgent" | "today" | "upcoming"
  urgencyLabel: string
  statusLabel: string
  statusColor: string
  date: string
  link: string
  collaborators: { initial: string; color: string }[]
}

const pendingItems: PendingItem[] = [
  {
    id: "p1",
    title: "Website Development — Phase 2",
    description: "Review the delivered frontend components and approve the milestone for payment release.",
    provider: "Karim Design",
    providerInitial: "K",
    providerColor: "bg-primary/10 text-primary",
    type: "review",
    urgency: "urgent",
    urgencyLabel: "Overdue",
    statusLabel: "Needs Review",
    statusColor: "bg-red-50 text-red-600",
    date: "Due 2 days ago",
    link: "/app/contracts",
    collaborators: [
      { initial: "K", color: "bg-primary/20 text-primary" },
      { initial: "A", color: "bg-blue-100 text-blue-700" },
    ],
  },
  {
    id: "p2",
    title: "Mobile App UI/UX — Escrow Funding",
    description: "Fund the escrow for Milestone 3 so the design team can begin the final prototype phase.",
    provider: "AppCraft BD",
    providerInitial: "A",
    providerColor: "bg-violet-100 text-violet-700",
    type: "payment",
    urgency: "today",
    urgencyLabel: "Today",
    statusLabel: "Awaiting Payment",
    statusColor: "bg-amber-50 text-amber-600",
    date: "Due today",
    link: "/app/payments/escrow",
    collaborators: [
      { initial: "A", color: "bg-violet-100 text-violet-700" },
      { initial: "R", color: "bg-emerald-100 text-emerald-700" },
    ],
  },
  {
    id: "p3",
    title: "SEO Optimization — Contract Signing",
    description: "Review and sign the updated service agreement with revised scope and payment terms.",
    provider: "Digital Boost",
    providerInitial: "D",
    providerColor: "bg-emerald-100 text-emerald-700",
    type: "sign",
    urgency: "today",
    urgencyLabel: "Today",
    statusLabel: "Pending Signature",
    statusColor: "bg-blue-50 text-blue-600",
    date: "Received today",
    link: "/app/contracts",
    collaborators: [
      { initial: "D", color: "bg-emerald-100 text-emerald-700" },
    ],
  },
  {
    id: "p4",
    title: "Content Writing — Final Delivery",
    description: "Provide feedback on the final batch of articles delivered by WordSmith BD before closing.",
    provider: "WordSmith BD",
    providerInitial: "W",
    providerColor: "bg-amber-100 text-amber-700",
    type: "feedback",
    urgency: "upcoming",
    urgencyLabel: "Tomorrow",
    statusLabel: "Feedback Needed",
    statusColor: "bg-slate-100 text-slate-600",
    date: "Due tomorrow",
    link: "/app/contracts",
    collaborators: [
      { initial: "W", color: "bg-amber-100 text-amber-700" },
      { initial: "S", color: "bg-pink-100 text-pink-700" },
      { initial: "M", color: "bg-primary/20 text-primary" },
    ],
  },
]

const urgencyConfig = {
  urgent: "bg-red-50 text-red-600 border-red-200",
  today: "bg-amber-50 text-amber-600 border-amber-200",
  upcoming: "bg-slate-100 text-slate-600 border-slate-200",
}

const typeIcons = {
  review: Eye,
  payment: Banknote,
  sign: PenTool,
  feedback: MessageSquare,
}

function PendingActions() {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-heading text-lg text-foreground">Pending Actions</h2>
          <p className="mt-0.5 text-xs text-muted-foreground">
            {pendingItems.length} items need your attention
          </p>
        </div>
        <Link
          to="/app/contracts"
          className="flex items-center gap-1 text-xs font-medium text-primary hover:underline"
        >
          View All
          <ArrowRight className="h-3 w-3" />
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {pendingItems.map((item) => {
          const TypeIcon = typeIcons[item.type]
          return (
            <Link
              key={item.id}
              to={item.link}
              className="group flex flex-col rounded-xl border border-border bg-card p-4 transition-all hover:border-primary/20 hover:shadow-md"
            >
              {/* Top row: icon + badges */}
              <div className="flex items-start justify-between">
                <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                  item.urgency === "urgent" ? "bg-red-50" : item.urgency === "today" ? "bg-amber-50" : "bg-muted/60"
                }`}>
                  <TypeIcon className={`h-4 w-4 ${
                    item.urgency === "urgent" ? "text-red-500" : item.urgency === "today" ? "text-amber-500" : "text-muted-foreground"
                  }`} />
                </div>
                <span className={`rounded-full border px-1.5 py-0.5 text-[9px] font-semibold leading-none ${urgencyConfig[item.urgency]}`}>
                  {item.urgencyLabel}
                </span>
              </div>

              {/* Title + status */}
              <h3 className="mt-3 truncate text-[13px] font-semibold text-foreground group-hover:text-primary transition-colors">
                {item.title}
              </h3>
              <span className={`mt-1 inline-flex w-fit rounded-full px-1.5 py-0.5 text-[9px] font-medium leading-none ${item.statusColor}`}>
                {item.statusLabel}
              </span>

              {/* Description */}
              <p className="mt-2 line-clamp-2 text-[11px] leading-relaxed text-muted-foreground">
                {item.description}
              </p>

              {/* Collaborators */}
              <div className="mt-auto flex items-center gap-2 pt-3">
                <div className="flex -space-x-1.5">
                  {item.collaborators.map((c, i) => (
                    <div
                      key={i}
                      className={`flex h-5 w-5 items-center justify-center rounded-full border-[1.5px] border-card text-[8px] font-bold ${c.color}`}
                    >
                      {c.initial}
                    </div>
                  ))}
                </div>
                <span className="truncate text-[10px] text-muted-foreground">
                  <strong className="text-foreground">{item.provider}</strong>
                </span>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

// ─── Shared Components ──────────────────────────────────

function StatCard({
  title,
  value,
  change,
  trend,
  icon: Icon,
  subtitle,
}: {
  title: string
  value: string
  change: string
  trend: "up" | "down" | "neutral"
  icon: React.ComponentType<{ className?: string }>
  subtitle: string
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-muted-foreground">{title}</span>
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
          <Icon className="h-4 w-4 text-primary" />
        </div>
      </div>
      <p className="mt-3 font-heading text-3xl text-foreground">{value}</p>
      <div className="mt-1.5 flex items-center gap-1.5">
        {change && (
          <span
            className={`flex items-center text-xs font-medium ${
              trend === "up" ? "text-emerald-600" : trend === "down" ? "text-red-500" : "text-muted-foreground"
            }`}
          >
            {trend === "up" && <ArrowUpRight className="h-3 w-3" />}
            {trend === "down" && <ArrowDownRight className="h-3 w-3" />}
            {change}
          </span>
        )}
        <span className="text-xs text-muted-foreground">{subtitle}</span>
      </div>
    </div>
  )
}

function RevenueChart({
  data,
  label1,
  label2,
  dataKey1,
  dataKey2,
}: {
  data: Record<string, unknown>[]
  label1: string
  label2: string
  dataKey1: string
  dataKey2: string
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium text-foreground">Overview</h3>
          <p className="text-xs text-muted-foreground">Last 6 months</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <div className="h-2 w-2 rounded-full bg-primary" />
            <span className="text-xs text-muted-foreground">{label1}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-2 w-2 rounded-full bg-primary/30" />
            <span className="text-xs text-muted-foreground">{label2}</span>
          </div>
        </div>
      </div>
      <div className="mt-5 h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorPrimary" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2D6A4F" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#2D6A4F" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorSecondary" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2D6A4F" stopOpacity={0.05} />
                <stop offset="95%" stopColor="#2D6A4F" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis dataKey="month" tick={{ fontSize: 12, fill: "var(--color-muted-foreground)" }} tickLine={false} axisLine={false} />
            <YAxis tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }} tickLine={false} axisLine={false} tickFormatter={(v) => `৳${(v / 1000).toFixed(0)}k`} />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--color-card)",
                border: "1px solid var(--color-border)",
                borderRadius: "8px",
                fontSize: "12px",
              }}
              formatter={(value: number) => [`৳${value.toLocaleString("en-BD")}`, ""]}
            />
            <Area type="monotone" dataKey={dataKey1} stroke="#2D6A4F" strokeWidth={2} fill="url(#colorPrimary)" />
            <Area type="monotone" dataKey={dataKey2} stroke="#2D6A4F" strokeWidth={1.5} strokeDasharray="4 4" fill="url(#colorSecondary)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

function ActivityFeed({
  items,
}: {
  items: { id: string; icon: React.ComponentType<{ className?: string }>; text: string; time: string; color: string }[]
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <h3 className="text-sm font-medium text-foreground">Recent Activity</h3>
      <div className="mt-4 space-y-4">
        {items.map((item) => (
          <div key={item.id} className="flex gap-3">
            <div className={`mt-0.5 shrink-0 ${item.color}`}>
              <item.icon className="h-4 w-4" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm leading-relaxed text-foreground/80">{item.text}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">{item.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const statusStyles = {
  active: "bg-emerald-50 text-emerald-700",
  review: "bg-amber-50 text-amber-700",
  signed: "bg-blue-50 text-blue-700",
  draft: "bg-muted text-muted-foreground",
  completed: "bg-primary/10 text-primary",
} as const

function RecentContracts({
  contracts,
  mode,
}: {
  contracts: { id: string; title: string; client?: string; vendor?: string; value: number; status: keyof typeof statusStyles; date: string }[]
  mode: "sp" | "client"
}) {
  return (
    <div className="rounded-xl border border-border bg-card">
      <div className="flex items-center justify-between px-5 pt-5 pb-3">
        <div>
          <h3 className="text-sm font-medium text-foreground">Recent Contracts</h3>
          <p className="text-xs text-muted-foreground">Your latest contracts</p>
        </div>
        <Button variant="ghost" size="sm" className="gap-1 text-xs text-primary" render={<Link to="/app/contracts" />}>
          View All <ArrowRight className="h-3 w-3" />
        </Button>
      </div>
      <div className="border-t border-border">
        {contracts.map((contract) => (
          <div
            key={contract.id}
            className="flex items-center justify-between border-b border-border/50 px-5 py-3.5 last:border-0 hover:bg-muted/30 transition-colors"
          >
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-foreground">{contract.title}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {mode === "sp" ? contract.client : contract.vendor} · {contract.date}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-foreground">
                ৳{contract.value.toLocaleString("en-BD")}
              </span>
              <span
                className={`rounded-full px-2.5 py-0.5 text-[11px] font-medium capitalize ${statusStyles[contract.status]}`}
              >
                {contract.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Quick Actions ─────────────────────────────────────

interface QuickAction {
  title: string
  icon: React.ComponentType<{ className?: string }>
  illustration: React.ReactNode
  link: string
  buttonLabel: string
}

function QuickActions({
  heading,
  description,
  actions,
}: {
  heading: string
  description: string
  ctaLabel?: string
  ctaLink?: string
  actions: QuickAction[]
}) {
  return (
    <div className="rounded-xl bg-gradient-to-br from-[#2D6A4F]/[0.07] via-[#40916C]/[0.05] to-[#52B788]/[0.03] p-5 lg:p-6">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_1fr_1fr_1fr] lg:gap-5">
        {/* Left panel — heading + description only */}
        <div className="flex flex-col justify-center">
          <h3 className="font-heading text-lg text-foreground leading-snug">{heading}</h3>
          <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">{description}</p>
        </div>

        {/* Action cards */}
        {actions.map((action, i) => (
          <Link
            key={i}
            to={action.link}
            className="group flex flex-col rounded-xl border border-border/60 bg-white p-4 shadow-sm transition-all hover:border-primary/30 hover:shadow-md"
          >
            <p className="text-sm font-medium text-foreground">{action.title}</p>
            {/* Wireframe illustration */}
            <div className="mt-3 rounded-lg bg-[#FAFAF8] p-3.5">
              {action.illustration}
            </div>
            {/* Action button */}
            <div className="mt-3">
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-white px-3 py-1.5 text-xs font-medium text-foreground shadow-sm transition-colors group-hover:border-primary/30 group-hover:text-primary">
                {action.buttonLabel} <ArrowRight className="h-3 w-3" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
