import { useAuth } from "../Context";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { authState } = useAuth();
  if (!authState.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoute;
