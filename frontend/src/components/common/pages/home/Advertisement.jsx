import useStyles from "../../../styles/layout-styles";
import logo from "../../../../assets/images/logo.png"

export const Advertisement = ({advertisement}) => {
    const classes = useStyles();
    return (
        <div className={classes.card}>
            {advertisement.photo.length ? <img className={classes.cardImage} src={advertisement.photo[0]} alt="photo"/> :
            <img className={classes.cardImage} alt="photo" src={logo} width="150"/>}
            <div className={classes.cardText}>
                <div className={classes.cardHeading}>
                    <h3 className={classes.cardTitle}>{advertisement.name}</h3>
                    <span className={classes.cardTag}>{advertisement.cost}р.</span>
                </div>
                <div className={classes.cardInfo}>
                    <div className={classes.price}>{advertisement.city}</div>
                    <div className={classes.category}>2022</div>
                    {/*todo: дата создания объявления*/}
                </div>
            </div>
        </div>)
}