import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { useAuth } from "./AuthContext";

export function LoginPage() {
  const { login } = useAuth();
  const nav = useNavigate();

  const [email, setEmail] = useState("sup@demo.com");
  const [password, setPassword] = useState("password");
  const [err, setErr] = useState<string | null>(null);

  return (
    <Box sx={{ maxWidth: 450, mx: "auto", mt: 8 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Login
      </Typography>

      <Stack spacing={2}>
        <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          variant="contained"
          onClick={async () => {
            setErr(null);
            try {
              await login(email, password);
              nav("/");
            } catch (e: any) {
              setErr(e?.message ?? "Login failed");
            }
          }}
        >
          Sign in
        </Button>

        <Typography variant="body2">
          Try:
          <br />- tech@demo.com (TECH)
          <br />- sup@demo.com (SUPERVISOR)
          <br />- admin@demo.com (ADMIN)
        </Typography>

        {err && <Typography color="error">{err}</Typography>}
      </Stack>
    </Box>
  );
}
