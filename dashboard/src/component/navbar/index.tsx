import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        appBar: {
            backgroundColor: "black"
        },
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
        },
    })
);

export default function NavBar() {
    const classes = useStyles();
    const loggedIn = window.localStorage.getItem("accessToken")
    return (
        <div>
            <AppBar className={classes.appBar} position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title} align="left">
                        <Link to="/" className="menu-items">Online Test System</Link>
                    </Typography>
                    <IconButton edge="end" color="inherit">

                    </IconButton>
                    {loggedIn ?
                        <div>
                            <span style={{color:"skyblue"}}>
                               Welcome {window.localStorage.getItem("emailId")}
                            </span>
                            <Link to="/dashboard" className="menu-items"><Button color="inherit">Dashboard</Button></Link>

                            <Link to="/logout" className="menu-items"><Button color="inherit">Logout</Button></Link>
                        </div>

                        :
                        <Link to="/signup" className="menu-items"><Button color="inherit">Sign Up</Button></Link>

                    }
                </Toolbar>
            </AppBar>
        </div>
    );
}
