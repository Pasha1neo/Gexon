import {makeStyles} from '@material-ui/core'
export const useStyles = makeStyles((theme) => {
    const vh = window.innerHeight * 0.01 * 100 //проблема viewport на мобилах решается так
    return {
        root: {
            display: 'flex',
        },
        content: {
            flexGrow: 1,
            height: `100vh`,
            [theme.breakpoints.down('xs')]: {
                padding: 0,
                height: `${vh}px;`,
            },
        },
        appBarSpacer: theme.mixins.toolbar,
        container: {
            height: `clamp(400px, 100%, calc(100% - 64px))`,
            paddingTop: theme.spacing(4),
            paddingBottom: theme.spacing(4),
            [theme.breakpoints.down('xs')]: {
                padding: 0,
                paddingTop: theme.spacing(2),
                height: `clamp(400px, 100%, calc(100% - 56px))`,
            },
        },
    }
})
