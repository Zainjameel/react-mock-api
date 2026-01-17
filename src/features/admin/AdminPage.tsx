import Typography from "@mui/material/Typography";

export function AdminPage() {
  return (
    <>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Admin
      </Typography>
      <Typography>Only ADMIN can access this route.</Typography>
    </>
  );
}
