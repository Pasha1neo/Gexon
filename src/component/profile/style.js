import {makeStyles} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    image: {
        width: '100%',
    },
    nickname: {
        marginTop: theme.spacing(1),
        [theme.breakpoints.down('xs')]: {
            fontSize: theme.typography.h5.fontSize,
        },
    },
    iconButton: {
        position: 'absolute',
        right: 0,
    },
    box: {
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    settings: {
        position: 'absolute',
        right: 0,
    },
    userPanel: {
        position: 'relative',
    },
    fileInput: {
        display: 'none',
    },
    changeName: {
        '& * input': {
            fontSize: theme.typography.h4.fontSize,
            padding: theme.spacing(0.8),
            [theme.breakpoints.down('xs')]: {
                width: 180,
                fontSize: theme.typography.h5.fontSize,
            },
        },
    },
    avatarContainer: {
        position: 'relative',
    },
    delAvatar: {
        position: 'absolute',
        right: 0,
    },
    uploadAvatar: {
        left: 0,
        position: 'absolute',
    },
    properties: {
        position: 'absolute',
        bottom: theme.spacing(2.2),
        left: theme.spacing(2.2),
        color: theme.palette.secondary.contrastText,
        [theme.breakpoints.down('sm')]: {
            position: 'static',
            '& > *': {fontSize: theme.typography.caption.fontSize},
        },
    },
    saveChanges: {
        backgroundColor: theme.palette.success.main,
    },
}))
export default useStyles
