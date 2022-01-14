import {
    Button,
    createStyles,
    Grid,
    makeStyles,
    Paper,
    TextField,
    Theme,
    withStyles,
} from "@material-ui/core";
import { fontSize } from "@mui/system";
import React, { useEffect, useState } from "react";
import NavBar from "../navbar";
import { purple } from "@material-ui/core/colors";
import { GET_USERS_DEF } from "../../apis/queries";
import { useMutation, useQuery } from "@apollo/client";
import { LOGIN } from "../../apis/mutations";
import store from "../../store";
import { observer, Observer } from "mobx-react-lite";



const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        lefContent: {
            fontSize: "3em",
            fontFamily: "monospace",
            color: "skyblue",
            fontWeight: "bold",
        },
        rightContent: {
            fontSize: "3em",
            fontFamily: "monospace",
            color: "skyblue",
            marginTop: "-20px",
            marginLeft: "-90px",
        },
    })
);

const CssTextField = withStyles({
    root: {
        "& input": {
            color: "white",
        },
        "& label": {
            color: "White",
        },
        "& label.Mui-focused": {
            color: "#E8E8E8",
        },
        "& .MuiInput-underline:after": {
            borderBottomColor: "skyblue",
        },
        "& .MuiInput-underline:before": {
            borderBottomColor: "white",
        },
        "& .MuiOutlinedInput-root": {
            "& fieldset": {
                borderColor: "red",
            },
            "&:hover fieldset": {
                borderColor: "yellow",
            },
            "&.Mui-focused fieldset": {
                borderColor: "green",
            },
        },
    },
})(TextField);



const Base = () => {
    const classes = useStyles();
    const [creds, setCreds] = useState<any>({});
    const [err, setErr] = useState<boolean>(false);
    const [login, { data, loading, error }] = useMutation(LOGIN);

    useEffect(()=>{
        if (error) {           
            window.localStorage.removeItem("accessToken")
            setErr(true)
        }
        if (data) {
            window.localStorage.setItem("accessToken", data.login);
            setErr(false)
        }
    },[error, data])
    
    
    return (
        <div>
            <NavBar></NavBar>
            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                style={{ height: "90vh" }}
            >
                <Grid item xs={6} style={{ color: "white" }}>
                    <span className={classes.lefContent}>Online coding challenges</span>
                    <br />
                    <br />
                    <span style={{ fontSize: "2em" }}>
                        You can test your skills here!
                    </span>
                </Grid>

                <Grid item xs={6} style={{}}>
                    <span style={{color:"red"}}>{err? "Invalid Credentials":""}</span>
                    <Grid container direction="column">
                        <span className={classes.rightContent}>Login</span>
                    </Grid>
                    <br></br>
                    <br></br>
                    <Grid container direction="column">
                        <Grid item>
                            <CssTextField name="email" id="custom-css-standard-input" label="Email" onChange={(e) => {

                                setCreds((data: any) => ({ ...data, email: e.target.value }))
                            }
                            } />
                        </Grid>
                        <br></br>

                        <Grid item>
                            <CssTextField name="password" id="custom-css-standard-input" label="Password" onChange={(e) => {
                                setCreds((data: any) => ({ ...data, password: e.target.value }))
                            }
                            } />
                        </Grid>

                        <br></br>
                        <br></br>
                        <Grid item>
                            <Button
                                variant="contained"
                                color="primary"
                                style={{ marginLeft: "-125px" }}
                                onClick={() => {
                                    login({ variables: { email: creds.email, password: creds.password } })
                                }}
                            >
                                Login
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}


export default Base;