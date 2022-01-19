import { observer } from "mobx-react-lite";
import { Navigate, useNavigate } from "react-router-dom";
import store from "../../store";
import { GET_EXAM_QUESTIONS } from "../../apis/queries";
import { useMutation, useQuery } from "@apollo/client";
import QuestionCard from "./Question.component";
import { Grid } from "@material-ui/core";


const Exam = observer(() => {
    const navigate = useNavigate()
    const { loading, error, data } = useQuery(GET_EXAM_QUESTIONS, {
        variables: { examId: store.examId },
    });

    console.log("exam ques:", data)
    if (!store.examId) return <Navigate to="/dashboard" />;
    return (
        <>
            <div>
                <br></br>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Grid container justifyContent="center" spacing={2} >
                            {data && data.getExamsQA.map((ques: any, idx: number) => (
                                <Grid key={ques.id} item>
                                    <QuestionCard question_no={idx + 1} data={ques} ></QuestionCard>
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                </Grid>


            </div>

        </>
    )
}
);
export default Exam;