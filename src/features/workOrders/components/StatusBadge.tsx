import Chip from "@mui/material/Chip";
import type { WorkOrderStatus } from "../../../shared/types/workOrders";

export function StatusBadge({ status }: { status: WorkOrderStatus }) {
  const label = status.replace("_", " ");
  return <Chip size="small" label={label} />;
}
