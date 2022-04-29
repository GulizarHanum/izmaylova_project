import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useForm} from "react-hook-form";
import {editBirthday, getBirthday} from "../../../api/birthdayApi";
import {Panel} from "../../common/Panel";
import {Button, Grid, Typography} from "@material-ui/core";
import {EditDataPanel} from "./EditDataPanel";
import {toast} from "react-toastify";

/**
 * Компонента-форма для редактирования ДР
 */
export const EditForm = () => {
    const navigate = useNavigate();
    const {handleSubmit, register, errors, control} = useForm();
    let {id} = useParams();

    const [item, setItem] = useState(undefined);
    const [photo, setPhoto] = useState();
    const [isCorrectPhoto, setIsCorrectPhoto] = useState(true);

    //подгружаем данные с сервера
    useEffect(async () => {
        await getBirthday(setItem, id);
    }, []);

    //обработчик нажатия на кнопку "Редактировать ДР"
    const onSubmit = handleSubmit(async ({name, date, role}) => {
        if (isCorrectPhoto) {
            await editBirthday({id, name, date, role, photo});
            navigate("/", {replace: true});
        } else {
            toast.error('Прикрепите фото с правильным расширением!');
        }
    });

    return (
        <form onSubmit={onSubmit}>
            <Panel>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="h6" component="div">
                            Отредактировать ДР
                        </Typography>
                    </Grid>
                    <EditDataPanel item={item} register={register}
                                   errors={errors} control={control}
                                   setPhoto={setPhoto} setIsCorrectPhoto={setIsCorrectPhoto}/>
                    <Grid container item xs={12}>
                        <Button type="submit" color="primary">Редактировать ДР!</Button>
                    </Grid>
                </Grid>
            </Panel>
        </form>
    )
}