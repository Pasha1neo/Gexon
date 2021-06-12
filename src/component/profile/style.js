import {makeStyles} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    userPanel: {
        position: 'relative',
        display: 'flex',
    },
    nickname: {
        marginTop: theme.spacing(1),
        [theme.breakpoints.down('xs')]: {
            fontSize: theme.typography.h5.fontSize,
        },
    },
    media: {
        padding: theme.spacing(1.5),
        width: 300,
        height: 300,
        [theme.breakpoints.down('sm')]: {
            width: 200,
            height: 200,
        },
    },
    avatar: {
        width: '100%',
        height: '100%',
    },
    changeName: {
        '& label': {
            fontSize: theme.typography.caption.fontSize,
        },
        '& * input': {
            fontSize: theme.typography.h5.fontSize,
            padding: theme.spacing(0.8),
            [theme.breakpoints.down('xs')]: {
                width: 180,
                fontSize: theme.typography.h6.fontSize,
            },
        },
        '& * span': {
            width: 92, // Тэг спан не меняет отображение текста поэтому ему задаю только Ширину
        },
    },
    actions: {
        flexGrow: 0,
        display: 'flex',
        flexDirection: 'column',
    },
    content: {flexGrow: 1},
    properties: {
        width: '100%',
        bottom: theme.spacing(2.2),
        left: theme.spacing(2.2),
        color: theme.palette.secondary.contrastText,
        [theme.breakpoints.down('sm')]: {
            position: 'static',
            '& > *': {fontSize: theme.typography.caption.fontSize},
        },
    },
    avatarContainer: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        padding: theme.spacing(0.5),
    },
    saveButton: {
        backgroundColor: theme.palette.success.main,
        position: 'absolute',
        bottom: 10,
        right: 10,
    },
    button: {
        fontSize: theme.typography.caption.fontSize,
        marginBottom: theme.spacing(1),
    },
    moreMenuItem: {padding: 4},
    fileInput: {display: 'none'},
}))
export default useStyles
