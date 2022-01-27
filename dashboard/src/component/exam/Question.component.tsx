import { Button, Card, CardActions, CardContent, Grid, makeStyles, Typography } from "@material-ui/core";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import store from "../../store";


const useStyles = makeStyles({
    root: {
        minWidth: 275,
        maxWidth: "100%",
        textAlign: "left"        
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});



const QuestionCard = observer((props: any) => {
    const classes = useStyles();
    const navigate = useNavigate()
    const data = props.data;
    const question_no = props.question_no;

    const openEditor = (examId: string, question: string, description: string) => {
        localStorage.setItem("questionId", examId)
        localStorage.setItem("selectedQuestion", question)
        localStorage.setItem("currentDescruption", description)
        navigate("/code-editor")
    }

    return (
        <>
            <Card key={data.id + 1} className={classes.root} style={{backgroundColor:props.isSubmitted?"lightgreen":""}}>
                <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>

                    </Typography>
                    <Typography variant="h6" component="h2">
                        <b> Question: {question_no}</b>
                    </Typography>
                    <Typography variant="h6" component="h2">
                        {data.question}
                    </Typography>


                </CardContent>
                <CardActions>
                    {props.isFinalSubmitted?<p style={{color:"gray"}}>Answers submitted</p>:
                    <Button variant="outlined" color="primary" onClick={() => { openEditor(data.id, data.question, "") }} ><b>Write your code here</b></Button>}
                </CardActions>
            </Card>
        </>
    )
});
export default QuestionCard;