import {Grid} from "@mui/material";
import useStyles from "../styles/layout-styles";
import logo from "../../assets/images/logo.png";
import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';

export const Footer = () => {
    const classes = useStyles();

    return (
        <footer className={classes.footer}>
            <Grid className={classes.container}>
                <Grid className={classes.footerBlock}>
                    <img src={logo} alt="logo" width="50px"/>
                    <div className={classes.socialLinks}>
                        <a href="#" className={classes.socialLinks}><InstagramIcon alt="instagram" fontSize="large"/></a>
                        <a href="#" className={classes.socialLinks}><FacebookIcon alt="facebook" fontSize="large"/></a>
                    </div>
                </Grid>
            </Grid>
        </footer>
    )

}