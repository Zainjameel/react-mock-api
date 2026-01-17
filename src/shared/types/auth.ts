export type Role = "TECH" | "SUPERVISOR" | "ADMIN";

export type User = {
  id: string;
  name: string;
  role: Role;
};

export type AuthState = {
  token: string | null;
  user: User | null;
};
