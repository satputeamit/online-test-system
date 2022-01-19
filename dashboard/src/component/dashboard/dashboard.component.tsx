import { Navigate } from "react-router-dom";
import ExamList from "../exam/ExamList.component";
import { GET_USER_PROFILE } from "../../apis/queries";
import { useMutation, useQuery } from "@apollo/client";
import store from "../../store";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";

const Dashboard = observer(() => {
    const loggedIn = window.localStorage.getItem("accessToken")
    if (!loggedIn) return <Navigate to="/" />;
    const { loading, error, data } = useQuery(GET_USER_PROFILE);
    
    console.log("error", error)
    useEffect(()=>{
        if (data) {
            console.log("data dash :", data)
            var userInfo = data.getUserInfo;
            window.localStorage.setItem("username", userInfo.first_name)
            store.setUsername(userInfo.first_name)
            
    
        }
    },[data])

      
    return (
        <div>
            <ExamList></ExamList>
        </div>)
}
);

export default Dashboard;