import {makeStyles} from '@material-ui/core/styles'

export const useStyles = makeStyles((theme) => ({
    navLinks: {
        margin: 'auto',
    },
    active: {
        color: theme.palette.active,
    },
}))
