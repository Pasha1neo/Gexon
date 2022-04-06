import {makeStyles} from '@material-ui/core'

export const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexGrow: 1,
        flexDirection: 'column',
        borderLeft: `1px solid ${theme.palette.divider}`,
    },
    bar: {
        backgroundColor: theme.palette.primary.main,
        display: 'flex',
        flexGrow: 0,
    },
    dialogContainer: {
        display: 'flex',
        margin: 'auto',
        alignItems: 'center',
        color: theme.palette.primary.contrastText,
    },
    mobileUsersList: {
        color: theme.palette.primary.contrastText,
        position: 'absolute',
        '&:hover': {
            color: theme.palette.active,
            transition: theme.transitions.create(['color'], {
                duration: theme.transitions.duration.complex,
            }),
        },
    },
    avatar: {
        marginRight: theme.spacing(3),
    },
    history: {
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        overflowY: 'auto',
        padding: theme.spacing(3),
    },
    footer: {
        position: 'relative',
        display: 'flex',
        flexGrow: 0,
        padding: theme.spacing(2),
        [theme.breakpoints.down('xs')]: {
            padding: theme.spacing(0),
        },
    },
    textField: {
        border: '1px',
    },
    button: {
        marginLeft: theme.spacing(2),
        '& > span': {
            padding: theme.spacing(1),
        },
        '&:hover': {
            borderColor: theme.palette.active,
        },
        '&:active ': {
            borderColor: theme.palette.primary.main,
            '& > span': {
                color: theme.palette.primary.main,
                transition: theme.transitions.create(['color'], {
                    duration: theme.transitions.duration.complex,
                }),
            },
        },
    },
    iconButton: {
        [theme.breakpoints.down('xs')]: {
            position: 'absolute',
            bottom: 0,
            right: 0,
        },
    },
}))
