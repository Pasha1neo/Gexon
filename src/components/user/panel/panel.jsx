import {Button, IconButton, Container, Box, Hidden, Typography, Avatar} from '@material-ui/core'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import {NavLink} from 'react-router-dom'
import {useStyles} from './panel.style'
import AVATAR from '../../../assets/img/avatar.png'
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
                    {props.nickname}
                </Button>
            </Hidden>
            <IconButton
                onClick={() => {
                    alert('Ещё не готово')
                }}>
                <Avatar
                    className={classes.avatar}
                    alt={`${props.nickname}-avatar`}
                    src={
                        props.avatar
                            ? `https://project-adaptive-server.herokuapp.com/${props.avatar}`
                            : AVATAR
                    }>
                    {props.nickname.slice(0, 1).toUpperCase()}
                </Avatar>
            </IconButton>
            <Hidden only={['xs', 'sm']}>
                <Button
                    color='inherit'
                    className={classes.button}
                    onClick={props.signOut}
                    endIcon={<ExitToAppIcon />}>
                    Выйти
                </Button>
            </Hidden>
            <Hidden only={['xl', 'lg', 'md']}>
                <IconButton onClick={props.signOut} color='inherit' className={classes.iconButton}>
                    <ExitToAppIcon fontSize='large' />
                </IconButton>
            </Hidden>
        </div>
    )
}
export default Panel
