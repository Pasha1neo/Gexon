import {
    Avatar,
    Divider,
    Link,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography,
} from '@material-ui/core'
import {Link as RouterLink} from 'react-router-dom'
import {connect} from 'react-redux'
import useStyles from './style'
import {avatarLink} from '../../config'
import {useEffect} from 'react'
import {compose} from 'redux'
import {getUsers} from '../../redux/actions/unauthorized'
import {Box} from '@material-ui/core'

function UsersList(props) {
    const classes = useStyles()
    useEffect(() => {
        props.getUsers()
    }, [])
    return (
        <div className={classes.root}>
            <Toolbar bgcolor='primary'>
                <Typography variant='h5' className={classes.title} noWrap>
                    Список пользователей:
                </Typography>
            </Toolbar>
            <Divider />
            <List className={classes.userList}>
                {props.users.map(({_id, login, nickname, avatar}) => {
                    return (
                        <ListItem className={classes.listItem} divider key={_id}>
                            <ListItemIcon>
                                <Avatar className={classes.large} src={avatarLink(avatar)}>
                                    Ава
                                </Avatar>
                            </ListItemIcon>
                            <Box className={classes.box}>
                                <Link component={RouterLink} to={`/profile/${_id}`}>
                                    <ListItemText primary={nickname || login} />
                                </Link>
                                {props.isAuth && (
                                    <Link
                                        color='inherit'
                                        component={RouterLink}
                                        to={`/chat/${_id}`}>
                                        Написать сообщение
                                    </Link>
                                )}
                            </Box>
                        </ListItem>
                    )
                })}
            </List>
        </div>
    )
}

const mapStateToProps = (state) => ({
    users: state.app.users,
    isAuth: state.app.authStatus,
})
export default compose(connect(mapStateToProps, {getUsers}))(UsersList)
