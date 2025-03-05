import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "remixicon/fonts/remixicon.css";
import App from "./App.jsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import {
  LoginForm,
  EmployeeDashboard,
  AdminDashboard,
  PostNewTask,
  EditTask,
  ViewTask,
} from "./components";
import { ThemeProvider, AuthProvider } from "./Context";
import ProtectedRoute from "./utils/ProtectedRoute.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Navigate to="/login" replace />} />
      <Route path="login" element={<LoginForm />} />
      <Route
        path="employee/:fullName"
        element={
          <ProtectedRoute>
            <EmployeeDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="admin"
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        }
      >
        <Route
          path="/admin/post-new-task"
          element={
            <ProtectedRoute>
              <PostNewTask />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/edittask/:id"
          element={
            <ProtectedRoute>
              <EditTask />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/viewtask/:id"
          element={
            <ProtectedRoute>
              <ViewTask />
            </ProtectedRoute>
          }
        />
      </Route>
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>
);
