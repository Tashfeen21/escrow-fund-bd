import { create } from "zustand"
import type { User, UserMode } from "@/types"

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  setUser: (user: User) => void
  setMode: (mode: UserMode) => void
  logout: () => void
}

// Mock user for development
const mockUser: User = {
  id: "1",
  email: "karim@escrowbd.com",
  fullName: "Karim Ahmed",
  phone: "01712345678",
  accountType: "solo_freelancer",
  activeMode: "sp",
  businessName: "Karim Design Studio",
  bio: "UI/UX Designer & Brand Strategist",
  kycStatus: "verified",
  createdAt: "2025-01-15",
}

export const useAuthStore = create<AuthState>((set) => ({
  user: mockUser,
  isAuthenticated: true,
  setUser: (user) => set({ user, isAuthenticated: true }),
  setMode: (mode) =>
    set((state) => ({
      user: state.user ? { ...state.user, activeMode: mode } : null,
    })),
  logout: () => set({ user: null, isAuthenticated: false }),
}))
