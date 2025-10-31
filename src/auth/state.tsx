// Minimal, client-only auth state for MVP.
// Rationale:
// - Avoids backend dependency to unblock UX work and testing.
// - API-compatible shape with signIn/signUp makes it easy to swap later (e.g., Supabase/Auth0).
import React, { createContext, useContext } from 'react';

export interface User {
  id: string;
  email: string;
}

interface AuthState {
  user: User | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => void;
}

const AuthContext = createContext<AuthState | null>(null);
const STORAGE_KEY = 'gnomeo:auth:user';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<User | null>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as User) : null;
    } catch { return null; }
  });

  function save(u: User | null) {
    setUser(u);
    try {
      if (u) localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
      else localStorage.removeItem(STORAGE_KEY);
    } catch {}
  }

  async function signIn(email: string, _password: string) {
    // MVP: local-only auth. In production, call backend.
    save({ id: crypto.randomUUID(), email });
  }

  async function signUp(email: string, _password: string) {
    // MVP: same as signIn with minimal validation
    save({ id: crypto.randomUUID(), email });
  }

  function signOut() { save(null); }

  const value: AuthState = { user, signIn, signUp, signOut };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

