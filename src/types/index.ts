// ─── User & Auth ────────────────────────────────────────
export type AccountType = "solo_freelancer" | "business" | "client"
export type UserMode = "sp" | "client"

export interface User {
  id: string
  email: string
  fullName: string
  phone: string
  accountType: AccountType
  activeMode: UserMode
  avatarUrl?: string
  businessName?: string
  bio?: string
  kycStatus: KYCStatus
  createdAt: string
}

// ─── KYC ────────────────────────────────────────────────
export type KYCStatus = "not_started" | "in_progress" | "submitted" | "under_review" | "verified" | "rejected"

// ─── Contracts ──────────────────────────────────────────
export type ContractStatus =
  | "draft"
  | "sent"
  | "under_review"
  | "revision_sent"
  | "signed"
  | "active"
  | "completed"
  | "cancelled"

export type ContractType = "service_agreement" | "nda_only" | "service_nda"

export interface Contract {
  id: string
  number: string
  title: string
  description: string
  type: ContractType
  status: ContractStatus
  totalValue: number
  clientId: string
  clientName: string
  clientEmail: string
  spId: string
  spName: string
  milestones: Milestone[]
  startDate: string
  endDate?: string
  signedAt?: string
  createdAt: string
  updatedAt: string
}

// ─── Milestones ─────────────────────────────────────────
export type MilestoneStatus =
  | "unfunded"
  | "funded"
  | "in_progress"
  | "submitted"
  | "revision_requested"
  | "approved"
  | "released"
  | "disputed"

export interface Milestone {
  id: string
  contractId: string
  title: string
  description: string
  amount: number
  order: number
  status: MilestoneStatus
  dueDate?: string
}

// ─── Payments ───────────────────────────────────────────
export type PaymentMethod = "bkash" | "nagad" | "bank_transfer"
export type TransactionType = "escrow_funded" | "released" | "refunded" | "fee" | "withdrawal"
export type TransactionStatus = "pending" | "confirmed" | "released" | "failed"

export interface Transaction {
  id: string
  type: TransactionType
  contractId?: string
  contractTitle?: string
  milestoneId?: string
  partyName: string
  amount: number
  method: PaymentMethod
  status: TransactionStatus
  direction: "in" | "out"
  createdAt: string
}

// ─── Clients / Vendors ─────────────────────────────────
export interface ClientRecord {
  id: string
  name: string
  email: string
  phone?: string
  organization?: string
  avatarUrl?: string
  contractCount: number
  totalValue: number
  lastActive: string
}

// ─── Notifications ──────────────────────────────────────
export type NotificationType =
  | "contract_sent"
  | "contract_received"
  | "contract_signed"
  | "comment_added"
  | "comment_responded"
  | "escrow_funded"
  | "milestone_submitted"
  | "payment_approved"
  | "funds_released"
  | "withdrawal_processed"
  | "kyc_approved"
  | "kyc_action_required"
  | "milestone_deadline"
  | "contract_reminder"

export interface Notification {
  id: string
  type: NotificationType
  message: string
  read: boolean
  actionUrl?: string
  createdAt: string
}
