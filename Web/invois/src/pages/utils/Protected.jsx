import { Navigate } from "react-router-dom";

const Protected = ({ children }) => {
    const authToken = localStorage.getItem('authToken');
        
    if (!authToken) {
        return <Navigate to="/" replace />;
    }
    return children;
};

export default Protected;