import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../auth/AuthContext";


function PublicRoute({ children }) {

    const { token } = useContext(AuthContext);


    if (token) {

        return <Navigate to="/dashboard" />;

    }


    return children;
}


export default PublicRoute;