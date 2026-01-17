import { Outlet, Link as RouterLink, useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useAuth } from "../../features/auth/AuthContext";

export function PageLayout() {
  const { user, logout } = useAuth();
  const nav = useNavigate();

  return (
    <Box>
      <AppBar position="static">
        <Toolbar sx={{ gap: 2 }}>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            BizOps Portal
          </Typography>

          <Button color="inherit" component={RouterLink} to="/work-orders">
            Work Orders
          </Button>
          <Button color="inherit" component={RouterLink} to="/assets">
            Assets
          </Button>
          <Button color="inherit" component={RouterLink} to="/admin">
            Admin
          </Button>

          <Typography variant="body2" sx={{ ml: 2 }}>
            {user?.name} ({user?.role})
          </Typography>

          <Button
            color="inherit"
            onClick={() => {
              logout();
              nav("/login");
            }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Box sx={{ p: 2 }}>
        <Outlet />
      </Box>
    </Box>
  );
}
