import { useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import {
  Shield,
  FileText,
  CreditCard,
  CheckCircle2,
  ArrowRight,
  BadgeCheck,
  Lock,
  PenTool,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { DashboardMockup } from "@/components/shared/dashboard-mockup"
import heroBg from "@/assets/hero-bg.jpg"

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* ═══════════════════════════════════════════════════
          HERO — full-bleed bg image, floating nav, centered copy,
          dashboard mockup overlapping into next section
         ═══════════════════════════════════════════════════ */}
      <div className="relative overflow-hidden">
        {/* Background — landscape image + dark overlay for text contrast */}
        <img
          src={heroBg}
          alt=""
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
        <div
          className="absolute inset-0 -z-10"
          style={{
            background: `
              linear-gradient(180deg,
                rgba(10,25,15,0.75) 0%,
                rgba(15,35,22,0.65) 40%,
                rgba(20,45,30,0.6) 70%,
                rgba(25,55,35,0.7) 100%
              )
            `,
          }}
        />

        {/* Nav */}
        <header className="relative z-50">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
            <span className="font-heading text-2xl text-white">
              EscrowBD
            </span>
            <div className="flex items-center gap-3">
              <Button variant="ghost" className="text-white/70 hover:bg-white/10 hover:text-white" render={<Link to="/auth/login" />}>
                Sign In
              </Button>
              <Button className="border border-white/20 bg-white text-background-dark hover:bg-white/90" render={<Link to="/auth/signup" />}>
                Get Started
              </Button>
            </div>
          </div>
        </header>

        {/* Hero content */}
        <div className="relative z-10 flex flex-col items-center px-6 pb-0 pt-20 text-center md:pt-28">
          <h1 className="max-w-5xl font-heading text-5xl leading-[1.05] text-white md:text-7xl lg:text-8xl">
            Secure Contracts.<br />
            Escrow Payments.
          </h1>

          <p className="mt-8 max-w-xl text-base leading-relaxed text-white/55 md:text-lg">
            Create contracts, collect milestone-based payments, and build trust
            — with native bKash, Nagad, and bank integration.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4">
            <Button
              size="lg"
              className="border border-white/20 bg-white px-8 text-background-dark hover:bg-white/90"
              render={<Link to="/auth/signup" />}
            >
              Get Started
            </Button>
            <Button
              size="lg"
              className="border border-white/20 bg-transparent px-8 text-white hover:bg-white/10"
              render={<Link to="/auth/login" />}
            >
              Book a Demo
            </Button>
          </div>

          {/* Dashboard mockup — floats into next section */}
          <div className="relative z-20 mt-16 w-full max-w-5xl md:mt-20">
            <div className="relative">
              {/* Glow behind the mockup */}
              <div className="absolute -inset-4 -z-10 rounded-2xl bg-white/5 blur-2xl" />
              <DashboardMockup />
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════
          REST OF PAGE — white/warm background
         ═══════════════════════════════════════════════════ */}

      {/* Features */}
      <section className="bg-background px-6 pt-16 pb-24 md:pt-24">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-widest text-primary">Features</span>
              <h2 className="mt-3 max-w-lg font-heading text-4xl leading-snug text-foreground md:text-5xl">
                Everything you need to{" "}
                <span className="text-primary/50">work with trust</span>
              </h2>
            </div>
            <div className="hidden items-center gap-2 md:flex">
              <button className="flex h-12 w-12 items-center justify-center rounded-full bg-muted transition-colors hover:bg-muted-foreground/10">
                <ChevronLeft className="h-5 w-5 text-foreground/60" />
              </button>
              <button className="flex h-12 w-12 items-center justify-center rounded-full bg-muted transition-colors hover:bg-muted-foreground/10">
                <ChevronRight className="h-5 w-5 text-foreground/60" />
              </button>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {/* Card 1 — Escrow Protection */}
            <div className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card">
              <div className="relative flex h-72 items-center justify-center overflow-hidden bg-[#f0ece4]">
                {/* Mini widget — escrow balance */}
                <div className="w-52 rounded-xl bg-white p-4 shadow-md">
                  <div className="flex items-center gap-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-primary/10">
                      <Shield className="h-3 w-3 text-primary" />
                    </div>
                    <span className="text-[10px] font-medium text-foreground/60">Escrow Held</span>
                  </div>
                  <p className="mt-2.5 font-heading text-2xl text-foreground">৳1,25,000</p>
                  <div className="mt-2 h-1.5 w-full rounded-full bg-muted">
                    <div className="h-full w-3/5 rounded-full bg-primary" />
                  </div>
                  <p className="mt-1.5 text-[9px] text-muted-foreground">3 of 5 milestones funded</p>
                </div>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <span className="text-[10px] font-semibold uppercase tracking-widest text-primary">Escrow</span>
                <h3 className="mt-2 font-heading text-lg text-foreground">
                  Escrow Protection
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Funds held safely until milestones are approved. Neither party takes undue risk.
                </p>
              </div>
            </div>

            {/* Card 2 — Digital Contracts */}
            <div className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card">
              <div className="relative flex h-72 items-center justify-center overflow-hidden bg-[#eef0ec]">
                {/* Mini widget — contract preview */}
                <div className="w-52 rounded-xl bg-white p-4 shadow-md">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-medium text-foreground/60">Contract</span>
                    <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[8px] font-medium text-emerald-600">Active</span>
                  </div>
                  <p className="mt-2 text-xs font-medium text-foreground">Web Redesign Project</p>
                  <p className="mt-1 text-[9px] text-muted-foreground">TechCorp BD</p>
                  <div className="mt-3 space-y-1.5">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="h-2.5 w-2.5 text-emerald-500" />
                      <span className="text-[9px] text-foreground/60">Wireframes</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="h-2.5 w-2.5 text-emerald-500" />
                      <span className="text-[9px] text-foreground/60">UI Design</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="h-2.5 w-2.5 rounded-full border border-muted-foreground/30" />
                      <span className="text-[9px] text-foreground/60">Development</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <span className="text-[10px] font-semibold uppercase tracking-widest text-primary">Contracts</span>
                <h3 className="mt-2 font-heading text-lg text-foreground">
                  Digital Contracts
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Create, comment, and e-sign contracts with full audit trail and version history.
                </p>
              </div>
            </div>

            {/* Card 3 — E-Signatures */}
            <div className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card">
              <div className="relative flex h-72 items-center justify-center overflow-hidden bg-[#e8eeef]">
                {/* Mini widget — signature */}
                <div className="w-52 rounded-xl bg-white p-4 shadow-md">
                  <div className="flex items-center gap-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-blue-50">
                      <PenTool className="h-3 w-3 text-blue-500" />
                    </div>
                    <span className="text-[10px] font-medium text-foreground/60">E-Signature</span>
                  </div>
                  <div className="mt-3 rounded-lg border border-dashed border-muted-foreground/20 p-3">
                    <p className="font-heading text-lg text-foreground/70 italic">Karim Ahmed</p>
                  </div>
                  <div className="mt-2.5 flex items-center justify-between">
                    <span className="text-[9px] text-muted-foreground">Signed 2 min ago</span>
                    <span className="flex items-center gap-0.5 text-[9px] font-medium text-emerald-600">
                      <CheckCircle2 className="h-2.5 w-2.5" /> Verified
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <span className="text-[10px] font-semibold uppercase tracking-widest text-primary">Signing</span>
                <h3 className="mt-2 font-heading text-lg text-foreground">
                  E-Signatures
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Legally binding e-signatures with OTP verification. Sign from any device, anywhere.
                </p>
              </div>
            </div>

            {/* Card 4 — Local Payments */}
            <div className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card">
              <div className="relative flex h-72 items-center justify-center overflow-hidden bg-[#f0ece4]">
                {/* Mini widget — payment methods */}
                <div className="w-52 rounded-xl bg-white p-4 shadow-md">
                  <div className="flex items-center gap-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-amber-50">
                      <CreditCard className="h-3 w-3 text-amber-600" />
                    </div>
                    <span className="text-[10px] font-medium text-foreground/60">Payment Received</span>
                  </div>
                  <p className="mt-2.5 font-heading text-2xl text-foreground">৳50,000</p>
                  <div className="mt-3 space-y-2">
                    <div className="flex items-center justify-between rounded-lg bg-[#e2136e]/5 px-2.5 py-1.5">
                      <span className="text-[10px] font-semibold text-[#e2136e]">bKash</span>
                      <span className="text-[9px] text-foreground/50">Instant</span>
                    </div>
                    <div className="flex items-center justify-between rounded-lg bg-[#f6921e]/5 px-2.5 py-1.5">
                      <span className="text-[10px] font-semibold text-[#f6921e]">Nagad</span>
                      <span className="text-[9px] text-foreground/50">Instant</span>
                    </div>
                    <div className="flex items-center justify-between rounded-lg bg-blue-50 px-2.5 py-1.5">
                      <span className="text-[10px] font-semibold text-blue-600">Bank</span>
                      <span className="text-[9px] text-foreground/50">1-2 days</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <span className="text-[10px] font-semibold uppercase tracking-widest text-primary">Payments</span>
                <h3 className="mt-2 font-heading text-lg text-foreground">
                  Local Payments
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Native bKash, Nagad, and bank transfer support. No foreign payment hassles.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-background-card px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <span className="text-[11px] font-semibold uppercase tracking-widest text-primary">Process</span>
            <h2 className="mt-3 font-heading text-4xl text-foreground">
              How it works
            </h2>
            <p className="mt-4 text-base text-muted-foreground">
              Simple, secure, and built for how Bangladesh works.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-4">
            <StepCard
              step="01"
              title="Create Contract"
              description="Define milestones, payment amounts, and terms in minutes."
            />
            <StepCard
              step="02"
              title="Client Reviews & Signs"
              description="Your client reviews, comments, and e-signs online."
            />
            <StepCard
              step="03"
              title="Escrow Funded"
              description="Client deposits funds via bKash, Nagad, or bank transfer."
            />
            <StepCard
              step="04"
              title="Work & Release"
              description="Deliver work, get approval, and funds are released to you."
            />
          </div>
        </div>
      </section>

      {/* Trust signals */}
      <section className="bg-background px-6 py-24">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <span className="text-[11px] font-semibold uppercase tracking-widest text-primary">Security</span>
            <h2 className="mt-3 font-heading text-4xl text-foreground">
              Built on trust
            </h2>
          </div>
          <div className="mt-14 grid grid-cols-1 gap-10 sm:grid-cols-3">
            <TrustItem
              icon={BadgeCheck}
              title="KYC Verified"
              description="All service providers verified with NID and trade license."
            />
            <TrustItem
              icon={Lock}
              title="Secure Escrow"
              description="Funds held in regulated accounts until work is approved."
            />
            <TrustItem
              icon={CheckCircle2}
              title="Audit Trail"
              description="Every action logged — signatures, payments, changes."
            />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialsSection />

      {/* CTA */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-2xl">
          <div className="relative flex min-h-[420px] flex-col md:flex-row">
            {/* Left — Copy */}
            <div
              className="relative z-10 flex flex-1 flex-col justify-center px-10 py-16 md:px-16"
              style={{
                background: `
                  linear-gradient(160deg,
                    rgba(240,235,220,0.95) 0%,
                    rgba(235,228,210,0.9) 40%,
                    rgba(220,215,195,0.85) 100%
                  ),
                  linear-gradient(135deg,
                    #d4c9a8 0%,
                    #c8bc9a 50%,
                    #bdb18e 100%
                  )
                `,
              }}
            >
              <h2 className="max-w-md font-heading text-3xl leading-snug text-foreground md:text-4xl lg:text-[2.75rem]">
                Stop Chasing Payments.<br />
                Start Getting Paid.
              </h2>
              <p className="mt-5 max-w-sm text-base leading-relaxed text-muted-foreground">
                Hand off your contract management to EscrowBD and see how easy
                it is to get paid for work you&apos;ve already delivered.
              </p>
              <Button size="lg" className="mt-8 w-fit px-8" render={<Link to="/auth/signup" />}>
                Start Your Project
              </Button>
            </div>

            {/* Right — Gradient bg + floating widgets */}
            <div
              className="relative flex-1 min-h-[300px] md:min-h-0"
              style={{
                background: `
                  radial-gradient(ellipse 80% 80% at 30% 50%, rgba(45,106,79,0.6) 0%, transparent 60%),
                  radial-gradient(ellipse 60% 70% at 80% 30%, rgba(200,180,80,0.4) 0%, transparent 50%),
                  radial-gradient(ellipse 50% 60% at 60% 80%, rgba(100,170,120,0.5) 0%, transparent 50%),
                  linear-gradient(135deg,
                    #2D6A4F 0%,
                    #3D8C68 20%,
                    #6BB87F 40%,
                    #C4A853 60%,
                    #D4A843 75%,
                    #8FB896 100%
                  )
                `,
              }}
            >
              {/* Floating Widget — Escrow Balance */}
              <div className="absolute left-6 top-8 z-20 w-64 rounded-xl bg-white p-4 shadow-xl md:left-10 md:top-12">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10">
                      <Shield className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <span className="text-xs font-medium text-foreground/70">Escrow Balance</span>
                  </div>
                  <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-medium text-emerald-600">Secured</span>
                </div>
                <p className="mt-3 font-heading text-3xl text-foreground">৳2,45,000</p>
                <p className="mt-1 text-xs text-muted-foreground">across 5 active contracts</p>
              </div>

              {/* Floating Widget — Milestone Approved (center, prominent) */}
              <div className="absolute left-1/2 top-1/2 z-30 w-72 -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white p-5 shadow-2xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-50">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                    </div>
                    <span className="text-xs font-medium text-foreground/70">Milestone Approved</span>
                  </div>
                  <span className="rounded-md bg-primary px-2.5 py-1 text-[10px] font-medium text-white">Release Funds</span>
                </div>
                <p className="mt-3 font-heading text-3xl text-foreground">৳85,000</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Web Redesign — Phase 2 delivery approved by client and ready for payout.
                </p>
              </div>

              {/* Floating Widget — Payment Released */}
              <div className="absolute bottom-8 right-6 z-20 w-60 rounded-xl bg-white p-4 shadow-xl md:bottom-12 md:right-10">
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-50">
                    <CreditCard className="h-3.5 w-3.5 text-blue-500" />
                  </div>
                  <span className="text-xs font-medium text-foreground/70">Payment Released</span>
                </div>
                <p className="mt-3 font-heading text-2xl text-foreground">৳50,000</p>
                <p className="mt-1 text-xs text-muted-foreground">sent to bKash • just now</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-background">
        {/* Top section — CTAs + Link columns */}
        <div className="mx-auto max-w-6xl px-6 pt-16 pb-12">
          <div className="flex flex-col gap-12 lg:flex-row lg:justify-between">
            {/* Left — CTAs + tagline */}
            <div className="flex flex-col justify-between gap-10">
              <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
                <Button className="px-8" render={<Link to="/auth/signup" />}>
                  Get Started
                </Button>
                <Button variant="outline" className="px-8" render={<Link to="/auth/login" />}>
                  Sign In
                </Button>
              </div>
              <p className="max-w-sm font-heading text-2xl leading-snug text-foreground md:text-3xl">
                Stop chasing payments.<br />
                Start working with trust.
              </p>
            </div>

            {/* Right — Link columns */}
            <div className="grid grid-cols-2 gap-x-16 gap-y-8 sm:grid-cols-3">
              <div>
                <h4 className="mb-4 text-sm font-medium text-muted-foreground/70">
                  Product
                </h4>
                <ul className="space-y-3">
                  <FooterLink label="Escrow Protection" />
                  <FooterLink label="Digital Contracts" />
                  <FooterLink label="E-Signatures" />
                  <FooterLink label="Local Payments" />
                </ul>
              </div>
              <div>
                <h4 className="mb-4 text-sm font-medium text-muted-foreground/70">
                  Built For
                </h4>
                <ul className="space-y-3">
                  <FooterLink label="Freelancers" />
                  <FooterLink label="Agencies" />
                  <FooterLink label="Small Businesses" />
                </ul>
              </div>
              <div>
                <h4 className="mb-4 text-sm font-medium text-muted-foreground/70">
                  Company
                </h4>
                <ul className="space-y-3">
                  <FooterLink label="About Us" />
                  <FooterLink label="Contact" />
                  <FooterLink label="Careers" />
                  <FooterLink label="Blog" />
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Large watermark brand name */}
        <div className="overflow-hidden border-t border-border/50 px-6 pt-8 pb-4">
          <div className="mx-auto max-w-6xl">
            <span
              className="block font-heading leading-none text-primary/[0.08] select-none"
              style={{ fontSize: "clamp(6rem, 18vw, 16rem)" }}
            >
              EscrowBD
            </span>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border/50 px-6 py-5">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 sm:flex-row">
            <p className="text-xs text-muted-foreground/60">
              &copy; {new Date().getFullYear()} EscrowBD. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <span className="text-xs text-muted-foreground/60 hover:text-muted-foreground cursor-pointer">Privacy Policy</span>
              <span className="text-xs text-muted-foreground/60 hover:text-muted-foreground cursor-pointer">Terms of Service</span>
              <span className="text-xs text-muted-foreground/60 hover:text-muted-foreground cursor-pointer">Security</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}


