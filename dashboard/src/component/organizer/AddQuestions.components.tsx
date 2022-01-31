import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { Button, Card, CardActions, CardContent, createStyles, FormControl, Grid, InputLabel, makeStyles, MenuItem, Select, TextareaAutosize, Theme } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CREATE_QUAS_ANS } from "../../apis/mutations";
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


const AddQuestions = () => {
    const user_id = localStorage.getItem("user_id")
    const classes = useStyles();
    const [subId, setSubId] = useState('');
    const [question, setQuestion] = useState('');
    const [ios, setIOs] = useState('');
    const [questionArray, setQuestionArray] = useState<any>([]);

    const navigate = useNavigate();
    const [subjects, setSubjects] = useState<any>([]);
    const { loading, error, data, refetch } = useQuery(GET_SUBJECTS);
    const getQuestions = useQuery(GET_QUESTIONS,
        {
            variables: {
                "input": {
                    "subjectid": subId
                }
            }
        })

    const [createQuesAns, QAObj] = useMutation(CREATE_QUAS_ANS)

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
            console.log("GTQDATA:::", getQuestions.data)
            setQuestionArray(getQuestions.data.getQuestionsBySubject)
        }

        if (getQuestions.error) {
            console.log("GQTError:", getQuestions.error)
        }
    }, [data, error, getQuestions.data, getQuestions.error])

    useEffect(() => {
        if (QAObj.data) {
            console.log("subs:", QAObj.data)
        }
        if (QAObj.error) {
            if (QAObj.error.networkError?.message.split("<")[0].trim() == "Unexpected token") {
                localStorage.removeItem("accessToken");
                navigate("/")
            }
            console.log("QA error:", QAObj.error)
        }
    }, [QAObj.data, QAObj.error])

    const handleChangeSub = (event: any) => {
        setSubId(event.target.value as string);
    };

    const handleChangeQuestion = (event: any) => {
        setQuestion(event.target.value as string);
    };

    const handleChangeIOs = (event: any) => {
        setIOs(event.target.value as string);
    };

    const addQuestion = () => {

        const inputs: any = []
        const outputs: any = []
        //extract i/o
        if (ios) {
            let ioData = ios.split("|");
            ioData.forEach((_d: any) => {
                let _splitIos = _d.split(",")
                if (_splitIos.length === 2) {
                    inputs.push(_splitIos[0]);
                    outputs.push(_splitIos[1]);
                }

            })
            console.log(ioData)

        }

        createQuesAns({
            variables: {
                "input": {
                    "subjectid": subId,
                    "organizerid": user_id,
                    "inputs": inputs,
                    "outputs": outputs,
                    "question": question
                }
            }
        });

        getQuestions.refetch();
    }




    return (
        <div>
            <Grid container direction="row" spacing={5}>

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
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
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
                                        <h4>Question</h4>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={1} className={classes.txtAlignM}><h4>:</h4></Grid>
                                <Grid item xs={7}>
                                    <FormControl style={{ width: "90%" }}>
                                        <TextareaAutosize minRows={8} placeholder="Enter question" onChange={handleChangeQuestion} style={{ marginTop: "20px", maxWidth: "100%", minWidth: "50%", maxHeight: "150px" }} required />
                                    </FormControl>
                                </Grid>

                            </Grid>

                            <Grid container direction="row">
                                <Grid item xs={4} className={classes.txtAlignR}>
                                    <FormControl className={classes.formControl}>
                                        <h4>Test Cases</h4>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={1} className={classes.txtAlignM}><h4>:</h4></Grid>
                                <Grid item xs={7}>
                                    <FormControl style={{ width: "90%" }}>
                                        <TextareaAutosize minRows={8} placeholder="Format: <input1>,<output1>|<input2>,<output2>|.." onChange={handleChangeIOs} style={{ marginTop: "20px", maxWidth: "100%", minWidth: "50%", maxHeight: "150px" }} required />
                                    </FormControl>
                                </Grid>

                            </Grid>

                        </CardContent>
                        <CardActions >
                            <Grid container justifyContent="center" >
                                <Grid item>
                                    <Button variant="contained" color="primary" onClick={addQuestion}>Add Question</Button>
                                </Grid>

                            </Grid>

                        </CardActions>
                        <br></br>
                        <br></br>
                    </Card>
                </Grid>
                <Grid item xs={6}>
                    <Grid container justifyContent="center">
                            <h2 style={{ color: "white" }}>Questions</h2>
                    </Grid>

                    <Grid container direction="column" spacing={2}>
                        
                        {
                           questionArray.map((qd: any) =>
                                <Grid key={qd.id+2} item style={{ textAlign: "left" }}>
                                    <ul>
                                    <li style={{ color: "white" }}>{qd.question}</li>
                                    </ul>
                                    
                                </Grid>
                            )
                        }


                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}

export default AddQuestions;