import {AdvertisementsTable} from "./AdvertisementsTable";
import {Grid} from "@mui/material";
import {CategoriesView} from "../../CategoriesView";
import {
    getAdvertisementsByCategory, getAdvertisementsBySimilarName,
    getAdvertisementsBySubCategory,
    getAllActiveAdvertisements,
    getCategories
} from "../../../../api/api";
import {useEffect, useState} from "react";
import {SearchButton} from "../../header/SearchButton";

export const AllAdvertisementView = () => {

    const [items, setItems] = useState([]);
    const [categories, setCategories] = useState([]);
    const [categoryName, setCategoryName] = useState(null);
    const [subCategoryName, setSubCategoryName] = useState(null);
    const [similarName, setSimilarName] = useState(null);


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

    return (
        <div>
            <SearchButton callbackSetSimilarName={setSimilarName}/>
            <Grid container spacing={2}>
                <Grid item xs={9}>
                    <AdvertisementsTable items={items}/>
                </Grid>
                <Grid item xs={3}>
                    <CategoriesView  categories={categories} callbackSetCategoryName={setCategoryName} callbackSetSubCategoryName={setSubCategoryName}/>
                </Grid>
            </Grid>
        </div>
    )
}