import React, { useMemo } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Link from "@mui/material/Link";
import { Link as RouterLink } from "react-router-dom";
import type { WorkOrder } from "../../../shared/types/workOrders";
import { StatusBadge } from "./StatusBadge";

const Row = React.memo(function Row({ wo }: { wo: WorkOrder }) {
  return (
    <TableRow hover>
      <TableCell>
        <Link component={RouterLink} to={`/work-orders/${wo.id}`}>
          #{wo.id}
        </Link>
      </TableCell>
      <TableCell>{wo.site}</TableCell>
      <TableCell>{wo.assetId}</TableCell>
      <TableCell>{wo.priority}</TableCell>
      <TableCell>
        <StatusBadge status={wo.status} />
      </TableCell>
      <TableCell>{new Date(wo.updatedAt).toLocaleString()}</TableCell>
    </TableRow>
  );
});

export function WorkOrdersTable({ items }: { items: WorkOrder[] }) {
  const rows = useMemo(() => items, [items]);

  return (
    <Table size="small">
      <TableHead>
        <TableRow>
          <TableCell>ID</TableCell>
          <TableCell>Site</TableCell>
          <TableCell>Asset</TableCell>
          <TableCell>Priority</TableCell>
          <TableCell>Status</TableCell>
          <TableCell>Updated</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((wo) => (
          <Row key={wo.id} wo={wo} />
        ))}
      </TableBody>
    </Table>
  );
}
