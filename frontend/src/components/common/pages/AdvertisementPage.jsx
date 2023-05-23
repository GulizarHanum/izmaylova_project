import {Button} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import useStyles from "../../styles/layout-styles"
import {Grid} from "@mui/material";
import {useNavigate, useParams} from "react-router-dom";
import {
    closeAdvertisement,
    deleteAdvertisement,
    getAdvertisement,
    getLocalAccessToken,
    getProfile,
    getUser
} from "../../../api/api";
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import VisibilityIcon from '@material-ui/icons/Visibility';
import jwt_decode from "jwt-decode";
import Carousel from "../photoCarousel/Carousel";

export const AdvertisementPage = () => {
    const classes = useStyles();
    const navigate = useNavigate();
    let {id} = useParams();

    const [advertisementInfo, setAdvertisementInfo] = useState({});
    const [showPhoneNumber, setShowPhoneNumber] = useState(false);
    const [disableCloseButton, setDisableCloseButton] = useState(false);

    let token;
    if (getLocalAccessToken()) {
        token = jwt_decode(getLocalAccessToken());
    }

    const closeAdv = async () => {
        await closeAdvertisement(advertisementInfo.adv.id);
        setDisableCloseButton(true);
    }

    const deleteAdv = async () => {
        await deleteAdvertisement(advertisementInfo.adv.id);
        navigate("/", {replace: true});
    }

    const {profileId, email} = token;

    //подгружаем данные с сервера
    useEffect(() => {
        getAdvertisement(id)
            .then((advertisement) => {
                const {sellerId} = advertisement;


                getProfile(sellerId)
                    .then(profile => {
                        const {userId} = profile;
                        let data = {};

                        getUser(userId)
                            .then(user => {
                                data = {adv: advertisement, profile: profile, user: user};
                                setAdvertisementInfo(data);
                            });
                    });
            });
    }, []);

    useEffect(() => {
        if (advertisementInfo && advertisementInfo.adv && !!advertisementInfo.adv.sellDateTime) {
            setDisableCloseButton(true);
        }
    }, [advertisementInfo]);

    if (advertisementInfo && advertisementInfo.adv && advertisementInfo.profile && advertisementInfo.user) {
        return (
            <div>
                <Grid container
                      direction="row"
                      justifyContent="center">
                    <Grid item xs={4}>
                        <div className={classes.margin}>
                            <h1>{advertisementInfo.adv.name}</h1>
                            <Button variant="contained"
                                    size="small"
                                    startIcon={<FavoriteBorder/>}
                                    className={classes.margin}>
                                Добавить в избранное
                            </Button>
                            <div style={{maxWidth: 1200, marginLeft: 'auto', marginRight: 'auto', marginTop: 64}}>
                                <Carousel
                                    show={1}
                                    infiniteLoop>
                                    {advertisementInfo.adv.photo.map(photo =>
                                        (<div>
                                            <div style={{padding: 8}}>
                                                <img src={photo} alt="photo" style={{width: '75%', height: '75%'}}/>
                                            </div>
                                        </div>))}
                                </Carousel>
                            </div>
                            <h2>{advertisementInfo.adv.category}</h2>
                            <h2>{advertisementInfo.adv.subcategory}</h2>
                            <h2>Адрес</h2>
                            <div
                                className={classes.text}>{advertisementInfo.adv.city} {advertisementInfo.adv.street} {advertisementInfo.adv.house}</div>
                            <h2>Описание</h2>
                            <p className={classes.text}>{advertisementInfo.adv.description}</p>
                            <div
                                className={classes.text}>{new Date(advertisementInfo.adv.createDateTime).toLocaleString()}</div>
                        </div>
                    </Grid>
                    <Grid item xs={2}>
                        <div className={classes.margin}>
                            <h1>{advertisementInfo.adv.cost}p.</h1>
                            <div>
                                {showPhoneNumber ? <Button className={classes.button}
                                                           variant="contained"
                                                           size="large"
                                                           disabled>
                                        {advertisementInfo.user.phoneNumber}
                                    </Button>
                                    : <Button className={classes.button}
                                              variant="contained"
                                              size="large"
                                              onClick={() => setShowPhoneNumber(true)}>
                                        Номер продавца
                                    </Button>}
                                <Button className={classes.button}
                                        href={`mailto:${email}`}
                                        variant="contained"
                                        size="large"
                                        color="primary"
                                        disableElevation>
                                    Написать продавцу
                                </Button>
                            </div>
                            <div
                                className={classes.text}>{advertisementInfo.profile.lastName} {advertisementInfo.profile.firstName}</div>
                            <div className={classes.viewsCount}><VisibilityIcon/> {advertisementInfo.adv.viewsCount}
                            </div>
                            {(advertisementInfo.adv.sellerId === profileId) &&
                                <React.Fragment>
                                    <Button className={classes.button}
                                            variant="contained"
                                            size="large"
                                            color="primary"
                                            disableElevation
                                            onClick={() => navigate(`/advertisement/edit/${advertisementInfo.adv.id}`, {replace: true})}>
                                        Редактировать объявление
                                    </Button>
                                    <Button className={classes.button}
                                            variant="contained"
                                            size="large"
                                            color="primary"
                                            disableElevation
                                            disabled={disableCloseButton}
                                            onClick={closeAdv}>
                                        {disableCloseButton ? 'Объявление закрыто' : 'Закрыть объявление'}
                                    </Button>
                                    <Button className={classes.button}
                                            variant="contained"
                                            size="large"
                                            color="primary"
                                            disableElevation
                                            onClick={deleteAdv}>
                                        Удалить объявление
                                    </Button>
                                </React.Fragment>
                            }
                        </div>
                    </Grid>
                </Grid>
            </div>
        )
    } else {
        return null
    }
}