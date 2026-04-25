import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  FileText,
  CheckCircle2,
  Shield,
  PenTool,
  Send,
  MessageSquare,
  ChevronDown,
  ChevronUp,
  X,
  AlertCircle,
  Download,
  Clock,
  User,
  Building2,
} from "lucide-react"

type ReviewStep = "review" | "comment" | "sign" | "done"

const contractData = {
  number: "ESC-2026-001",
  title: "Logo & Brand Identity Design",
  status: "sent" as const,
  createdAt: "Mar 15, 2026",
  expiresAt: "Apr 15, 2026",
  sp: { name: "Arif Hossain", email: "arif@example.com", business: "Rahman Studio" },
  client: { name: "Farhan Ahmed", email: "farhan@techcorp.bd", business: "TechCorp BD" },
  totalValue: 75000,
  milestones: [
    { title: "Research & Moodboard", amount: 15000, dueDate: "Apr 1, 2026" },
    { title: "Logo Concepts (3 options)", amount: 25000, dueDate: "Apr 15, 2026" },
    { title: "Final Deliverables + Brand Guide", amount: 35000, dueDate: "May 1, 2026" },
  ],
  sections: [
    {
      title: "Scope of Work",
      content:
        "The Service Provider agrees to create a complete brand identity package for the Client, including a primary logo, logo variations (horizontal, vertical, icon-only), a color palette (primary and secondary colors with HEX/RGB values), typography selection, and a brand usage guideline document. The deliverables will be provided in AI, SVG, PNG, and PDF formats.",
    },
    {
      title: "Timeline & Milestones",
      content:
        "The project will be completed in three milestones over approximately 6 weeks. Each milestone payment is held in escrow and released upon Client approval. Milestone 1: Research & Moodboard (Week 1-2). Milestone 2: Logo Concepts — 3 design options (Week 3-4). Milestone 3: Final deliverables and brand guidelines (Week 5-6).",
    },
    {
      title: "Payment Terms",
      content:
        "Total contract value: ৳75,000. Payments are processed through EscrowBD's secure escrow system. The Client funds each milestone before work begins. Funds are released to the Service Provider upon Client approval of each deliverable. A platform fee of 3% applies to each transaction.",
    },
    {
      title: "Revisions & Amendments",
      content:
        "Each milestone includes up to 2 rounds of revisions at no additional cost. Additional revisions beyond the included rounds will be billed at ৳2,000 per revision round. Major scope changes require a contract amendment signed by both parties.",
    },
    {
      title: "Intellectual Property",
      content:
        "Upon full payment and completion of all milestones, all intellectual property rights for the final deliverables will be transferred to the Client. The Service Provider retains the right to showcase the work in their portfolio unless explicitly prohibited by the NDA addendum.",
    },
    {
      title: "Confidentiality",
      content:
        "Both parties agree to keep all project details, business information, and communications confidential for a period of 2 years from the contract end date. This includes but is not limited to: pricing, internal processes, trade secrets, and client data.",
    },
    {
      title: "Dispute Resolution",
      content:
        "In case of a dispute, both parties agree to first attempt resolution through EscrowBD's built-in dispute resolution process. If unresolved, the matter will be escalated to mediation. The platform's dispute resolution timeline is 7-14 business days.",
    },
    {
      title: "Termination",
      content:
        "Either party may terminate this contract with 7 days written notice. Upon termination: completed milestone payments will be released to the Service Provider, funded but unstarted milestones will be refunded to the Client, and work-in-progress milestones will be handled through the dispute resolution process.",
    },
  ],
  comments: [
    { id: "1", author: "Farhan Ahmed", role: "Client", text: "Can we add a social media kit to the deliverables?", section: "Scope of Work", createdAt: "Mar 16, 2026" },
    { id: "2", author: "Arif Hossain", role: "SP", text: "Sure, I can include social media templates for ৳5,000 extra. Shall I amend the contract?", section: "Scope of Work", createdAt: "Mar 16, 2026" },
  ],
}

