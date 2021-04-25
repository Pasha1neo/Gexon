import {makeStyles} from '@material-ui/core/styles'

export const useStyles = makeStyles((theme) => ({
    header: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(4),
    },
    title: {},
    links: {
        textAlign: 'center',
    },
    active: {
        color: 'white',
    },
}))
