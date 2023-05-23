import SearchIcon from "@mui/icons-material/Search";
import {Button} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import useStyles from "../../styles/layout-styles";
import {Divider, FormControl, IconButton, InputBase, InputLabel, MenuItem, Paper, Select} from "@mui/material";
import {getCities} from "../../../api/api";

export const SearchButton = ({callbackSetSimilarName, callbackSetCity}) => {
    const classes = useStyles();
    const [similarName, setSimilarName] = useState(null);
    const [cities, setCities] = useState([]);

    const cityChange = (event) => {
        callbackSetCity(event.target.value);
    };

    const handleSimilarNameClick = (similarName) => {
        callbackSetSimilarName(similarName);
    };

    useEffect(async () => {
        await getCities(setCities);
    }, []);


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
                <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                <FormControl className={classes.searchByCity}>
                    <InputLabel id="demo-simple-select-label">Город</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        htmlFor="city"
                        label="City"
                        onChange={cityChange}
                    >
                        {cities.map(element => {
                            return <MenuItem value={element}>{element}</MenuItem>
                        })}
                    </Select>
                </FormControl>
            </Paper>

    )
}