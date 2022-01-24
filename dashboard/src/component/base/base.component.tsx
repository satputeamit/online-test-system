import NavBar from "../navbar";
import HomeComponent from "../home/Home.component";
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from "react-router-dom";
import SignUp from "../signup/Signup.component";
import Dashboard from "../dashboard/dashboard.component";
import { observer } from "mobx-react-lite";
import Exam from "../exam/Exam.component";
import CodeEditor from "../exam/CodeEditor.component";


const Base = () => {
    const loggedIn = window.localStorage.getItem("accessToken") 
    return (
        <div>
            <NavBar></NavBar>
            <Routes>
                <Route path="/" element={window.localStorage.getItem("accessToken") ? <Navigate to="/dashboard" /> : <HomeComponent />}></Route>
                
                <Route path="/signup" element={<SignUp />}></Route>
                <Route path="/dashboard" element={<Dashboard />}></Route>
                <Route path="/exam" element={<Exam />}></Route>
                <Route path="/code-editor" element={<CodeEditor />}></Route>
               
               
            </Routes>

        </div>
    );
}


export default Base;