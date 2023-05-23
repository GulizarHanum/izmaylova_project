import {toast} from "react-toastify";

/**
 * Обработчик загрузки фото
 * @param e событие загрузки файла
 * @param setPhoto коллбэк для установки фото в состояние
 * @param setIsCorrectPhoto коллбэк для установки признака правильности загруженного файла
 */
export const onImagesChange = (e, setPhoto, setIsCorrectPhoto) => {
    const fileTypes = ['jpg', 'jpeg', 'png'];

    if (e.target.files) {
        if (e.target.files.length < 5) {
            let photos = [];
            let isSuccess = true;
            for (let i = 0; i < e.target.files.length; i++) {
                const extension = e.target.files[0].name.split('.').pop().toLowerCase();
                isSuccess = isSuccess && fileTypes.indexOf(extension) > -1;
            }
            if (isSuccess) {
                for (let i = 0; i < e.target.files.length; i++) {
                    let reader = new FileReader();
                    reader.onload = function (e) {
                        photos.push(e.target.result);
                    };
                    reader.readAsDataURL(e.target.files[i]);
                }
                setPhoto(photos);
                setIsCorrectPhoto(true);
            } else {
                setIsCorrectPhoto(false);
                toast.error('Принимаются только фото с расширением .jpg .jpeg .png!');
            }
        } else {
            toast.error('Загружено больше 5 фото!')
        }

    }
}

/**
 * Обработчик загрузки фото
 * @param e событие загрузки файла
 * @param setPhoto коллбэк для установки фото в состояние
 * @param setIsCorrectPhoto коллбэк для установки признака правильности загруженного файла
 */
export const onImageChange = (e, setPhoto, setIsCorrectPhoto) => {
    const fileTypes = ['jpg', 'jpeg', 'png'];
    if (e.target.files && e.target.files[0]) {
        const extension = e.target.files[0].name.split('.').pop().toLowerCase();
        const isSuccess = fileTypes.indexOf(extension) > -1;

        if (isSuccess) {
            let reader = new FileReader();
            reader.onload = function (e) {
                setPhoto(e.target.result);
                setIsCorrectPhoto(true);
            };
            reader.readAsDataURL(e.target.files[0]);
        } else {
            setIsCorrectPhoto(false);
            toast.error('Принимаются только фото с расширением .jpg .jpeg .png!');
        }
    }
}


