import {useState} from 'react'
import AvatarImage from '../../../../assets/img/avatar.png'
import {InView, useInView} from 'react-intersection-observer'
import _ from 'lodash'
import {
    Avatar,
    Box,
    Grow,
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
import DoneAllIcon from '@material-ui/icons/DoneAll'

const Message = (props) => {
    const classes = useStyles()
    const {name, mid, text, time, read, my, me, deleted, change, withMe, viewRef} = props

    const [edit, setEdit] = useState(false)
    const [messagee, setMessage] = useState(text)

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
    return (
        <div className={classes.root} ref={viewRef}>
            <ListItem divider>
                <ListItemAvatar>
                    <Avatar src={AvatarImage} alt='Avatar' />
                </ListItemAvatar>
                <ListItemText
                    className={classes.messageText}
                    primary={
                        <Box className={classes.header}>
                            <Typography variant='body1'>{name}</Typography>
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
                                defaultValue={text}
                                message={text}
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
                                {text}
                            </Typography>
                        )
                    }
                />
                <Box className={classes.other}>
                    {read && (
                        <IconButton
                            className={classes.otherButton}
                            onClick={() =>
                                alert('Здесь будет показано время прочитанного сообщения')
                            }
                            size='small'>
                            <DoneAllIcon fontSize='small' />
                        </IconButton>
                    )}
                    <IconButton
                        className={classes.otherButton}
                        onClick={() => deleted(mid)}
                        size='small'>
                        <DeleteOutlineOutlinedIcon fontSize='small' />
                    </IconButton>
                    {my && (
                        <IconButton
                            className={classes.otherButton}
                            onClick={() => setEdit(true)}
                            size='small'>
                            <CreateOutlinedIcon fontSize='small' />
                        </IconButton>
                    )}
                </Box>
            </ListItem>
        </div>
    )
}

const MessageContainer = (props) => {
    const required = {
        deleted: props.delMessage,
        change: props.change,
        readed: props.readed,
        me: props.me,
    }
    const messagesMap = props.messages.map((m) => {
        return (
            <InView key={m.mid}>
                {({inView, ref}) => {
                    const message = {
                        name: _.find(props.users, {userID: m.from}).username,
                        mid: m.mid,
                        text: m.message,
                        time: m.time,
                        read: m.read && !props.withMe,
                        my: m.from === props.me,
                        viewRef: !m.read ? ref : null,
                    }
                    if (inView && m.from !== props.me) {
                        props.readed(m.mid)
                    }
                    return <Message {...required} {...message} />
                }}
            </InView>
        )
    })
    return <>{messagesMap}</>
}
export default MessageContainer
