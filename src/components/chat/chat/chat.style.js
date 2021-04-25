import {makeStyles} from '@material-ui/core'

export const useStyles = makeStyles((theme) => ({
    root: {
        maxHeight: '100%',
        display: 'flex',
        flexGrow: 1,
        flexDirection: 'column',
        borderLeft: `1px solid ${theme.palette.divider}`,
    },
    bar: {
        backgroundColor: theme.palette.primary.main,
        display: 'flex',
        flexGrow: 0,
        padding: '1rem',
        justifyContent: 'center',
    },
    avatar: {
        marginRight: 20,
    },
    history: {
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        overflowY: 'auto',
        overflowX: 'none',
        padding: theme.spacing(3),
        maxHeight: '100%',
    },
    footer: {
        display: 'flex',
        flexGrow: 0,
        padding: theme.spacing(2),
    },
    textField: {
        border: '1px',
    },
    button: {
        marginLeft: theme.spacing(2),
        '& > span': {
            padding: 3,
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
}))
