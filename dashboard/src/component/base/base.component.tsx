import NavBar from "../navbar";
import HomeComponent from "../home/Home.component";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import SignUp from "../signup/Signup.component";


const Base = () => {

    return (
        <div>
            <NavBar></NavBar>
            <Routes>           
                <Route path="/" element={<HomeComponent/>}></Route>
                <Route path="/signup" element={<SignUp/>}></Route>
            </Routes>

        </div>
    );
}


export default Base;