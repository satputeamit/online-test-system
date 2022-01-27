import { observer } from "mobx-react-lite";
import { Navigate, useNavigate } from "react-router-dom";
import store from "../../store";
import { GET_CANDIDATE_EXAM_STATUS, GET_EXAM_QUESTIONS } from "../../apis/queries";
import { useMutation, useQuery } from "@apollo/client";
import QuestionCard from "./Question.component";
import { Button, Grid } from "@material-ui/core";
import { useEffect, useState } from "react";
import { UPDATE_EXAM_STATUS } from "../../apis/mutations";


const Exam = observer(() => {
    const navigate = useNavigate()
    const [questionsArray, setQuestions] = useState<any>([]) 
    const [isFinalSubmit, setFinalSubmit] =useState<boolean>(false)   
    const user_id = localStorage.getItem("user_id")
    const { loading, error, data } = useQuery(GET_EXAM_QUESTIONS, {
        variables: { examId: store.examId },
    });

    const [updateExamStatus, updExamStatus] = useMutation(UPDATE_EXAM_STATUS);

    const cesObj = useQuery(GET_CANDIDATE_EXAM_STATUS, {
        variables: { exam_id: store.examId , candidate_id:user_id },
    });

    console.log("exam ques:", data)
    if (!store.examId) return <Navigate to="/dashboard" />;

    const getResult =()=>{
        updateExamStatus({variables:{
            exam_id:store.examId,
            candidate_id:user_id,
            exam_status: "SUBMITTED"
        }})

        navigate("/exam-result")
    }

    useEffect(()=>{
        cesObj.refetch()
    },[])

    useEffect(()=>{
        if(cesObj.data){
            console.log(cesObj.data)
            if(cesObj.data.getCandidateExamStatus){
                setQuestions(cesObj.data.getCandidateExamStatus.question_ids)
                setFinalSubmit(cesObj.data.getCandidateExamStatus.exam_status==="SUBMITTED")
            }
           
        }
    },[cesObj.data])
    console.log("fs:", isFinalSubmit)
    return (
        <>
            <div>
                <br></br>
                <Grid container spacing={2} style={{padding:"10px",paddingLeft:"10px", paddingRight:"10px"}}>
                    <Grid item xs={10} style={{overflowY:"auto", height:"90vh"}}>
                        <Grid container spacing={2} >
                            {data && data.getExamsQA.map((ques: any, idx: number) => (
                                <Grid key={ques.id} item>
                                    <QuestionCard question_no={idx + 1} data={ques} isSubmitted={questionsArray.includes(ques.id) } isFinalSubmitted={isFinalSubmit}></QuestionCard> 
                              
                                </Grid>
                                
                            ))}
                        </Grid>
                    </Grid>
                    <Grid item xs={2}>
                        <Grid container justifyContent="flex-start" alignContent="flex-start" alignItems="flex-start" spacing={2} >
                            <Grid item style={{textAlign:"left"}}>
                                <h2 style={{color:"gray"}}>Total Questions:</h2>
                                <h1 style={{color:"white"}}>{data && data.getExamsQA.length}</h1>
                            </Grid>
                            <Grid item style={{textAlign:"left"}}>
                                <h2 style={{color:"gray"}}>Attempted Questions:</h2>
                                <h1 style={{color:"white"}}>{questionsArray.length}</h1>
                            </Grid>
                            
                            <Grid item style={{textAlign:"left"}}>
                                <span style={{ color: "gray" }}>After completing all questions, Please click on Get Result Button for result.</span>

                            </Grid>
                            <Grid item>
                                <Button variant="contained" size="large" color="primary" onClick={getResult}>Get Result</Button>
                            </Grid>

                        </Grid>
                    </Grid>
                </Grid>


            </div>

        </>
    )
}
);
export default Exam;