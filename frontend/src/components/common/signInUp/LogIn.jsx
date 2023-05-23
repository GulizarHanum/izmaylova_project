import React from 'react'
import { Grid,Paper, Avatar, TextField, Button, Typography,Link } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import {getLocalAccessToken, login} from "../../../api/api";
import {toast} from "react-toastify";
import jwt_decode from "jwt-decode";

export const LogIn=({handleChange})=>{

    const paperStyle={padding :20,height:'41vh',width:300, margin:"0 auto"}
    const avatarStyle={backgroundColor:'#f8a7b0'}
    const btnstyle={margin:'8px 0'}

    const {register, handleSubmit, errors, control} = useForm();
    const navigate = useNavigate();

    let token;
    let profileId;
    if(getLocalAccessToken()){
        token= jwt_decode(getLocalAccessToken());
        profileId = token.profileId;
    }

    const onSubmit = handleSubmit(async ({email, password}) => {
        await login({email, password}).then(()=> {
            if(getLocalAccessToken()){
                token= jwt_decode(getLocalAccessToken());
                profileId = token.profileId;
                if (profileId) { navigate("/", {replace: true})
                } else {navigate("/create/profile", {replace: true})}
            }
        })
    });

    return(
        <Grid>
            <Paper  style={paperStyle}>
                <Grid align='center'>
                    <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
                    <h2>Войти</h2>
                </Grid>
                <form onSubmit={onSubmit}>
                    <TextField name="email"
                               inputRef={register({required: true})}
                               label='Email' placeholder='Введите email' fullWidth required/>
                    <TextField name="password"
                               inputRef={register({required: true})}
                               label='Пароль' placeholder='Введите пароль' type='password' fullWidth required/>
                    <Button type='submit' color='primary' variant="contained" style={btnstyle} fullWidth>Войти</Button>
                </form>
                <Typography > Еще нет аккаунта?
                    <Link href="#" onClick={()=>handleChange("event",1)} >
                        Регистрация
                    </Link>
                </Typography>
            </Paper>
        </Grid>
    )
}