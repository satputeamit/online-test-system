import NavBar from "../navbar";
import HomeComponent from "../home/Home.component";
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from "react-router-dom";
import SignUp from "../signup/Signup.component";
import Dashboard from "../dashboard/dashboard.component";
import { observer } from "mobx-react-lite";


const Base = observer(() => {
    const loggedIn = window.localStorage.getItem("accessToken")
    return (
        <div>
            <NavBar></NavBar>
            <Routes>
                <Route path="/" element={loggedIn ? <Navigate to="/dashboard" /> : <HomeComponent />}></Route>
                
                <Route path="/signup" element={<SignUp />}></Route>
                <Route path="/dashboard" element={<Dashboard />}></Route>
            </Routes>

        </div>
    );
}
)

export default Base;