import {createMuiTheme} from "@material-ui/core/styles";

const useThemes = createMuiTheme({
    palette: {
        primary: {
            light: '#f8a7b0',
            main: '#E7717D',
            dark: '#ea5765',
            contrastText: '#fff',
        },
        secondary: {
            light: '#cccccc',
            main: '#ffffff',
            dark: '#838383',
            contrastText: '#383838',
        },
    },
});

export default useThemes;
