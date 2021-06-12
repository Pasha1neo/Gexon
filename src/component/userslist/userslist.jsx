import _ from 'lodash'
import useStyles from './style'
import {NavLink} from 'react-router-dom'
import {useMemo} from 'react'
import CloseIcon from '@material-ui/icons/Close'
import {
    Avatar,
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
import {avatarLink} from '../../config'

const UsersList = (props) => {
    const classes = useStyles()
    const users = useMemo(() => {
        return props.users.map((user) => {
            const nickname = user?.nickname || user.login
            const dialog = _.find(props.dialogs, {wid: user._id})
            const m = {
                name: null,
                text: null,
                read: true,
                unread: null,
                time: null,
                data: null, // сделать дату и время
            }
            const last = _.last(dialog?.messages) || null
            if (last) {
                const {fid, read, text, data, time} = last
                m.name = fid._id === props.userId ? 'Вы' : fid.nickname || fid.login
                m.text = `: ${text}`
                if (dialog.wid !== props.userId) m.read = read
                m.unread = (() => {
                    return _.countBy(dialog.messages, {
                        read: false,
                        fid: {_id: dialog.wid === props.userId || dialog.wid},
                    })
                })()?.true
                m.time = time
                m.data = data
            }

            return (
                <ListItem
                    divider
                    component={NavLink}
                    activeClassName={classes.active}
                    to={`/chat/${user._id}`}
                    button
                    onClick={() => props.isOpen && props.mobileClose()}
                    key={user._id}>
                    <ListItemIcon>
                        <Badge
                            className={classes.unread}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                            overlap='circle'
                            variant='dot'
                            invisible={m.read}>
                            <Badge color='secondary' badgeContent={m.unread}>
                                <Avatar
                                    className={user.onlineStatus ? classes.online : classes.avatar}
                                    alt={`${nickname}-avatar`}
                                    src={avatarLink(user.avatar)}>
                                    {nickname.slice(0, 1).toUpperCase()}
                                </Avatar>
                            </Badge>
                        </Badge>
                    </ListItemIcon>
                    <div className={classes.box}>
                        <ListItemText primary={nickname} />
                        <Typography noWrap>
                            {m.name}
                            {m.text}
                        </Typography>
                    </div>
                </ListItem>
            )
        })
    }, [props, classes])

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
            <List className={classes.userList}>{users}</List>
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
