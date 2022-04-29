import {createStyles, makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            display: 'flex',
            flexGrow: 1,
        },
        headerButtons: {
            alignContent: 'center',
            flexGrow: 1,

        },
        searchButtons: {
            display: 'flex',
            justifyContent: 'center',
            width: '1100px',
        },
        buttons: {
            marginRight: '10px !important'
        },
        icon: {
            fontSize: '22px !important'
        },
        content: {
            flexGrow: 1,
            padding: theme.spacing(3),
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
        },
        contentShift: {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        },
        drawerHeader: {
            display: 'flex',
            alignItems: 'center',
            padding: theme.spacing(0, 1),
            // necessary for content to be below app bar
            ...theme.mixins.toolbar,
            justifyContent: 'flex-end',
        },
        photo: {
            height: '150px',
        },
        paper: {
            padding: theme.spacing(2),
        },
        header: {
            display: 'flex',
            flexFlow: 'row nowrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row'
        },
        logo: {
            marginRight: '30px',
            paddingRight: '1200px'
        },
        cardTitle: {
            margin: 0,
            fontStyle: 'normal',
            fontWeight: 'bold',
            fontSize: '22px',
            lineHeight: '32px',
        },
        cardText: {
            padding: '20px 23px 35px',
            minHeight: '275px',
            display: 'flex',
            flexDirection: 'column',
        },
        cardHeading: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '10px',
        },
        cardTag: {
            fontStyle: 'normal',
            fontWeight: 'normal',
            fontSize: '19px',
            lineHeight: '30px',
            color: '#ffffff',
            background: '#262626',
            borderRadius: '2px',
            padding: '1px 8px',
        },
        cardInfo: {
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
        },
        price: {
            marginRight: '10px',
            color: '#8c8c8c',
            fontSize: '18px',
            lineHeight: '32px',
        },
        category: {
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            maxWidth: '150px',
            color: '#8c8c8c',
            fontSize: '18px',
            lineHeight: '32px',
        },
        cardImage: {
            width: '100%',
            height: '250px',
            objectFit: 'cover',
        },
        card: {
            background: '#ffffff',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
            borderRadius: '7px',
            overflow: 'hidden',
            marginBottom: '30px',
            flexBasis: '31%',
            textDecoration: 'none',
            maxWidth: '500px'
        }
}),
);

export default useStyles;
