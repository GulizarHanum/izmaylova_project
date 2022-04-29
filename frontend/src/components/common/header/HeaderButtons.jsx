import React from 'react'
import {Button} from '@material-ui/core';
import {useNavigate} from "react-router-dom";
import SendIcon from '@mui/icons-material/Send';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import useStyles from "../../styles/layout-styles";

/**
 * Компонента с кнопками для заголовка приложения
 */
export const HeaderButtons = () => {
    const navigate = useNavigate();
    const classes = useStyles();

    return (<div>
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
            >
            Добавить объявление
        </Button>
        <Button className={classes.buttons}
                variant="contained"
                size="small"
                color="secondary"
                disableElevation>
            Вход/Регистрация
        </Button>
    </div>)
}