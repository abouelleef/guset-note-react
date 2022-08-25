import { createTheme } from '@mui/material';

export const themeOptions = {
    palette: {
        type: 'light',
        primary: {
            main: '#3D4451',
        },
        secondary: {
            main: '#f50057',
        },
    },
};

const theme = createTheme(themeOptions);

export default theme;