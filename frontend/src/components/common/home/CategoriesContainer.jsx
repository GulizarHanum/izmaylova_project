import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import {Typography} from "@mui/material";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
}));

export const CategoriesContainer = ({categories, callbackSetCategoryName, callbackSetSubCategoryName}) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);

    const handleCategoryClick = category => {
        setOpen(!open);
        callbackSetCategoryName(category);
    };

    const handleSubCategoryClick = subCategory => {
        callbackSetSubCategoryName(subCategory);
    };

    return <div>
        <Typography variant="h4" component="div">
            Выберите категорию
        </Typography>
        <List
            component="nav"
            aria-labelledby="nested-list-subheader"
            className={classes.root}
        >
            {categories.map(element => {
                return <div><ListItem button onClick={() => handleCategoryClick(element.category)}>
                    <ListItemText primary={element.category}/>
                    {open ? <ExpandLess/> : <ExpandMore/>}
                </ListItem>
                    {element.subcategory.map(subcategory => {
                        return <Collapse in={open} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                <ListItem button className={classes.nested} onClick={() => handleSubCategoryClick(subcategory)}>
                                    <ListItemText primary={subcategory}/>
                                </ListItem>
                            </List>
                        </Collapse>
                    })}
                </div>
            })}
        </List>
    </div>
}