import { Navigate } from "react-router-dom";
import { auth } from '../firebase'

const Protected = ({ children }) => {

    //if (!isLoggedIn) {
    if (!auth.currentUser) {
        return <Navigate to="/" replace />;
    }
    return children;
};

export default Protected;