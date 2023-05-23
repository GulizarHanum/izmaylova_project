import React from 'react'
import {Button} from '@material-ui/core';
import {useNavigate} from "react-router-dom";
import SendIcon from '@mui/icons-material/Send';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import useStyles from "../../styles/layout-styles";
import {getLocalAccessToken} from "../../../api/api";
import {AccountMenu} from "./AccountMenu";
import jwt_decode from "jwt-decode";

/**
 * Компонента с кнопками для заголовка приложения
 */
export const HeaderButtons = () => {

    const navigate = useNavigate();
    const classes = useStyles();
    let profileId

    if (getLocalAccessToken()) {
        profileId = jwt_decode(getLocalAccessToken()).profileId;
    }

    if (profileId) {
        return (
            <div className={classes.headerButtons}>
                <Button className={classes.buttons}
                        variant="contained"
                        color="secondary"
                        size="small"
                        disableElevation
                        startIcon={<SendIcon className={classes.icon}/>}
                />
                <Button className={classes.buttons}
                        variant="contained"
                        size="small"
                        color="secondary"
                        disableElevation
                        startIcon={<FavoriteBorder className={classes.icon}/>}
                />
                <Button className={classes.buttons}
                        variant="contained"
                        color="secondary"
                        size="small"
                        disableElevation
                        onClick={() => {
                            navigate("/advertisement/new", {replace: true});
                        }}
                >
                    Добавить объявление
                </Button>
                <AccountMenu/>
            </div>)
    } else {
        return (<div className={classes.headerButtons}>
            <Button className={classes.buttons}
                    variant="contained"
                    size="small"
                    color="secondary"
                    disableElevation
                    onClick={() => {
                        navigate("/auth", {replace: true});
                    }}>
                Вход/Регистрация
            </Button>
        </div>)
    }
}