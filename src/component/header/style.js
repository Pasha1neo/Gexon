import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    navLinks: {
        margin: 'auto',
    },
    active: {
        color: theme.palette.active,
    },
}))
export default useStyles
