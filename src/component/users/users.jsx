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
import {withRouter} from 'react-router'
import {connect} from 'react-redux'
import {compose} from 'redux'
import useStyles from './style'
import {avatarLink} from '../../config'
const UsersList = (props) => {
    const classes = useStyles()

    return (
        //Сделать онлайн статус например
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
                        <ListItem divider key={_id}>
                            <ListItemIcon>
                                <Avatar className={classes.large} src={avatarLink(avatar)}>
                                    Ава
                                </Avatar>
                            </ListItemIcon>
                            <div className={classes.box}>
                                <Link component={RouterLink} to={`/profile/${_id}`}>
                                    <ListItemText primary={nickname || login} />
                                </Link>
                                <Link color='inherit' component={RouterLink} to={`/chat/${_id}`}>
                                    Написать сообщение
                                </Link>
                            </div>
                        </ListItem>
                    )
                })}
            </List>
        </div>
    )
}

const UsersContainer = (props) => {
    return <UsersList users={props.users} />
}

const mapStateToProps = (state) => ({
    users: state.user.users,
})
export default compose(withRouter, connect(mapStateToProps, {}))(UsersContainer)
