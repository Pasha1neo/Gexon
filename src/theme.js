import {createMuiTheme} from '@material-ui/core/styles'
import {blue, cyan} from '@material-ui/core/colors'

export const theme = createMuiTheme({
    palette: {
        primary: {
            main: blue[600],
            contrastText: 'blue',
        },
        secondary: {
            main: cyan[200],
            contrastText: 'green',
        },
    },
})
