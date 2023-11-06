//10
/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const AdminRoute = ({ children }) => {
  const { user } = useAuthContext();
  console.log(user);
  if (!user) {
    return <Navigate to="/login" />;
  }
  if (!user.roles.includes("ROLES_ADMIN")) return <Navigate to="/notallow" />;
  return children;
}
export default AdminRoute;
