import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import type { WorkOrder } from "../../../shared/types/workOrders";
import { Can } from "../../../shared/components/Can";

export function WorkOrderActions({
  wo,
  onClose
}: {
  wo: WorkOrder;
  onClose: () => void;
}) {
  return (
    <Stack direction="row" spacing={1}>
      {wo.status === "OPEN" && (
        <Can role="SUPERVISOR" fallback={<span />}>
          <Button variant="contained" onClick={onClose}>
            Close
          </Button>
        </Can>
      )}
    </Stack>
  );
}
