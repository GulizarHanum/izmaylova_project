import {useNavigate} from "react-router-dom";
import Box from "@mui/material/Box";
import SearchIcon from "@mui/icons-material/Search";
import DirectionsIcon from "@mui/icons-material/Directions";
import MenuIcon from "@mui/icons-material/Menu";
import {Button, TextField, ButtonGroup} from "@material-ui/core";
import React, {useState} from "react";
import useStyles from "../../styles/layout-styles";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import {Divider, IconButton, InputBase, Paper} from "@mui/material";

export const SearchButton = ({callbackSetSimilarName}) => {
    const navigate = useNavigate();
    const classes = useStyles();
    const [similarName, setSimilarName] = useState(null);

    const handleSimilarNameClick = (similarName) => {
        console.log(similarName);
        callbackSetSimilarName(similarName);
    };


    return (
            <Paper
                component="form"
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 1000, marginRight: 4, }}
            >
                <IconButton sx={{ p: '10px' }} aria-label="menu">
                    <SearchIcon />
                </IconButton>
                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Поиск"
                    inputProps={{ 'aria-label': 'Поиск' }}
                    name="similarName"
                    onChange={e => setSimilarName(e.target.value)}
                />
                <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                <Button onClick={() => handleSimilarNameClick(similarName)}>Найти</Button>
            </Paper>

    )
}