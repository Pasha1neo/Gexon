import {useState} from 'react'
import AvatarImage from '../../../../assets/img/avatar.png'
import {InView} from 'react-intersection-observer'
import _ from 'lodash'
import {
    Avatar,
    Box,
    IconButton,
    ListItem,
    ListItemAvatar,
    ListItemText,
    TextField,
    Typography,
} from '@material-ui/core'
import {useStyles} from './message.style'
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined'
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined'

const Message = (props) => {
    const classes = useStyles()
    const {login, message, me, time, change, mid, inView, readed, delMessage} = props
    const [edit, setEdit] = useState(false)
    const [messagee, setMessage] = useState(message)
    function textChange(e) {
        if (e.keyCode === 13 && !e.shiftKey) {
            e.preventDefault()
            change(mid, messagee)
            setEdit(false)
        }
    }
    const setTextMessage = (e) => {
        setMessage(e.currentTarget.value)
    }
    if (inView && !me) {
        readed(mid)
    }

    return (
        <div className={classes.root}>
            <ListItem divider>
                <ListItemAvatar>
                    <Avatar src={AvatarImage} alt='Avatar' />
                </ListItemAvatar>
                <ListItemText
                    className={classes.messageText}
                    primary={
                        <Box className={classes.header}>
                            <Typography variant='body1'>{login}</Typography>
                            <Typography variant='caption' className={classes.time}>
                                {time.hm}
                            </Typography>
                        </Box>
                    }
                    secondary={
                        edit ? (
                            <TextField
                                multiline
                                fullWidth
                                margin='dense'
                                defaultValue={message}
                                message={message}
                                helperText='Измените сообщение'
                                variant='outlined'
                                onChange={(e) => setTextMessage(e)}
                                onKeyUp={(e) => textChange(e)}
                            />
                        ) : (
                            <Typography
                                variant='body2'
                                className={classes.text}
                                color='textPrimary'>
                                {message}
                            </Typography>
                        )
                    }
                />
                <Box className={classes.other}>
                    <IconButton
                        className={classes.otherButton}
                        onClick={() => setEdit(true)}
                        size='small'>
                        <CreateOutlinedIcon fontSize='small' />
                    </IconButton>
                    <IconButton
                        className={classes.otherButton}
                        onClick={() => delMessage(mid)}
                        size='small'>
                        <DeleteOutlineOutlinedIcon fontSize='small' />
                    </IconButton>
                </Box>
            </ListItem>
        </div>
    )
}

const MessageContainer = ({messages, users, me, change, readed, withMe, delMessage}) => {
    const messagesMap = messages.map((m) => {
        if (m.read) {
            return (
                <Message
                    delMessage={delMessage}
                    key={m.mid}
                    mid={m.mid}
                    message={m.message}
                    time={m.time}
                    read={m.read}
                    me={m.from === me}
                    login={_.find(users, {userID: m.from}).username}
                    change={change}
                    readed={readed}
                    withMe={withMe}
                />
            )
        }
        return (
            <InView key={m.mid}>
                {({inView, ref}) => {
                    return (
                        <Message
                            delMessage={delMessage}
                            mid={m.mid}
                            message={m.message}
                            time={m.time}
                            read={m.read}
                            me={m.from === me}
                            login={_.find(users, {userID: m.from}).username}
                            change={change}
                            readed={readed}
                            inView={inView}
                            MsgRef={ref}
                        />
                    )
                }}
            </InView>
        )
    })
    return <>{messagesMap}</>
}

export default MessageContainer
