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
        overflow: 'hidden',
        marginLeft: theme.spacing(3),
    },
    large: {
        width: theme.spacing(13),
        height: theme.spacing(13),
    },
}))
export default useStyles
