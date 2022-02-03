import { useMutation, useQuery } from "@apollo/client";
import { Button, Card, CardActions, CardContent, Checkbox, createStyles, FormControl, FormControlLabel, Grid, makeStyles, MenuItem, Select, TextField, Theme } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CREATE_EXAM } from "../../apis/mutations";
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
    const user_id = localStorage.getItem("user_id")
    const classes = useStyles();
    const navigate = useNavigate();
    const [subId, setSubId] = useState('');
    const [subjects, setSubjects] = useState<any>([]);
    const [questionArray, setQuestionArray] = useState<any>([]);
    const [selectedQues, setSelectedQues] = useState<any>([]);
    const [examParams, setExamParams] = useState<any>({});
    const [errorMsg, setErrorMsg] = useState("")
    const { loading, error, data, refetch } = useQuery(GET_SUBJECTS);
    const getQuestions = useQuery(GET_QUESTIONS,
        {
            variables: {
                "input": {
                    "subjectid": subId
                }
            }
        })

    const [createExam, examObj] = useMutation(CREATE_EXAM)

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

        if (examObj.data) {
            console.log("EXDATA:::", examObj.data)

        }

        if (examObj.error) {
            console.log("EXError:", examObj.error)
        }
    }, [data, error, getQuestions.data, getQuestions.error, examObj.data, examObj.error])

    const handleChangeSub = (event: any) => {
        setSubId(event.target.value as string);
    };

    const handleChange = (event: any) => {
        if (event.target.checked) {
            setSelectedQues((ques: any) => [...ques, event.target.name])
        }
        else {
            let queArry = selectedQues;
            queArry = queArry.filter((item: any) => item !== event.target.name)
            setSelectedQues(queArry)
        }

    };

    const examCreate = () => {

        if ((examParams.totalQuestions === selectedQues.length) && (examParams.needToBeCorrect <= selectedQues.length)) {
            console.log("inside????????????????")
            createExam({
                variables: {
                    "input": {
                        "subjectid": subId,
                        "duration_in_minutes": examParams.duration,
                        "organizerid": user_id,
                        "need_to_be_correct": examParams.needToBeCorrect,
                        "ques_ans_ids": selectedQues,
                        "total_question": examParams.totalQuestions,
                        "valid_till_hrs": examParams.validTill

                    }
                }
            })
            setErrorMsg("")
        }
        else {
            console.log("else",(examParams.totalQuestions === selectedQues.length),typeof examParams.totalQuestions,typeof selectedQues.length)
            setErrorMsg("Please check 'total question' and 'selected questions' count and 'need to be correct' <= 'total question' ")
        }

    }

  

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
                                        label="total_questions"
                                        type="number"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        onChange={(e) => {

                                            setExamParams((data: any) => ({ ...data, totalQuestions: parseInt(e.target.value) }))
                                        }
                                        }
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
                                        label="need_to_be_correct"
                                        type="number"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        onChange={(e) => {

                                            setExamParams((data: any) => ({ ...data, needToBeCorrect: parseInt(e.target.value) }))
                                        }
                                        }
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
                                        label="duration"
                                        type="number"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        onChange={(e) => {

                                            setExamParams((data: any) => ({ ...data, duration: parseInt(e.target.value) }))
                                        }
                                        }
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
                                        label="valid_till"
                                        type="number"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        onChange={(e) => {

                                            setExamParams((data: any) => ({ ...data, validTill: parseInt(e.target.value) }))
                                        }
                                        }
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
                                    <TextField
                                        id="standard-search"
                                        label="Total selected questions"
                                        type="search"
                                        value={selectedQues.length}
                                        disabled />
                                </Grid>
                            </Grid>

                        </CardContent>
                        <CardActions >
                            <Grid container direction="column" spacing={3}>
                                <Grid item style={{textAlign:"center"}}>
                                    <Button variant="contained" color="primary" onClick={examCreate}>Create Exam</Button>
                                </Grid>
                                
                                <Grid item style={{textAlign:"center"}}>
                                {errorMsg ? <span style={{ color: "red" }}>{errorMsg}</span> : <></>}
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