export default function ContractReviewPage() {
  const [step, setStep] = useState<ReviewStep>("review")
  const [expandedSections, setExpandedSections] = useState<Set<number>>(new Set([0, 1, 2]))
  const [commentText, setCommentText] = useState("")
  const [commentSection, setCommentSection] = useState<string | null>(null)
  const [comments, setComments] = useState(contractData.comments)
  const [signatureName, setSignatureName] = useState("")
  const [agreed, setAgreed] = useState(false)

  const toggleSection = (i: number) => {
    const next = new Set(expandedSections)
    next.has(i) ? next.delete(i) : next.add(i)
    setExpandedSections(next)
  }

  const addComment = () => {
    if (!commentText.trim() || !commentSection) return
    setComments([
      ...comments,
      {
        id: String(comments.length + 1),
        author: "Farhan Ahmed",
        role: "Client",
        text: commentText,
        section: commentSection,
        createdAt: "Apr 5, 2026",
      },
    ])
    setCommentText("")
    setCommentSection(null)
  }

  if (step === "done") {
    return (
      <div className="min-h-screen bg-[#FAFAF8]">
        <header className="border-b border-border bg-white px-6 py-4">
          <div className="mx-auto flex max-w-4xl items-center gap-3">
            <span className="font-heading text-xl text-[#2D6A4F]">EscrowBD</span>
            <span className="text-xs text-muted-foreground">Secure Contract Platform</span>
          </div>
        </header>
        <div className="mx-auto max-w-lg px-6 py-20 text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100">
            <CheckCircle2 className="h-10 w-10 text-emerald-600" />
          </div>
          <h1 className="mt-6 font-heading text-3xl text-foreground">Contract Signed!</h1>
          <p className="mt-3 text-sm text-muted-foreground">
            You've successfully signed <strong>{contractData.title}</strong>. Both parties have been notified and the escrow process can now begin.
          </p>
          <div className="mt-8 rounded-xl border border-border bg-white p-5 text-left">
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Contract</span>
                <span className="font-medium text-foreground">{contractData.number}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Signed by</span>
                <span className="font-medium text-foreground">{signatureName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Date</span>
                <span className="font-medium text-foreground">Apr 5, 2026</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status</span>
                <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700">Signed</span>
              </div>
            </div>
          </div>
          <Button className="mt-6" onClick={() => setStep("review")}>
            <Download className="mr-1.5 h-4 w-4" /> Download PDF
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-white px-6 py-3">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-heading text-xl text-[#2D6A4F]">EscrowBD</span>
            <span className="hidden text-xs text-muted-foreground sm:block">Contract Review</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1.5 text-xs font-medium text-amber-700">
              <Clock className="h-3 w-3" />
              Expires {contractData.expiresAt}
            </div>
            <Button variant="outline" size="sm">
              <Download className="mr-1 h-3 w-3" /> PDF
            </Button>
          </div>
        </div>
      </header>

      {/* Progress bar */}
      <div className="border-b border-border bg-white px-6 py-3">
        <div className="mx-auto flex max-w-5xl items-center gap-4">
          {(["review", "comment", "sign"] as const).map((s, i) => {
            const labels = ["Review Contract", "Add Comments", "Sign & Accept"]
            const icons = [FileText, MessageSquare, PenTool]
            const Icon = icons[i]
            const isActive = step === s
            const isDone = (step === "comment" && i === 0) || (step === "sign" && i < 2)
            return (
              <div key={s} className="flex flex-1 items-center gap-2">
                <button
                  onClick={() => {
                    if (isDone || isActive) setStep(s)
                  }}
                  className={`flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium transition-colors ${
                    isActive
                      ? "bg-primary/10 text-primary"
                      : isDone
                        ? "text-emerald-600"
                        : "text-muted-foreground"
                  }`}
                >
                  {isDone ? (
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  ) : (
                    <Icon className="h-4 w-4" />
                  )}
                  <span className="hidden sm:inline">{labels[i]}</span>
                </button>
                {i < 2 && <div className={`h-px flex-1 ${isDone ? "bg-emerald-300" : "bg-border"}`} />}
              </div>
            )
          })}
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-6 py-8">
        <div className="flex gap-8">
          {/* Main content */}
          <div className="flex-1 space-y-6">
            {/* Contract header card */}
            <div className="rounded-xl border border-border bg-white p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-medium text-primary">{contractData.number}</p>
                  <h1 className="mt-1 font-heading text-2xl text-foreground">{contractData.title}</h1>
                  <p className="mt-1 text-sm text-muted-foreground">Created {contractData.createdAt}</p>
                </div>
                <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700 capitalize">
                  Awaiting Signature
                </span>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-4">
                <div className="rounded-lg bg-muted/30 p-4">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <User className="h-3 w-3" /> Service Provider
                  </div>
                  <p className="mt-1.5 text-sm font-medium text-foreground">{contractData.sp.name}</p>
                  <p className="text-xs text-muted-foreground">{contractData.sp.business}</p>
                </div>
                <div className="rounded-lg bg-muted/30 p-4">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Building2 className="h-3 w-3" /> Client
                  </div>
                  <p className="mt-1.5 text-sm font-medium text-foreground">{contractData.client.name}</p>
                  <p className="text-xs text-muted-foreground">{contractData.client.business}</p>
                </div>
              </div>

              {/* Milestones summary */}
              <div className="mt-5">
                <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Milestones</h3>
                <div className="mt-3 space-y-2">
                  {contractData.milestones.map((m, i) => (
                    <div key={i} className="flex items-center justify-between rounded-lg border border-border/60 px-4 py-3">
                      <div className="flex items-center gap-3">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                          {i + 1}
                        </span>
                        <div>
                          <p className="text-sm font-medium text-foreground">{m.title}</p>
                          <p className="text-xs text-muted-foreground">Due {m.dueDate}</p>
                        </div>
                      </div>
                      <p className="text-sm font-medium text-foreground">৳{m.amount.toLocaleString("en-BD")}</p>
                    </div>
                  ))}
                  <div className="flex justify-between px-4 pt-2 text-sm">
                    <span className="font-medium text-foreground">Total</span>
                    <span className="font-heading text-lg text-primary">৳{contractData.totalValue.toLocaleString("en-BD")}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contract sections */}
            <div className="space-y-3">
              {contractData.sections.map((section, i) => {
                const sectionComments = comments.filter((c) => c.section === section.title)
                return (
                  <div key={i} className="rounded-xl border border-border bg-white">
                    <button
                      onClick={() => toggleSection(i)}
                      className="flex w-full items-center justify-between px-6 py-4 text-left"
                    >
                      <div className="flex items-center gap-3">
                        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-muted text-xs font-medium text-muted-foreground">
                          {i + 1}
                        </span>
                        <h3 className="text-sm font-medium text-foreground">{section.title}</h3>
                        {sectionComments.length > 0 && (
                          <span className="flex items-center gap-1 rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-medium text-blue-600">
                            <MessageSquare className="h-3 w-3" /> {sectionComments.length}
                          </span>
                        )}
                      </div>
                      {expandedSections.has(i) ? (
                        <ChevronUp className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="h-4 w-4 text-muted-foreground" />
                      )}
                    </button>
                    {expandedSections.has(i) && (
                      <div className="border-t border-border/50 px-6 py-5">
                        <p className="text-sm leading-relaxed text-foreground/80">{section.content}</p>

                        {/* Section comments */}
                        {sectionComments.length > 0 && (
                          <div className="mt-5 space-y-3">
                            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Comments</p>
                            {sectionComments.map((c) => (
                              <div key={c.id} className="flex gap-3 rounded-lg bg-muted/30 p-3">
                                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                                  {c.author.charAt(0)}
                                </div>
                                <div>
                                  <div className="flex items-center gap-2">
                                    <p className="text-xs font-medium text-foreground">{c.author}</p>
                                    <span className="text-[10px] text-muted-foreground">{c.role} · {c.createdAt}</span>
                                  </div>
                                  <p className="mt-1 text-sm text-foreground/80">{c.text}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Add comment */}
                        {step === "comment" && (
                          <div className="mt-4">
                            {commentSection === section.title ? (
                              <div className="flex gap-2">
                                <Input
                                  placeholder="Add a comment on this section..."
                                  value={commentText}
                                  onChange={(e) => setCommentText(e.target.value)}
                                  onKeyDown={(e) => e.key === "Enter" && addComment()}
                                  className="flex-1"
                                />
                                <Button size="sm" onClick={addComment}>
                                  <Send className="h-3 w-3" />
                                </Button>
                                <Button variant="ghost" size="sm" onClick={() => setCommentSection(null)}>
                                  <X className="h-3 w-3" />
                                </Button>
                              </div>
                            ) : (
                              <button
                                onClick={() => setCommentSection(section.title)}
                                className="flex items-center gap-1.5 text-xs font-medium text-primary hover:underline"
                              >
                                <MessageSquare className="h-3 w-3" /> Add comment
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>

            {/* Signing section */}
            {step === "sign" && (
              <div className="rounded-xl border-2 border-primary/20 bg-white p-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <PenTool className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg text-foreground">Sign This Contract</h3>
                    <p className="text-xs text-muted-foreground">By signing, you agree to all terms above</p>
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Type your full legal name</label>
                    <Input
                      placeholder="e.g. Farhan Ahmed"
                      value={signatureName}
                      onChange={(e) => setSignatureName(e.target.value)}
                    />
                  </div>

                  {signatureName && (
                    <div className="rounded-lg border border-dashed border-primary/30 bg-primary/5 p-6 text-center">
                      <p className="font-heading text-3xl text-primary italic">{signatureName}</p>
                      <p className="mt-2 text-xs text-muted-foreground">Digital Signature Preview</p>
                    </div>
                  )}

                  <label className="flex items-start gap-3 rounded-lg border border-border p-4">
                    <input
                      type="checkbox"
                      checked={agreed}
                      onChange={(e) => setAgreed(e.target.checked)}
                      className="mt-0.5 h-4 w-4 rounded border-border text-primary"
                    />
                    <span className="text-sm text-foreground/80">
                      I, <strong>{signatureName || "___"}</strong>, confirm that I have read and agree to all terms and conditions in this contract. I understand that this is a legally binding digital signature.
                    </span>
                  </label>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar summary */}
          <div className="hidden w-72 shrink-0 space-y-4 lg:block">
            <div className="sticky top-32 space-y-4">
              <div className="rounded-xl border border-border bg-white p-5">
                <h3 className="text-sm font-medium text-foreground">Contract Summary</h3>
                <div className="mt-4 space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Value</span>
                    <span className="font-medium text-foreground">৳{contractData.totalValue.toLocaleString("en-BD")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Milestones</span>
                    <span className="font-medium text-foreground">{contractData.milestones.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Sections</span>
                    <span className="font-medium text-foreground">{contractData.sections.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Comments</span>
                    <span className="font-medium text-foreground">{comments.length}</span>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-5">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-emerald-600" />
                  <h3 className="text-sm font-medium text-emerald-800">Escrow Protected</h3>
                </div>
                <p className="mt-2 text-xs text-emerald-700/80">
                  All payments are held in escrow until milestones are approved. Your funds are safe.
                </p>
              </div>

              {step === "review" && (
                <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-5">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-amber-600" />
                    <h3 className="text-sm font-medium text-amber-800">Review Carefully</h3>
                  </div>
                  <p className="mt-2 text-xs text-amber-700/80">
                    Read all sections before signing. Add comments if you need changes.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom action bar */}
        <div className="sticky bottom-0 mt-8 rounded-xl border border-border bg-white p-4 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              {step === "review" && "Review the contract terms, then proceed to add comments or sign."}
              {step === "comment" && "Add comments on any section, then proceed to sign."}
              {step === "sign" && "Type your name and accept the terms to sign this contract."}
            </div>
            <div className="flex items-center gap-3">
              {step !== "review" && (
                <Button
                  variant="outline"
                  onClick={() =>
                    setStep(step === "comment" ? "review" : step === "sign" ? "comment" : "review")
                  }
                >
                  Back
                </Button>
              )}
              {step === "review" && (
                <>
                  <Button variant="outline" onClick={() => setStep("comment")}>
                    <MessageSquare className="mr-1.5 h-4 w-4" /> Add Comments
                  </Button>
                  <Button onClick={() => setStep("sign")}>
                    <PenTool className="mr-1.5 h-4 w-4" /> Proceed to Sign
                  </Button>
                </>
              )}
              {step === "comment" && (
                <Button onClick={() => setStep("sign")}>
                  <PenTool className="mr-1.5 h-4 w-4" /> Proceed to Sign
                </Button>
              )}
              {step === "sign" && (
                <Button
                  disabled={!signatureName || !agreed}
                  onClick={() => setStep("done")}
                >
                  <CheckCircle2 className="mr-1.5 h-4 w-4" /> Sign Contract
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
