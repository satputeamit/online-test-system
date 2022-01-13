import { Button, createStyles, Grid, makeStyles, Paper, TextField, Theme, withStyles } from "@material-ui/core";
import { fontSize } from "@mui/system";
import React from "react";
import NavBar from "../navbar";
import { purple } from '@material-ui/core/colors';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        lefContent: {
            fontSize: "3em",
            fontFamily: "monospace",
            color: "skyblue",
            fontWeight: "bold",
        },
        rightContent:{
            fontSize: "3em",
            fontFamily: "monospace",
            color: "skyblue",
            marginTop:"-20px",
            marginLeft:"-90px"
        }

    })
);

const CssTextField = withStyles({
    root: {
        "& input": {
            color: "white"
        },
        "& label": {
            color: "White"
        },
        "& label.Mui-focused": {
            color: "#E8E8E8"
        },
        "& .MuiInput-underline:after": {
            borderBottomColor: "skyblue"
        },
        "& .MuiInput-underline:before": {
            borderBottomColor: "white"
        },
        "& .MuiOutlinedInput-root": {
            "& fieldset": {
                borderColor: "red"
            },
            "&:hover fieldset": {
                borderColor: "yellow"
            },
            "&.Mui-focused fieldset": {
                borderColor: "green"
            }
        }
    }
})(TextField);



export default function Base() {
    const classes = useStyles();
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
                    <span
                        className={classes.lefContent}
                    >
                        Online coding challenges
                    </span>
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
                        
                        <Grid item >
                            <CssTextField
                                id="custom-css-standard-input"
                                label="Email"
                            />

                        </Grid>
                        <br></br>
                        
                        <Grid item >
                            <CssTextField
                                id="custom-css-standard-input"
                                label="Password"
                            />

                        </Grid>

                        <br></br>
                        <br></br>
                        <Grid item >
                            <Button variant="contained" color="primary" style={{ marginLeft:"-125px"}}>
                                Login
                            </Button>
                          


                        </Grid>

                    </Grid>




                </Grid>
            </Grid>
        </div>
    );
}
