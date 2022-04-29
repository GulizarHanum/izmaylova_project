import React from 'react';
import NoDataImage from '../../assets/images/empty.svg'
import {Box, Grid, TableCell, Typography} from '@material-ui/core';

/**
 * Компонента-плейсхолдер для таблицы в случае если нечего выводить в списке ДР
 */
export const NoDataPlaceholder = ({colSpan}) => {
    return (
        <TableCell colSpan={colSpan}>
            <Grid container justify="center" spacing={1}>
                <Grid item>
                    <img src={NoDataImage} width="128" height="128" alt="No data"/>
                </Grid>
                <Grid item xs={12} container justify="center">
                    <Box color="text.secondary">
                        <Typography variant="subtitle1">
                            К сожалению, ничего не нашлось <span aria-label="cry" role="img">😓</span>
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
        </TableCell>
    )
}