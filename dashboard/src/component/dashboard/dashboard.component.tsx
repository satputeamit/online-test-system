import { Navigate } from "react-router-dom";
import ExamList from "../exam/ExamList.component";
import { GET_USER_PROFILE } from "../../apis/queries";
import { useMutation, useQuery } from "@apollo/client";
import store from "../../store";
import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import AddQuestions from "../organizer/AddQuestions.components";
import OrgDashboard from "../organizer/OrgDashboard.component";



const Dashboard = observer(() => {
    const loggedIn = localStorage.getItem("accessToken")
    if (!loggedIn) return <Navigate to="/" />;
    const userRole = localStorage.getItem("user-role")
    const { loading, error, data } = useQuery(GET_USER_PROFILE);
    const [userState, setUserState] = useState<any>("")
    console.log("error", error)
    useEffect(() => {
        if (data) {
            console.log("data dash :", data)
            var userInfo = data.getUserInfo;
            localStorage.setItem("username", userInfo.first_name)
            localStorage.setItem("user_id", userInfo.user_id)
            store.setUsername(userInfo.first_name)
            setUserState(userInfo.user_id)


        }
    }, [data])

    function onChange(newValue: any) {
        console.log("change", newValue);
    }

    return (
        <div>
            {userRole === "CANDIDATE"
                ? <ExamList user_id={userState}></ExamList>
                : <OrgDashboard></OrgDashboard>
            }
        </div>)
}
);

export default Dashboard;