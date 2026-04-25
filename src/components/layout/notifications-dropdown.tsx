import { useState, useRef, useEffect } from "react"
import { Bell, FileText, CreditCard, Shield, MessageSquare, CheckCircle2, AlertCircle, Clock, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface NotifItem {
  id: string
  type: string
  message: string
  detail: string
  read: boolean
  time: string
  icon: typeof Bell
  color: string
}

const initialNotifications: NotifItem[] = [
  {
    id: "1",
    type: "contract_received",
    message: "New contract received",
    detail: "TechCorp BD sent you a contract for Website Redesign",
    read: false,
    time: "5 min ago",
    icon: FileText,
    color: "bg-blue-50 text-blue-600",
  },
  {
    id: "2",
    type: "escrow_funded",
    message: "Escrow funded",
    detail: "৳25,000 deposited for Logo & Brand Identity milestone 1",
    read: false,
    time: "1 hour ago",
    icon: Shield,
    color: "bg-emerald-50 text-emerald-600",
  },
  {
    id: "3",
    type: "comment_added",
    message: "New comment on contract",
    detail: "Farhan Ahmed commented on Scope of Work section",
    read: false,
    time: "2 hours ago",
    icon: MessageSquare,
    color: "bg-purple-50 text-purple-600",
  },
  {
    id: "4",
    type: "payment_approved",
    message: "Payment approved",
    detail: "৳15,000 released for E-commerce Shoot milestone 2",
    read: true,
    time: "5 hours ago",
    icon: CreditCard,
    color: "bg-emerald-50 text-emerald-600",
  },
  {
    id: "5",
    type: "milestone_deadline",
    message: "Milestone deadline approaching",
    detail: "Logo Concepts due in 2 days for ESC-2026-001",
    read: true,
    time: "1 day ago",
    icon: Clock,
    color: "bg-amber-50 text-amber-600",
  },
  {
    id: "6",
    type: "contract_signed",
    message: "Contract signed",
    detail: "Mobile App UI/UX contract signed by ShopUp",
    read: true,
    time: "2 days ago",
    icon: CheckCircle2,
    color: "bg-emerald-50 text-emerald-600",
  },
  {
    id: "7",
    type: "kyc_approved",
    message: "KYC verification approved",
    detail: "Your identity has been verified. Full access granted.",
    read: true,
    time: "3 days ago",
    icon: Shield,
    color: "bg-emerald-50 text-emerald-600",
  },
]

export function NotificationsDropdown() {
  const [open, setOpen] = useState(false)
  const [notifications, setNotifications] = useState(initialNotifications)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const unreadCount = notifications.filter((n) => !n.read).length

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [])

  const markRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  const dismiss = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="relative rounded-lg p-2.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
      >
        <Bell size={18} />
        {unreadCount > 0 && (
          <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-white">
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-96 rounded-xl border border-border bg-card shadow-xl z-50">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-medium text-foreground">Notifications</h3>
              {unreadCount > 0 && (
                <span className="rounded-full bg-destructive/10 px-2 py-0.5 text-[10px] font-medium text-destructive">
                  {unreadCount} new
                </span>
              )}
            </div>
            {unreadCount > 0 && (
              <button onClick={markAllRead} className="text-xs font-medium text-primary hover:underline">
                Mark all read
              </button>
            )}
          </div>

          {/* Notification list */}
          <div className="max-h-[420px] overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12">
                <Bell className="h-8 w-8 text-muted-foreground/30" />
                <p className="mt-2 text-sm text-muted-foreground">No notifications</p>
              </div>
            ) : (
              notifications.map((n) => (
                <div
                  key={n.id}
                  onClick={() => markRead(n.id)}
                  className={`group flex items-start gap-3 border-b border-border/40 px-4 py-3.5 transition-colors cursor-pointer hover:bg-muted/30 ${
                    !n.read ? "bg-primary/[0.03]" : ""
                  }`}
                >
                  <div className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${n.color}`}>
                    <n.icon className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className={`text-sm ${!n.read ? "font-medium text-foreground" : "text-foreground/80"}`}>
                        {n.message}
                      </p>
                      {!n.read && <span className="h-2 w-2 shrink-0 rounded-full bg-primary" />}
                    </div>
                    <p className="mt-0.5 text-xs text-muted-foreground line-clamp-1">{n.detail}</p>
                    <p className="mt-1 text-[10px] text-muted-foreground/60">{n.time}</p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      dismiss(n.id)
                    }}
                    className="mt-1 rounded p-1 text-muted-foreground/40 opacity-0 transition-opacity hover:bg-muted hover:text-foreground group-hover:opacity-100"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-border p-3">
            <Button variant="ghost" size="sm" className="w-full text-xs" onClick={() => setOpen(false)}>
              View all notifications
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
