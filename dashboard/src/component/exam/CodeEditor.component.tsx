import { Navigate, useNavigate } from "react-router-dom";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-xcode";
import "ace-builds/src-noconflict/theme-dracula";
import { Button, createStyles, Grid, makeStyles, Theme } from "@material-ui/core";
import { useEffect, useState } from "react";
import { CODE_EXEC, CODE_SUBMIT } from "../../apis/mutations";
import { useMutation } from "@apollo/client";
import store from "../../store";
import { observer } from "mobx-react-lite";
import ShowPopup from "../modal/ShowPopup.component";
import Icon from '@material-ui/core/Icon';
import SaveIcon from '@material-ui/icons/Save';
import PlayIcon from "@material-ui/icons/PlayArrow";
import BackIcon from "@material-ui/icons/ArrowBack";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        margin: {
            margin: theme.spacing(1),

        },
        extendedIcon: {
            marginRight: theme.spacing(1),
        },
    }),
);

const template =`${`# Please write your code in my_function().


def my_function(data):
    # write your code here
    return data


`}`

const CodeEditor = observer(() => {


    const classes = useStyles();
    const navigate = useNavigate()
    const [code, setCode] = useState({ code: template, language: "" })
    const [stdout, setStdout] = useState(String)
    const [stderr, setStderr] = useState(String)
    const [msgModal, setMsgModal] = useState(false)
    const [submitStatus, setSubmitStatus] = useState(false)
    const [popupMsg, setPopupMsg] = useState({title:"", description:"", navigateTo:""})
    const [codeExec, { data, loading, error }] = useMutation(CODE_EXEC);
    const [codeSubmit, codeSub] = useMutation(CODE_SUBMIT);

    const examId = store.examId
    const question = localStorage.getItem("selectedQuestion")
    const description = localStorage.getItem("currentDescruption")
    const questionId = localStorage.getItem("questionId")
    const user_id = localStorage.getItem("user_id")

    useEffect(() => {
        if (data) {
            setStdout(data.codeExec.stdout)
            if (data.codeExec.stderr) {
                var er = JSON.parse(data.codeExec.stderr)
                setStderr(er.stderr)
            }
            else {
                setStderr("")
            }

        }
        if (error) {
            console.log("error111:", error.graphQLErrors)
            if(error.networkError?.message.split("<")[0].trim()==="Unexpected token"){
                localStorage.removeItem("accessToken");
                navigate("/")
            }
            else if(error.graphQLErrors[0].message.trim()==="Not Authorised!"){
                console.log("Not Authorised!")
                setPopupMsg({
                    title:"Not Authorized!",
                    description:"",
                    navigateTo:"/dashboard"
                })
                setMsgModal(true)
                
            }
            else{
                setStderr(data.codeExec.stderr)
            }
            
        }
    }, [data, error])

    useEffect(() => {
        if (codeSub.data) {
            console.log("data:", codeSub.data.codeSubmit)
            setSubmitStatus(codeSub.data.codeSubmit)

        }
        if (codeSub.error) {
            if(codeSub.error.networkError?.message.split("<")[0].trim()=="Unexpected token"){
                localStorage.removeItem("accessToken");
                navigate("/")
            }
            else if(codeSub.error.graphQLErrors[0].message.trim()==="Not Authorised!"){
                console.log("Not Authorised!")
                setPopupMsg({
                    title:"Not Authorized!",
                    description:"",
                    navigateTo:"/dashboard"
                })
                setMsgModal(true)
                
            }
            else{

            }
            console.log("error:", codeSub.error)
           
        }
    }, [codeSub.data, codeSub.error])

    const onChange = (newValue: any) => {       
        setCode((data: any) => ({ ...data, code: newValue }))
    }

    const goBack = () => {
        navigate("/exam")
    }

    const executeCode = () => {
      
        codeExec({
            variables: {
                code: code.code,
                language: "python",
                user_id: user_id,
                exam_id: examId,
                question_id: questionId
            }
        })
    }

    const submitCode = () => {
        console.log("submit :", code.code)
        codeSubmit({
            variables: {
                code: code.code,
                language: "python",
                user_id: user_id,
                exam_id: examId,
                question_id: questionId
            }
        })
    }

    return (
        <div>

            {msgModal 
            ?<ShowPopup title={popupMsg.title} description={popupMsg.description} navigateTo={popupMsg.navigateTo}/>
            :<Grid container direction="row" justifyContent="flex-start" alignItems="flex-start">
                <Grid item xs={5} style={{ textAlign: "left" }}>

                    <span style={{ color: "white", fontWeight: "bold" }}>Question:</span>
                    <Button  variant="contained" size="small" color="primary" className={classes.margin} startIcon={<BackIcon/>} onClick={goBack} style={{ float: "right" }}>Go back </Button>

                    <br></br>
                    <br></br>
                    <br></br>
                    <div>
                        <span style={{ color: "white" }}>{question}</span>
                        <br></br>
                        <p style={{ color: "white" }}>{description}</p>
                    </div>

                </Grid>

                <Grid item xs={7}>
                    <AceEditor
                        mode="python"
                        theme="dracula"
                        onChange={onChange}
                        name="UNIQUE_ID_OF_DIV"
                        editorProps={{ $blockScrolling: true }}
                        highlightActiveLine={true}
                        setOptions={{
                            enableBasicAutocompletion: true,
                            enableLiveAutocompletion: true,
                            enableSnippets: true
                            // tabSize: 2,
                        }}
                        fontSize={18}
                        width="100%"

                        showPrintMargin={true}
                        showGutter={true}
                        defaultValue={code.code}
                    >
                        
                    </AceEditor>
                    <div style={{ backgroundColor: "black", color: "gray", textAlign: "left", padding: "5px", height: "41.3vh" }}>
                        <div style={{ display: "inline" }}>
                            <span style={{ fontWeight: "bold" }} >&gt;&gt; &nbsp;Output</span>
                        </div>                        
                        <div style={{ display: "inline", float: "right" }}>
                            <Button variant="contained" size="small" color="primary" className={classes.margin} startIcon={<PlayIcon/>} onClick={executeCode}>Run </Button>
                            <Button variant="contained" size="small" color="primary" className={classes.margin} startIcon={<SaveIcon />} onClick={submitCode}>Submit </Button>
                        </div>
                        <br />
                        <textarea disabled rows={2} style={{
                            padding: "5px",
                            marginTop: "5px",
                            color: "white",
                            width: "100%",
                            height: "85%",
                            backgroundColor: "rgb(48,10,36)",
                            borderColor: "black",

                        }}
                            value={stderr ? stderr : stdout}>

                        </textarea>
                    </div>

                </Grid>

            </Grid>}
            {submitStatus?<ShowPopup title="Code submitted successfully..." description="Please click 'GO BACK' button."/>:<></>}

        </div>)
}
)

export default CodeEditor;