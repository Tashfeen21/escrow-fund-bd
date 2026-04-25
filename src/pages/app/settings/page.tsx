import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useAuthStore } from "@/stores/auth-store"
import {
  User,
  Mail,
  Phone,
  Building2,
  Shield,
  Bell,
  CreditCard,
  CheckCircle2,
  Plus,
  Trash2,
  Lock,
} from "lucide-react"

export default function SettingsPage() {
  const { user } = useAuthStore()
  const [activeTab, setActiveTab] = useState<"profile" | "accounts" | "notifications" | "security">("profile")

  const tabs = [
    { id: "profile" as const, label: "Profile", icon: User },
    { id: "accounts" as const, label: "Linked Accounts", icon: CreditCard },
    { id: "notifications" as const, label: "Notifications", icon: Bell },
    { id: "security" as const, label: "Security", icon: Lock },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-3xl text-foreground">Settings</h1>
        <p className="mt-1 text-sm text-muted-foreground">Manage your account and preferences</p>
      </div>

      <div className="flex gap-6">
        {/* Sidebar tabs */}
        <div className="hidden w-48 shrink-0 space-y-1 md:block">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                activeTab === t.id ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <t.icon className="h-4 w-4" />
              {t.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 rounded-xl border border-border bg-card p-6 md:p-8">
          {activeTab === "profile" && (
            <div className="space-y-6">
              {/* Profile banner header */}
              <div className="relative overflow-hidden rounded-xl">
                <div className="h-28 bg-gradient-to-br from-[#1B4332] via-[#2D6A4F] to-[#40916C]" />
                <div className="absolute -bottom-10 left-6 flex h-20 w-20 items-center justify-center rounded-full border-4 border-card bg-white font-heading text-3xl text-primary shadow-lg">
                  {user?.fullName?.charAt(0)}
                </div>
              </div>
              <div className="flex items-end justify-between pt-6">
                <div>
                  <h2 className="font-heading text-xl text-foreground">{user?.fullName}</h2>
                  <p className="text-sm text-muted-foreground">{user?.email}</p>
                </div>
                <Button variant="outline" size="sm">Change Avatar</Button>
              </div>

              {/* Completeness */}
              <div className="flex items-center gap-4 rounded-lg bg-primary/5 p-4">
                <div className="relative h-12 w-12">
                  <svg className="h-12 w-12 -rotate-90" viewBox="0 0 36 36">
                    <path d="M18 2.0845a 15.9155 15.9155 0 0 1 0 31.831a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="var(--color-border)" strokeWidth="3" />
                    <path d="M18 2.0845a 15.9155 15.9155 0 0 1 0 31.831a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#2D6A4F" strokeWidth="3" strokeDasharray="75, 100" />
                  </svg>
                  <span className="absolute inset-0 flex items-center justify-center text-xs font-medium text-primary">75%</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Profile 75% complete</p>
                  <p className="text-xs text-muted-foreground">Add a bank account to complete your profile</p>
                </div>
              </div>

              <Separator />

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Full Name</Label>
                  <Input defaultValue={user?.fullName} />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <div className="relative">
                    <Input defaultValue={user?.email} disabled />
                    <CheckCircle2 className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-emerald-500" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Phone</Label>
                  <Input defaultValue={user?.phone} />
                </div>
                <div className="space-y-2">
                  <Label>Account Type</Label>
                  <Input defaultValue={user?.accountType?.replace("_", " ")} disabled className="capitalize" />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label>Business Name</Label>
                  <Input defaultValue={user?.businessName} />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label>Bio</Label>
                  <textarea
                    className="flex min-h-[80px] w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    defaultValue={user?.bio}
                  />
                </div>
              </div>

              {/* Trust badges */}
              <div>
                <h3 className="text-sm font-medium text-foreground">Trust Badges</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {user?.kycStatus === "verified" && (
                    <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                      <Shield className="h-3 w-3" /> KYC Verified
                    </span>
                  )}
                  <span className="flex items-center gap-1 rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                    <Mail className="h-3 w-3" /> Email Verified
                  </span>
                  <span className="flex items-center gap-1 rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                    <Phone className="h-3 w-3" /> Phone Verified
                  </span>
                </div>
              </div>

              <Button>Save Changes</Button>
            </div>
          )}

          {activeTab === "accounts" && (
            <div className="space-y-6">
              <div>
                <h2 className="font-heading text-xl text-foreground">Linked Accounts</h2>
                <p className="mt-1 text-sm text-muted-foreground">Manage your payment and withdrawal accounts</p>
              </div>
              <div className="space-y-3">
                {[
                  { method: "bKash", number: "017XXXXXXXX", desc: "Mobile financial service", color: "#e2136e", linked: true },
                  { method: "Nagad", number: "", desc: "Digital financial service", color: "#f6921e", linked: false },
                  { method: "AB Bank", number: "****1234", desc: "Traditional bank account", color: "#2563eb", linked: true },
                ].map((a) => (
                  <div key={a.method} className={`flex items-center justify-between rounded-xl border-2 p-4 transition-colors ${
                    a.linked ? "border-primary/20 bg-primary/[0.02]" : "border-border"
                  }`}>
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted/60">
                        <div className="h-4 w-4 rounded-full" style={{ background: a.color }} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium text-foreground">{a.method}</p>
                          {a.linked && (
                            <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-1.5 py-0.5 text-[10px] font-medium text-emerald-700">
                              <CheckCircle2 className="h-2.5 w-2.5" /> Linked
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground">{a.linked ? a.number : a.desc}</p>
                      </div>
                    </div>
                    {a.linked ? (
                      <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    ) : (
                      <Button variant="outline" size="sm">
                        <Plus className="mr-1 h-3 w-3" /> Link
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "notifications" && (
            <div className="space-y-6">
              <div>
                <h2 className="font-heading text-xl text-foreground">Notification Preferences</h2>
                <p className="mt-1 text-sm text-muted-foreground">Choose what you want to be notified about</p>
              </div>
              <div className="space-y-4">
                {[
                  { label: "Contract updates", desc: "When a contract is signed, sent, or updated", default: true },
                  { label: "Payment notifications", desc: "Escrow funded, released, or withdrawn", default: true },
                  { label: "Milestone reminders", desc: "Upcoming deadlines and approval requests", default: true },
                  { label: "Comments & mentions", desc: "When someone comments on your contract", default: false },
                  { label: "Marketing updates", desc: "Product news and feature announcements", default: false },
                ].map((n) => (
                  <div key={n.label} className="flex items-center justify-between rounded-lg border border-border p-4">
                    <div>
                      <p className="text-sm font-medium text-foreground">{n.label}</p>
                      <p className="text-xs text-muted-foreground">{n.desc}</p>
                    </div>
                    <ToggleSwitch defaultChecked={n.default} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "security" && (
            <div className="space-y-6">
              <div>
                <h2 className="font-heading text-xl text-foreground">Security</h2>
                <p className="mt-1 text-sm text-muted-foreground">Manage your password and security settings</p>
              </div>
              <div className="space-y-5">
                <div className="space-y-2">
                  <Label>Current Password</Label>
                  <Input type="password" placeholder="Enter current password" />
                </div>
                <div className="space-y-2">
                  <Label>New Password</Label>
                  <Input type="password" placeholder="Enter new password" />
                </div>
                <div className="space-y-2">
                  <Label>Confirm New Password</Label>
                  <Input type="password" placeholder="Confirm new password" />
                </div>
                <Button>Update Password</Button>
              </div>
              <Separator />
              <div className="flex items-center justify-between rounded-lg border border-border p-4">
                <div>
                  <p className="text-sm font-medium text-foreground">Two-Factor Authentication</p>
                  <p className="text-xs text-muted-foreground">Add an extra layer of security</p>
                </div>
                <Button variant="outline" size="sm" disabled>Coming Soon</Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function ToggleSwitch({ defaultChecked }: { defaultChecked: boolean }) {
  const [checked, setChecked] = useState(defaultChecked)
  return (
    <button
      onClick={() => setChecked(!checked)}
      className={`relative h-6 w-11 rounded-full transition-colors ${checked ? "bg-primary" : "bg-muted"}`}
    >
      <div className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${checked ? "translate-x-5.5 left-0.5" : "left-0.5"}`}
        style={{ transform: checked ? "translateX(20px)" : "translateX(0px)" }}
      />
    </button>
  )
}
