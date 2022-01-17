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

import { useEffect, useState } from "react";

import { purple } from "@material-ui/core/colors";
import { GET_USERS_DEF } from "../../apis/queries";
import { useMutation, useQuery } from "@apollo/client";
import { SIGNUP } from "../../apis/mutations";
import store from "../../store";
import { observer, Observer } from "mobx-react-lite";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Link } from "react-router-dom";

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
            marginLeft: "-50px",
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



const SignUp = () => {
    const classes = useStyles();
    const [signupData, setSignupData] = useState<any>({ role: "CANDIDATE" });
    const [flag, setFlag] = useState<boolean>(false);
    const [err, setErr] = useState<boolean>(false);
    const [createUser, { data, loading, error }] = useMutation(SIGNUP);
    useEffect(()=>{
        setFlag(false)
    },[])

    useEffect(() => {
        if (error) {
            console.log(error)
            setErr(true)
            setFlag(false)
        }
        if (data) {
            console.log(data)
            setErr(false)
            setFlag(true)
        }
    }, [error, data])

    const registerUser = () => {
        if (signupData.password === signupData.c_password) {
            var data = {
                email: signupData.email,
                password: signupData.password,
                role: signupData.role
            }
            console.log(data)
            createUser({ variables: data })
            setErr(false)

        }
        else {
            setErr(true)
        }


    }

    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        var val = (event.target as HTMLInputElement).value;
        console.log(val)
        if (parseInt(val) === 2) {
            setSignupData((data: any) => ({ ...data, role: "ORGANIZER" }))
        }
        else {
            setSignupData((data: any) => ({ ...data, role: "CANDIDATE" }))
        }

    };

    return (
        <div>
            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                style={{ height: "90vh" }}
            >


                {!flag ? <Grid item xs={12} style={{}}>

                    <Grid container direction="column">
                        <span className={classes.rightContent}>Sign Up</span>
                    </Grid>
                    <br></br>
                    <br></br>
                    <Grid container direction="column">
                        <Grid item>
                            <CssTextField name="email" id="custom-enter_email" label="Enter email" onChange={(e) => {

                                setSignupData((data: any) => ({ ...data, email: e.target.value }))
                            }
                            } />
                        </Grid>
                        <br></br>

                        <Grid item>
                            <RadioGroup row aria-label="role" name="role" defaultValue="1" onChange={handleRadioChange} style={{ justifyContent: 'center' }} >
                                <FormControlLabel value="1" control={<Radio color="primary" style={{ color: "white" }} />} label="Candidate" style={{ color: "white" }} />
                                <FormControlLabel value="2" control={<Radio color="primary" style={{ color: "white" }} />} label="Organizer" style={{ color: "white" }} />

                            </RadioGroup>
                        </Grid>

                        <br></br>
                        <Grid item>
                            <CssTextField name="password" type="password" id="custom-enter-password" label="Enter password" onChange={(e) => {
                                setSignupData((data: any) => ({ ...data, password: e.target.value }))
                            }
                            } />
                        </Grid>
                        <br></br>
                        <Grid item>
                            <CssTextField name="c_password" type="password" id="custom-enter-apassword" label="Confirm password" onChange={(e) => {
                                setSignupData((data: any) => ({ ...data, c_password: e.target.value }))
                            }
                            } />
                        </Grid>

                        <br></br>
                        <br></br>
                        <Grid item>
                            <Button
                                variant="contained"
                                color="primary"
                                style={{ marginLeft: "-120px" }}
                                onClick={() => {
                                    registerUser()
                                }}
                            >
                                Sign Up
                            </Button>
                        </Grid>
                        <br />
                        <Grid item>
                            <span style={{ color: "red", marginLeft: "-65px" }}>{err ? "Password did not match..!" : ""}</span>
                        </Grid>
                    </Grid>
                </Grid>
                    :
                    <div>
                        <h1 style={{ color: "green" }}>Your are register successfully..! </h1>
                        <span style={{ color: "white" }}>Please click here for <Link to="/" style={{ color: "skyblue" }}>login</Link>.</span>
                    </div>
                }
            </Grid>
        </div>
    );
}


export default SignUp;