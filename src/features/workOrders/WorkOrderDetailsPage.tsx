import { useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { fetchWorkOrder, updateWorkOrderStatus } from "./api";
import { StatusBadge } from "./components/StatusBadge";
import { WorkOrderActions } from "./components/WorkOrderActions";

export function WorkOrderDetailsPage() {
  const { id } = useParams();
  const woId = Number(id);
  const qc = useQueryClient();

  const { data: wo, isLoading, error } = useQuery({
    queryKey: ["workOrder", woId],
    queryFn: () => fetchWorkOrder(woId),
    enabled: Number.isFinite(woId)
  });

  const closeMutation = useMutation({
    mutationFn: () => updateWorkOrderStatus(woId, "CLOSED"),
    onSuccess: async (updated) => {
      qc.setQueryData(["workOrder", woId], updated);
      await qc.invalidateQueries({ queryKey: ["workOrders"] });
    }
  });

  if (isLoading) return <Typography>Loading…</Typography>;
  if (error || !wo) return <Typography color="error">Not found.</Typography>;

  return (
    <Box>
      <Stack spacing={1} sx={{ mb: 2 }}>
        <Typography variant="h5">Work Order #{wo.id}</Typography>
        <Typography>Site: {wo.site}</Typography>
        <Typography>Asset: {wo.assetId}</Typography>
        <Typography>Priority: {wo.priority}</Typography>
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography>Status:</Typography>
          <StatusBadge status={wo.status} />
        </Stack>
        <Typography>Description: {wo.description}</Typography>
      </Stack>

      <WorkOrderActions wo={wo} onClose={() => closeMutation.mutate()} />

      {closeMutation.isError && (
        <Typography sx={{ mt: 2 }} color="error">
          Failed to close.
        </Typography>
      )}
    </Box>
  );
}
