import {makeStyles} from '@material-ui/core'

export const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        width: 'inherit',
        flexDirection: 'column',
        height: '100%',
    },
    close: {
        position: 'fixed',
    },
    title: {
        margin: 'auto',
    },
    userList: {
        padding: 0,
        width: 'inherit',
        overflowY: 'auto',
    },
    active: {
        backgroundColor: theme.palette.primary.main,
    },
    box: {
        overflow: 'hidden',
    },
    online: {
        color: theme.palette.success.main,
    },
    unread: {
        '& > span:last-child': {
            backgroundColor: theme.palette.active,
        },
    },
}))
