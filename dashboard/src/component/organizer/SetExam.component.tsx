import { useQuery } from "@apollo/client";
import { Button, Card, CardActions, CardContent, Checkbox, createStyles, FormControl, FormControlLabel, Grid, makeStyles, MenuItem, Select, TextField, Theme } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GET_QUESTIONS, GET_SUBJECTS } from "../../apis/queries";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formControl: {

            minWidth: 200,
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
        txtAlignR: {
            textAlign: "right",

        },
        txtAlignM: {
            textAlign: "center",

        },
    }),
);

const SetExam = () => {
    const classes = useStyles();
    const navigate = useNavigate();
    const [subId, setSubId] = useState('');
    const [subjects, setSubjects] = useState<any>([]);
    const [questionArray, setQuestionArray] = useState<any>([]);
    const [selectedQues,setSelectedQues] = useState<any>([]);
    const { loading, error, data, refetch } = useQuery(GET_SUBJECTS);
    const getQuestions = useQuery(GET_QUESTIONS,
        {
            variables: {
                "input": {
                    "subjectid": subId
                }
            }
        })

    useEffect(() => {
        refetch();
        getQuestions.refetch();
    }, [])

    useEffect(() => {
        if (data) {
            console.log("subs:", data)
            setSubjects(data.getSubjects)
        }
        if (error) {
            if (error.networkError?.message.split("<")[0].trim() == "Unexpected token") {
                localStorage.removeItem("accessToken");
                navigate("/")
            }
        }

        if (getQuestions.data) {
            console.log("GQDATA:::", getQuestions.data)
            setQuestionArray(getQuestions.data.getQuestionsBySubject)       
           
        }

        if (getQuestions.error) {
            console.log("GQError:", getQuestions.error)
        }
    }, [data, error, getQuestions.data, getQuestions.error])

    const handleChangeSub = (event: any) => {
        setSubId(event.target.value as string);
    };

    const handleChange = (event:any) => {        
        if(event.target.checked){
            setSelectedQues((ques:any)=>[...ques,event.target.name])
        }
        else{
            let queArry = selectedQues;         
            queArry = queArry.filter((item:any) => item !== event.target.name)
            setSelectedQues(queArry)
        }
        
      };
   
    return (
        <div>
            <Grid container direction="row" spacing={4}>
                <Grid item xs={6} style={{ textAlign: "left" }}>
                    <Card >
                        <CardContent>

                            <Grid container justifyContent="center" >
                                <Grid item>
                                    <h1>Add Questions</h1>
                                </Grid>

                            </Grid>

                            <Grid container direction="row">
                                <Grid item xs={4} className={classes.txtAlignR}>
                                    <FormControl className={classes.formControl}>
                                        <h4>Subject</h4>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={1} className={classes.txtAlignM}><h4>:</h4></Grid>
                                <Grid item xs={7}>
                                    <FormControl className={classes.formControl}>
                                        <Select
                                            labelId="exSetlbl"
                                            id="exSet"
                                            value={subId}
                                            onChange={handleChangeSub}
                                            style={{ marginTop: "10px" }}
                                            required
                                        >
                                            {subjects && subjects.map((sub: any) =>
                                                <MenuItem key={sub.id + 1} value={sub.id}>{sub.name}</MenuItem>
                                            )}


                                        </Select>
                                    </FormControl>
                                </Grid>

                            </Grid>


                            <Grid container direction="row">
                                <Grid item xs={4} className={classes.txtAlignR}>
                                    <FormControl className={classes.formControl}>
                                        <h4>Total Questions</h4>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={1} className={classes.txtAlignM}><h4>:</h4></Grid>
                                <Grid item xs={7}>
                                    <TextField
                                        id="standard-number"
                                        label="Number"
                                        type="number"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </Grid>

                            </Grid>

                            <Grid container direction="row">
                                <Grid item xs={4} className={classes.txtAlignR}>
                                    <FormControl className={classes.formControl}>
                                        <h4>Need to be correct</h4>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={1} className={classes.txtAlignM}><h4>:</h4></Grid>
                                <Grid item xs={7}>
                                    <TextField
                                        id="standard-number"
                                        label="Number"
                                        type="number"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </Grid>

                            </Grid>

                            <Grid container direction="row">
                                <Grid item xs={4} className={classes.txtAlignR}>
                                    <FormControl className={classes.formControl}>
                                        <h4>Duration(minutes)</h4>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={1} className={classes.txtAlignM}><h4>:</h4></Grid>
                                <Grid item xs={7}>
                                    <TextField
                                        id="standard-number"
                                        label="Number"
                                        type="number"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </Grid>

                            </Grid>

                            <Grid container direction="row">
                                <Grid item xs={4} className={classes.txtAlignR}>
                                    <FormControl className={classes.formControl}>
                                        <h4>Valid till(Hrs)</h4>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={1} className={classes.txtAlignM}><h4>:</h4></Grid>
                                <Grid item xs={7}>
                                    <TextField
                                        id="standard-number"
                                        label="Number"
                                        type="number"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </Grid>

                            </Grid>

                            <Grid container direction="row">
                                <Grid item xs={4} className={classes.txtAlignR}>
                                    <FormControl className={classes.formControl}>
                                        <h4>Total Selected questions</h4>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={1} className={classes.txtAlignM}><h4>:</h4></Grid>
                                <Grid item xs={7}>
                                    <TextField id="standard-search" label="Search field" type="search" value={3} disabled />
                                </Grid>

                            </Grid>

                        </CardContent>
                        <CardActions >
                            <Grid container justifyContent="center" >
                                <Grid item>
                                    <Button variant="contained" color="primary" >Create Exam</Button>
                                </Grid>

                            </Grid>

                        </CardActions>
                        <br></br>
                        <br></br>
                    </Card>
                </Grid>

                <Grid item xs={6}>
                    <Card >
                        <CardContent>

                            <Grid container justifyContent="center" >
                                <Grid item>
                                    <h1>Select Questions</h1>
                                </Grid>

                            </Grid>
                            <Grid container direction="column" >

                                {
                                    questionArray.map((qd: any) =>
                                        <Grid key={qd.id + 2} item style={{ textAlign: "left" }}>
                                            {/* <ul>
                                                <li >{qd.question}</li>
                                            </ul> */}
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        
                                                        onChange={handleChange}
                                                        name={qd.id}
                                                        color="primary"
                                                    />
                                                }
                                                label={qd.question}
                                            />

                                        </Grid>
                                    )
                                }


                            </Grid>

                        </CardContent>
                        <CardActions >
                            <Grid container justifyContent="center" >
                                <Grid item>
                                    <Button variant="contained" color="primary" >Reset Selection</Button>
                                </Grid>

                            </Grid>

                        </CardActions>
                        <br></br>
                        <br></br>
                    </Card>
                </Grid>
            </Grid>
        </div>
    )
}

export default SetExam;