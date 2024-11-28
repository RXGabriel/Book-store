import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (currentUser) {
    return children;
  }

  return <Navigate to="/login" replace />;
};

export default PrivateRoute;
