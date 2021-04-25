import {
    Box,
    Button,
    Divider,
    TextField,
    Avatar,
    Typography,
    List,
    Hidden,
    IconButton,
} from '@material-ui/core'
import {Field, reduxForm, reset} from 'redux-form'
import SendIcon from '@material-ui/icons/Send'
import Message from './message/message'
import AvatarImage from '../../../assets/img/avatar.png'
import React from 'react'
import _ from 'lodash'
import {Redirect} from 'react-router'
import {useStyles} from './chat.style'

const ChatField = ({label, input, ...custom}) => <TextField label={label} {...input} {...custom} />

const Chat = (props) => {
    const classes = useStyles()

    function formSubmite(e) {
        if (e.keyCode === 13 && !e.shiftKey) {
            e.preventDefault()
            props.handleSubmit()
            return
        }
    }
    function change(mid, message) {
        props.changeMessage(props.dialog.wid, mid, message)
    }
    function readed(mid) {
        props.readMessage(props.dialog.wid, mid)
    }
    function delMessage(mid) {
        props.deleteMessage(props.dialog.wid, mid)
    }
    const chatname = () => {
        if (props.dialog.wid !== 'chat') {
            const x = _.find(props.users, {userID: props.dialog.wid})
            if (x) {
                return x.username
            }
            return <Redirect to={'/chat'} />
        } else {
            return 'Общий чат'
        }
    }

    return (
        <div className={classes.root}>
            <Box className={classes.bar}>
                <Avatar className={classes.avatar} alt='avatar' src={AvatarImage} />
                <Typography variant='h6' className={classes.companion}>
                    {chatname()}
                </Typography>
            </Box>
            <Divider />
            <List className={classes.history}>
                <Message
                    messages={props.dialog.messages}
                    change={change}
                    readed={readed}
                    delMessage={delMessage}
                    users={props.users}
                    me={props.me}
                    withMe={props.dialog.wid === props.me}
                />
            </List>
            <Divider />
            <form onSubmit={props.handleSubmit} className={classes.footer}>
                <Field
                    className={classes.textField}
                    component={ChatField}
                    label='Введите сообщение'
                    name='message'
                    color='primary'
                    multiline
                    autoFocus
                    fullWidth
                    variant='outlined'
                    onKeyUp={(e) => formSubmite(e)}
                />
                <Hidden only={['xs', 'sm']}>
                    <Button
                        variant='outlined'
                        type='submit'
                        endIcon={<SendIcon fontSize='small' />}
                        className={classes.button}
                        color='default'>
                        Отправить
                    </Button>
                </Hidden>
                <Hidden only={['xl', 'lg', 'md']}>
                    <IconButton
                        size='large'
                        onClick={props.logout}
                        color='inherit'
                        className={classes.iconButton}>
                        <SendIcon fontSize='small' />
                    </IconButton>
                </Hidden>
            </form>
        </div>
    )
}

const ChatReduxForm = reduxForm({
    form: 'chatForm',
})(Chat)

const ChatHandler = ({sendMessage, ...props}) => {
    const onSubmit = (formValues, dispatch) => {
        sendMessage({
            tid: props.dialog.wid,
            msg: formValues.message,
        })
        dispatch(reset('chatForm'))
    }
    return <ChatReduxForm {...props} onSubmit={onSubmit} />
}
export default ChatHandler
