import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserAuthContext } from "../context/UserAuthContext";

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useContext(UserAuthContext);
    if (!isAuthenticated) {
        return <Navigate to="/" />;
    }
    return children;
};

export default ProtectedRoute;
