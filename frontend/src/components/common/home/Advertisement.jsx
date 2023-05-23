import useStyles from "../../styles/layout-styles";
import logo from "../../../assets/images/logo.png"
import {useNavigate} from "react-router-dom";

export const Advertisement = ({advertisement}) => {
    const classes = useStyles();
    const navigate = useNavigate();

    const handleClick = ({id}) => navigate(`/advertisement/${id}`, {replace: true});

    return (
        <div className={classes.card}
             onClick={() => handleClick(advertisement)}>
            {advertisement.photo.length ? <img className={classes.cardImage} src={advertisement.photo[0]} alt="photo"/> :
            <img className={classes.cardImage} alt="photo" src={logo} width="150"/>}
            <div className={classes.cardText}>
                <div className={classes.cardHeading}>
                    <h3 className={classes.cardTitle}>{advertisement.name}</h3>
                    <span className={classes.cardTag}>{advertisement.cost}р.</span>
                </div>
                <div className={classes.cardInfo}>
                    <div className={classes.price}>{advertisement.city}</div>
                    <div className={classes.category}>{new Date(advertisement.createDateTime).toLocaleDateString()}</div>
                </div>
            </div>
        </div>)
}