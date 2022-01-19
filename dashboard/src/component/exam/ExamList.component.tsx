import { GET_EXAMS, GET_USERS_DEF } from "../../apis/queries";
import { useMutation, useQuery } from "@apollo/client";
import { Button, Card, CardActions, CardContent, Grid, makeStyles, Typography } from "@material-ui/core";
import ExamCard from "./ExamCard.component";


const ExamList = () => {
   
    const { loading, error, data } = useQuery(GET_EXAMS);
    // if (loading) return "Loading...";
    // if (error) return <div>{JSON.stringify(error)}</div>;

    console.log("error", error)
    return (
        <div>
            <br></br>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Grid container justifyContent="center" spacing={2} >
                        {data && data.getExams.map((exam: any) => (
                            <Grid key={exam.id} item>
                               <ExamCard data={exam}></ExamCard>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>


        </div>
    );
};

export default ExamList;
