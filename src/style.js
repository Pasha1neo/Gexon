import {makeStyles} from '@material-ui/core'

export const useStyles = makeStyles((theme) => {
    return {
        root: {
            display: 'flex',
        },
        appBarSpacer: theme.mixins.toolbar,
        content: {
            flexGrow: 1,
            overflow: 'auto',
            height: '100vh',
            flexDirection: 'column',
            display: 'flex',
        },
        container: {
            height: '93%',
            flexGrow: 1,
            paddingTop: theme.spacing(4),
            paddingBottom: theme.spacing(4),
        },
    }
})
