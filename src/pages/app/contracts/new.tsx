import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Plus,
  Trash2,
  GripVertical,
  FileText,
  Shield,
  Send,
  X,
  Mail,
  Link2,
  Bell,
  Copy,
  CheckCircle2,
  PartyPopper,
  ExternalLink,
} from "lucide-react"

const steps = ["Client Info", "Project Details", "Milestones", "NDA", "Preview", "Send"]

interface MilestoneInput {
  id: string
  title: string
  amount: string
  dueDate: string
}

interface ContractNewModalProps {
  open: boolean
  onClose: () => void
}

export default function ContractNewModal({ open, onClose }: ContractNewModalProps) {
  const [visible, setVisible] = useState(false)
  const [animating, setAnimating] = useState(false)
  const [step, setStep] = useState(0)
  const [clientEmail, setClientEmail] = useState("")
  const [clientName, setClientName] = useState("")
  const [clientPhone, setClientPhone] = useState("")
  const [projectTitle, setProjectTitle] = useState("")
  const [projectDescription, setProjectDescription] = useState("")
  const [contractType, setContractType] = useState<string>("service_agreement")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [milestones, setMilestones] = useState<MilestoneInput[]>([
    { id: "1", title: "", amount: "", dueDate: "" },
  ])
  const [includeNda, setIncludeNda] = useState(false)
  const [ndaDuration, setNdaDuration] = useState("12")
  const [sendMethod, setSendMethod] = useState<string | null>(null)
  const [linkCopied, setLinkCopied] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const total = milestones.reduce((s, m) => s + (parseFloat(m.amount) || 0), 0)

  const addMilestone = () =>
    setMilestones([...milestones, { id: Date.now().toString(), title: "", amount: "", dueDate: "" }])
  const removeMilestone = (id: string) =>
    milestones.length > 1 && setMilestones(milestones.filter((m) => m.id !== id))
  const updateMilestone = (id: string, field: keyof MilestoneInput, value: string) =>
    setMilestones(milestones.map((m) => (m.id === id ? { ...m, [field]: value } : m)))

  // Animation
  useEffect(() => {
    if (open) {
      setVisible(true)
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setAnimating(true))
      })
    } else {
      setAnimating(false)
      const timer = setTimeout(() => {
        setVisible(false)
        // Reset form when closed
        setStep(0)
        setSendMethod(null)
        setLinkCopied(false)
        setShowSuccess(false)
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [open])

  const handleCopyLink = () => {
    navigator.clipboard.writeText("https://escrowbd.com/c/abc123-demo-token")
    setLinkCopied(true)
    setTimeout(() => setLinkCopied(false), 2000)
  }

  const handleSend = () => {
    setShowSuccess(true)
  }

  if (!visible) return null

  // ─── Success Screen ─────────────────────────────────────
  if (showSuccess) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        {/* Overlay */}
        <div
          className={`fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
            animating ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Success card */}
        <div
          className={`relative mx-4 w-full max-w-lg rounded-2xl border border-border bg-card shadow-2xl transition-all duration-300 ${
            animating ? "translate-y-0 opacity-100 scale-100" : "translate-y-8 opacity-0 scale-[0.98]"
          }`}
        >
          <div className="px-8 py-10 text-center">
            {/* Animated checkmark */}
            <div className="relative mx-auto mb-6">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50 ring-8 ring-emerald-50/50">
                <CheckCircle2 className="h-10 w-10 text-emerald-500" />
              </div>
              <div className="absolute -right-1 -top-1 flex h-8 w-8 items-center justify-center rounded-full bg-amber-50 ring-4 ring-white">
                <PartyPopper className="h-4 w-4 text-amber-500" />
              </div>
            </div>

            <h2 className="font-heading text-2xl text-foreground">Contract Created!</h2>
            <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Your contract{projectTitle ? ` "${projectTitle}"` : ""} has been created and
              {sendMethod === "platform" && " a notification has been sent to "}
              {sendMethod === "email" && " an email has been sent to "}
              {sendMethod === "link" && " a shareable link has been generated for "}
              <strong className="text-foreground">{clientName || "your client"}</strong>.
            </p>

            {/* Contract summary */}
            <div className="mx-auto mt-6 max-w-xs rounded-xl border border-border bg-muted/30 p-4 text-left">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Contract</span>
                <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">ESC-2026-008</span>
              </div>
              <p className="mt-1.5 text-sm font-semibold text-foreground">{projectTitle || "Untitled Contract"}</p>
              <div className="mt-3 flex items-center justify-between border-t border-border/50 pt-3">
                <span className="text-xs text-muted-foreground">Total Value</span>
                <span className="text-sm font-semibold text-foreground">৳{total.toLocaleString("en-BD")}</span>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Milestones</span>
                <span className="text-sm font-medium text-foreground">{milestones.filter(m => m.title).length}</span>
              </div>
              {sendMethod === "link" && (
                <div className="mt-3 flex items-center gap-2 rounded-lg border border-border bg-white p-2 pl-3">
                  <span className="flex-1 truncate text-[11px] text-muted-foreground">
                    escrowbd.com/c/abc123-demo
                  </span>
                  <button
                    onClick={handleCopyLink}
                    className="shrink-0 rounded-md bg-muted px-2 py-1 text-[10px] font-medium text-foreground hover:bg-muted/80"
                  >
                    {linkCopied ? "Copied!" : "Copy"}
                  </button>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="mt-8 flex items-center justify-center gap-3">
              <Button variant="outline" onClick={onClose}>
                Back to Contracts
              </Button>
              <Button onClick={onClose}>
                <ExternalLink className="mr-1.5 h-4 w-4" />
                View Contract
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // ─── Main Modal ─────────────────────────────────────────
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto">
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
          animating ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />

      {/* Modal — larger size */}
      <div
        className={`relative mx-4 my-6 w-full max-w-5xl rounded-2xl border border-border bg-card shadow-2xl transition-all duration-300 ${
          animating ? "translate-y-0 opacity-100 scale-100" : "translate-y-8 opacity-0 scale-[0.98]"
        }`}
      >
        {/* Modal header */}
        <div className="flex items-center justify-between border-b border-border px-8 py-5">
          <div>
            <h1 className="font-heading text-2xl text-foreground">New Contract</h1>
            <p className="mt-0.5 text-sm text-muted-foreground">Step {step + 1} of {steps.length}</p>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-muted-foreground hover:bg-muted transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Steps indicator */}
        <div className="flex items-center gap-2 border-b border-border/50 px-8 py-4">
          {steps.map((s, i) => (
            <div key={s} className="flex flex-1 items-center gap-1.5">
              <button
                onClick={() => i < step && setStep(i)}
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-medium transition-colors ${
                  i < step
                    ? "bg-primary text-white"
                    : i === step
                    ? "bg-primary/10 text-primary ring-2 ring-primary/30"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {i < step ? <Check className="h-3.5 w-3.5" /> : i + 1}
              </button>
              <span className={`hidden text-xs font-medium lg:inline ${
                i <= step ? "text-foreground" : "text-muted-foreground"
              }`}>
                {s}
              </span>
              {i < steps.length - 1 && (
                <div className={`mx-1 h-0.5 flex-1 rounded-full ${i < step ? "bg-primary" : "bg-muted"}`} />
              )}
            </div>
          ))}
        </div>

        {/* Modal body — taller */}
        <div className="max-h-[65vh] overflow-y-auto px-8 py-8">
          <div className="mx-auto max-w-3xl">
            {step === 0 && (
              <div className="space-y-8">
                <div>
                  <h2 className="font-heading text-xl text-foreground">Client Information</h2>
                  <p className="mt-1 text-sm text-muted-foreground">Enter your client's details so we can set up the contract.</p>
                </div>
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-2 sm:col-span-2">
                    <Label className="text-sm">Client Email *</Label>
                    <Input type="email" placeholder="client@company.com" value={clientEmail} onChange={(e) => setClientEmail(e.target.value)} className="h-11" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm">Client Name *</Label>
                    <Input placeholder="Full name or company" value={clientName} onChange={(e) => setClientName(e.target.value)} className="h-11" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm">Phone (optional)</Label>
                    <Input placeholder="01XXXXXXXXX" value={clientPhone} onChange={(e) => setClientPhone(e.target.value)} className="h-11" />
                  </div>
                </div>
              </div>
            )}

            {step === 1 && (
              <div className="space-y-8">
                <div>
                  <h2 className="font-heading text-xl text-foreground">Project Details</h2>
                  <p className="mt-1 text-sm text-muted-foreground">Describe the work to be done and choose the contract type.</p>
                </div>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label className="text-sm">Project Title *</Label>
                    <Input placeholder="e.g., Website Redesign" value={projectTitle} onChange={(e) => setProjectTitle(e.target.value)} className="h-11" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm">Description</Label>
                    <textarea
                      className="flex min-h-[130px] w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      placeholder="Describe the scope of work, deliverables, and expectations..."
                      value={projectDescription}
                      onChange={(e) => setProjectDescription(e.target.value)}
                    />
                  </div>
                  <div className="space-y-3">
                    <Label className="text-sm">Contract Type</Label>
                    <div className="grid gap-3 sm:grid-cols-3">
                      {[
                        { v: "service_agreement", l: "Service Agreement", desc: "Standard contract for freelance and business projects", i: FileText },
                        { v: "nda_only", l: "NDA Only", desc: "Protect confidential information without a service scope", i: Shield },
                        { v: "service_nda", l: "Service + NDA", desc: "Full service agreement bundled with an NDA", i: Shield },
                      ].map((o) => (
                        <button
                          key={o.v}
                          onClick={() => setContractType(o.v)}
                          className={`flex flex-col items-center gap-3 rounded-xl border-2 p-5 text-center transition-all ${
                            contractType === o.v
                              ? "border-primary bg-primary/[0.03] shadow-sm"
                              : "border-border hover:border-primary/30 hover:bg-muted/30"
                          }`}
                        >
                          <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${
                            contractType === o.v ? "bg-primary/10" : "bg-muted/60"
                          }`}>
                            <o.i className={`h-5 w-5 ${contractType === o.v ? "text-primary" : "text-muted-foreground"}`} />
                          </div>
                          <div>
                            <p className={`text-sm font-medium ${contractType === o.v ? "text-primary" : "text-foreground"}`}>{o.l}</p>
                            <p className="mt-0.5 text-[11px] text-muted-foreground">{o.desc}</p>
                          </div>
                          <div className={`flex h-5 w-5 items-center justify-center rounded-full border-2 transition-colors ${
                            contractType === o.v ? "border-primary bg-primary" : "border-muted-foreground/30"
                          }`}>
                            {contractType === o.v && <Check className="h-3 w-3 text-white" />}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label className="text-sm">Start Date</Label>
                      <Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="h-11" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm">End Date</Label>
                      <Input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="h-11" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-8">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="font-heading text-xl text-foreground">Milestones</h2>
                    <p className="mt-1 text-sm text-muted-foreground">Break the project into payment milestones.</p>
                  </div>
                  <div className="rounded-xl bg-primary/10 px-4 py-2">
                    <p className="text-[10px] font-medium text-muted-foreground">Total Value</p>
                    <p className="font-heading text-xl text-primary">৳{total.toLocaleString("en-BD")}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  {milestones.map((m, i) => (
                    <div key={m.id} className="flex items-start gap-3 rounded-xl border border-border p-5">
                      <GripVertical className="mt-3 h-4 w-4 shrink-0 text-muted-foreground/30" />
                      <div className="flex-1 space-y-4">
                        <div className="flex items-center gap-3">
                          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">{i + 1}</span>
                          <Input placeholder="Milestone title" value={m.title} onChange={(e) => updateMilestone(m.id, "title", e.target.value)} className="flex-1 h-11" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="relative">
                            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">৳</span>
                            <Input placeholder="Amount" value={m.amount} onChange={(e) => updateMilestone(m.id, "amount", e.target.value)} className="pl-8 h-11" />
                          </div>
                          <Input type="date" value={m.dueDate} onChange={(e) => updateMilestone(m.id, "dueDate", e.target.value)} className="h-11" />
                        </div>
                      </div>
                      {milestones.length > 1 && (
                        <button onClick={() => removeMilestone(m.id)} className="mt-3 rounded-lg p-1.5 text-muted-foreground hover:bg-destructive/10 hover:text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                <Button variant="outline" onClick={addMilestone} className="w-full gap-1.5 h-11">
                  <Plus className="h-4 w-4" /> Add Milestone
                </Button>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-8">
                <div>
                  <h2 className="font-heading text-xl text-foreground">Non-Disclosure Agreement</h2>
                  <p className="mt-1 text-sm text-muted-foreground">Optionally include an NDA to protect confidential information.</p>
                </div>
                <button
                  onClick={() => setIncludeNda(!includeNda)}
                  className={`flex w-full items-center gap-5 rounded-xl border-2 p-5 text-left transition-colors ${includeNda ? "border-primary bg-primary/[0.03]" : "border-border hover:bg-muted/50"}`}
                >
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${includeNda ? "bg-primary text-white" : "bg-muted text-muted-foreground"}`}>
                    <Shield className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-foreground">Include NDA</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">Protect confidential information shared between both parties during the project.</p>
                  </div>
                  <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${includeNda ? "border-primary bg-primary" : "border-muted-foreground/30"}`}>
                    {includeNda && <Check className="h-3.5 w-3.5 text-white" />}
                  </div>
                </button>
                {includeNda && (
                  <div className="space-y-4 rounded-xl border border-border p-5">
                    <div className="space-y-2">
                      <Label className="text-sm">NDA Duration (months)</Label>
                      <Input type="number" value={ndaDuration} onChange={(e) => setNdaDuration(e.target.value)} min="1" max="60" className="h-11 max-w-xs" />
                      <p className="text-xs text-muted-foreground">How long should the NDA remain in effect after the engagement ends?</p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {step === 4 && (
              <div className="space-y-8">
                <div>
                  <h2 className="font-heading text-xl text-foreground">Preview</h2>
                  <p className="mt-1 text-sm text-muted-foreground">Review your contract details before sending.</p>
                </div>
                <div className="rounded-xl border border-border bg-background p-6 space-y-6">
                  <div className="text-center border-b border-border pb-6">
                    <p className="text-xs text-muted-foreground uppercase tracking-widest">Service Agreement</p>
                    <h3 className="mt-2 font-heading text-2xl text-foreground">{projectTitle || "Untitled"}</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-5 sm:grid-cols-4">
                    <div>
                      <p className="text-xs text-muted-foreground">Client</p>
                      <p className="mt-1 text-sm font-medium text-foreground">{clientName || "—"}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Email</p>
                      <p className="mt-1 text-sm font-medium text-foreground">{clientEmail || "—"}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Total Value</p>
                      <p className="mt-1 text-sm font-medium text-foreground">৳{total.toLocaleString("en-BD")}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Milestones</p>
                      <p className="mt-1 text-sm font-medium text-foreground">{milestones.filter((m) => m.title).length}</p>
                    </div>
                  </div>
                  {includeNda && (
                    <div className="flex items-center gap-2 rounded-lg bg-primary/5 p-3.5 text-sm text-primary">
                      <Shield className="h-4 w-4" /> NDA included ({ndaDuration} months)
                    </div>
                  )}
                  <Separator />
                  <div className="space-y-3">
                    <p className="text-sm font-semibold text-foreground">Milestones</p>
                    {milestones.filter((m) => m.title).map((m, i) => (
                      <div key={m.id} className="flex items-center justify-between rounded-lg border border-border p-4">
                        <span className="text-sm text-foreground">{i + 1}. {m.title}</span>
                        <span className="text-sm font-semibold text-foreground">৳{parseFloat(m.amount || "0").toLocaleString("en-BD")}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {step === 5 && (
              <div className="space-y-8">
                <div className="text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <Send className="h-7 w-7 text-primary" />
                  </div>
                  <h2 className="mt-5 font-heading text-xl text-foreground">Send Your Contract</h2>
                  <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
                    Choose how you'd like to share this contract with <strong className="text-foreground">{clientName || "your client"}</strong>.
                  </p>
                </div>

                {/* Sharing methods */}
                <div className="grid gap-4 sm:grid-cols-3">
                  {/* Method 1: Platform */}
                  <button
                    onClick={() => setSendMethod("platform")}
                    className={`flex flex-col items-center gap-3 rounded-xl border-2 p-6 text-center transition-all ${
                      sendMethod === "platform"
                        ? "border-primary bg-primary/[0.03] shadow-sm"
                        : "border-border hover:border-primary/30 hover:bg-muted/30"
                    }`}
                  >
                    <div className={`flex h-14 w-14 items-center justify-center rounded-xl ${
                      sendMethod === "platform" ? "bg-primary/10" : "bg-blue-50"
                    }`}>
                      <Bell className={`h-6 w-6 ${sendMethod === "platform" ? "text-primary" : "text-blue-600"}`} />
                    </div>
                    <div>
                      <p className={`text-sm font-semibold ${sendMethod === "platform" ? "text-primary" : "text-foreground"}`}>
                        Send via Platform
                      </p>
                      <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
                        Notify the client directly in EscrowBD (requires an account).
                      </p>
                    </div>
                    <div className={`flex h-5 w-5 items-center justify-center rounded-full border-2 transition-colors ${
                      sendMethod === "platform" ? "border-primary bg-primary" : "border-muted-foreground/30"
                    }`}>
                      {sendMethod === "platform" && <Check className="h-3 w-3 text-white" />}
                    </div>
                  </button>

                  {/* Method 2: Email */}
                  <button
                    onClick={() => setSendMethod("email")}
                    className={`flex flex-col items-center gap-3 rounded-xl border-2 p-6 text-center transition-all ${
                      sendMethod === "email"
                        ? "border-primary bg-primary/[0.03] shadow-sm"
                        : "border-border hover:border-primary/30 hover:bg-muted/30"
                    }`}
                  >
                    <div className={`flex h-14 w-14 items-center justify-center rounded-xl ${
                      sendMethod === "email" ? "bg-primary/10" : "bg-amber-50"
                    }`}>
                      <Mail className={`h-6 w-6 ${sendMethod === "email" ? "text-primary" : "text-amber-600"}`} />
                    </div>
                    <div>
                      <p className={`text-sm font-semibold ${sendMethod === "email" ? "text-primary" : "text-foreground"}`}>
                        Send via Email
                      </p>
                      <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
                        Send a branded email with a "Review Contract" button.
                      </p>
                    </div>
                    <div className={`flex h-5 w-5 items-center justify-center rounded-full border-2 transition-colors ${
                      sendMethod === "email" ? "border-primary bg-primary" : "border-muted-foreground/30"
                    }`}>
                      {sendMethod === "email" && <Check className="h-3 w-3 text-white" />}
                    </div>
                  </button>

                  {/* Method 3: Copy link */}
                  <button
                    onClick={() => setSendMethod("link")}
                    className={`flex flex-col items-center gap-3 rounded-xl border-2 p-6 text-center transition-all ${
                      sendMethod === "link"
                        ? "border-primary bg-primary/[0.03] shadow-sm"
                        : "border-border hover:border-primary/30 hover:bg-muted/30"
                    }`}
                  >
                    <div className={`flex h-14 w-14 items-center justify-center rounded-xl ${
                      sendMethod === "link" ? "bg-primary/10" : "bg-emerald-50"
                    }`}>
                      <Link2 className={`h-6 w-6 ${sendMethod === "link" ? "text-primary" : "text-emerald-600"}`} />
                    </div>
                    <div>
                      <p className={`text-sm font-semibold ${sendMethod === "link" ? "text-primary" : "text-foreground"}`}>
                        Copy Shareable Link
                      </p>
                      <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
                        Get a link to share via WhatsApp, Messenger, etc.
                      </p>
                    </div>
                    <div className={`flex h-5 w-5 items-center justify-center rounded-full border-2 transition-colors ${
                      sendMethod === "link" ? "border-primary bg-primary" : "border-muted-foreground/30"
                    }`}>
                      {sendMethod === "link" && <Check className="h-3 w-3 text-white" />}
                    </div>
                  </button>
                </div>

                {/* Copy link input (shown when link method selected) */}
                {sendMethod === "link" && (
                  <div className="flex items-center gap-2 rounded-xl border border-border bg-muted/30 p-3 pl-5">
                    <span className="flex-1 truncate text-sm text-muted-foreground">
                      https://escrowbd.com/c/abc123-demo-token
                    </span>
                    <Button
                      size="sm"
                      variant={linkCopied ? "default" : "outline"}
                      className="shrink-0 gap-1.5"
                      onClick={handleCopyLink}
                    >
                      {linkCopied ? (
                        <><CheckCircle2 className="h-3.5 w-3.5" /> Copied</>
                      ) : (
                        <><Copy className="h-3.5 w-3.5" /> Copy Link</>
                      )}
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Modal footer */}
        <div className="flex items-center justify-between border-t border-border px-8 py-5">
          {step < 5 ? (
            <>
              <Button
                variant="outline"
                size="lg"
                onClick={() => setStep(Math.max(0, step - 1))}
                disabled={step === 0}
              >
                <ArrowLeft className="mr-1.5 h-4 w-4" /> Back
              </Button>
              <Button size="lg" onClick={() => setStep(Math.min(5, step + 1))}>
                {step === 4 ? (
                  <><Send className="mr-1.5 h-4 w-4" /> Continue to Send</>
                ) : (
                  <>Next <ArrowRight className="ml-1.5 h-4 w-4" /></>
                )}
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" size="lg" onClick={onClose}>
                Save as Draft
              </Button>
              <Button
                size="lg"
                disabled={!sendMethod}
                onClick={handleSend}
              >
                {sendMethod === "platform" && <><Bell className="mr-1.5 h-4 w-4" /> Send Notification</>}
                {sendMethod === "email" && <><Mail className="mr-1.5 h-4 w-4" /> Send Email</>}
                {sendMethod === "link" && <><CheckCircle2 className="mr-1.5 h-4 w-4" /> Done</>}
                {!sendMethod && <><Send className="mr-1.5 h-4 w-4" /> Select a Method</>}
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
