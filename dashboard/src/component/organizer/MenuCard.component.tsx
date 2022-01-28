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



const MenuCard =observer((props:any)=>{
    const classes = useStyles();
    const navigate = useNavigate()
    

    const handleNavigate =(path:string)=>{
        // store.setExamId(examId)
        navigate(path)
    }

    return(
        <>
        <Card className={classes.root}>
        <CardContent>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
              
            </Typography>
           
            <Typography variant="h5" component="h2" >
                {props.title}                
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
                {props.description}
            </Typography>           

        </CardContent>
        <CardActions>
            <Button size="small" variant="outlined" color="primary" onClick={()=>{handleNavigate(props.navigateTo)}}>go</Button>
        </CardActions>
    </Card>
    </>
    )
});
export default MenuCard;