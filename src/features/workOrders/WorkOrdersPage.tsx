import { useQuery } from "@tanstack/react-query";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Link as RouterLink } from "react-router-dom";
import { fetchWorkOrders } from "./api";
import { useWorkOrdersUI } from "./store";
import { useDebounce } from "../../shared/hooks/useDebounce";
import { WorkOrdersTable } from "./components/WorkOrdersTable";

export function WorkOrdersPage() {
  const { data = [], isLoading, error } = useQuery({
    queryKey: ["workOrders"],
    queryFn: fetchWorkOrders
  });

  const { statusFilter, search, setStatusFilter, setSearch } = useWorkOrdersUI();
  const debouncedSearch = useDebounce(search, 250);

  const filtered = data.filter((wo) => {
    const statusOk = statusFilter === "ALL" ? true : wo.status === statusFilter;
    const q = debouncedSearch.trim().toLowerCase();

    const searchOk =
      !q ||
      wo.site.toLowerCase().includes(q) ||
      wo.assetId.toLowerCase().includes(q) ||
      wo.description.toLowerCase().includes(q) ||
      String(wo.id).includes(q);

    return statusOk && searchOk;
  });

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
        <Typography variant="h5">Work Orders</Typography>
        <Button variant="contained" component={RouterLink} to="/work-orders/new">
          New Work Order
        </Button>
      </Stack>

      <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
        <TextField label="Search" value={search} onChange={(e) => setSearch(e.target.value)} fullWidth />
        <TextField
          select
          label="Status"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as any)}
          sx={{ width: 200 }}
        >
          <MenuItem value="ALL">ALL</MenuItem>
          <MenuItem value="OPEN">OPEN</MenuItem>
          <MenuItem value="IN_PROGRESS">IN PROGRESS</MenuItem>
          <MenuItem value="CLOSED">CLOSED</MenuItem>
        </TextField>
      </Stack>

      {isLoading && <Typography>Loading…</Typography>}
      {error && <Typography color="error">Failed to load.</Typography>}
      {!isLoading && !error && <WorkOrdersTable items={filtered} />}
    </Box>
  );
}
