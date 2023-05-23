import {FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import React, {useEffect, useState} from "react";
import {editAdvertisement, getAdvertisement, getCategories, getCities, getLocalAccessToken} from "../../../api/api";
import useStyles from "../../styles/layout-styles";
import {Button} from "@material-ui/core";
import {toast} from "react-toastify";
import {useForm} from "react-hook-form";
import {onImagesChange} from "../../utils";
import {useNavigate, useParams} from "react-router-dom";
import jwt_decode from "jwt-decode";

export const EditAdvertisementPage = () => {
    const classes = useStyles();
    let {id} = useParams();

    const navigate = useNavigate();
    const {register, handleSubmit, errors} = useForm();

    const [advertisement, setAdvertisement] = useState(undefined);
    const [category, setCategory] = useState('');
    const [subcategory, setSubCategory] = useState('');
    const [categories, setCategories] = useState([]);
    const [cities, setCities] = useState([]);
    const [city, setCity] = useState('');
    const [photo, setPhoto] = useState([]);
    const [isCorrectPhoto, setIsCorrectPhoto] = useState(true);

    const categoryChange = (event) => {
        setCategory(event.target.value);
    };

    const subCategoryChange = (event) => {
        setSubCategory(event.target.value);
    };

    const cityChange = (event) => {
        setCity(event.target.value);
    };

    useEffect(async () => {
        await getCategories(setCategories);
        await getCities(setCities);
    }, []);

    useEffect(() => {
        getAdvertisement(id)
            .then((advertisement) => setAdvertisement(advertisement));
    }, []);

    useEffect(() => {
        if (advertisement) {
            setCategory(advertisement.category);
        }
    }, [advertisement]);

    if (!getLocalAccessToken()) {
        navigate("/", {replace: true});
        return null;
    }

    const onSubmit = handleSubmit(async ({name, cost, description, street, house}) => {
        if (isCorrectPhoto) {
            const token = jwt_decode(getLocalAccessToken());
            const {profileId} = token;
            await editAdvertisement({
                id: advertisement.id,
                name,
                photo,
                category,
                subcategory,
                description,
                city,
                street,
                house,
                cost,
                sellerId: profileId
            })
                .then(() => navigate("/", {replace: true}));
        } else {
            toast.error('Прикрепите фото с правильным расширением!');
        }
    });

    if (advertisement) {
        return <form onSubmit={onSubmit}>
            <h1>Разместить объявление</h1>
            <h2>Заголовок</h2>
            <FormControl error={!!errors.name}>
                <TextField className={classes.textFiled}
                           id="outlined-basic"
                           label="Напишите название товара/услуги"
                           name="name"
                           htmlFor="name"
                           defaultValue={`${advertisement.name}`}
                           inputRef={register({required: true})}/>
                {errors.name && (
                    <FormHelperText id="name-error">
                        Заголовок не может быть пустым
                    </FormHelperText>
                )}
            </FormControl>
            <div>
                <InputLabel htmlFor="photo" shrink={true}>Фотографии</InputLabel>
                <input
                    id="photo"
                    name="photo"
                    type="file"
                    multiple="multiple"
                    onChange={(e) => onImagesChange(e, setPhoto, setIsCorrectPhoto)}
                />
            </div>

            <h2>Выберите категорию и подкатегорию</h2>
            <FormControl className={classes.textFiled}>
                <InputLabel id="demo-simple-select-label">Категория</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    htmlFor="category"
                    label="Category"
                    defaultValue={`${advertisement.category}`}
                    inputRef={register({required: true})}
                    onChange={categoryChange}
                >
                    {categories.map(element => {
                        return <MenuItem value={element.category}>{element.category}</MenuItem>
                    })}
                </Select>
            </FormControl>
            {category &&
                <FormControl className={classes.textFiled}>
                    <InputLabel id="demo-simple-select-label">Подкатегория</InputLabel>
                    <Select
                        inputRef={register({required: true})}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        htmlFor="subcategory"
                        label="Subcategory"
                        defaultValue={`${advertisement.subcategory}`}
                        onChange={subCategoryChange}>
                        {categories.filter(element => element.category === category).map(category => category.subcategory).flat(2).map(subcategory => {
                            return <MenuItem value={subcategory}> {subcategory} </MenuItem>
                        })
                        }
                    </Select>
                </FormControl>
            }

            <h2>Описание</h2>
            <TextField className={classes.textFiled}
                       htmlFor="description"
                       name="description"
                       id="outlined-multiline-static"
                       multiline
                       rows={4}
                       label="О товаре/услуге"
                       defaultValue={`${advertisement.description}`}
                       inputRef={register({required: false})}/>
            <h2>Адрес</h2>
            <FormControl className={classes.textFiled}>
                <InputLabel id="demo-simple-select-label">Город</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    htmlFor="city"
                    label="City"
                    onChange={cityChange}
                    defaultValue={`${advertisement.city}`}
                    inputRef={register({required: true})}
                >
                    {cities.map(element => {
                        return <MenuItem value={element}>{element}</MenuItem>
                    })}
                </Select>
            </FormControl>
            <TextField htmlFor="street" name="street" className={classes.textFiled} id="outlined-basic" label="Улица"
                       inputRef={register({required: false})} defaultValue={`${advertisement.street}`}/>
            <TextField htmlFor="house" name="house" htmlForclassName={classes.textFiled} id="outlined-basic" label="Дом"
                       inputRef={register({required: false})} defaultValue={`${advertisement.house}`}/>
            <h2>Цена</h2>
            <TextField htmlFor="cost"
                       name="cost"
                       id="outlined-basic"
                       label="В рублях"
                       defaultValue={`${advertisement.cost}`}
                       inputRef={register({required: true})}/>
            <a className={classes.text}>руб.</a>
            <div>
                <Button className={classes.addButton}
                        variant="contained"
                        color="primary"
                        size="large"
                        disableElevation
                        type="submit"
                >
                    Разместить объявление
                </Button>
            </div>
        </form>
    } else {
        return null;
    }


}