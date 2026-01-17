import { Navigate } from "react-router-dom";
import { LoginPage } from "../features/auth/LoginPage";
import { ProtectedRoute } from "../shared/components/ProtectedRoute";
import { PageLayout } from "../shared/components/PageLayout";
import { WorkOrdersPage } from "../features/workOrders/WorkOrdersPage";
import { WorkOrderCreatePage } from "../features/workOrders/WorkOrderCreatePage";
import { WorkOrderDetailsPage } from "../features/workOrders/WorkOrderDetailsPage";
import { AssetsPage } from "../features/assets/AssetsPage";
import { AdminPage } from "../features/admin/AdminPage";

export const routes = [
  { path: "/login", element: <LoginPage /> },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <PageLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Navigate to="/work-orders" replace /> },
      { path: "work-orders", element: <WorkOrdersPage /> },
      { path: "work-orders/new", element: <WorkOrderCreatePage /> },
      { path: "work-orders/:id", element: <WorkOrderDetailsPage /> },
      { path: "assets", element: <AssetsPage /> },
      {
        path: "admin",
        element: (
          <ProtectedRoute requiredRole="ADMIN">
            <AdminPage />
          </ProtectedRoute>
        )
      }
    ]
  },
  { path: "*", element: <Navigate to="/" replace /> }
];
