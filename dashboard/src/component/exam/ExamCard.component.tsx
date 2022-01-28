import { Button, Card, CardActions, CardContent, Grid, makeStyles, Typography } from "@material-ui/core";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import store from "../../store";
import Icon from "@material-ui/icons/CheckCircle";
import { fontSize } from "@mui/system";

const useStyles = makeStyles({
    root: {
        minWidth: 275,
        maxWidth: 100,
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



const ExamCard =observer((props:any)=>{
    const classes = useStyles();
    const navigate = useNavigate()
    const data = props.data;
    

    const startExam =(examId:String)=>{
        store.setExamId(examId)
        navigate("/exam")
    }

    return(
        <>
        <Card key={data.id+1}className={classes.root}>
        <CardContent>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
              
            </Typography>
           
            <Typography variant="h5" component="h2" >
                {data.subject.name}
                {props.isSubmitted?<Icon style={{float:"right", color: "green", fontSize:"40px"}} ></Icon>:<></>}
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
                Test
            </Typography>
            <Typography variant="body2" component="p">
                Total Question:{data.total_question}
            </Typography>
            <Typography variant="body2" component="p">
                Duration:{data.duration_in_minutes} min
            </Typography>

        </CardContent>
        <CardActions>
            <Button size="small" variant="outlined" color="primary" onClick={()=>{startExam(data.id)}}>{props.isSubmitted?"Details": "Start"}</Button>
        </CardActions>
    </Card>
    </>
    )
});
export default ExamCard;