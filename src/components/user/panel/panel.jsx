import {Button, IconButton, Hidden, Avatar} from '@material-ui/core'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import {NavLink} from 'react-router-dom'
import avatarImage from '../../../assets/img/avatar.png'
import {useStyles} from './panel.style'

const Panel = (props) => {
    const classes = useStyles()
    return (
        <div className={classes.root}>
            <Hidden only={['xs', 'sm']}>
                <Button
                    component={NavLink}
                    color='inherit'
                    activeClassName={classes.active}
                    to='/profile'>
                    {props.login}
                </Button>
            </Hidden>
            <IconButton
                onClick={() => {
                    alert('Ещё не готово')
                }}>
                <Avatar className={classes.avatar} alt={`${props.login}-avatar`} src={avatarImage}>
                    {props.login.slice(0, 1).toUpperCase()}
                </Avatar>
            </IconButton>
            <Hidden only={['xs', 'sm']}>
                <Button
                    color='inherit'
                    className={classes.button}
                    onClick={props.logout}
                    endIcon={<ExitToAppIcon />}>
                    Выйти
                </Button>
            </Hidden>
            <Hidden only={['xl', 'lg', 'md']}>
                <IconButton
                    size='large'
                    onClick={props.logout}
                    color='inherit'
                    className={classes.iconButton}>
                    <ExitToAppIcon fontSize='large' />
                </IconButton>
            </Hidden>
        </div>
    )
}
export default Panel