function StepCard({
  step,
  title,
  description,
}: {
  step: string
  title: string
  description: string
}) {
  return (
    <div className="text-center md:text-left">
      <span className="font-heading text-5xl text-primary/15">
        {step}
      </span>
      <h3 className="mt-3 font-heading text-lg text-foreground">
        {title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
    </div>
  )
}

function TrustItem({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
}) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-pale">
        <Icon className="h-6 w-6 text-primary" />
      </div>
      <h3 className="mt-5 text-base font-medium text-foreground">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
    </div>
  )
}

function FooterLink({ label }: { label: string }) {
  return (
    <li>
      <span className="cursor-pointer text-sm text-foreground hover:text-primary transition-colors">
        {label}
      </span>
    </li>
  )
}

const testimonials = [
  {
    metric: "৳12L+",
    metricLabel: "Payments secured",
    quote:
      "Before EscrowBD, I lost ৳2 lakh on a project where the client ghosted after delivery.",
    highlight: "Now every taka is protected before I start working.",
    name: "Rafiq Hassan",
    role: "Freelance Developer",
    initial: "R",
    bg: "bg-[#f0ece4]",
    statWidgets: [
      { label: "Projects protected", value: "23", position: "right-6 top-6" },
      { label: "Recovery rate", value: "100%", position: "left-6 top-20" },
    ],
  },
  {
    metric: "47",
    metricLabel: "Contracts completed",
    quote:
      "We manage 15+ client projects at a time. EscrowBD replaced our spreadsheet chaos with proper contracts and milestone tracking.",
    highlight: "Our clients trust us more now.",
    name: "Samira Akter",
    role: "CEO, PixelCraft Studio",
    initial: "S",
    bg: "bg-[#eef0ec]",
    statWidgets: [
      { label: "Dispute rate", value: "0%", position: "right-6 top-6" },
      { label: "Team members", value: "12", position: "left-6 top-20" },
    ],
  },
  {
    metric: "3 days",
    metricLabel: "Avg. payment time",
    quote:
      "I used to wait 30-45 days to get paid. With EscrowBD, funds release within 3 days of milestone approval.",
    highlight: "It changed my cash flow completely.",
    name: "Tanvir Ahmed",
    role: "UI/UX Designer",
    initial: "T",
    bg: "bg-[#e8eeef]",
    statWidgets: [
      { label: "On-time payments", value: "98%", position: "right-6 top-6" },
      { label: "Repeat clients", value: "8", position: "left-6 top-20" },
    ],
  },
]

