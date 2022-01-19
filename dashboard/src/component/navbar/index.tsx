import React, { useEffect } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";
import store from "../../store";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        appBar: {
            backgroundColor: "black",
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

const NavBar = observer(() => {
    const classes = useStyles();
    const navigate = useNavigate();
    const loggedIn = window.localStorage.getItem("accessToken");
    var username: any = "";
    const logOut = () => {
        localStorage.clear();
        caches.keys().then((names) => {
            names.forEach((name) => {
                caches.delete(name);
            });
        });
        store.setLoggedIn(false);
        store.setUsername("");
        navigate("/");
    };
    // console.log("wnd",window.localStorage.getItem("username"))
    // console.log("str ",store.username)

    username = store.username
        ? store.username
        : window.localStorage.getItem("username");

    return (
        <div>
            <AppBar className={classes.appBar} position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title} align="left">
                        <Link to="/" className="menu-items">
                            Online Test System
                        </Link>
                    </Typography>
                    <IconButton edge="end" color="inherit"></IconButton>
                    {loggedIn || store.loggedIn ? (
                        <div>
                            <span style={{ color: "skyblue" }}>Welcome {username}</span>
                            <Link to="/dashboard" className="menu-items">
                                <Button color="inherit">Dashboard</Button>
                            </Link>

                            <Button color="inherit" onClick={() => logOut()}>
                                Logout
                            </Button>
                        </div>
                    ) : (
                        <Link to="/signup" className="menu-items">
                            <Button color="inherit">Sign Up</Button>
                        </Link>
                    )}
                </Toolbar>
            </AppBar>
        </div>
    );
});

export default NavBar;
