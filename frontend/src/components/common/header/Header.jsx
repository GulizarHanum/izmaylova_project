import React from "react";
import useStyles from "../../styles/layout-styles";
import logo from "../../../assets/images/logo.png"
import {AppBar, Toolbar} from "@material-ui/core";
import {HeaderButtons} from "./HeaderButtons";
import {useNavigate} from "react-router-dom";

/**
 * Компонента-заголовок приложения
 */
const Header = () => {
    const classes = useStyles();
    const navigate = useNavigate();

    return (
        <AppBar
            position="fixed"
            elevation={0}
            className={classes.header}
            color="primary">
            <Toolbar>
                <div className={classes.logo} onClick={() => navigate(`/`, {replace: true})}>
                    <img src={logo} width="100px" alt='Logo'/>
                    <h1>Meow-meow</h1>
                </div>
                <div className={classes.spacer}/>
                <HeaderButtons/>
            </Toolbar>
        </AppBar>
    )
}

export default Header;