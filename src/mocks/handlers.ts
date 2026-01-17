import { http, HttpResponse } from "msw";
import type { WorkOrder, WorkOrderStatus } from "../shared/types/workOrders";
import type { Role, User } from "../shared/types/auth";

type LoginBody = { email: string; password: string };

let workOrders: WorkOrder[] = [
  {
    id: 101,
    site: "OSHKOSH-T1",
    assetId: "AHU-5",
    priority: "HIGH",
    description: "High humidity alarm",
    status: "OPEN",
    updatedAt: new Date().toISOString()
  },
  {
    id: 102,
    site: "OSHKOSH-T2",
    assetId: "FPB-210",
    priority: "MEDIUM",
    description: "Damper feedback issue",
    status: "IN_PROGRESS",
    updatedAt: new Date().toISOString()
  },
  {
    id: 103,
    site: "OSHKOSH-T3",
    assetId: "RTU-15",
    priority: "LOW",
    description: "Filter reminder",
    status: "CLOSED",
    updatedAt: new Date().toISOString()
  }
];

function roleFromEmail(email: string): Role {
  if (email.includes("admin")) return "ADMIN";
  if (email.includes("sup")) return "SUPERVISOR";
  return "TECH";
}

function requireAuth(request: Request) {
  const auth = request.headers.get("authorization");
  if (!auth?.startsWith("Bearer ")) {
    return HttpResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  return null;
}

export const handlers = [
  // POST /api/auth/login
  http.post("/api/auth/login", async ({ request }) => {
    const body = (await request.json()) as LoginBody;

    if (!body.email || !body.password) {
      return HttpResponse.json({ message: "Missing credentials" }, { status: 400 });
    }

    const user: User = {
      id: "u1",
      name: body.email.split("@")[0] ?? "User",
      role: roleFromEmail(body.email)
    };

    return HttpResponse.json({
      token: "demo.jwt.token",
      user
    });
  }),

  // GET /api/work-orders
  http.get("/api/work-orders", ({ request }) => {
    const authErr = requireAuth(request);
    if (authErr) return authErr;
    return HttpResponse.json(workOrders);
  }),

  // GET /api/work-orders/:id
  http.get("/api/work-orders/:id", ({ params, request }) => {
    const authErr = requireAuth(request);
    if (authErr) return authErr;

    const id = Number(params.id);
    const found = workOrders.find((x) => x.id === id);
    if (!found) return HttpResponse.json({ message: "Not found" }, { status: 404 });

    return HttpResponse.json(found);
  }),

  // POST /api/work-orders
  http.post("/api/work-orders", async ({ request }) => {
    const authErr = requireAuth(request);
    if (authErr) return authErr;

    const body = (await request.json()) as Omit<WorkOrder, "id" | "updatedAt">;
    const created: WorkOrder = {
      ...body,
      id: Math.floor(1000 + Math.random() * 9000),
      updatedAt: new Date().toISOString()
    };

    workOrders = [created, ...workOrders];
    return HttpResponse.json(created, { status: 201 });
  }),

  // PUT /api/work-orders/:id/status
  http.put("/api/work-orders/:id/status", async ({ params, request }) => {
    const authErr = requireAuth(request);
    if (authErr) return authErr;

    const id = Number(params.id);
    const body = (await request.json()) as { status: WorkOrderStatus };

    const idx = workOrders.findIndex((x) => x.id === id);
    if (idx === -1) return HttpResponse.json({ message: "Not found" }, { status: 404 });

    workOrders[idx] = {
      ...workOrders[idx],
      status: body.status,
      updatedAt: new Date().toISOString()
    };

    return HttpResponse.json(workOrders[idx]);
  })
];
