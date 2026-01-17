import React from "react";
import type { Role } from "../types/auth";
import { useAuth } from "../../features/auth/AuthContext";

export function Can({
  role,
  children,
  fallback = null
}: {
  role: Role;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}) {
  const { hasRole } = useAuth();
  return <>{hasRole(role) ? children : fallback}</>;
}
