import { createBrowserRouter, Navigate } from "react-router-dom"
import { AppLayout } from "@/components/layout/app-layout"
import { AuthLayout } from "@/components/layout/auth-layout"
import { AuthGuard } from "@/components/shared/auth-guard"

import LandingPage from "@/pages/landing"
import LoginPage from "@/pages/auth/login"
import SignupPage from "@/pages/auth/signup"
import DashboardPage from "@/pages/app/dashboard/page"
import ContractsPage from "@/pages/app/contracts/page"
// ContractNewModal is now rendered inside ContractsPage
import ClientsPage from "@/pages/app/clients/page"
import VendorsPage from "@/pages/app/vendors/page"
import EscrowPage from "@/pages/app/payments/escrow"
import EarningsPage from "@/pages/app/payments/earnings"
import TransactionHistoryPage from "@/pages/app/payments/history"
import DocumentsPage from "@/pages/app/documents/page"
import KYCPage from "@/pages/app/kyc/page"
import SettingsPage from "@/pages/app/settings/page"
import ContractReviewPage from "@/pages/contract-review/page"

export const router = createBrowserRouter([
  // Public routes
  { path: "/", element: <LandingPage /> },
  { path: "/c/:token", element: <ContractReviewPage /> },

  // Auth routes (split layout)
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <LoginPage /> },
      { path: "signup", element: <SignupPage /> },
    ],
  },

  // App routes (authenticated)
  {
    path: "/app",
    element: (
      <AuthGuard>
        <AppLayout />
      </AuthGuard>
    ),
    children: [
      { index: true, element: <Navigate to="dashboard" replace /> },
      { path: "dashboard", element: <DashboardPage /> },
      { path: "contracts", element: <ContractsPage /> },
      { path: "contracts/new", element: <Navigate to="/app/contracts?new=true" replace /> },
      { path: "clients", element: <ClientsPage /> },
      { path: "vendors", element: <VendorsPage /> },
      { path: "payments/escrow", element: <EscrowPage /> },
      { path: "payments/earnings", element: <EarningsPage /> },
      { path: "payments/history", element: <TransactionHistoryPage /> },
      { path: "documents", element: <DocumentsPage /> },
      { path: "kyc", element: <KYCPage /> },
      { path: "settings", element: <SettingsPage /> },
    ],
  },
])
