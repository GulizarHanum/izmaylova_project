import React from "react";
import useStyles from "../../styles/layout-styles";
import logo from "../../../assets/images/logo.png"
import {AppBar, Toolbar} from "@material-ui/core";
import {HeaderButtons} from "./HeaderButtons";
import {SearchButton} from "./SearchButton";

/**
 * Компонента-заголовок приложения
 */
const Header = () => {
    const classes = useStyles();

    return (
        <AppBar
            position="fixed"
            elevation={0}
            className={classes.header}
            color="primary">
            <Toolbar>
                <div className={classes.logo}>
                    <a href="/">
                        <img src={logo} width="70px"/>
                    </a>
                </div>
                <div className={classes.headerButtons}>
                    <HeaderButtons/>
                </div>
            </Toolbar>
        </AppBar>
    )
}

export default Header;