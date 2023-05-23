import React from "react";

import CssBaseline from "@material-ui/core/CssBaseline";
import useStyles from "./components/styles/layout-styles";

import {Route, Routes} from "react-router-dom";
import clsx from "clsx";
import Header from "./components/common/header/Header";
import {AllAdvertisementView} from "./components/common/pages/AllAdvertisementView";
import {AdvertisementPage} from "./components/common/pages/AdvertisementPage";
import {AddAdvertisementPage} from "./components/common/pages/AddAdvertisementPage";
import {SignInUpView} from "./components/common/pages/SignInUpView";
import {CreateProfilePage} from "./components/common/pages/CreateProfilePage";
import {EditAdvertisementPage} from "./components/common/pages/EditAdvertisementPage";


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
                <Routes>
                    <Route path="/auth" element={<SignInUpView/>}/>
                    <Route path="/create/profile" element={<CreateProfilePage/>}/>
                    <Route path="/" element={<AllAdvertisementView/>}/>
                    <Route path={`/advertisement/:id`} element={<AdvertisementPage/>}/>
                    <Route path={`/advertisement/edit/:id`} element={<EditAdvertisementPage/>}/>
                    <Route path="/advertisement/new" element={<AddAdvertisementPage/>}/>
                </Routes>
            </main>
            {/*<Footer/>*/}
        </div>

    );
};

export default Layout;
