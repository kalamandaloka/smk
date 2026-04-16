export type AuthRole = { role: { code: string; name: string } };
export type AuthUser = {
  id: string;
  email: string;
  name: string;
  isActive: boolean;
  userRoles: AuthRole[];
};

const TOKEN_KEY = "lms_access_token";

export function getStoredToken(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(TOKEN_KEY);
}

export function storeToken(token: string) {
  window.localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken() {
  window.localStorage.removeItem(TOKEN_KEY);
}

export function getRoleCodes(user: AuthUser | null): string[] {
  if (!user) return [];
  return user.userRoles.map((ur) => ur.role.code);
}
