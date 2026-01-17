import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { createWorkOrder } from "./api";

const schema = z.object({
  site: z.string().min(2, "Site required"),
  assetId: z.string().min(2, "Asset ID required"),
  priority: z.enum(["LOW", "MEDIUM", "HIGH"]),
  description: z.string().min(5, "Description too short")
});

type FormValues = z.infer<typeof schema>;

export function WorkOrderCreatePage() {
  const nav = useNavigate();
  const qc = useQueryClient();

  const { register, handleSubmit, formState } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { priority: "MEDIUM" }
  });

  const mutation = useMutation({
    mutationFn: async (values: FormValues) => createWorkOrder({ ...values, status: "OPEN" }),
    onSuccess: async (created) => {
      await qc.invalidateQueries({ queryKey: ["workOrders"] });
      nav(`/work-orders/${created.id}`);
    }
  });

  return (
    <Box sx={{ maxWidth: 700 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        New Work Order
      </Typography>

      <form onSubmit={handleSubmit((v) => mutation.mutate(v))}>
        <Stack spacing={2}>
          <TextField
            label="Site"
            {...register("site")}
            error={!!formState.errors.site}
            helperText={formState.errors.site?.message}
          />

          <TextField
            label="Asset ID"
            {...register("assetId")}
            error={!!formState.errors.assetId}
            helperText={formState.errors.assetId?.message}
          />

          <TextField
            select
            label="Priority"
            defaultValue="MEDIUM"
            {...register("priority")}
            error={!!formState.errors.priority}
            helperText={formState.errors.priority?.message}
          >
            <MenuItem value="LOW">LOW</MenuItem>
            <MenuItem value="MEDIUM">MEDIUM</MenuItem>
            <MenuItem value="HIGH">HIGH</MenuItem>
          </TextField>

          <TextField
            label="Description"
            multiline
            minRows={3}
            {...register("description")}
            error={!!formState.errors.description}
            helperText={formState.errors.description?.message}
          />

          <Stack direction="row" spacing={2}>
            <Button type="submit" variant="contained" disabled={mutation.isPending}>
              Create
            </Button>
            <Button variant="outlined" onClick={() => nav(-1)}>
              Cancel
            </Button>
          </Stack>

          {mutation.isError && <Typography color="error">Create failed.</Typography>}
        </Stack>
      </form>
    </Box>
  );
}
