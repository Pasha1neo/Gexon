import {makeStyles} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        width: 'inherit',
        flexDirection: 'column',
        height: '100%',
    },
    title: {
        margin: 'auto',
    },
    userList: {
        padding: 0,
        width: 'inherit',
        overflowY: 'auto',
    },
    box: {
        marginLeft: theme.spacing(2),
        overflow: 'hidden',
        height: 70, // Благодаря этой высоте всё круто становится
        marginRight: 'auto',
    },
    large: {
        width: theme.spacing(13),
        height: theme.spacing(13),
    },
}))

export default useStyles
