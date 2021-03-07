import s from './chat.module.css'
import {Field, reduxForm, reset} from 'redux-form'
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
    componentDidMount() {
        this.props.getMessages()
    }
    componentWillUnmount() {
        this.props.disconnect()
    }
    render() {
        const messagesElements = this.props.messageData.map((m) => {
            return <Message key={m.mid} login={m.login} message={m.message} />
        })
        return (
            <div>
                <div className={s.chat}>
                    {!this.props.connection && (
                        <div className={s.connection}>
                            <div className={s.ldsFacebook}>
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
                        </div>
                    )}
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
            </div>
        )
    }
}

const ChatReduxForm = reduxForm({
    form: 'chatForm',
})(ChatForm)

const Chat = ({sendMessage, login, ...props}) => {
    const onSubmit = (formValues, dispatch) => {
        sendMessage({
            message: formValues.message,
            login: login,
        })
        dispatch(reset('chatForm'))
    }
    return <ChatReduxForm {...props} onSubmit={onSubmit} />
}

export default Chat
