import {makeStyles} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
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
        height: 48,
        width: 48,
        border: `2px solid ${theme.palette.success.main}`,
    },
    avatar: {
        height: 48,
        width: 48,
        border: `2px solid ${theme.palette.error.main}`,
    },
    unread: {
        '& > span:last-child': {
            backgroundColor: theme.palette.active,
        },
    },
}))
export default useStyles
