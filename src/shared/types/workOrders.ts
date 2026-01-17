export type WorkOrderStatus = "OPEN" | "IN_PROGRESS" | "CLOSED";

export type WorkOrder = {
  id: number;
  site: string;
  assetId: string;
  priority: "LOW" | "MEDIUM" | "HIGH";
  description: string;
  status: WorkOrderStatus;
  updatedAt: string;
};
