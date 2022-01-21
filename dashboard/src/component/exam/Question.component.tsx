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
            <Card key={data.id + 1} className={classes.root}>
                <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>

                    </Typography>
                    <Typography variant="h6" component="h2">
                        Question: {question_no}
                    </Typography>
                    <Typography variant="h6" component="h2">
                        <b>{data.question}</b>
                    </Typography>


                </CardContent>
                <CardActions>
                    <Button onClick={() => { openEditor(data.id, data.question, "") }}>Write you code here</Button>
                </CardActions>
            </Card>
        </>
    )
});
export default QuestionCard;