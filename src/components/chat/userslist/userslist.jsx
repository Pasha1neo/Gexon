import {Badge, Box, List, ListItem, ListItemIcon, ListItemText, Typography} from '@material-ui/core'
import FaceIcon from '@material-ui/icons/Face'
import {useStyles} from './userList.style'
import {NavLink} from 'react-router-dom'

const UsersList = (props) => {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <List className={classes.userList}>
                {props.users.map((user) => (
                    <>
                        <ListItem
                            divider
                            component={NavLink}
                            activeClassName={classes.active}
                            to={`/chat/${user.userID}`}
                            button
                            key={user.userID}>
                            <ListItemIcon>
                                <Badge
                                    color='secondary'
                                    className={classes.mail}
                                    badgeContent={0}
                                    showZero>
                                    <FaceIcon fontSize='large' />
                                </Badge>
                            </ListItemIcon>
                            <Box>
                                <ListItemText primary={user.username} />
                                <Typography noWrap className={classes.message}>
                                    Привет бро как дела?
                                </Typography>
                            </Box>
                        </ListItem>
                    </>
                ))}
            </List>
        </div>
    )
}
export default UsersList
