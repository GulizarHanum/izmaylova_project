import {createStyles, makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            display: 'flex',
            flexGrow: 1,
        },
        spacer: {
            flex: 1
        },
        headerButtons: {
            display: 'flex',
            flexWrap: 'nowrap'
        },
        buttons: {
            display: 'flex',
            flexWrap: 'nowrap',
            margin: '5px 7px 5px 7px !important'
        },
        button: {
            width: '250px',
            height: '60px',
            marginBottom: '20px !important'
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
        text: {
            fontSize: '1.3em'
        },
        header: {
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'nowrap',
            flexFlow: 'row nowrap',
        },
        logo: {
            display: 'flex',
            flexWrap: 'nowrap',
            cursor: 'pointer'
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
        image: {
            width: '100%',
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
        },
        container: {
            margin: 'auto',
        },
        footer: {
            padding: '60px 0',
            backgroundColor: '#3b3838',
            display: 'flex',
            flexFlow: 'row nowrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row'
        },
        footerBlock: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        socialLinks: {
            display: 'flex',
            alignItems: 'center',
            margin: '10px'
        },
        margin: {
            margin: '3px !important',
        },
        textFiled: {
            width: '500px',
            marginRight: '10px !important',
        },
        city: {
            width: '400px',
            margin: '10px 0 !important',
        },
        searchByCity: {
            width: '170px',
        },
        addButton: {
            width: '250px',
            height: '60px',
            marginTop: '30px !important'
        },
        viewsCount: {
            display: 'flex',
            alignItems: 'center',
            marginTop: '.3em',
            fontSize: '1.3em',
        }
    }),
);

export default useStyles;
