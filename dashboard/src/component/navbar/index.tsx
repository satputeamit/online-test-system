import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        appBar:{
            backgroundColor:"black"
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

    return (
        <div>
            <AppBar className={classes.appBar} position="static">
                <Toolbar>                   
                    <Typography variant="h6" className={classes.title} align="left">
                        Online Test System
                    </Typography>
                    <IconButton edge="end" color="inherit">

                    </IconButton>
                   
                    <Button color="inherit">Sign Up</Button>
                </Toolbar>
            </AppBar>
        </div>
    );
}
