import React from 'react'
import { Grid, Paper, Avatar, Typography, TextField, Button } from '@material-ui/core'
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {createUser} from "../../../api/api";
import {toast} from "react-toastify";
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";

export const SignUp = () => {
    const paperStyle = { padding: 20, width: 300, margin: "0 auto" }
    const headerStyle = { margin: 0 }
    const avatarStyle = { backgroundColor: '#f8a7b0' }
    const btnstyle={margin:'8px 0'}

    const {register, handleSubmit, errors, control} = useForm();
    const navigate = useNavigate();

    const onSubmit = handleSubmit(async ({email, password, repeatPassword, phoneNumber}) => {
        if (password == repeatPassword) {
            await createUser({email, password, phoneNumber});
            navigate("/", {replace: true});
        } else {
            toast.error('Пароли не совпадают!');
        }
    });

    return (
        <Grid>
            <Paper style={paperStyle}>
                <Grid align='center'>
                    <Avatar style={avatarStyle}>
                        <AddCircleOutlineOutlinedIcon />
                    </Avatar>
                    <h2 style={headerStyle}>Регистрация</h2>
                    <Typography variant='caption' gutterBottom>Заполните поля, чтобы создать аккаунт!</Typography>
                </Grid>
                <form onSubmit={onSubmit}>
                    <TextField fullWidth name='email'
                               inputRef={register({required: true})}
                               htmlFor="email"
                               label='Email'
                               placeholder="Введите ваш email" />
                    <TextField fullWidth name='password'
                               type="password"
                               inputRef={register({required: true})}
                               htmlFor="password"
                               label='Пароль'
                               placeholder="Введите ваш пароль"/>
                    <TextField fullWidth name='repeatPassword'
                               type="password"
                               inputRef={register({required: true})}
                               htmlFor="repeatPassword"
                               label='Подтверждение пароля'
                               placeholder="Подтвердите ваш пароль"/>
                    <TextField fullWidth name='phoneNumber'
                               inputRef={register({required: true})}
                               htmlFor="phoneNumber"
                               label='Номер телефона'
                               placeholder="Введите ваш номер" />
                    <Button type='submit' variant='contained' color='primary' style={btnstyle} fullWidth>Зарегистрироваться</Button>
                </form>
            </Paper>
        </Grid>
    )
}
