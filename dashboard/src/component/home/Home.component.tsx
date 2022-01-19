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

import  { useEffect, useState } from "react";

import { purple } from "@material-ui/core/colors";
import { GET_USERS_DEF } from "../../apis/queries";
import { useMutation, useQuery } from "@apollo/client";
import { LOGIN } from "../../apis/mutations";
import store from "../../store";
import { observer, Observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";




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
            color: "#E8E8E8"
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



const HomeComponent = observer(() => {
    const classes = useStyles();
    const navigate = useNavigate();
    const [creds, setCreds] = useState<any>({});
    const [err, setErr] = useState<boolean>(false);
    const [login, { data, loading, error }] = useMutation(LOGIN);
    
    useEffect(() => {
        if (error) {
            window.localStorage.removeItem("accessToken")
            window.localStorage.removeItem("emailId")
            setErr(true)
            store.setLoggedIn(false)
        }
        if (data) {
            // var _data = JSON.parse((data.login))
            window.localStorage.setItem("accessToken", data.login);
            console.log("login token :", data.login)
            // window.localStorage.setItem("emailId", _data.email);
            setErr(false)
            store.setLoggedIn(true)
            navigate("/dashboard")
           
           
        }
    }, [error, data])

    return (
        <div>           
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
                    
                    <Grid container direction="column">
                        <span className={classes.rightContent}>Login</span>
                    </Grid>
                    <br></br>
                    <br></br>
                    <Grid container direction="column">
                        <Grid item>
                            <CssTextField name="email" type="email" id="custom-email" label="Email" onChange={(e) => {

                                setCreds((data: any) => ({ ...data, email: e.target.value }))
                            }
                            } />
                        </Grid>
                        <br></br>

                        <Grid item>
                            <CssTextField name="password" type="password" id="custom-password" label="Password" onChange={(e) => {
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
                                    .then((d:any)=>window.localStorage.setItem("accessToken", d.login))
                                    
                                }}
                            >
                                Login
                            </Button>
                        </Grid>
                        <br />
                        <Grid item>                            
                        <span style={{ color: "red",marginLeft: "-65px"  }}>{err ? "Invalid Credentials" : ""}</span>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}
);

export default HomeComponent;