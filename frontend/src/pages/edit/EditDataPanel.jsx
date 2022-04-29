import {FormControl, FormHelperText, Grid, Input, InputLabel, MenuItem, Select} from "@material-ui/core";
import {Controller} from "react-hook-form";
import {onImageChange, StatusSelectEnum} from "../../utils";
import React from "react";

/**
 * Компонента-панель с формами для ввода информации при редактировании ДР
 */
export const EditDataPanel = ({item, register, errors, control, setPhoto, setIsCorrectPhoto}) => {

    //пока не пришли данные с сервера - не рендерим
    if (!item) {
        return null;
    }

    return (
        <Grid container item xs={12} spacing={3}>
            <Grid item xs={6}>
                <FormControl style={{width: "100%"}} error={!!errors.name}>
                    <InputLabel htmlFor="name">ФИО</InputLabel>
                    <Input
                        id="name"
                        name="name"
                        defaultValue={`${item.name}`}
                        inputRef={register({required: true})}
                    />
                    {errors.name && (
                        <FormHelperText id="name-error">
                            ФИО не может быть пустым
                        </FormHelperText>
                    )}
                </FormControl>
            </Grid>
            <Grid item xs={2}>
                <FormControl style={{width: "100%"}} error={!!errors.date}>
                    <InputLabel htmlFor="date"
                                shrink={true}>
                        Дата</InputLabel>
                    <Input
                        id="date"
                        name="date"
                        type="date"
                        defaultValue={item.date}
                        inputRef={register({required: true})}
                    />
                    {errors.date && (
                        <FormHelperText id="date-error">
                            Дата не может быть пустой
                        </FormHelperText>
                    )}
                </FormControl>
            </Grid>
            <Grid item xs={2}>
                <FormControl style={{width: "100%"}} error={!!errors.role}>
                    <InputLabel htmlFor="role"
                                shrink={true}>
                        Статус</InputLabel>
                    <Controller
                        as={
                            <Select>
                                {StatusSelectEnum.map((role) => (
                                    <MenuItem value={role.id}>{role.text}</MenuItem>
                                ))}
                            </Select>
                        }
                        control={control}
                        name="role"
                        defaultValue={item.role}
                        rules={{required: "Выберите статус"}}
                    />
                    <FormHelperText>
                        {errors.role && errors.role.message}
                    </FormHelperText>
                </FormControl>
            </Grid>
            <Grid item xs={2}>
                <InputLabel htmlFor="photo"
                            shrink={true}>
                    Фото</InputLabel>
                <Input
                    id="photo"
                    name="photo"
                    type="file"
                    onChange={(e) => onImageChange(e, setPhoto, setIsCorrectPhoto)}
                />
            </Grid>
        </Grid>
    );
}