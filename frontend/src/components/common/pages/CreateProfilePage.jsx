import {Avatar, Button, Grid, Paper, TextField, Typography} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import {createProfile, getCities, getLocalAccessToken, login} from "../../../api/api";
import {toast} from "react-toastify";
import PersonIcon from '@material-ui/icons/Person';
import jwt_decode from "jwt-decode";
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {onImageChange} from "../../utils";
import useStyles from "../../styles/layout-styles";

export const CreateProfilePage = () => {

    const paperStyle = { padding: 20, width: 500, margin: "0 auto" }
    const headerStyle = { margin: 0 }
    const avatarStyle = { backgroundColor: '#f8a7b0' }

    const classes = useStyles();

    const {register, handleSubmit, errors, control} = useForm();
    const [cities, setCities] = useState([]);
    const [city, setCity] = useState([]);
    const [photo, setPhoto] = useState();
    const [isCorrectPhoto, setIsCorrectPhoto] = useState(true);
    const navigate = useNavigate();

    let token;
    if (!getLocalAccessToken()) {
        navigate("/", {replace: true});
    } else {
        token = jwt_decode(getLocalAccessToken());
    }

    const {userId} = token;

    const cityChange = (event) => {
        setCity(event.target.value);
    };

    const onSubmit = handleSubmit(async ({lastName, firstName, middleName}) => {
        if (isCorrectPhoto) {
            await createProfile({lastName, firstName, middleName, photo, userId, city});
            toast.info('Необходимо снова войти в систему.');
            navigate("/auth", {replace: true});
        } else {
            toast.error('Пароли не совпадают!');
        }
    });

    useEffect(async () => {
        await getCities(setCities);
    }, []);

    return (
        <Grid>
            <Paper style={paperStyle}>
                <Grid align='center'>
                    <Avatar style={avatarStyle}>
                        <PersonIcon />
                    </Avatar>
                    <h2 style={headerStyle}>Заполните профиль</h2>
                    <Typography variant='caption' gutterBottom>Заполните поля, чтобы создать аккаунт!</Typography>
                </Grid>
                <form onSubmit={onSubmit}>
                    <TextField fullWidth name='lastName'
                               inputRef={register({required: true})}
                               htmlFor="lastName"
                               label='Фамилия'
                               placeholder="Введите вашу фамилию" />
                    <TextField fullWidth name='firstName'
                               type="firstName"
                               inputRef={register({required: true})}
                               htmlFor="firstName"
                               label='Имя'
                               placeholder="Введите ваше имя"/>
                    <TextField fullWidth name='middleName'
                               type="middleName"
                               inputRef={register({required: true})}
                               htmlFor="middleName"
                               label='Отчество'
                               placeholder="Введите ваше отчество"/>
                    <div>
                        <InputLabel htmlFor="photo" shrink={true}>Аватарка</InputLabel>
                        <input
                            id="photo"
                            name="photo"
                            type="file"
                            onChange={(e) => onImageChange(e, setPhoto, setIsCorrectPhoto)}
                        />
                    </div>
                    <FormControl className={classes.city}>
                        <InputLabel id="demo-simple-select-label">Город</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            htmlFor="city"
                            label="City"
                            onChange={cityChange}
                            inputRef={register({required: true})}
                        >
                            {cities.map(element => {
                                return <MenuItem value={element}>{element}</MenuItem>
                            })}
                        </Select>
                    </FormControl>
                    <Button type='submit' variant='contained' color='primary'>СОхранить</Button>
                </form>
            </Paper>
        </Grid>
    )
}