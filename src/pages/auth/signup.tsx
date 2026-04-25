import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import {
  Eye,
  EyeOff,
  Loader2,
  User,
  Building2,
  Users,
  ArrowLeft,
  CheckCircle2,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useAuthStore } from "@/stores/auth-store"
import type { AccountType } from "@/types"

const emailSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
})

const profileSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  phone: z
    .string()
    .regex(/^01\d{9}$/, "Enter a valid Bangladeshi phone number (01XXXXXXXXX)"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

type EmailForm = z.infer<typeof emailSchema>
type ProfileForm = z.infer<typeof profileSchema>

function StepIndicator({ currentStep }: { currentStep: number }) {
  const steps = ["Email", "Verify", "Profile", "Account"]

  return (
    <div className="flex items-center justify-center gap-3">
      {steps.map((label, i) => (
        <div key={label} className="flex items-center gap-3">
          <div className="flex flex-col items-center">
            <div
              className={cn(
                "flex h-9 w-9 items-center justify-center rounded-full text-xs font-medium transition-colors",
                i < currentStep
                  ? "bg-primary text-white"
                  : i === currentStep
                    ? "bg-primary text-white"
                    : "bg-muted text-muted-foreground"
              )}
            >
              {i < currentStep ? (
                <CheckCircle2 className="h-4 w-4" />
              ) : (
                i + 1
              )}
            </div>
            <span
              className={cn(
                "mt-1.5 text-[11px] font-medium",
                i <= currentStep
                  ? "text-primary"
                  : "text-muted-foreground"
              )}
            >
              {label}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div
              className={cn(
                "mb-5 h-px w-10",
                i < currentStep ? "bg-primary" : "bg-border"
              )}
            />
          )}
        </div>
      ))}
    </div>
  )
}

