import NavBar from "../navbar";
import HomeComponent from "../home/Home.component";
import { Route, Routes, Navigate } from "react-router-dom";
import SignUp from "../signup/Signup.component";
import Dashboard from "../dashboard/dashboard.component";
import Exam from "../exam/Exam.component";
import CodeEditor from "../exam/CodeEditor.component";
import Results from "../exam/Results.component";
import AddQuestions from "../organizer/AddQuestions.components";
import SetExam from "../organizer/SetExam.component";


const Base = () => {    
    return (
        <div>
            <NavBar></NavBar>
            <Routes>
                <Route path="/" element={window.localStorage.getItem("accessToken") ? <Navigate to="/dashboard" /> : <HomeComponent />}></Route>

                <Route path="/signup" element={<SignUp />}></Route>
                <Route path="/dashboard" element={<Dashboard />}></Route>
                <Route path="/exam" element={<Exam />}></Route>
                <Route path="/code-editor" element={<CodeEditor />}></Route>
                <Route path="/exam-result" element={<Results />}></Route>
                <Route path="/add-questions" element={<AddQuestions />}></Route>
                <Route path="/set-exam" element={<SetExam />}></Route>
            </Routes>

        </div>
    );
}


export default Base;