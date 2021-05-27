import {makeStyles} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    text: {
        wordBreak: 'break-word',
    },
    header: {
        display: 'flex',
        alignItems: 'baseline',
    },
    time: {
        marginLeft: theme.spacing(1.5),
        color: theme.palette.grey[500],
    },
    other: {
        position: 'absolute',
        top: 10,
        right: 0,
    },
    otherButton: {
        '&:hover': {
            color: theme.palette.primary.main,
            transition: theme.transitions.create(['color'], {
                duration: theme.transitions.duration.complex,
            }),
        },
    },
}))
export default useStyles
