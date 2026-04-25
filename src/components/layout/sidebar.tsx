import { NavLink, useLocation, useNavigate } from "react-router-dom"
import {
  LayoutDashboard,
  FileText,
  Users,
  CreditCard,
  Shield,
  ArrowUpRight,
  History,
  FolderOpen,
  Settings,
  ChevronLeft,
  ChevronRight,
  Building2,
  User,
  LogOut,
  SwitchCamera,
  ChevronUp,
  UserCircle,
  HelpCircle,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useAuthStore } from "@/stores/auth-store"
import { Separator } from "@/components/ui/separator"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { useState, useRef, useEffect } from "react"
import type { UserMode } from "@/types"

const spNavItems = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/app/dashboard" },
  { label: "Contracts", icon: FileText, path: "/app/contracts" },
  { label: "Clients", icon: Users, path: "/app/clients" },
  {
    label: "Payments",
    icon: CreditCard,
    path: "/app/payments",
    children: [
      { label: "Escrow Overview", icon: Shield, path: "/app/payments/escrow" },
      { label: "Earnings & Withdrawals", icon: ArrowUpRight, path: "/app/payments/earnings" },
      { label: "Transaction History", icon: History, path: "/app/payments/history" },
    ],
  },
  { label: "Documents", icon: FolderOpen, path: "/app/documents" },
  { label: "Settings", icon: Settings, path: "/app/settings" },
]

const clientNavItems = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/app/dashboard" },
  { label: "Contracts", icon: FileText, path: "/app/contracts" },
  { label: "Vendors", icon: Users, path: "/app/vendors" },
  {
    label: "Payments",
    icon: CreditCard,
    path: "/app/payments",
    children: [
      { label: "Escrow Balances", icon: Shield, path: "/app/payments/escrow" },
      { label: "Payment History", icon: History, path: "/app/payments/history" },
    ],
  },
  { label: "Settings", icon: Settings, path: "/app/settings" },
]

interface SidebarProps {
  mobileOpen?: boolean
  onMobileClose?: () => void
}

