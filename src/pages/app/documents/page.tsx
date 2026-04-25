import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { SlideOver } from "@/components/ui/slide-over"
import {
  Search,
  FileText,
  Download,
  Eye,
  Shield,
  Receipt,
  Filter,
  LayoutGrid,
  Copy,
  Clock,
  CheckCircle2,
  Users,
  Code,
  Palette,
  Briefcase,
  Lock,
  ArrowRight,
  Calendar,
  HardDrive,
  Hash,
  Sparkles,
  Printer,
  Star,
} from "lucide-react"

// ─── Documents data ─────────────────────────────────────

interface Document {
  id: string
  title: string
  type: "contract" | "nda" | "receipt"
  contract: string
  date: string
  size: string
  parties?: { sp: string; client: string }
  status?: string
  sections?: { title: string; content: string }[]
}

const documents: Document[] = [
  {
    id: "1",
    title: "Logo & Brand Identity — Service Agreement",
    type: "contract",
    contract: "ESC-2026-001",
    date: "Mar 15, 2026",
    size: "245 KB",
    parties: { sp: "Karim Design Studio", client: "Rahman Studio" },
    status: "Signed",
    sections: [
      { title: "1. Scope of Work", content: "The Service Provider agrees to design a complete brand identity package including:\n\n• Primary logo design (3 initial concepts)\n• Secondary/alternate logo variations\n• Color palette and typography guidelines\n• Brand guidelines document (PDF)\n• Business card and letterhead templates" },
      { title: "2. Timeline", content: "Phase 1: Research & Concepts — 1 week\nPhase 2: Refinement — 1 week\nPhase 3: Final Assets — 3 days\n\nTotal estimated duration: 2.5 weeks" },
      { title: "3. Payment Terms", content: "Total fee: ৳50,000\n• ৳15,000 (30%) upon signing — held in EscrowBD\n• ৳20,000 (40%) upon concept approval\n• ৳15,000 (30%) upon final delivery\n\nAll payments processed via EscrowBD escrow." },
      { title: "4. Revisions", content: "This agreement includes 2 rounds of revisions per milestone. Additional revisions will be charged at ৳3,000 per round." },
      { title: "5. Intellectual Property", content: "Upon full payment, all IP rights transfer to the Client. The Provider retains portfolio display rights." },
    ],
  },
  {
    id: "2",
    title: "Website Redesign — Service Agreement + NDA",
    type: "contract",
    contract: "ESC-2026-002",
    date: "Mar 1, 2026",
    size: "312 KB",
    parties: { sp: "Karim Design Studio", client: "TechCorp BD" },
    status: "Active",
    sections: [
      { title: "1. Scope of Work", content: "Complete redesign of TechCorp BD corporate website:\n\n• UI/UX audit of existing site\n• New design system and component library\n• 12 page templates (responsive)\n• Frontend development (React + Tailwind)\n• Content migration assistance" },
      { title: "2. Technical Specifications", content: "• Framework: React 18 + TypeScript\n• Styling: Tailwind CSS v4\n• CMS: Headless WordPress API\n• Hosting: Vercel\n• Analytics: Google Analytics 4" },
      { title: "3. Timeline", content: "Phase 1: Discovery & Audit — 1 week\nPhase 2: Design — 2 weeks\nPhase 3: Development — 3 weeks\nPhase 4: Testing & Launch — 1 week\n\nTotal: 7 weeks" },
      { title: "4. Payment Terms", content: "Total fee: ৳1,20,000\n• ৳36,000 (30%) upon signing\n• ৳48,000 (40%) after design approval\n• ৳36,000 (30%) upon launch\n\nAll payments via EscrowBD." },
      { title: "5. Confidentiality", content: "Both parties agree to keep proprietary information confidential. See attached NDA for full terms." },
    ],
  },
  {
    id: "3",
    title: "Non-Disclosure Agreement — TechCorp BD",
    type: "nda",
    contract: "ESC-2026-002",
    date: "Mar 1, 2026",
    size: "128 KB",
    parties: { sp: "Karim Design Studio", client: "TechCorp BD" },
    status: "Active",
    sections: [
      { title: "1. Parties", content: "This Mutual NDA is between Karim Design Studio (\"Service Provider\") and TechCorp BD (\"Client\")." },
      { title: "2. Confidential Information", content: "Includes but is not limited to:\n• Business strategies and plans\n• Customer data and analytics\n• Technical architecture and source code\n• Financial information\n• Any information marked as confidential" },
      { title: "3. Obligations", content: "Both parties agree to:\n• Keep all shared information strictly confidential\n• Use information only for the purpose of the engagement\n• Not disclose to any third party without written consent\n• Implement reasonable security measures" },
      { title: "4. Duration", content: "This NDA is effective for 2 years from the date of signing. Confidentiality obligations survive for 1 additional year after expiration." },
    ],
  },
  {
    id: "4",
    title: "Mobile App UI/UX — Service Agreement + NDA",
    type: "contract",
    contract: "ESC-2026-004",
    date: "Feb 15, 2026",
    size: "290 KB",
    parties: { sp: "Karim Design Studio", client: "ShopUp" },
    status: "Signed",
    sections: [
      { title: "1. Scope of Work", content: "UI/UX design for ShopUp mobile application:\n\n• User research and persona development\n• Information architecture\n• Wireframes (low and high fidelity)\n• Visual design for 25+ screens\n• Interactive prototype (Figma)\n• Design handoff documentation" },
      { title: "2. Timeline", content: "Phase 1: Research — 1 week\nPhase 2: Wireframes — 2 weeks\nPhase 3: Visual Design — 2 weeks\nPhase 4: Prototype & Handoff — 1 week\n\nTotal: 6 weeks" },
      { title: "3. Payment Terms", content: "Total fee: ৳85,000\n• ৳25,500 (30%) upon signing\n• ৳34,000 (40%) after wireframe approval\n• ৳25,500 (30%) upon final delivery" },
    ],
  },
  {
    id: "5",
    title: "Payment Receipt — ৳25,000 (Logo Design)",
    type: "receipt",
    contract: "ESC-2026-001",
    date: "Apr 3, 2026",
    size: "48 KB",
    parties: { sp: "Karim Design Studio", client: "Rahman Studio" },
    status: "Completed",
    sections: [
      { title: "Payment Details", content: "Amount: ৳25,000\nMilestone: Phase 2 — Concept Approval\nPayment Method: bKash\nTransaction ID: TXN-2026-04030012\nReleased from escrow on: Apr 3, 2026" },
      { title: "Contract Reference", content: "Contract: ESC-2026-001\nProject: Logo & Brand Identity\nTotal Contract Value: ৳50,000\nPaid to Date: ৳40,000 (80%)\nRemaining: ৳10,000" },
    ],
  },
  {
    id: "6",
    title: "Payment Receipt — ৳40,000 (Website Redesign)",
    type: "receipt",
    contract: "ESC-2026-002",
    date: "Apr 1, 2026",
    size: "48 KB",
    parties: { sp: "Karim Design Studio", client: "TechCorp BD" },
    status: "Completed",
    sections: [
      { title: "Payment Details", content: "Amount: ৳40,000\nMilestone: Phase 2 — Design Approval\nPayment Method: Bank Transfer (DBBL)\nTransaction ID: TXN-2026-04010045\nReleased from escrow on: Apr 1, 2026" },
      { title: "Contract Reference", content: "Contract: ESC-2026-002\nProject: Website Redesign\nTotal Contract Value: ৳1,20,000\nPaid to Date: ৳76,000 (63%)\nRemaining: ৳44,000" },
    ],
  },
  {
    id: "7",
    title: "E-commerce Shoot — Service Agreement",
    type: "contract",
    contract: "ESC-2026-006",
    date: "Jan 10, 2026",
    size: "198 KB",
    parties: { sp: "Karim Design Studio", client: "Daraz BD" },
    status: "Completed",
    sections: [
      { title: "1. Scope of Work", content: "Product photography for e-commerce platform:\n\n• 50 product photos (white background)\n• 20 lifestyle shots\n• Basic retouching and color correction\n• Web-optimized exports (JPEG + WebP)" },
      { title: "2. Payment Terms", content: "Total fee: ৳45,000\n• ৳22,500 (50%) upon signing\n• ৳22,500 (50%) upon delivery" },
    ],
  },
  {
    id: "8",
    title: "Payment Receipt — ৳45,000 (E-commerce Shoot)",
    type: "receipt",
    contract: "ESC-2026-006",
    date: "Feb 28, 2026",
    size: "48 KB",
    parties: { sp: "Karim Design Studio", client: "Daraz BD" },
    status: "Completed",
    sections: [
      { title: "Payment Details", content: "Amount: ৳45,000 (Final payment)\nMilestone: Full project delivery\nPayment Method: Nagad\nTransaction ID: TXN-2026-02280078\nReleased from escrow on: Feb 28, 2026" },
      { title: "Contract Reference", content: "Contract: ESC-2026-006\nProject: E-commerce Shoot\nTotal Contract Value: ৳45,000\nPaid to Date: ৳45,000 (100%)\nStatus: Completed" },
    ],
  },
]

