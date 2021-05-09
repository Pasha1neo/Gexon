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
    Toolbar,
} from '@material-ui/core'
import SendIcon from '@material-ui/icons/Send'
import Message from './message/message'
import AvatarImage from '../../../assets/img/avatar.png'
import Connection from '../../util/connection/connection'
import React from 'react'
import _ from 'lodash'
import {useStyles} from './chat.style'
import MenuIcon from '@material-ui/icons/Menu'
import {Form, Field} from 'react-final-form'

const Chat = (props) => {
    const classes = useStyles()
    function change(mid, message) {
        props.changeMessage(props.dialog.wid, mid, message)
    }
    function readed(mid) {
        props.readMessage(props.dialog.wid, mid)
    }
    function delMessage(mid) {
        if (props.me !== props.dialog.wid) {
            window.confirm('Удалить сообщение у себя?')
        }
        props.deleteMessage(props.dialog.wid, mid)
    }
    const DialogTitle =
        (props.dialog.wid !== 'chat' &&
            _.find(props.users, {userID: props.dialog.wid})?.username) ||
        'Общий чат'

    return (
        <div className={classes.root}>
            <Toolbar className={classes.bar}>
                <Hidden only={['xl', 'lg', 'md']}>
                    <IconButton onClick={props.mobileOpen} className={classes.mobileUsersList}>
                        <MenuIcon fontSize='large' />
                    </IconButton>
                </Hidden>
                <Box className={classes.dialogContainer}>
                    <Avatar className={classes.avatar} alt='avatar' src={AvatarImage} />
                    <Typography variant='h6' className={classes.companion}>
                        {DialogTitle}
                    </Typography>
                </Box>
            </Toolbar>
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
            <Form
                onSubmit={({message}) => {
                    props.sendMessage({
                        tid: props.dialog.wid,
                        msg: message,
                    })
                }}>
                {({handleSubmit, form}) => (
                    <form onSubmit={props.handleSubmit} className={classes.footer}>
                        <Field name='message'>
                            {(props) => (
                                <TextField
                                    onKeyUp={(e) => {
                                        if (e.keyCode === 13 && !e.shiftKey) {
                                            e.preventDefault()
                                            handleSubmit()
                                            form.reset()
                                        }
                                    }}
                                    {...props.input}
                                    color='primary'
                                    multiline
                                    fullWidth
                                    variant='outlined'
                                    className={classes.textField}
                                    label='Введите сообщение'
                                />
                            )}
                        </Field>
                        <Hidden only={['xl', 'lg', 'md']}>
                            <IconButton
                                type='submit'
                                color='inherit'
                                className={classes.iconButton}>
                                <SendIcon fontSize='large' />
                            </IconButton>
                        </Hidden>
                        <Hidden only={['xs', 'sm']}>
                            <Button
                                variant='outlined'
                                type='submit'
                                endIcon={<SendIcon fontSize='small' />}
                                className={classes.button}>
                                Отправить
                            </Button>
                        </Hidden>
                    </form>
                )}
            </Form>
        </div>
    )
}

export default Chat
