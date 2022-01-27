import { GET_CANDIDATES_EXAM, GET_EXAMS, GET_USERS_DEF } from "../../apis/queries";
import { useMutation, useQuery } from "@apollo/client";
import { Button, Card, CardActions, CardContent, Grid, makeStyles, Typography } from "@material-ui/core";
import ExamCard from "./ExamCard.component";
import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";


const ExamList = observer((props:any) => {
    const user_id = props.user_id
    console.log("user::::", user_id)
    const { loading, error, data } = useQuery(GET_EXAMS);
    const [submittedExams, setSubmittedExams] = useState<any>([])
    const candidateExams = useQuery(GET_CANDIDATES_EXAM,{
        variables:{candidate_id:user_id }
    })

    useEffect(()=>{
        candidateExams.refetch();
    },[])

    useEffect(()=>{
        let submittedExamsArray:any =[]
        if(candidateExams.data){
            const exdata = candidateExams.data.getExamsByCandidate;
            console.log(exdata)
            for(let i=0;i<exdata.length;i++){
                console.log("-->",exdata[i])
                if(exdata[i].exam_status==="SUBMITTED"){
                    submittedExamsArray.push(exdata[i].exam_id)
                }
            }
            console.log("submittedExamsArray",submittedExamsArray)
            setSubmittedExams(submittedExamsArray)
        }
    },[candidateExams.data])
    // if (loading) return "Loading...";
    // if (error) return <div>{JSON.stringify(error)}</div>;

    console.log("error", error, submittedExams)
    return (
        <div>
            <br></br>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Grid container justifyContent="center" spacing={2} >
                        {data && data.getExams.map((exam: any) => (
                            <Grid key={exam.id} item>
                               <ExamCard data={exam} isSubmitted={submittedExams.includes(exam.id)}></ExamCard>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>


        </div>
    );
}
)
export default ExamList;
