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
import React from 'react'
import {useStyles} from './chat.style'
import MenuIcon from '@material-ui/icons/Menu'
import {Form, Field} from 'react-final-form'

const Chat = (props) => {
    const classes = useStyles()
    function change(mid, text) {
        props.changeMessage(props.dialog.wid, mid, text)
    }
    function readed(mid) {
        props.readMessage(props.dialog.wid, mid)
    }
    function delMessage(mid, my) {
        if (!my) {
            window.confirm('Удалить? (только у себя)')
        }
        props.deleteMessage(props.dialog.wid, mid)
    }
    const dialog = (() => {
        const nickname = props?.withUser?.nickname
        const login = props?.withUser?.login
        const avatar = props?.withUser?.avatar
        return {
            name: nickname || login,
            avatar: avatar
                ? `https://project-adaptive-server.herokuapp.com/${avatar}`
                : AvatarImage,
        }
    })()
    return (
        <div className={classes.root}>
            <Toolbar className={classes.bar}>
                <Hidden only={['xl', 'lg', 'md']}>
                    <IconButton onClick={props.mobileOpen} className={classes.mobileUsersList}>
                        <MenuIcon fontSize='large' />
                    </IconButton>
                </Hidden>
                <Box className={classes.dialogContainer}>
                    <Avatar className={classes.avatar} alt='avatar' src={dialog?.avatar} />
                    <Typography variant='h6' className={classes.companion}>
                        {dialog?.name}
                    </Typography>
                </Box>
            </Toolbar>
            <List className={classes.history}>
                <Message
                    wid={props.dialog?.wid}
                    userId={props.userId}
                    messages={props.dialog?.messages}
                    change={change}
                    readed={readed}
                    delMessage={delMessage}
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
                                onClick={() => {
                                    handleSubmit()
                                    form.reset()
                                }}
                                color='inherit'
                                className={classes.iconButton}>
                                <SendIcon fontSize='large' />
                            </IconButton>
                        </Hidden>
                        <Hidden only={['xs', 'sm']}>
                            <Button
                                onClick={() => {
                                    handleSubmit()
                                    form.reset()
                                }}
                                variant='outlined'
                                type='button'
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
