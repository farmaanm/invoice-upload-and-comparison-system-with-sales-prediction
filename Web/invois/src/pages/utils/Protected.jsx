import { Navigate } from "react-router-dom";
import { auth } from '../../firebase'

const Protected = ({ children }) => {
    const authToken = localStorage.getItem('authToken');

    //if (!isLoggedIn) {
        
    if (!authToken) {
        return <Navigate to="/" replace />;
    }
    return children;
};

export default Protected;