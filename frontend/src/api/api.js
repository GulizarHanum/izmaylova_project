import axios from "axios";
import {toast} from "react-toastify";


/**
 * Отправить запрос на получения записи о ДР по айди
 * @param callbackSetItems коллбэк для записи в состояния компонента
 * @param id айди записи
 * @returns {Promise<void>} промис
 */
export async function getBirthday(callbackSetItems, id) {
    axios.get(`/${id}`)
        .then(({data}) => callbackSetItems(data))
        .catch(() => toast.error('Не удалось загрузить данные!'));
}

export async function getAllActiveAdvertisements(callbackSetItems) {
    axios.get(`/public/advertisements/active`)
        .then(({data}) => callbackSetItems(data))
        .catch(() => toast.error('Не удалось загрузить данные!'));
}

export async function getCategories(callbackSetItems) {
    axios.get(`/public/categories`)
        .then(({data}) => callbackSetItems(data))
        .catch(() => toast.error('Не удалось загрузить данные!'));
}

export async function getAdvertisementsByCategory(callbackSetItems, nameCategory) {
    if (nameCategory) {
        axios.get(`/public/advertisements/category`, {
            params: {
                name: nameCategory
            }
        })
            .then(({data}) => callbackSetItems(data))
            .catch(() => toast.error('Не удалось загрузить данные!'));
    }
}

export async function getAdvertisementsBySubCategory(callbackSetItems, nameSubCategory) {
    if (nameSubCategory) {
        axios.get(`/public/advertisements/subcategory`, {
            params: {
                name: nameSubCategory
            }
        })
            .then(({data}) => callbackSetItems(data))
            .catch(() => toast.error('Не удалось загрузить данные!'));
    }
}

export async function getAdvertisementsBySimilarName(callbackSetItems, name) {
    if (name) {
        axios.get(`/public/advertisements/similarName`, {
            params: {
                name: name
            }
        })
            .then(({data}) => callbackSetItems(data))
            .catch(() => toast.error('Не удалось загрузить данные!'));
    }
}