function TestimonialsSection() {
  const [current, setCurrent] = useState(0)

  const prev = () => setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1))
  const next = () => setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1))

  const t = testimonials[current]

  return (
    <section className="bg-background-card px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-start justify-between">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-widest text-primary">
              Testimonials
            </span>
            <h2 className="mt-3 font-heading text-4xl text-foreground md:text-5xl">
              Their words, not ours
            </h2>
          </div>
          <div className="hidden items-center gap-2 md:flex">
            <button
              onClick={prev}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-muted transition-colors hover:bg-muted-foreground/10"
            >
              <ChevronLeft className="h-5 w-5 text-foreground/60" />
            </button>
            <button
              onClick={next}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-muted transition-colors hover:bg-muted-foreground/10"
            >
              <ChevronRight className="h-5 w-5 text-foreground/60" />
            </button>
          </div>
        </div>

        {/* Full-width testimonial card */}
        <div className="mt-12">
          <div
            className={`relative overflow-hidden rounded-2xl border border-border ${t.bg}`}
          >
            <div className="flex flex-col md:flex-row">
              {/* Left — Metric + Quote */}
              <div className="flex flex-1 flex-col justify-between p-8 md:p-12">
                <div>
                  <p className="font-heading text-6xl text-foreground md:text-7xl">
                    {t.metric}
                  </p>
                  <p className="mt-2 text-sm font-medium text-foreground/60">
                    {t.metricLabel}
                  </p>
                </div>

                <div className="mt-10">
                  <p className="max-w-lg text-base leading-relaxed text-foreground/70 md:text-lg">
                    &ldquo;{t.quote}{" "}
                    <span className="text-foreground font-medium">{t.highlight}</span>
                    &rdquo;
                  </p>
                </div>

                <div className="mt-8 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 font-heading text-sm text-primary">
                    {t.initial}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </div>

              {/* Right — Visual area with floating stat widgets */}
              <div className="relative hidden w-96 shrink-0 md:block">
                {t.statWidgets.map((widget, i) => (
                  <div
                    key={i}
                    className={`absolute ${widget.position} rounded-xl bg-white p-4 shadow-lg`}
                  >
                    <p className="text-[10px] font-medium text-foreground/50">
                      {widget.label}
                    </p>
                    <p className="mt-0.5 font-heading text-3xl text-foreground">
                      {widget.value}
                    </p>
                  </div>
                ))}

                {/* Decorative gradient orb */}
                <div
                  className="absolute bottom-10 right-10 h-40 w-40 rounded-full opacity-20 blur-3xl"
                  style={{ background: "radial-gradient(circle, #2D6A4F, transparent)" }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Progress dots + mobile nav */}
        <div className="mt-8 flex items-center justify-center gap-3">
          <button
            onClick={prev}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-muted transition-colors hover:bg-muted-foreground/10 md:hidden"
          >
            <ChevronLeft className="h-4 w-4 text-foreground/60" />
          </button>

          <div className="flex items-center gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-2 rounded-full transition-all ${
                  i === current ? "w-8 bg-foreground" : "w-2 bg-foreground/20"
                }`}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-muted transition-colors hover:bg-muted-foreground/10 md:hidden"
          >
            <ChevronRight className="h-4 w-4 text-foreground/60" />
          </button>
        </div>
      </div>
    </section>
  )
}
