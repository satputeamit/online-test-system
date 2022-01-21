import { Navigate, useNavigate } from "react-router-dom";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-xcode";
import "ace-builds/src-noconflict/theme-dracula";
import { Button, createStyles, Grid, makeStyles, Theme } from "@material-ui/core";

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


const CodeEditor = () => {
    const classes = useStyles();
    const navigate = useNavigate()
    const question = localStorage.getItem("selectedQuestion")
    const description = localStorage.getItem("currentDescruption")
    const questionId = localStorage.getItem("questionId")

    const onChange=(newValue: any) =>{
        console.log("change", newValue);
    }

    const goBack=()=>{
        navigate("/exam")
    }

    return (
        <div>
            <Grid container direction="row" justifyContent="flex-start" alignItems="flex-start">
                <Grid item xs={5} style={{ textAlign: "left" }}>
        
                    <span style={{ color: "white", fontWeight: "bold" }}>Question:</span>
                    <Button variant="contained" size="small" color="primary" className={classes.margin} onClick={goBack} style={{float: "right"}}>Go back </Button>

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
                            enableSnippets: true,
                            showLineNumbers: true,
                            // tabSize: 2,
                        }}
                        fontSize={18}
                        width="100%"

                        showPrintMargin={true}
                        showGutter={true}
                    />
                    <div style={{ backgroundColor: "black", color: "gray", textAlign: "left", padding: "5px", height:"41.3vh"}}>
                        <div style={{display:"inline"}}>
                        <span style={{fontWeight:"bold"}} >&gt;&gt; &nbsp;Output</span>
                        </div>
                        <div style={{display:"inline",float:"right"}}>
                            <Button variant="contained" size="small" color="primary" className={classes.margin}>Run </Button>
                            <Button variant="contained" size="small" color="primary" className={classes.margin} >Submit </Button>
                        </div>
                        <br />
                        <textarea disabled rows={2} style={{
                            padding: "5px",
                            marginTop: "5px",
                            color: "white",
                            width: "100%",
                            height:"85%",
                            backgroundColor: "rgb(48,10,36)",
                            borderColor: "black",

                        }}
                            value="test">

                        </textarea>
                    </div>

                </Grid>

            </Grid>

        </div>)
}


export default CodeEditor;