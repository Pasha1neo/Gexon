import _ from 'lodash'
import {
    Badge,
    Box,
    Dialog,
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography,
    withWidth,
} from '@material-ui/core'
import FaceIcon from '@material-ui/icons/Face'
import {useStyles} from './userList.style'
import {NavLink} from 'react-router-dom'
import CloseIcon from '@material-ui/icons/Close'

const UsersList = (props) => {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <Toolbar bgcolor='primary'>
                {props.isOpen && (
                    <IconButton
                        className={classes.close}
                        color='inherit'
                        onClick={props.mobileClose}>
                        <CloseIcon fontSize='large' />
                    </IconButton>
                )}
                <Typography className={classes.title} noWrap>
                    Список диалогов:
                </Typography>
            </Toolbar>
            <Divider />
            <List className={classes.userList}>
                {props.users.map((user) => {
                    const CurrentUser = _.find(props.dialogsData, {wid: user.userID})
                    const count = _.filter(CurrentUser?.messages, {read: false, from: user.userID})
                        ?.length
                    const LM = _.last(CurrentUser?.messages)
                    const name = LM?.from === props.me && 'Вы: '
                    const unread = LM?.from === props.me && !LM?.read
                    return (
                        <ListItem
                            divider
                            component={NavLink}
                            activeClassName={classes.active}
                            to={`/chat/${user.userID}`}
                            button
                            onClick={() => props.isOpen && props.mobileClose()}
                            key={user.userID}>
                            <ListItemIcon>
                                <Badge
                                    className={classes.unread}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'right',
                                    }}
                                    overlap='circle'
                                    variant='dot'
                                    invisible={!unread}>
                                    <Badge color='secondary' badgeContent={count}>
                                        <FaceIcon
                                            color='error'
                                            className={user.connected && classes.online}
                                            fontSize='large'
                                        />
                                    </Badge>
                                </Badge>
                            </ListItemIcon>
                            <div className={classes.box}>
                                <ListItemText primary={user.username} />
                                <Typography noWrap>
                                    {name}
                                    {LM?.message}
                                </Typography>
                            </div>
                        </ListItem>
                    )
                })}
            </List>
        </div>
    )
}

const Mobile = ({isOpen, close, children}) => {
    return (
        <Dialog fullScreen open={isOpen} onClose={close}>
            {children}
        </Dialog>
    )
}

const UserListContainer = ({width, ...other}) => {
    const {isOpen, mobileClose} = other
    if (width === 'xs' || width === 'sm') {
        return (
            <Mobile isOpen={isOpen} close={mobileClose}>
                <UsersList {...other} />
            </Mobile>
        )
    } else {
        return (
            <Box width={300}>
                <UsersList {...other} />
            </Box>
        )
    }
}
export default withWidth()(UserListContainer)
