import s from './chat.module.css'
import socket from '../../redux/sagas/sockets'

import {Field, reduxForm} from 'redux-form'
import {PureComponent, useEffect, useRef} from 'react'

const Message = ({login, message}) => {
    const bottom = useRef(null)
    useEffect(() => {
        bottom.current.scrollIntoView({behavior: 'smooth'})
    }, [])
    return (
        <div className={s.message}>
            <span className={s.messageLogin}>{login}:</span>
            <span className={s.messageText}>{message}</span>
            <div ref={bottom} />
        </div>
    )
}

class ChatForm extends PureComponent {
    // componentDidMount() {
    // this.uploads()
    // socket.on('message', (message) => {
    //     this.props.addMessage(message)
    // })
    // }
    // uploads() {
    // socket.emit('upload_message', (data) => {
    //     this.props.uploadMessages(data)
    // })
    // }
    // componentWillUnmount() {
    // socket.off('message')
    // }
    render() {
        const messagesElements = this.props.messageData.map((m) => {
            return <Message key={m.mid} login={m.login} message={m.message} />
        })
        return (
            <div className={s.chat}>
                <div className={s.messages}>{messagesElements}</div>
                <form onSubmit={this.props.handleSubmit} className={s.form}>
                    <Field
                        component={'textarea'}
                        className={s.textarea}
                        type={'text'}
                        name={'message'}
                        placeholder={'Сообщение'}
                    />
                    <button className={s.send}>Отправить</button>
                </form>
            </div>
        )
    }
}

const ChatReduxForm = reduxForm({
    form: 'chatForm',
})(ChatForm)

const Chat = ({login, userId, message, ...props}) => {
    const sendMessage = ({message}) => {
        // socket.emit('message', {
        //     login,
        //     userId,
        //     message,
        // })
    }

    return <ChatReduxForm {...props} onSubmit={sendMessage} />
}

export default Chat
