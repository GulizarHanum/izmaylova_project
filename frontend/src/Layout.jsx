import React from "react";

import CssBaseline from "@material-ui/core/CssBaseline";
import useStyles from "./components/styles/layout-styles";

import {Routes} from "react-router-dom";
import clsx from "clsx";
import Header from "./components/common/header/Header";
import {AllAdvertisementView} from "./components/common/pages/home/AllAdvertisementView";


const Layout = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <CssBaseline/>
            <Header/>
            <main
                className={clsx(classes.content, {
                    [classes.contentShift]: false,
                })}
            >
                <div className={classes.drawerHeader}/>
                <AllAdvertisementView/>
                <Routes>
                    //todo: написать роутеры
                </Routes>
            </main>
        </div>

    );
};

export default Layout;
