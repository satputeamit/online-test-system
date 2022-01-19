import { Navigate } from "react-router-dom";

const Logout = () => {

    const loggedIn = window.localStorage.getItem("accessToken")
    if (loggedIn) {
        window.localStorage.removeItem("accessToken")
        window.localStorage.removeItem("emailId")
        return <Navigate to="/" />;
    }
    return <Navigate to="/" />;
}

export default Logout;