import _ from 'lodash'
import {
    Avatar,
    Badge,
    Button,
    Divider,
    Link,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography,
} from '@material-ui/core'
import FaceIcon from '@material-ui/icons/Face'
import {useStyles} from './userList.style'
import {Link as RouterLink} from 'react-router-dom'

const UsersList = (props) => {
    const classes = useStyles()

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
                        <ListItem divider key={_id}>
                            <ListItemIcon>
                                <Avatar className={classes.large}>
                                    {avatar ? (
                                        <img
                                            height='100%'
                                            src={`https://project-adaptive-server.herokuapp.com/${avatar}`}
                                        />
                                    ) : (
                                        login[0]
                                    )}
                                </Avatar>
                            </ListItemIcon>
                            <div className={classes.box}>
                                <Link component={RouterLink} to={`/profile/${_id}`}>
                                    <ListItemText primary={login} />
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

export default UsersList
