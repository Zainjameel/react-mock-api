import { api } from "../../shared/api/client";
import type { WorkOrder, WorkOrderStatus } from "../../shared/types/workOrders";

export async function fetchWorkOrders(): Promise<WorkOrder[]> {
  return (await api.get("/work-orders")).data;
}

export async function fetchWorkOrder(id: number): Promise<WorkOrder> {
  return (await api.get(`/work-orders/${id}`)).data;
}

export async function createWorkOrder(
  input: Omit<WorkOrder, "id" | "updatedAt">
): Promise<WorkOrder> {
  return (await api.post("/work-orders", input)).data;
}

export async function updateWorkOrderStatus(
  id: number,
  status: WorkOrderStatus
): Promise<WorkOrder> {
  return (await api.put(`/work-orders/${id}/status`, { status })).data;
}
