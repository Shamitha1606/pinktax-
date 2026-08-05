import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";

export type AppUser = {
  fullName: string;
  email: string;
  phone?: string | undefined;
};

type StoredUser = AppUser & { password: string };

type AuthContextValue = {
  user: AppUser | null;
  ready: boolean;
  register: (data: StoredUser) => Promise<AppUser>;
  login: (email: string, password: string) => Promise<AppUser>;
  logout: () => void;
};

const USERS_KEY = "sentra.users";
const SESSION_KEY = "sentra.session";

const AuthContext = createContext<AuthContextValue | null>(null);

function readUsers(): StoredUser[] {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) ?? "[]") as StoredUser[];
  } catch {
    return [];
  }
}

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(SESSION_KEY);
      if (raw) setUser(JSON.parse(raw) as AppUser);
    } catch {
      /* ignore */
    }
    setReady(true);
  }, []);

  const persist = useCallback((next: AppUser | null) => {
    setUser(next);
    if (next) localStorage.setItem(SESSION_KEY, JSON.stringify(next));
    else localStorage.removeItem(SESSION_KEY);
  }, []);

  const register = useCallback(
    async (data: StoredUser) => {
      await wait(1100);
      const users = readUsers();
      if (users.some((u) => u.email.toLowerCase() === data.email.toLowerCase())) {
        throw new Error("An account with this email already exists.");
      }
      users.push(data);
      localStorage.setItem(USERS_KEY, JSON.stringify(users));
      const profile: AppUser = { fullName: data.fullName, email: data.email, phone: data.phone };
      persist(profile);
      return profile;
    },
    [persist],
  );

  const login = useCallback(
    async (email: string, password: string) => {
      await wait(1000);
      const found = readUsers().find(
        (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password,
      );
      if (!found) throw new Error("Invalid email or password.");
      const profile: AppUser = { fullName: found.fullName, email: found.email, phone: found.phone };
      persist(profile);
      return profile;
    },
    [persist],
  );

  const logout = useCallback(() => persist(null), [persist]);

  const value = useMemo(
    () => ({ user, ready, register, login, logout }),
    [user, ready, register, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

export function passwordScore(password: string) {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  if (password.length >= 12) score = Math.min(4, score + 1);
  return score;
}

export const strengthMeta = [
  { label: "Too short", tone: "bg-destructive" },
  { label: "Weak", tone: "bg-destructive" },
  { label: "Fair", tone: "bg-warning" },
  { label: "Strong", tone: "bg-primary" },
  { label: "Excellent", tone: "bg-success" },
];
