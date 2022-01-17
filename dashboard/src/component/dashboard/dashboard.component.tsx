import { Navigate } from "react-router-dom";

const Dashboard = () => {
    const loggedIn = window.localStorage.getItem("accessToken")
    if(!loggedIn) return <Navigate to="/"/>;
    return (<div>Dashboard</div>)
}


export default Dashboard;