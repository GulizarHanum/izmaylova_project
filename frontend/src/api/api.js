import axios from "axios";
import {toast} from "react-toastify";

const ADDRESS = "http://localhost:8080/api";

const axiosInstance = axios.create({baseURL: ADDRESS});
const axiosRefresh = axios.create({baseURL: ADDRESS});

export const getLocalAccessToken = () => localStorage.getItem('accessToken');
export const getLocalRefreshToken = () => localStorage.getItem('refreshToken');
export const getAccessTokenExpire = () => localStorage.getItem('expiresIn');

const isTokenExpired = () => Date.now() >= getAccessTokenExpire()

const getRefreshToken = token =>
    axiosRefresh.post("/public/auth/refresh", {
        refreshToken: token,
    }).catch((error) => {
        if (error.response) {
            if (error.response.status === 401) {
                console.error(error.response);
                localStorage.clear();
            }
        }
        return error.response;
    });

axiosInstance.interceptors.request.use(
    async (config) => {
        const token = getLocalAccessToken();
        const refToken = getLocalRefreshToken();
        if (token) {
            if (!isTokenExpired()) {
                config.headers["Authorization"] = 'Bearer ' + token;
            } else {
                try {
                    const rs = await getRefreshToken(refToken);
                    const {accessToken, refreshToken, expiresIn} = rs.data;
                    if (!accessToken || !refreshToken || !expiresIn) {
                        toast.error(rs.data.error);
                        return Promise.reject(rs.data.error);
                    }
                    localStorage.clear();
                    localStorage.setItem("accessToken", accessToken);
                    localStorage.setItem("refreshToken", refreshToken);
                    localStorage.setItem("expiresIn", expiresIn);
                    config.headers["Authorization"] = 'Bearer ' + accessToken;
                } catch (_error) {
                    if (_error.response && _error.response.data) {
                        return Promise.reject(_error.response.data);
                    }
                    return Promise.reject(_error);
                }
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (res) => {
        return res;
    },
    async (err) => {
        if (err.response) {
            if (err.response.status === 401) {
                if (!getLocalAccessToken()) {
                    toast.error("Войдите в систему.");
                    //todo navigate (/страеица входа)
                    return Promise.reject(err.response);
                } else {
                    toast.error("Что-то пошло не так! Войдите в систему снова.");
                }
            }
            if (err.response.status === 403) {
                toast.error("Недостаточно прав для просмотра страницы.");
                return Promise.reject(err.response);
            }
        }
        return Promise.reject(err);
    }
);



export async function getAllActiveAdvertisements(callbackSetItems) {
    axios.get(`/public/advertisements/active`)
        .then(({data}) => callbackSetItems(data))
        .catch(() => toast.error('Не удалось получить список объявлений!'));
}

export async function getUser(id) {
    return axios.get(`/public/users/${id}`)
        .then(({data}) => data)
        .catch(() => toast.error('Не удалось загрузить данные о пользователе!'));
}

export async function getCategories(callbackSetItems) {
    axios.get(`/public/categories`)
        .then(({data}) => callbackSetItems(data))
        .catch(() => toast.error('Не удалось загрузить список категорий!'));
}

export async function getCities(callbackSetItems) {
    axios.get(`/public/cities`)
        .then(({data}) => callbackSetItems(data))
        .catch(() => toast.error('Не удалось загрузить список городов!'));
}

export async function getAdvertisementsByCity(callbackSetItems, city) {
    if (city) {
        axios.get(`/public/advertisements/city`, {
            params: {
                city: city
            }
        })
            .then(({data}) => callbackSetItems(data))
            .catch(() => toast.error('Не удалось загрузить список объявлений!'));
    }
}

export async function getAdvertisementsByCategory(callbackSetItems, nameCategory) {
    if (nameCategory) {
        axios.get(`/public/advertisements/category`, {
            params: {
                name: nameCategory
            }
        })
            .then(({data}) => callbackSetItems(data))
            .catch(() => toast.error('Не удалось загрузить список объявлений!'));
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
            .catch(() => toast.error('Не удалось загрузить список объявлений!'));
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
            .catch(() => toast.error('Не удалось загрузить список объявлений!'));
    }
}

export function getAdvertisement(id) {
    return axios.get(`/public/advertisements/${id}`)
        .then(({data}) => data)
        .catch(() => toast.error('Не удалось загрузить данные об объявлении!'));
}

export function getProfile(id) {
    return axios.get(`/public/profiles/${id}`)
        .then(({data}) => data)
        .catch(() => toast.error('Не удалось загрузить данные о профиле!'));
}

export async function createAdvertisement(data) {
    await axiosInstance.post("/advertisements", data)
        .then(() => toast.success("Объявление успешно создано"))
        .catch(error => toast.error('Не удалось создать объявление! ' + error.response.data));
}

export async function editAdvertisement(data) {
    await axiosInstance.put("/advertisements", data)
        .then(() => toast.success("Объявление успешно отредактировано"))
        .catch(error => toast.error('Не удалось отредактировать объявление! ' + error.response.data));
}

export async function closeAdvertisement(id) {
    await axiosInstance.patch("/advertisements/close", {}, {params: {id}})
        .then(() => toast.success("Объявление успешно закрыто"))
        .catch(error => toast.error('Не удалось закрыть объявление! ' + error.response.data));
}

export async function deleteAdvertisement(id) {
    await axiosInstance.delete(`/advertisements/${id}`)
        .then(() => toast.success("Объявление успешно удалено"))
        .catch(error => toast.error('Не удалось удалить объявление! ' + error.response.data));
}

export async function getUserStats() {
    return axiosInstance.get(`/public/users/stats`)
        .then(({data}) => data)
        .catch(error => toast.error('Не удалось загрузить статистику! ' + error.response.data));
}

export async function getAdvertisementsStats() {
    return axiosInstance.get(`/public/advertisements/stats`)
        .then(({data}) => data)
        .catch(error => toast.error('Не удалось загрузить статистику! ' + error.response.data));
}

export async function createUser(data) {
    await axios.post("/public/users/register", data)
        .then(() => toast.success("Вы успешно зарегистрированы"))
        .catch(error => toast.error('Регистрация неуспешна! ' + error.response.data));
}

export async function createProfile(data) {
    await axiosInstance.post("/profiles", data)
        .then(() => toast.success("Профиль успешно создан"))
        .catch(error => toast.error('Не удалось создать профиль! ' + error.response.data));
}

export async function login(data) {
    return await axios.post(`/public/auth/login`, data)
        .then((response) => {
            localStorage.setItem("accessToken", response.data.accessToken);
            localStorage.setItem("refreshToken", response.data.refreshToken);
            localStorage.setItem("expiresIn", response.data.expiresIn);
            toast.success("Вход в систему успешен");
        })
        .catch((error) => {
            if (error.response.status === 400) {
                toast.error( "Данные для входа в систему неверны!");
            } else {
                toast.error(error.response.message || "Что-то пошло не так!");
            }
        });
}

export const logout = async () => {
    const axiosLogout = axiosInstance;

    const token = getLocalAccessToken();
    const refToken = getLocalRefreshToken();
    if (token) {
        if (!isTokenExpired()) {
            axiosLogout.defaults.headers["Authorization"] = 'Bearer ' + token;
        } else {
            try {
                const rs = await getRefreshToken(refToken);
                const {accessToken, refreshToken, expiresIn} = rs.data;
                if (!accessToken || !refreshToken || !expiresIn) {
                    toast.error(rs.data.error);
                    return Promise.reject(rs.data.error);
                }
                localStorage.clear();
                localStorage.setItem("accessToken", accessToken);
                localStorage.setItem("refreshToken", refreshToken);
                localStorage.setItem("expiresIn", expiresIn);
                axiosLogout.defaults.headers["Authorization"] = 'Bearer ' + accessToken;
            } catch (_error) {
                if (_error.response && _error.response.data) {
                    return Promise.reject(_error.response.data);
                }
                return Promise.reject(_error);
            }
        }
    }
    return axiosLogout.post("/auth/logout", {
        refreshToken: getLocalRefreshToken(),
    }).then((rs) => {
        localStorage.clear();
        toast.success("Вы вышли из системы");
    });
};





