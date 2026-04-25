import {
  LayoutDashboard,
  FileText,
  Users,
  CreditCard,
  Shield,
  Settings,
  Bell,
  Search,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  User,
  Building2,
} from "lucide-react"

export function DashboardMockup() {
  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-[#1a1a1a] shadow-2xl">
      {/* macOS-style title bar */}
      <div className="flex items-center gap-2 border-b border-white/5 px-4 py-3">
        <div className="flex gap-1.5">
          <div className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <div className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <div className="h-3 w-3 rounded-full bg-[#28c840]" />
        </div>
        <div className="mx-auto rounded-md bg-white/5 px-16 py-1 text-[11px] text-white/40">
          app.escrowbd.com
        </div>
      </div>

      {/* App shell */}
      <div className="flex h-[420px] md:h-[480px]">
        {/* Sidebar */}
        <div className="hidden w-52 shrink-0 border-r border-white/5 bg-[#111] p-3 md:block">
          <div className="mb-5 px-2 font-heading text-base text-white/90">
            EscrowBD
          </div>

          <nav className="space-y-0.5">
            <SidebarItem icon={LayoutDashboard} label="Dashboard" active />
            <SidebarItem icon={FileText} label="Contracts" />
            <SidebarItem icon={Users} label="Clients" />
            <SidebarItem icon={CreditCard} label="Payments" />
            <SidebarItem icon={Shield} label="Escrow" />
            <SidebarItem icon={Settings} label="Settings" />
          </nav>

          {/* Mode switcher */}
          <div className="mt-6 rounded-lg bg-white/5 p-1">
            <div className="flex">
              <div className="flex flex-1 items-center justify-center gap-1 rounded-md bg-[#2D6A4F] px-2 py-1.5 text-[10px] font-medium text-white">
                <User size={10} /> Provider
              </div>
              <div className="flex flex-1 items-center justify-center gap-1 px-2 py-1.5 text-[10px] text-white/40">
                <Building2 size={10} /> Client
              </div>
            </div>
          </div>

          {/* User */}
          <div className="mt-4 flex items-center gap-2 rounded-lg px-2 py-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#2D6A4F] text-[10px] font-bold text-white">
              K
            </div>
            <div>
              <p className="text-[11px] font-medium text-white/80">Karim Ahmed</p>
              <p className="text-[9px] text-white/30">karim@studio.bd</p>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 overflow-hidden">
          {/* Top bar */}
          <div className="flex items-center justify-between border-b border-white/5 px-5 py-3">
            <div className="flex items-center gap-2 rounded-lg bg-white/5 px-3 py-1.5">
              <Search size={12} className="text-white/30" />
              <span className="text-[11px] text-white/25">Search contracts, clients...</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-white/5 px-2.5 py-1 text-[10px] text-[#2D6A4F]">
                Service Provider
              </div>
              <div className="relative">
                <Bell size={14} className="text-white/40" />
                <div className="absolute -right-0.5 -top-0.5 h-1.5 w-1.5 rounded-full bg-red-500" />
              </div>
            </div>
          </div>

          {/* Dashboard content */}
          <div className="p-5">
            {/* Zone A: Action cards */}
            <div className="grid grid-cols-3 gap-3">
              <ActionCard
                title="Pending Approvals"
                value="3"
                subtitle="milestones waiting"
                color="amber"
              />
              <ActionCard
                title="Contracts Active"
                value="7"
                subtitle="in progress"
                color="green"
              />
              <ActionCard
                title="Escrow Balance"
                value="৳1,25,000"
                subtitle="across 3 contracts"
                color="blue"
              />
            </div>

            {/* Zone B: Quick actions */}
            <div className="mt-4 grid grid-cols-3 gap-3">
              <QuickAction icon={FileText} label="New Contract" />
              <QuickAction icon={Shield} label="New NDA" />
              <QuickAction icon={CheckCircle2} label="Request Approval" />
            </div>

            {/* Zone C: Table preview */}
            <div className="mt-4 rounded-lg border border-white/5 bg-white/[0.02]">
              <div className="flex items-center justify-between px-4 py-2.5">
                <span className="text-[11px] font-medium text-white/60">Active Contracts</span>
                <span className="text-[10px] text-[#2D6A4F]">View All</span>
              </div>
              <div className="border-t border-white/5">
                <TableRow name="Logo Design" client="Rahman Studio" value="৳50,000" status="Active" />
                <TableRow name="Web Redesign" client="TechCorp BD" value="৳1,20,000" status="Active" />
                <TableRow name="Brand Guide" client="FoodPanda BD" value="৳35,000" status="Review" />
                <TableRow name="App UI/UX" client="ShopUp" value="৳85,000" status="Signed" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function SidebarItem({ icon: Icon, label, active }: { icon: React.ComponentType<{ size?: number; className?: string }>; label: string; active?: boolean }) {
  return (
    <div className={`flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[11px] font-medium ${active ? "bg-[#2D6A4F]/30 text-white" : "text-white/35 hover:text-white/60"}`}>
      <Icon size={14} className={active ? "text-[#3D8C68]" : ""} />
      {label}
    </div>
  )
}

function ActionCard({ title, value, subtitle, color }: { title: string; value: string; subtitle: string; color: "amber" | "green" | "blue" }) {
  const borderColor = color === "amber" ? "border-amber-500/20" : color === "green" ? "border-[#2D6A4F]/20" : "border-blue-500/20"
  const valueColor = color === "amber" ? "text-amber-400" : color === "green" ? "text-[#3D8C68]" : "text-blue-400"

  return (
    <div className={`rounded-lg border ${borderColor} bg-white/[0.03] p-3`}>
      <p className="text-[10px] text-white/40">{title}</p>
      <p className={`mt-1 font-heading text-xl ${valueColor}`}>{value}</p>
      <p className="mt-0.5 text-[9px] text-white/25">{subtitle}</p>
    </div>
  )
}

function QuickAction({ icon: Icon, label }: { icon: React.ComponentType<{ size?: number; className?: string }>; label: string }) {
  return (
    <div className="flex items-center gap-2 rounded-lg border border-white/5 bg-white/[0.02] px-3 py-2.5">
      <div className="flex h-6 w-6 items-center justify-center rounded-md bg-[#2D6A4F]/20">
        <Icon size={12} className="text-[#3D8C68]" />
      </div>
      <span className="text-[11px] font-medium text-white/60">{label}</span>
    </div>
  )
}

function TableRow({ name, client, value, status }: { name: string; client: string; value: string; status: string }) {
  const statusColor = status === "Active" ? "bg-[#2D6A4F]/20 text-[#3D8C68]" : status === "Review" ? "bg-amber-500/10 text-amber-400" : "bg-blue-500/10 text-blue-400"

  return (
    <div className="flex items-center justify-between border-b border-white/[0.03] px-4 py-2.5 last:border-0">
      <div className="flex items-center gap-3">
        <div>
          <p className="text-[11px] font-medium text-white/70">{name}</p>
          <p className="text-[9px] text-white/30">{client}</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-[11px] text-white/50">{value}</span>
        <span className={`rounded-full px-2 py-0.5 text-[9px] font-medium ${statusColor}`}>{status}</span>
        <ArrowUpRight size={12} className="text-white/20" />
      </div>
    </div>
  )
}
