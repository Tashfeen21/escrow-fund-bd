import { Link } from "react-router-dom"
import { X } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { useAuthStore } from "@/stores/auth-store"
import { useState } from "react"

interface OnboardingStep {
  label: string
  completed: boolean
  href: string
  percentage: number
}

function getOnboardingSteps(user: ReturnType<typeof useAuthStore>["user"]): OnboardingStep[] {
  if (!user) return []

  return [
    {
      label: "Complete your profile",
      completed: !!user.bio && !!user.businessName,
      href: "/app/settings",
      percentage: 25,
    },
    {
      label: "Add bank/MFS account",
      completed: false, // No linked accounts data yet
      href: "/app/settings",
      percentage: 25,
    },
    {
      label: "Verify your identity (KYC)",
      completed: user.kycStatus === "verified",
      href: "/app/kyc",
      percentage: 25,
    },
    {
      label: "Create your first contract",
      completed: false, // No contracts data yet
      href: "/app/contracts/new",
      percentage: 25,
    },
  ]
}

export function OnboardingBanner() {
  const { user } = useAuthStore()
  const [dismissed, setDismissed] = useState(false)

  if (!user || dismissed) return null

  const steps = getOnboardingSteps(user)
  const completedPercentage = steps
    .filter((s) => s.completed)
    .reduce((sum, s) => sum + s.percentage, 0)

  // Don't show if fully complete
  if (completedPercentage === 100) return null

  const nextStep = steps.find((s) => !s.completed)

  return (
    <div className="relative rounded-xl border border-primary/20 bg-primary-pale p-4">
      <button
        onClick={() => setDismissed(true)}
        className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
      >
        <X className="h-4 w-4" />
      </button>

      <div className="flex items-center gap-4">
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-3">
            <Progress value={completedPercentage} className="h-2 w-32" />
            <span className="text-sm font-medium text-primary">
              {completedPercentage}% complete
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            {steps.filter((s) => !s.completed).map((s) => s.label).join(" \u00b7 ")}
          </p>
        </div>
        {nextStep && (
          <Button size="sm" className="shrink-0 whitespace-nowrap" render={<Link to={nextStep.href} />}>
            {nextStep.label}
          </Button>
        )}
      </div>
    </div>
  )
}
