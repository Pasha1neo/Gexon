import {makeStyles} from '@material-ui/core/styles'

export const useStyles = makeStyles((theme) => {
    return {
        textField: {
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(1),
        },
        tabPanel: {
            margin: 'auto',
        },
        ActiveIndicator: {
            backgroundColor: theme.palette.primary.main,
        },
        close: {
            position: 'absolute',
            right: 5,
            top: 2,
        },
        checkbox: {
            marginRight: 'auto',
        },
        content: {
            height: 358,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-evenly',
        },
        submit: {
            width: 170,
            background: `linear-gradient(170deg, rgba(99, 221, 23,0.8) 20%, rgba(99, 221, 23,0.7) 40%, rgba(99, 221, 23,0.6) 60%, rgba(99, 221, 23,0.5) 80%)`,
            textShadow: '#021a08 0 0 10px',
            margin: 'auto',
            padding: theme.spacing(1.5),
            marginBottom: theme.spacing(3),
        },
    }
})