export function Sidebar({ mobileOpen, onMobileClose }: SidebarProps) {
  const { user, setMode } = useAuthStore()
  const [collapsed, setCollapsed] = useState(false)
  const location = useLocation()
  const mode = user?.activeMode ?? "sp"
  const navItems = mode === "sp" ? spNavItems : clientNavItems

  const handleModeSwitch = (newMode: UserMode) => {
    if (newMode !== mode) {
      setMode(newMode)
    }
  }

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-50 flex h-screen flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground transition-all duration-300",
        collapsed ? "lg:w-16" : "lg:w-64",
        "w-64",
        mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}
    >
      {/* Logo */}
      <div className="flex h-16 items-center justify-between px-4">
        {!collapsed && (
          <span className="font-heading text-xl text-white">
            EscrowBD
          </span>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="rounded-lg p-2 text-sidebar-foreground/70 hover:bg-sidebar-accent/40 hover:text-white"
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      {/* Mode Switcher — right after logo */}
      <div className="px-3 pb-3">
        <div className="flex rounded-lg bg-sidebar-accent/20 p-1">
          <button
            onClick={() => handleModeSwitch("sp")}
            className={cn(
              "flex flex-1 items-center justify-center gap-1.5 rounded-md px-2 py-2 text-xs font-medium transition-all",
              mode === "sp"
                ? "bg-primary text-white shadow-sm"
                : "text-sidebar-foreground/50 hover:text-white"
            )}
          >
            {!collapsed && <User size={14} />}
            {collapsed ? "SP" : "Service Provider"}
          </button>
          <button
            onClick={() => handleModeSwitch("client")}
            className={cn(
              "flex flex-1 items-center justify-center gap-1.5 rounded-md px-2 py-2 text-xs font-medium transition-all",
              mode === "client"
                ? "bg-primary text-white shadow-sm"
                : "text-sidebar-foreground/50 hover:text-white"
            )}
          >
            {!collapsed && <Building2 size={14} />}
            {collapsed ? "CL" : "Client"}
          </button>
        </div>
      </div>

      <Separator className="bg-sidebar-border/50" />

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-5">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.path} onClick={() => !item.children && onMobileClose?.()}>
              {collapsed ? (
                <TooltipProvider delay={0}>
                  <Tooltip>
                    <TooltipTrigger
                      render={
                        <NavLink
                          to={item.children ? item.children[0].path : item.path}
                          className={({ isActive }) =>
                            cn(
                              "flex items-center justify-center rounded-lg p-2.5 transition-colors",
                              isActive || location.pathname.startsWith(item.path)
                                ? "bg-sidebar-accent text-white"
                                : "text-sidebar-foreground/60 hover:bg-sidebar-accent/30 hover:text-white"
                            )
                          }
                        />
                      }
                    >
                      <item.icon size={20} />
                    </TooltipTrigger>
                    <TooltipContent side="right">{item.label}</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ) : (
                <>
                  <NavLink
                    to={item.children ? item.children[0].path : item.path}
                    end={!item.children}
                    className={({ isActive }) =>
                      cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] font-medium transition-colors",
                        (isActive || location.pathname.startsWith(item.path)) && !item.children
                          ? "bg-sidebar-accent text-white"
                          : item.children && location.pathname.startsWith(item.path)
                            ? "text-white"
                            : "text-sidebar-foreground/60 hover:bg-sidebar-accent/30 hover:text-white"
                      )
                    }
                  >
                    <item.icon size={18} />
                    {item.label}
                  </NavLink>
                  {item.children && location.pathname.startsWith(item.path) && (
                    <ul className="ml-9 mt-1 space-y-0.5">
                      {item.children.map((child) => (
                        <li key={child.path}>
                          <NavLink
                            to={child.path}
                            className={({ isActive }) =>
                              cn(
                                "flex items-center gap-2 rounded-md px-3 py-2 text-xs font-medium transition-colors",
                                isActive
                                  ? "bg-sidebar-accent text-white"
                                  : "text-sidebar-foreground/50 hover:bg-sidebar-accent/30 hover:text-white"
                              )
                            }
                          >
                            {child.label}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* User Profile with Dropdown */}
      <ProfileMenu collapsed={collapsed} />
    </aside>
  )
}

// ─── Profile Dropdown Menu ──────────────────────────────

function ProfileMenu({ collapsed }: { collapsed: boolean }) {
  const { user, logout, setMode } = useAuthStore()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const mode = user?.activeMode ?? "sp"

  // Close on click outside
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    if (open) document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [open])

  const handleLogout = () => {
    setOpen(false)
    logout()
    navigate("/auth/login")
  }

  const handleSwitchMode = () => {
    setMode(mode === "sp" ? "client" : "sp")
    setOpen(false)
  }

  const handleNavigate = (path: string) => {
    setOpen(false)
    navigate(path)
  }

  return (
    <div ref={ref} className="relative border-t border-sidebar-border/50 px-3 py-3">
      {/* Dropdown (opens upward) */}
      {open && (
        <div className="absolute bottom-full left-3 right-3 mb-2 overflow-hidden rounded-xl border border-border bg-card shadow-xl">
          {/* User info header */}
          <div className="border-b border-border px-4 py-3.5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                {user?.fullName?.charAt(0) ?? "U"}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-foreground">
                  {user?.fullName}
                </p>
                <p className="truncate text-xs text-muted-foreground">
                  {user?.email}
                </p>
              </div>
              <span className="shrink-0 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
                {mode === "sp" ? "SP" : "Client"}
              </span>
            </div>
          </div>

          {/* Menu items */}
          <div className="py-1.5">
            <button
              onClick={() => handleNavigate("/app/settings")}
              className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-foreground transition-colors hover:bg-muted/60"
            >
              <UserCircle className="h-4 w-4 text-muted-foreground" />
              My Profile
            </button>
            <button
              onClick={() => handleNavigate("/app/settings")}
              className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-foreground transition-colors hover:bg-muted/60"
            >
              <Settings className="h-4 w-4 text-muted-foreground" />
              Settings
            </button>
            <button
              onClick={handleSwitchMode}
              className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-foreground transition-colors hover:bg-muted/60"
            >
              <SwitchCamera className="h-4 w-4 text-muted-foreground" />
              Switch to {mode === "sp" ? "Client" : "Service Provider"}
            </button>
            <button
              onClick={() => handleNavigate("/app/kyc")}
              className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-foreground transition-colors hover:bg-muted/60"
            >
              <HelpCircle className="h-4 w-4 text-muted-foreground" />
              Help & Support
            </button>
          </div>

          {/* Logout */}
          <div className="border-t border-border py-1.5">
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-red-600 transition-colors hover:bg-red-50"
            >
              <LogOut className="h-4 w-4" />
              Log Out
            </button>
          </div>
        </div>
      )}

      {/* Profile trigger button */}
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          "flex w-full items-center gap-3 rounded-lg p-2 transition-colors hover:bg-sidebar-accent/30",
          open && "bg-sidebar-accent/30"
        )}
      >
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary-pale text-sm font-bold text-primary">
          {user?.fullName?.charAt(0) ?? "U"}
        </div>
        {!collapsed && (
          <>
            <div className="min-w-0 flex-1 text-left">
              <p className="truncate text-sm font-medium text-white">
                {user?.fullName}
              </p>
              <p className="truncate text-xs text-sidebar-foreground/50">
                {user?.email}
              </p>
            </div>
            <ChevronUp className={cn(
              "h-4 w-4 shrink-0 text-sidebar-foreground/40 transition-transform",
              open ? "rotate-0" : "rotate-180"
            )} />
          </>
        )}
      </button>
    </div>
  )
}