const typeConfig = {
  contract: { label: "Contract", icon: FileText, color: "bg-primary/10 text-primary" },
  nda: { label: "NDA", icon: Shield, color: "bg-blue-50 text-blue-700" },
  receipt: { label: "Receipt", icon: Receipt, color: "bg-amber-50 text-amber-700" },
}

const typeFilters = ["all", "contract", "nda", "receipt"] as const

// ─── Templates data ─────────────────────────────────────

interface Template {
  id: string
  category: string
  categoryColor: string
  categoryIcon: React.ComponentType<{ className?: string }>
  title: string
  description: string
  usedCount: number
  isDefault?: boolean
  sections: TemplateSection[]
}

interface TemplateSection {
  title: string
  content: string
}

const templates: Template[] = [
  {
    id: "t1",
    category: "Project",
    categoryColor: "bg-primary/10 text-primary",
    categoryIcon: Briefcase,
    title: "Standard Project Contract",
    description: "A comprehensive project contract template with scope, milestones, payment terms, IP rights, and termination clauses.",
    usedCount: 12,
    isDefault: true,
    sections: [
      { title: "1. Parties", content: "This Service Agreement (\"Agreement\") is entered into between the Service Provider (\"Provider\") and the Client (\"Client\"), collectively referred to as the \"Parties.\"" },
      { title: "2. Scope of Work", content: "The Provider agrees to deliver the following services as described in the attached project brief:\n\n• Project deliverables and specifications\n• Timeline and milestone schedule\n• Quality standards and acceptance criteria\n• Communication and reporting requirements" },
      { title: "3. Project Milestones", content: "The project shall be divided into the following milestones, each with specific deliverables and deadlines:\n\nMilestone 1: Discovery & Planning — Due within 1 week\nMilestone 2: Design & Development — Due within 3 weeks\nMilestone 3: Review & Revisions — Due within 1 week\nMilestone 4: Final Delivery — Due within 1 week" },
      { title: "4. Payment Terms", content: "Total project fee: [Amount]\nPayment schedule:\n• 30% upon contract signing (deposited to escrow)\n• 40% upon completion of Milestone 2\n• 30% upon final delivery and acceptance\n\nAll payments are processed through EscrowBD's secure escrow system." },
      { title: "5. Intellectual Property", content: "Upon full payment, all intellectual property rights for the deliverables shall transfer to the Client. The Provider retains the right to showcase the work in their portfolio unless otherwise agreed." },
      { title: "6. Revisions & Changes", content: "This agreement includes up to 2 rounds of revisions per milestone. Additional revisions will be billed at the Provider's standard hourly rate. Scope changes require a written change order approved by both parties." },
      { title: "7. Confidentiality", content: "Both parties agree to maintain the confidentiality of proprietary information shared during the engagement. This obligation survives the termination of this agreement for a period of 2 years." },
      { title: "8. Termination", content: "Either party may terminate this agreement with 14 days written notice. In case of termination:\n• Client pays for all completed milestones\n• Escrowed funds for incomplete milestones are returned\n• Provider delivers all completed work within 7 days" },
    ],
  },
  {
    id: "t2",
    category: "Freelance",
    categoryColor: "bg-emerald-50 text-emerald-700",
    categoryIcon: Users,
    title: "Freelancer Service Contract",
    description: "Designed for solo freelancers. Includes basic scope, timeline, payment, and ownership transfer clauses.",
    usedCount: 15,
    isDefault: true,
    sections: [
      { title: "1. Parties", content: "This Freelance Service Agreement is between the Freelancer (\"Service Provider\") and the Client, for the provision of professional services as outlined below." },
      { title: "2. Services", content: "The Freelancer agrees to provide the following services:\n\n• [Service description]\n• Deliverables: [List of deliverables]\n• Format: [File formats and specifications]" },
      { title: "3. Timeline", content: "Start date: [Date]\nEstimated completion: [Date]\n\nThe Freelancer will provide regular updates on progress and notify the Client of any potential delays." },
      { title: "4. Payment", content: "Total fee: [Amount]\n• 50% upfront (held in EscrowBD escrow)\n• 50% upon completion and approval\n\nPayment method: Via EscrowBD platform (bKash/Nagad/Bank Transfer)" },
      { title: "5. Ownership", content: "All work product and intellectual property rights transfer to the Client upon full payment. The Freelancer may use the work for portfolio purposes unless restricted by NDA." },
      { title: "6. Cancellation", content: "Either party may cancel with 7 days written notice. The Freelancer is compensated for work completed up to the cancellation date." },
    ],
  },
  {
    id: "t3",
    category: "Development",
    categoryColor: "bg-violet-50 text-violet-700",
    categoryIcon: Code,
    title: "Web Development Contract",
    description: "Specialized template for web development projects including tech stack specifications, hosting, and maintenance terms.",
    usedCount: 9,
    isDefault: true,
    sections: [
      { title: "1. Parties", content: "This Web Development Agreement is between the Developer and the Client for the design and development of a website/web application." },
      { title: "2. Project Scope", content: "The Developer will build:\n\n• Website type: [Static / Dynamic / E-commerce / Web App]\n• Pages/Screens: [Number and list]\n• Tech stack: [Frontend / Backend / Database]\n• Responsive design: Mobile, Tablet, Desktop\n• Browser compatibility: Chrome, Firefox, Safari, Edge" },
      { title: "3. Design & Development Phases", content: "Phase 1: Wireframes & UI Design — [Timeline]\nPhase 2: Frontend Development — [Timeline]\nPhase 3: Backend & Integration — [Timeline]\nPhase 4: Testing & QA — [Timeline]\nPhase 5: Deployment & Launch — [Timeline]" },
      { title: "4. Hosting & Domain", content: "The Client is responsible for:\n• Domain registration and renewal\n• Hosting account and fees\n\nThe Developer will assist with initial server setup and deployment configuration." },
      { title: "5. Payment", content: "Total project cost: [Amount]\n• 25% at project start (escrow)\n• 25% after design approval\n• 25% after development completion\n• 25% after final launch\n\nAll payments processed via EscrowBD." },
      { title: "6. Post-Launch Support", content: "The Developer provides 30 days of bug-fix support after launch at no additional cost. Extended maintenance and feature development can be arranged under a separate retainer agreement." },
      { title: "7. Source Code", content: "The Client receives full access to the source code upon final payment. The code is delivered via Git repository with documentation." },
    ],
  },
  {
    id: "t4",
    category: "Retainer",
    categoryColor: "bg-amber-50 text-amber-700",
    categoryIcon: Clock,
    title: "Retainer Agreement",
    description: "Monthly retainer template for ongoing service engagements with recurring milestones and payment schedules.",
    usedCount: 5,
    isDefault: true,
    sections: [
      { title: "1. Parties", content: "This Retainer Agreement is between the Service Provider and the Client for ongoing professional services on a monthly basis." },
      { title: "2. Retainer Services", content: "The Provider will allocate [X] hours per month for the following services:\n\n• [Service category 1]\n• [Service category 2]\n• [Service category 3]\n\nUnused hours do not roll over to the next month unless agreed in writing." },
      { title: "3. Monthly Fee", content: "Monthly retainer fee: ৳[Amount]/month\nPayment due: 1st of each month (auto-escrowed via EscrowBD)\nRelease: Upon monthly deliverables review and approval\n\nRetainer fee is reviewed quarterly and may be adjusted with 30 days notice." },
      { title: "4. Scope & Extras", content: "Work within the defined scope is covered by the retainer. Out-of-scope requests will be quoted separately and require written approval before commencing." },
      { title: "5. Reporting", content: "The Provider will submit a monthly activity report detailing:\n• Hours spent per task\n• Deliverables completed\n• Upcoming priorities\n• Any blockers or concerns" },
      { title: "6. Duration & Termination", content: "This retainer is effective for a minimum of 3 months. After the initial period, either party may terminate with 30 days written notice. Final month's deliverables and payments are settled through escrow." },
    ],
  },
  {
    id: "t5",
    category: "NDA",
    categoryColor: "bg-blue-50 text-blue-700",
    categoryIcon: Lock,
    title: "Mutual NDA — Standard",
    description: "A standard mutual non-disclosure agreement protecting both parties' confidential information for 2 years.",
    usedCount: 18,
    isDefault: true,
    sections: [
      { title: "1. Parties", content: "This Mutual Non-Disclosure Agreement (\"NDA\") is entered into between Party A (the \"Disclosing Party\") and Party B (the \"Receiving Party\"), collectively the \"Parties.\"" },
      { title: "2. Purpose", content: "The Parties wish to explore a potential business relationship and may need to share confidential information. This NDA protects both parties' proprietary information." },
      { title: "3. Confidential Information", content: "\"Confidential Information\" includes but is not limited to:\n• Business plans and strategies\n• Financial data and projections\n• Customer and client lists\n• Technical specifications and source code\n• Trade secrets and proprietary processes\n• Marketing strategies and materials" },
      { title: "4. Obligations", content: "Each party agrees to:\n• Keep confidential information strictly private\n• Not disclose to third parties without written consent\n• Use information only for the stated purpose\n• Take reasonable measures to protect confidentiality\n• Notify the other party of any unauthorized disclosure" },
      { title: "5. Exclusions", content: "This NDA does not apply to information that:\n• Is publicly available\n• Was known prior to disclosure\n• Is independently developed\n• Is required by law to be disclosed" },
      { title: "6. Duration", content: "This NDA is effective for 2 years from the date of signing. Obligations regarding confidential information survive for an additional 1 year after expiration." },
      { title: "7. Remedies", content: "Both parties acknowledge that breach of this NDA may cause irreparable harm. The affected party is entitled to seek injunctive relief in addition to any other legal remedies." },
    ],
  },
  {
    id: "t6",
    category: "Design",
    categoryColor: "bg-pink-50 text-pink-700",
    categoryIcon: Palette,
    title: "Design Services Contract",
    description: "Template for design engagements including brand identity, UI/UX design, and graphic design with revision policies.",
    usedCount: 7,
    isDefault: true,
    sections: [
      { title: "1. Parties", content: "This Design Services Agreement is between the Designer and the Client for professional design services as described below." },
      { title: "2. Design Services", content: "The Designer will provide:\n\n• [Logo Design / Brand Identity / UI/UX / Graphic Design]\n• Number of initial concepts: [X]\n• File formats: [AI, PSD, Figma, PNG, SVG, PDF]\n• Brand guidelines document (if applicable)" },
      { title: "3. Creative Process", content: "Phase 1: Brief & Research — Understanding client needs and market\nPhase 2: Concept Development — [X] initial concepts\nPhase 3: Refinement — Selected concept with [X] revision rounds\nPhase 4: Final Delivery — Production-ready files and assets" },
      { title: "4. Revisions", content: "This agreement includes [X] rounds of revisions per concept. Additional revisions are billed at ৳[Amount] per round. Major scope changes (new concepts, direction changes) require a change order." },
      { title: "5. Payment", content: "Total design fee: ৳[Amount]\n• 40% upon project start (escrow)\n• 30% after concept approval\n• 30% upon final delivery\n\nAll payments via EscrowBD escrow system." },
      { title: "6. Usage Rights", content: "Upon full payment, the Client receives:\n• Full ownership of final approved designs\n• Source files in all specified formats\n• Unlimited usage rights\n\nThe Designer retains portfolio display rights unless restricted." },
    ],
  },
  {
    id: "t7",
    category: "Service",
    categoryColor: "bg-slate-100 text-slate-700",
    categoryIcon: Briefcase,
    title: "Service Agreement — Basic",
    description: "A streamlined service agreement for smaller projects with simple deliverables and payment structure.",
    usedCount: 8,
    isDefault: true,
    sections: [
      { title: "1. Parties", content: "This Service Agreement is between the Service Provider and the Client for the provision of professional services." },
      { title: "2. Services", content: "The Provider will deliver:\n\n• [Service description]\n• Deliverables: [List]\n• Timeline: [Start] to [End]" },
      { title: "3. Payment", content: "Total fee: ৳[Amount]\nPayment: 50% upfront via escrow, 50% upon completion\nMethod: EscrowBD (bKash / Nagad / Bank Transfer)" },
      { title: "4. Responsibilities", content: "Provider:\n• Deliver quality work on time\n• Communicate progress regularly\n\nClient:\n• Provide necessary materials and feedback promptly\n• Make payments according to schedule" },
      { title: "5. Cancellation", content: "Either party may cancel with 7 days notice. Payment for completed work is processed through escrow. Remaining escrowed funds are returned to the Client." },
    ],
  },
  {
    id: "t8",
    category: "NDA",
    categoryColor: "bg-blue-50 text-blue-700",
    categoryIcon: Lock,
    title: "One-Way NDA — Client Information",
    description: "Protects the client's confidential information shared with the service provider during the engagement.",
    usedCount: 6,
    sections: [
      { title: "1. Parties", content: "This Non-Disclosure Agreement is between the Client (\"Disclosing Party\") and the Service Provider (\"Receiving Party\")." },
      { title: "2. Purpose", content: "The Client may share confidential information with the Service Provider for the purpose of the agreed engagement. This NDA ensures that information is protected." },
      { title: "3. Confidential Information", content: "Includes all information designated as confidential by the Client, including:\n• Business data, strategies, and plans\n• Customer information and databases\n• Financial records and projections\n• Proprietary technology and processes\n• Any information marked as \"Confidential\"" },
      { title: "4. Provider Obligations", content: "The Service Provider agrees to:\n• Maintain strict confidentiality of all shared information\n• Use information solely for the engagement purpose\n• Not share with employees or contractors without Client approval\n• Return or destroy all confidential materials upon request\n• Implement appropriate security measures" },
      { title: "5. Duration", content: "This NDA remains in effect for the duration of the engagement plus 2 years after completion or termination." },
      { title: "6. Breach", content: "In case of breach, the Client is entitled to seek legal remedies including damages and injunctive relief. The Service Provider is liable for any losses resulting from unauthorized disclosure." },
    ],
  },
]

