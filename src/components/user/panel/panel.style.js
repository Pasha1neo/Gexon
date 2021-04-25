import {makeStyles} from '@material-ui/core/styles'

export const useStyles = makeStyles((theme) => ({
    root: {},
    active: {
        color: theme.palette.active,
    },
    nickname: {
        color: theme.palette.primary.contrastText,
        '&:hover': {
            color: theme.palette.active,
        },
    },
    avatar: {
        color: theme.palette.secondary.contrastText,
    },
    button: {
        '&:hover': {
            color: theme.palette.grey[800],
            '& > span > span': {
                color: theme.palette.active,
                transition: theme.transitions.create(['color'], {
                    duration: theme.transitions.duration.complex,
                    easing: theme.transitions.easing.easeIn,
                }),
            },
        },
    },
    iconButton: {
        '&:hover': {
            color: theme.palette.active,
            transition: theme.transitions.create(['color'], {
                duration: theme.transitions.duration.complex,
            }),
        },
    },
}))
