import { Outlet, Link } from "react-router-dom"
import { Shield } from "lucide-react"

export function AuthLayout() {
  return (
    <div className="flex min-h-screen">
      {/* Left — Branding Panel */}
      <div className="hidden w-1/2 flex-col justify-between bg-background-dark p-14 lg:flex">
        <Link to="/" className="font-heading text-2xl text-white">
          EscrowBD
        </Link>

        <div className="space-y-8">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/20">
            <Shield className="h-7 w-7 text-primary-light" />
          </div>
          <h2 className="font-heading text-5xl leading-[1.15] text-white">
            Secure contracts &<br />
            escrow payments for<br />
            Bangladesh
          </h2>
          <p className="max-w-md text-base leading-relaxed text-white/50">
            The trust infrastructure for freelancers, agencies, and clients.
            Milestone-based escrow, digital contracts, and native bKash/Nagad
            integration.
          </p>
        </div>

        <p className="text-sm text-white/30">
          &copy; {new Date().getFullYear()} EscrowBD. All rights reserved.
        </p>
      </div>

      {/* Right — Auth Form */}
      <div className="flex w-full flex-col items-center justify-center px-8 py-16 lg:w-1/2">
        <div className="w-full max-w-[420px]">
          {/* Mobile logo */}
          <Link
            to="/"
            className="mb-12 block text-center font-heading text-2xl text-primary lg:hidden"
          >
            EscrowBD
          </Link>
          <Outlet />
        </div>
      </div>
    </div>
  )
}
