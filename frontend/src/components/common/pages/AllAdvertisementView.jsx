import {AdvertisementsTable} from "../home/AdvertisementsTable";
import {Grid} from "@mui/material";
import {CategoriesContainer} from "../home/CategoriesContainer";
import {
    getAdvertisementsByCategory, getAdvertisementsByCity, getAdvertisementsBySimilarName,
    getAdvertisementsBySubCategory,
    getAllActiveAdvertisements,
    getCategories
} from "../../../api/api";
import {useEffect, useState} from "react";
import {SearchButton} from "../header/SearchButton";

export const AllAdvertisementView = () => {

    const [items, setItems] = useState([]);
    const [categories, setCategories] = useState([]);
    const [categoryName, setCategoryName] = useState(null);
    const [subCategoryName, setSubCategoryName] = useState(null);
    const [similarName, setSimilarName] = useState(null);
    const [city, setCity] = useState(null);


    //подгружаем данные с сервера

    useEffect(async () => {
        await getAllActiveAdvertisements(setItems);
    }, []);

    useEffect(async () => {
        await getCategories(setCategories);
    }, []);

    useEffect(async () => {
        await getAdvertisementsByCategory(setItems, categoryName);
    }, [categoryName]);

    useEffect(async () => {
        await getAdvertisementsBySubCategory(setItems, subCategoryName);
    }, [subCategoryName]);

    useEffect(async () => {
        await getAdvertisementsBySimilarName(setItems, similarName);
    }, [similarName]);

    useEffect(async () => {
        await getAdvertisementsByCity(setItems, city);
    }, [city]);


    return (
        <div>
            <SearchButton callbackSetSimilarName={setSimilarName} callbackSetCity={setCity}/>
            <Grid container spacing={2}>
                <Grid item xs={9}>
                    <AdvertisementsTable items={items}/>
                </Grid>
                <Grid item xs={3}>
                    <CategoriesContainer categories={categories} callbackSetCategoryName={setCategoryName} callbackSetSubCategoryName={setSubCategoryName}/>
                </Grid>
            </Grid>
        </div>
    )
}