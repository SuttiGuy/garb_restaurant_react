import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const ProtectedRoute = ({children}) => {
    const {user} = useAuthContext();
    if(!user){
        return <Navigate to="/Login"/>
    }
    return children;
};

export default ProtectedRoute;