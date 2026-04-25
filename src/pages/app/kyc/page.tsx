import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuthStore } from "@/stores/auth-store"
import {
  Check,
  Upload,
  User,
  CreditCard,
  Building2,
  FileCheck,
  ShieldCheck,
  AlertCircle,
} from "lucide-react"

const kycSteps = [
  { id: 0, label: "Personal Info", icon: User },
  { id: 1, label: "NID Verification", icon: FileCheck },
  { id: 2, label: "Business Docs", icon: Building2 },
  { id: 3, label: "Bank / MFS", icon: CreditCard },
  { id: 4, label: "Review", icon: ShieldCheck },
]

export default function KYCPage() {
  const { user } = useAuthStore()
  const [step, setStep] = useState(0)
  const [nidFront, setNidFront] = useState<string | null>(null)
  const [nidBack, setNidBack] = useState<string | null>(null)
  const [tradeLicense, setTradeLicense] = useState<string | null>(null)

  const isVerified = user?.kycStatus === "verified"

  if (isVerified) {
    return (
      <div className="space-y-6">
        <h1 className="font-heading text-3xl text-foreground">KYC Verification</h1>
        <div className="mx-auto max-w-md rounded-xl border border-emerald-200 bg-emerald-50/50 p-8 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
            <ShieldCheck className="h-8 w-8 text-emerald-600" />
          </div>
          <h2 className="mt-4 font-heading text-xl text-foreground">Verified</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Your identity has been verified. You have full access to all platform features.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="font-heading text-3xl text-foreground">KYC Verification</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Complete verification to withdraw funds and access all features
        </p>
      </div>

      {/* Alert */}
      <div className="flex items-start gap-3 rounded-lg border border-amber-200 bg-amber-50 p-4">
        <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
        <p className="text-sm text-amber-800">
          KYC verification is required to withdraw funds and receive payments. Complete all steps to get verified.
        </p>
      </div>

      {/* Steps */}
      <div className="flex items-center gap-1">
        {kycSteps.map((s, i) => (
          <div key={s.id} className="flex flex-1 items-center gap-1">
            <button
              onClick={() => i <= step && setStep(i)}
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-all ${
                i < step ? "bg-primary text-white" : i === step ? "bg-primary/10 text-primary ring-2 ring-primary/30" : "bg-muted text-muted-foreground"
              }`}
            >
              {i < step ? <Check className="h-4 w-4" /> : <s.icon className="h-4 w-4" />}
            </button>
            {i < kycSteps.length - 1 && <div className={`h-0.5 flex-1 rounded-full ${i < step ? "bg-primary" : "bg-muted"}`} />}
          </div>
        ))}
      </div>
      <p className="text-center text-sm font-medium text-foreground">{kycSteps[step].label}</p>

      <div className="rounded-xl border border-border bg-card p-6 md:p-8">
        {step === 0 && (
          <div className="space-y-5">
            <h2 className="font-heading text-xl text-foreground">Personal Information</h2>
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Full Name (as on NID)</Label>
                <Input defaultValue={user?.fullName} />
              </div>
              <div className="space-y-2">
                <Label>Date of Birth</Label>
                <Input type="date" />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label>NID Number</Label>
                <Input placeholder="Enter your National ID number" />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label>Address</Label>
                <Input placeholder="Full address as on NID" />
              </div>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-5">
            <h2 className="font-heading text-xl text-foreground">NID Verification</h2>
            <p className="text-sm text-muted-foreground">Upload clear photos of your National ID card (front and back).</p>
            <div className="grid gap-4 sm:grid-cols-2">
              <FileUploadBox label="NID Front" file={nidFront} onUpload={() => setNidFront("nid_front.jpg")} />
              <FileUploadBox label="NID Back" file={nidBack} onUpload={() => setNidBack("nid_back.jpg")} />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-5">
            <h2 className="font-heading text-xl text-foreground">Business Documents</h2>
            <p className="text-sm text-muted-foreground">Upload your trade license or business registration (if applicable).</p>
            <FileUploadBox label="Trade License / Registration" file={tradeLicense} onUpload={() => setTradeLicense("trade_license.pdf")} />
            <p className="text-xs text-muted-foreground">Skip this step if you're a freelancer without a trade license.</p>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-5">
            <h2 className="font-heading text-xl text-foreground">Bank / MFS Account</h2>
            <p className="text-sm text-muted-foreground">Link your payment account for withdrawals.</p>
            <div className="space-y-3">
              {[
                { label: "bKash", desc: "Mobile financial service — instant transfers", color: "#e2136e", placeholder: "01XXXXXXXXX" },
                { label: "Nagad", desc: "Digital financial service by Bangladesh Post Office", color: "#f6921e", placeholder: "01XXXXXXXXX" },
                { label: "Bank Account", desc: "Traditional bank transfer — may take 1-2 business days", color: "#2563eb", placeholder: "Account number" },
              ].map((m) => (
                <div key={m.label} className="rounded-xl border-2 border-border p-4 transition-all focus-within:border-primary focus-within:shadow-sm">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted/60">
                      <div className="h-4 w-4 rounded-full" style={{ background: m.color }} />
                    </div>
                    <div>
                      <span className="text-sm font-medium text-foreground">{m.label}</span>
                      <p className="text-xs text-muted-foreground">{m.desc}</p>
                    </div>
                  </div>
                  <Input placeholder={m.placeholder} />
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-5 text-center py-4">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <ShieldCheck className="h-7 w-7 text-primary" />
            </div>
            <h2 className="font-heading text-xl text-foreground">Ready for Review</h2>
            <p className="text-sm text-muted-foreground max-w-sm mx-auto">
              Your documents will be reviewed within 24-48 hours. You'll be notified once verified.
            </p>
            <Button size="lg" className="px-8">Submit for Verification</Button>
          </div>
        )}
      </div>

      {step < 4 && (
        <div className="flex justify-between">
          <Button variant="outline" onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0}>Back</Button>
          <Button onClick={() => setStep(Math.min(4, step + 1))}>
            {step === 3 ? "Review" : "Next"}
          </Button>
        </div>
      )}
    </div>
  )
}

function FileUploadBox({ label, file, onUpload }: { label: string; file: string | null; onUpload: () => void }) {
  return (
    <button
      onClick={onUpload}
      className={`flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-8 transition-colors ${
        file ? "border-primary/30 bg-primary/5" : "border-border hover:border-primary/30 hover:bg-muted/30"
      }`}
    >
      {file ? (
        <>
          <Check className="h-6 w-6 text-primary" />
          <p className="mt-2 text-sm font-medium text-primary">{file}</p>
          <p className="text-xs text-muted-foreground">Click to replace</p>
        </>
      ) : (
        <>
          <Upload className="h-6 w-6 text-muted-foreground" />
          <p className="mt-2 text-sm font-medium text-foreground">{label}</p>
          <p className="text-xs text-muted-foreground">Click to upload (JPG, PNG, PDF)</p>
        </>
      )}
    </button>
  )
}
