import {makeStyles} from '@material-ui/core'

export const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexGrow: 0,
        width: 270,
    },
    userList: {
        padding: 0,
    },
    active: {
        backgroundColor: theme.palette.primary.main,
    },
    message: {
        width: 180,
    },
}))