// ─── Status config ──────────────────────────────────────

const statusConfig: Record<string, string> = {
  Signed: "bg-emerald-50 text-emerald-700",
  Active: "bg-blue-50 text-blue-700",
  Completed: "bg-slate-100 text-slate-600",
  Draft: "bg-amber-50 text-amber-700",
}

// ─── Component ──────────────────────────────────────────

type TabType = "documents" | "templates"

export default function DocumentsPage() {
  const [activeTab, setActiveTab] = useState<TabType>("documents")

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-3xl text-foreground">Documents</h1>
        <p className="mt-1 text-sm text-muted-foreground">All your contracts, NDAs, receipts, and templates</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex items-center gap-1 border-b border-border">
        <button
          onClick={() => setActiveTab("documents")}
          className={`flex items-center gap-2 border-b-2 px-4 py-2.5 text-sm font-medium transition-colors ${
            activeTab === "documents"
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <FileText className="h-4 w-4" />
          My Documents
        </button>
        <button
          onClick={() => setActiveTab("templates")}
          className={`flex items-center gap-2 border-b-2 px-4 py-2.5 text-sm font-medium transition-colors ${
            activeTab === "templates"
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <LayoutGrid className="h-4 w-4" />
          Templates
        </button>
      </div>

      {activeTab === "documents" ? <DocumentsTab /> : <TemplatesTab />}
    </div>
  )
}

// ─── Documents Tab ──────────────────────────────────────

function DocumentsTab() {
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState<string>("all")
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(null)

  const filtered = documents.filter((d) => {
    const matchSearch = d.title.toLowerCase().includes(search.toLowerCase())
    const matchType = filter === "all" || d.type === filter
    return matchSearch && matchType
  })

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="relative max-w-sm flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search documents..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
        </div>
        <div className="flex items-center gap-1.5">
          <Filter className="h-4 w-4 text-muted-foreground" />
          {typeFilters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-full px-2.5 py-1 text-xs font-medium capitalize transition-colors ${
                filter === f ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted"
              }`}
            >
              {f === "all" ? "All" : f}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card">
        {filtered.map((doc) => {
          const cfg = typeConfig[doc.type]
          return (
            <div
              key={doc.id}
              onClick={() => setSelectedDoc(doc)}
              className="flex cursor-pointer items-center justify-between border-b border-border/50 px-5 py-4 last:border-0 hover:bg-muted/30 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${cfg.color}`}>
                  <cfg.icon className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{doc.title}</p>
                  <p className="text-xs text-muted-foreground">{doc.contract} · {doc.date} · {doc.size}</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${cfg.color}`}>{cfg.label}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={(e) => { e.stopPropagation(); setSelectedDoc(doc) }}
                >
                  <Eye className="h-3.5 w-3.5" />
                </Button>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={(e) => e.stopPropagation()}>
                  <Download className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          )
        })}
        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16">
            <FileText className="h-10 w-10 text-muted-foreground/30" />
            <p className="mt-3 text-sm text-muted-foreground">No documents found</p>
          </div>
        )}
      </div>

      {/* Document Preview SlideOver */}
      <SlideOver
        open={!!selectedDoc}
        onClose={() => setSelectedDoc(null)}
        width="w-[520px]"
        title={undefined}
        footer={
          selectedDoc ? (
            <div className="flex items-center gap-3">
              <Button variant="outline" className="flex-1 gap-1.5">
                <Download className="h-4 w-4" />
                Download
              </Button>
              <Button variant="outline" className="flex-1 gap-1.5">
                <Printer className="h-4 w-4" />
                Print
              </Button>
              <Button variant="outline" size="icon" className="shrink-0">
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          ) : null
        }
      >
        {selectedDoc && <DocumentPreview doc={selectedDoc} onClose={() => setSelectedDoc(null)} />}
      </SlideOver>
    </div>
  )
}

// ─── Document Preview ───────────────────────────────────

function DocumentPreview({ doc, onClose }: { doc: Document; onClose: () => void }) {
  const cfg = typeConfig[doc.type]
  const statusCls = statusConfig[doc.status ?? ""] ?? "bg-slate-100 text-slate-600"

  return (
    <div className="divide-y divide-border">
      {/* Banner header */}
      <div className="relative bg-gradient-to-br from-[#1B4332] via-[#2D6A4F] to-[#40916C] px-6 py-6">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-lg p-1.5 text-white/70 hover:bg-white/10 hover:text-white transition-colors"
        >
          <span className="sr-only">Close</span>
        </button>
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/15">
            <cfg.icon className="h-4 w-4 text-white" />
          </div>
          <span className="rounded-full bg-white/15 px-2.5 py-0.5 text-[10px] font-medium text-white">
            {cfg.label}
          </span>
          {doc.status && (
            <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-medium ${statusCls}`}>
              {doc.status}
            </span>
          )}
        </div>
        <h3 className="mt-3 font-heading text-lg text-white">{doc.title}</h3>
      </div>

      {/* Meta info */}
      <div className="px-6 py-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2.5 text-xs">
            <Hash className="h-3.5 w-3.5 text-muted-foreground" />
            <div>
              <p className="text-muted-foreground">Contract ID</p>
              <p className="font-medium text-foreground">{doc.contract}</p>
            </div>
          </div>
          <div className="flex items-center gap-2.5 text-xs">
            <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
            <div>
              <p className="text-muted-foreground">Date</p>
              <p className="font-medium text-foreground">{doc.date}</p>
            </div>
          </div>
          <div className="flex items-center gap-2.5 text-xs">
            <HardDrive className="h-3.5 w-3.5 text-muted-foreground" />
            <div>
              <p className="text-muted-foreground">File Size</p>
              <p className="font-medium text-foreground">{doc.size}</p>
            </div>
          </div>
          {doc.parties && (
            <div className="flex items-center gap-2.5 text-xs">
              <Users className="h-3.5 w-3.5 text-muted-foreground" />
              <div>
                <p className="text-muted-foreground">Parties</p>
                <p className="font-medium text-foreground">{doc.parties.sp}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Parties detail */}
      {doc.parties && (
        <div className="px-6 py-4">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Parties</h4>
          <div className="mt-3 grid grid-cols-2 gap-3">
            <div className="rounded-lg border border-border/60 p-3">
              <p className="text-[10px] text-muted-foreground">Service Provider</p>
              <p className="mt-0.5 text-sm font-medium text-foreground">{doc.parties.sp}</p>
            </div>
            <div className="rounded-lg border border-border/60 p-3">
              <p className="text-[10px] text-muted-foreground">Client</p>
              <p className="mt-0.5 text-sm font-medium text-foreground">{doc.parties.client}</p>
            </div>
          </div>
        </div>
      )}

      {/* Document content */}
      {doc.sections && doc.sections.length > 0 && (
        <div className="px-6 py-5">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Document Content</h4>
          <div className="mt-4 rounded-xl border border-border bg-white">
            {/* Document header bar */}
            <div className="border-b border-border bg-gradient-to-br from-[#1B4332]/[0.03] to-transparent px-5 py-4">
              <div className="flex items-center gap-2">
                <Shield className="h-3.5 w-3.5 text-primary" />
                <span className="text-[10px] font-medium uppercase tracking-wider text-primary">EscrowBD Document</span>
              </div>
              <p className="mt-1.5 text-xs text-muted-foreground">{doc.contract} · {doc.date}</p>
            </div>

            {/* Sections */}
            {doc.sections.map((section, i) => (
              <div key={i} className="border-b border-border/50 px-5 py-4 last:border-0">
                <h5 className="text-sm font-semibold text-foreground">{section.title}</h5>
                <p className="mt-2 whitespace-pre-line text-xs leading-relaxed text-muted-foreground">
                  {section.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Escrow protection badge */}
      <div className="px-6 py-4">
        <div className="flex items-center gap-3 rounded-lg border border-emerald-200 bg-emerald-50/50 p-3">
          <Shield className="h-5 w-5 text-emerald-600" />
          <div>
            <p className="text-xs font-medium text-emerald-800">Escrow Protected</p>
            <p className="text-[11px] text-emerald-600">This document is secured and verified through EscrowBD's escrow system.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Templates Tab ──────────────────────────────────────

const templateCategories = ["All", "Project", "Freelance", "Development", "Retainer", "NDA", "Design", "Service"] as const

function TemplatesTab() {
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("All")
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null)

  const filtered = templates.filter((t) => {
    const matchSearch =
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.description.toLowerCase().includes(search.toLowerCase())
    const matchCategory = category === "All" || t.category === category
    return matchSearch && matchCategory
  })

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="relative max-w-sm flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search templates..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
        </div>
        <div className="flex items-center gap-1.5 overflow-x-auto">
          {templateCategories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium transition-colors ${
                category === c ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((template) => (
          <TemplateCard
            key={template.id}
            template={template}
            onClick={() => setSelectedTemplate(template)}
          />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16">
          <LayoutGrid className="h-10 w-10 text-muted-foreground/30" />
          <p className="mt-3 text-sm text-muted-foreground">No templates found</p>
        </div>
      )}

      {/* Template Preview SlideOver */}
      <SlideOver
        open={!!selectedTemplate}
        onClose={() => setSelectedTemplate(null)}
        width="w-[560px]"
        title={
          selectedTemplate ? (
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium ${selectedTemplate.categoryColor}`}>
                  {selectedTemplate.category}
                </span>
                {selectedTemplate.isDefault && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-medium text-amber-700">
                    <Star className="h-2.5 w-2.5" />
                    Default
                  </span>
                )}
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  Used {selectedTemplate.usedCount} times
                </span>
              </div>
              <h3 className="font-heading text-lg text-foreground">{selectedTemplate.title}</h3>
            </div>
          ) : null
        }
        footer={
          selectedTemplate ? (
            <div className="flex items-center gap-3">
              <Button className="flex-1">
                <CheckCircle2 className="mr-1.5 h-4 w-4" />
                Use Template
              </Button>
              <Button variant="outline" size="icon" className="shrink-0">
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          ) : null
        }
      >
        {selectedTemplate && <TemplatePreview template={selectedTemplate} />}
      </SlideOver>
    </div>
  )
}

// ─── Template Card ──────────────────────────────────────

function TemplateCard({ template, onClick }: { template: Template; onClick: () => void }) {
  const Icon = template.categoryIcon

  return (
    <button
      onClick={onClick}
      className={`group relative flex flex-col rounded-xl border bg-card p-5 text-left transition-all hover:border-primary/30 hover:shadow-md ${
        template.isDefault ? "border-primary/20 ring-1 ring-primary/10" : "border-border"
      }`}
    >
      {/* Default badge */}
      {template.isDefault && (
        <span className="absolute -top-2.5 right-4 inline-flex items-center gap-1 rounded-full border border-amber-200 bg-amber-50 px-2 py-0.5 text-[10px] font-semibold text-amber-700 shadow-sm">
          <Star className="h-2.5 w-2.5 fill-amber-400 text-amber-400" />
          Default
        </span>
      )}

      {/* Category badge + icon */}
      <div className="flex items-start justify-between">
        <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${template.categoryColor}`}>
          <Icon className="h-5 w-5" />
        </div>
        <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${template.categoryColor}`}>
          {template.category}
        </span>
      </div>

      {/* Title & description */}
      <h3 className="mt-4 text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
        {template.title}
      </h3>
      <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
        {template.description}
      </p>

      {/* Footer */}
      <div className="mt-4 flex items-center justify-between border-t border-border/50 pt-3">
        <span className="flex items-center gap-1 text-xs text-muted-foreground">
          <Clock className="h-3 w-3" />
          Used {template.usedCount} times
        </span>
        <span className="inline-flex items-center gap-1 text-xs font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
          Use Template <ArrowRight className="h-3 w-3" />
        </span>
      </div>
    </button>
  )
}

// ─── Template Preview (SlideOver content) ───────────────

function TemplatePreview({ template }: { template: Template }) {
  return (
    <div className="divide-y divide-border">
      {/* Description */}
      <div className="px-6 py-5">
        <p className="text-sm leading-relaxed text-muted-foreground">{template.description}</p>
        <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <FileText className="h-3.5 w-3.5" />
            {template.sections.length} sections
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" />
            Used {template.usedCount} times
          </span>
          {template.isDefault && (
            <span className="flex items-center gap-1.5 text-amber-600">
              <Star className="h-3.5 w-3.5 fill-amber-400" />
              Default template
            </span>
          )}
        </div>
      </div>

      {/* Document Preview */}
      <div className="px-6 py-5">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Document Preview</h4>

        <div className="mt-4 space-y-0 rounded-xl border border-border bg-white">
          {/* Document header */}
          <div className="border-b border-border bg-gradient-to-br from-[#1B4332]/[0.03] to-transparent px-6 py-5">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-primary" />
              <span className="text-[10px] font-medium uppercase tracking-wider text-primary">EscrowBD Contract</span>
            </div>
            <h3 className="mt-2 font-heading text-base text-foreground">{template.title}</h3>
            <p className="mt-1 text-xs text-muted-foreground">Template · Last updated Apr 2026</p>
          </div>

          {/* Sections */}
          {template.sections.map((section, i) => (
            <div key={i} className="border-b border-border/50 px-6 py-4 last:border-0">
              <h5 className="text-sm font-semibold text-foreground">{section.title}</h5>
              <p className="mt-2 whitespace-pre-line text-xs leading-relaxed text-muted-foreground">
                {section.content}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Info */}
      <div className="px-6 py-5">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Template Info</h4>
        <div className="mt-3 grid grid-cols-2 gap-3">
          <div className="rounded-lg border border-border/60 p-3">
            <p className="text-[10px] text-muted-foreground">Category</p>
            <p className="mt-0.5 text-sm font-medium text-foreground">{template.category}</p>
          </div>
          <div className="rounded-lg border border-border/60 p-3">
            <p className="text-[10px] text-muted-foreground">Sections</p>
            <p className="mt-0.5 text-sm font-medium text-foreground">{template.sections.length}</p>
          </div>
          <div className="rounded-lg border border-border/60 p-3">
            <p className="text-[10px] text-muted-foreground">Times Used</p>
            <p className="mt-0.5 text-sm font-medium text-foreground">{template.usedCount}</p>
          </div>
          <div className="rounded-lg border border-border/60 p-3">
            <p className="text-[10px] text-muted-foreground">Escrow Protected</p>
            <p className="mt-0.5 flex items-center gap-1 text-sm font-medium text-emerald-600">
              <CheckCircle2 className="h-3.5 w-3.5" /> Yes
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
