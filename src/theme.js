import {createMuiTheme} from '@material-ui/core/styles'
import {
    blue,
    red,
    green,
    grey,
    indigo,
    orange,
    lightBlue,
    lightGreen,
    yellow,
    cyan,
    deepOrange,
} from '@material-ui/core/colors'

export const theme = createMuiTheme({
    palette: {
        type: 'dark',
        primary: {
            main: orange[500],
        },
        secondary: {
            main: deepOrange[900],
        },
        active: '#fff',
        black: '#000',
    },
})
