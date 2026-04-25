import Cookies from "js-cookie"
import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

export type ContactMethod = "phone" | "email"

export type AuthSession = {
  accessToken: string
  refreshToken: string
  userId: string
  contactMethod: ContactMethod
  contactValue: string
  userPhone: string | null
  userEmail: string | null
  userName: string | null
}

type AuthState = {
  session: AuthSession | null
  setSession: (session: AuthSession) => void
  clearSession: () => void
  updateTokens: (tokens: { accessToken: string; refreshToken: string }) => void
}

const AUTH_SESSION_COOKIE_KEY = "central_tour.auth_session"
const COOKIE_MAX_AGE_DAYS = 30

const cookieStorage = createJSONStorage(() => ({
  getItem: (name) => Cookies.get(name) ?? null,
  setItem: (name, value) => {
    Cookies.set(name, value, {
      expires: COOKIE_MAX_AGE_DAYS,
      sameSite: "lax",
      secure: window.location.protocol === "https:",
      path: "/",
    })
  },
  removeItem: (name) => {
    Cookies.remove(name, { path: "/" })
  },
}))

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      session: null,
      setSession: (session) => set({ session }),
      clearSession: () => set({ session: null }),
      updateTokens: (tokens) =>
        set((state) => {
          if (!state.session) return state
          return {
            session: {
              ...state.session,
              accessToken: tokens.accessToken,
              refreshToken: tokens.refreshToken,
            },
          }
        }),
    }),
    {
      name: AUTH_SESSION_COOKIE_KEY,
      storage: cookieStorage,
      partialize: (state) => ({ session: state.session }),
      merge: (persistedSession, currentState) => ({
        ...currentState,
        ...(persistedSession as Partial<AuthState>),
      }),
    }
  )
)

export function getAuthSession(): AuthSession | null {
  return useAuthStore.getState().session
}

export function saveAuthSession(session: AuthSession): void {
  useAuthStore.getState().setSession(session)
}

export function clearAuthSession(): void {
  useAuthStore.getState().clearSession()
}

export function updateAuthSessionTokens(tokens: {
  accessToken: string
  refreshToken: string
}): AuthSession | null {
  const store = useAuthStore.getState()
  if (!store.session) return null
  store.updateTokens(tokens)
  return useAuthStore.getState().session
}