export default function SignupPage() {
  const navigate = useNavigate()
  const { setUser } = useAuthStore()
  const [step, setStep] = useState(0)
  const [email, setEmail] = useState("")
  const [otp, setOtp] = useState("")
  const [otpError, setOtpError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [resendTimer, setResendTimer] = useState(0)
  const [selectedAccountType, setSelectedAccountType] =
    useState<AccountType>("solo_freelancer")

  const emailForm = useForm<EmailForm>({
    resolver: zodResolver(emailSchema),
  })

  const handleEmailSubmit = async (data: EmailForm) => {
    setIsLoading(true)
    await new Promise((r) => setTimeout(r, 800))
    setEmail(data.email)
    setIsLoading(false)
    setStep(1)
    startResendTimer()
  }

  const startResendTimer = () => {
    setResendTimer(60)
    const interval = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval)
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  const handleOtpVerify = async () => {
    if (otp.length !== 6) {
      setOtpError("Please enter the full 6-digit code")
      return
    }
    setIsLoading(true)
    setOtpError("")
    await new Promise((r) => setTimeout(r, 800))
    setIsLoading(false)
    setStep(2)
  }

  const handleResendOtp = () => {
    if (resendTimer > 0) return
    startResendTimer()
    setOtp("")
    setOtpError("")
  }

  const [showPassword, setShowPassword] = useState(false)

  const profileForm = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
  })

  const handleProfileSubmit = async (_data: ProfileForm) => {
    setIsLoading(true)
    await new Promise((r) => setTimeout(r, 500))
    setIsLoading(false)
    setStep(3)
  }

  const handleFinish = async () => {
    setIsLoading(true)
    await new Promise((r) => setTimeout(r, 800))
    const profileData = profileForm.getValues()
    setUser({
      id: "1",
      email,
      fullName: profileData.fullName,
      phone: profileData.phone,
      accountType: selectedAccountType,
      activeMode: selectedAccountType === "client" ? "client" : "sp",
      kycStatus: "not_started",
      createdAt: new Date().toISOString(),
    })
    setIsLoading(false)
    navigate("/app/dashboard")
  }

  return (
    <div className="space-y-8">
      <StepIndicator currentStep={step} />

      {/* Step 0: Email */}
      {step === 0 && (
        <div className="space-y-8">
          <div className="space-y-2 text-center">
            <h1 className="font-heading text-3xl text-foreground">
              Create your account
            </h1>
            <p className="text-sm text-muted-foreground">
              Get started with EscrowBD in minutes
            </p>
          </div>

          <Button
            variant="outline"
            className="w-full gap-2.5"
            disabled={isLoading}
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            Continue with Google
          </Button>

          <div className="flex items-center gap-4">
            <Separator className="flex-1" />
            <span className="text-xs text-muted-foreground">or</span>
            <Separator className="flex-1" />
          </div>

          <form
            onSubmit={emailForm.handleSubmit(handleEmailSubmit)}
            className="space-y-5"
          >
            <div className="space-y-2">
              <Label htmlFor="signup-email">Email address</Label>
              <Input
                id="signup-email"
                type="email"
                placeholder="you@example.com"
                {...emailForm.register("email")}
                className={
                  emailForm.formState.errors.email ? "border-destructive" : ""
                }
              />
              {emailForm.formState.errors.email && (
                <p className="text-xs text-destructive">
                  {emailForm.formState.errors.email.message}
                </p>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending code...
                </>
              ) : (
                "Continue"
              )}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              to="/auth/login"
              className="font-medium text-primary hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      )}

      {/* Step 1: OTP Verification */}
      {step === 1 && (
        <div className="space-y-8">
          <button
            onClick={() => setStep(0)}
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <div className="space-y-2 text-center">
            <h1 className="font-heading text-3xl text-foreground">
              Check your email
            </h1>
            <p className="text-sm text-muted-foreground">
              We sent a 6-digit code to{" "}
              <span className="font-medium text-foreground">{email}</span>
            </p>
          </div>

          <div className="flex justify-center">
            <InputOTP
              maxLength={6}
              value={otp}
              onChange={(value) => {
                setOtp(value)
                setOtpError("")
              }}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} className={otpError ? "border-destructive" : ""} />
                <InputOTPSlot index={1} className={otpError ? "border-destructive" : ""} />
                <InputOTPSlot index={2} className={otpError ? "border-destructive" : ""} />
                <InputOTPSlot index={3} className={otpError ? "border-destructive" : ""} />
                <InputOTPSlot index={4} className={otpError ? "border-destructive" : ""} />
                <InputOTPSlot index={5} className={otpError ? "border-destructive" : ""} />
              </InputOTPGroup>
            </InputOTP>
          </div>

          {otpError && (
            <p className="text-center text-xs text-destructive">{otpError}</p>
          )}

          <Button
            className="w-full"
            onClick={handleOtpVerify}
            disabled={isLoading || otp.length !== 6}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Verifying...
              </>
            ) : (
              "Verify Code"
            )}
          </Button>

          <p className="text-center text-sm text-muted-foreground">
            Didn&apos;t receive the code?{" "}
            {resendTimer > 0 ? (
              <span className="text-muted-foreground">
                Resend in {resendTimer}s
              </span>
            ) : (
              <button
                onClick={handleResendOtp}
                className="font-medium text-primary hover:underline"
              >
                Resend code
              </button>
            )}
          </p>
        </div>
      )}

      {/* Step 2: Profile */}
      {step === 2 && (
        <div className="space-y-8">
          <button
            onClick={() => setStep(1)}
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <div className="space-y-2 text-center">
            <h1 className="font-heading text-3xl text-foreground">
              Set up your profile
            </h1>
            <p className="text-sm text-muted-foreground">
              Tell us a bit about yourself
            </p>
          </div>

          <form
            onSubmit={profileForm.handleSubmit(handleProfileSubmit)}
            className="space-y-5"
          >
            <div className="space-y-2">
              <Label htmlFor="fullName">Full name</Label>
              <Input
                id="fullName"
                placeholder="Your full name"
                {...profileForm.register("fullName")}
                className={
                  profileForm.formState.errors.fullName
                    ? "border-destructive"
                    : ""
                }
              />
              {profileForm.formState.errors.fullName && (
                <p className="text-xs text-destructive">
                  {profileForm.formState.errors.fullName.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone number</Label>
              <Input
                id="phone"
                placeholder="01XXXXXXXXX"
                {...profileForm.register("phone")}
                className={
                  profileForm.formState.errors.phone
                    ? "border-destructive"
                    : ""
                }
              />
              {profileForm.formState.errors.phone && (
                <p className="text-xs text-destructive">
                  {profileForm.formState.errors.phone.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="At least 8 characters"
                  {...profileForm.register("password")}
                  className={cn(
                    "pr-10",
                    profileForm.formState.errors.password &&
                      "border-destructive"
                  )}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {profileForm.formState.errors.password && (
                <p className="text-xs text-destructive">
                  {profileForm.formState.errors.password.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Repeat your password"
                {...profileForm.register("confirmPassword")}
                className={
                  profileForm.formState.errors.confirmPassword
                    ? "border-destructive"
                    : ""
                }
              />
              {profileForm.formState.errors.confirmPassword && (
                <p className="text-xs text-destructive">
                  {profileForm.formState.errors.confirmPassword.message}
                </p>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Continue"
              )}
            </Button>
          </form>
        </div>
      )}

      {/* Step 3: Account Type */}
      {step === 3 && (
        <div className="space-y-8">
          <button
            onClick={() => setStep(2)}
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <div className="space-y-2 text-center">
            <h1 className="font-heading text-3xl text-foreground">
              How will you use EscrowBD?
            </h1>
            <p className="text-sm text-muted-foreground">
              You can always switch between modes later
            </p>
          </div>

          <div className="grid gap-3">
            <AccountTypeCard
              icon={User}
              title="Solo Freelancer"
              description="I provide services and want to get paid securely through escrow."
              selected={selectedAccountType === "solo_freelancer"}
              onClick={() => setSelectedAccountType("solo_freelancer")}
            />
            <AccountTypeCard
              icon={Building2}
              title="Business"
              description="I run an agency or company that provides services to clients."
              selected={selectedAccountType === "business"}
              onClick={() => setSelectedAccountType("business")}
            />
            <AccountTypeCard
              icon={Users}
              title="Client"
              description="I hire service providers and want payment protection."
              selected={selectedAccountType === "client"}
              onClick={() => setSelectedAccountType("client")}
            />
          </div>

          <Button
            className="w-full"
            onClick={handleFinish}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating account...
              </>
            ) : (
              "Create Account"
            )}
          </Button>
        </div>
      )}
    </div>
  )
}

function AccountTypeCard({
  icon: Icon,
  title,
  description,
  selected,
  onClick,
}: {
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
  selected: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-start gap-4 rounded-xl border-2 p-5 text-left transition-all",
        selected
          ? "border-primary bg-primary-pale"
          : "border-border bg-card hover:border-primary/40"
      )}
    >
      <div
        className={cn(
          "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl",
          selected ? "bg-primary text-white" : "bg-muted text-muted-foreground"
        )}
      >
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <p className="font-medium text-foreground">{title}</p>
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      </div>
    </button>
  )
}
