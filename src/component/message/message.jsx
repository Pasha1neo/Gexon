import {useState} from 'react'
import {InView} from 'react-intersection-observer'
import useStyles from './style'
import DoneIcon from '@material-ui/icons/Done'
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined'
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined'
import DoneAllIcon from '@material-ui/icons/DoneAll'
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
import {avatarLink} from '../../config'

const Message = (props) => {
  const classes = useStyles()
  const {deleted, change, mid, name, text, time, read, my, avatar} = props
  const [edit, setEdit] = useState(false)
  const [messagee, setMessage] = useState(text)

  function textChange(e) {
    if (e.keyCode === 13 && !e.shiftKey) {
      e.preventDefault()
      change(mid, messagee)
      setEdit(false)
      return false
    }
  }
  const setTextMessage = (e) => {
    setMessage(e.currentTarget.value)
  }
  return (
    <div className={classes.root}>
      <ListItem divider>
        <ListItemAvatar>
          <Avatar src={avatar} alt='Avatar' />
        </ListItemAvatar>
        <ListItemText
          className={classes.messageText}
          primary={
            <Box className={classes.header}>
              <Typography variant='body1'>{name}</Typography>
              <Typography variant='caption' className={classes.time}>
                {time}
              </Typography>
            </Box>
          }
          secondaryTypographyProps={{
            component: 'span',
            variant: 'body2',
            className: classes.text,
            color: 'textPrimary',
          }} //передаёт вторичному компоненту свойства
          secondary={
            edit ? (
              <TextField
                multiline
                fullWidth
                margin='dense'
                defaultValue={text}
                helperText='Измените сообщение'
                variant='outlined'
                onChange={(e) => setTextMessage(e)}
                onKeyDown={(e) => textChange(e)}
              />
            ) : (
              text
            )
          }
        />
        <Box className={classes.other}>
          {read && my && (
            <IconButton
              className={classes.otherButton}
              onClick={() => alert('Здесь будет показано время прочитанного сообщения')}
              size='small'>
              <DoneAllIcon fontSize='small' />
            </IconButton>
          )}
          <IconButton className={classes.otherButton} onClick={() => deleted(mid, my)} size='small'>
            <DeleteOutlineOutlinedIcon fontSize='small' />
          </IconButton>
          {my && (
            <IconButton
              className={classes.otherButton}
              onClick={() => {
                if (edit) {
                  if (messagee !== text) change(mid, messagee)
                }
                setEdit(!edit)
              }}
              size='small'>
              {edit ? <DoneIcon fontSize='small' /> : <CreateOutlinedIcon fontSize='small' />}
            </IconButton>
          )}
        </Box>
      </ListItem>
    </div>
  )
}

const MessageContainer = (props) => {
  const methods = {
    deleted: props.delMessage,
    change: props.change,
  }
  const messagesMap = props?.messages?.map((m) => {
    const message = {
      mid: m._id,
      name: m.fromUser.nickname || m.fromUser.login,
      text: m.text,
      time: m.created,
      read: m.read,
      my: m.fromUser._id === props.userId,
      avatar: avatarLink(m.fromUser.avatar),
    }
    if (m.fromUser._id !== props.userId) {
      if (!m.read) {
        return (
          <InView
            key={m._id}
            as='div'
            onChange={(inView) => {
              if (inView) {
                props.readed(m._id)
              }
            }}>
            <Message {...message} {...methods} />
          </InView>
        )
      }
    }
    return <Message key={m._id} {...message} {...methods} />
  })
  return <>{messagesMap}</>
}
export default MessageContainer
