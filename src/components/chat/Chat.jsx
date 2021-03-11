import s from './chat.module.css'
import {Field, reduxForm, reset} from 'redux-form'
import {Component} from 'react'
import Message from './message/Message'
import Avatar from '../../assets/img/avatar.png'
import Connection from '../util/connection/connection'

class ChatForm extends Component {
    componentDidMount() {
        this.props.connectChat()
        this.props.getMessages()
    }
    componentWillUnmount() {
        this.props.disconnect()
    }

    render() {
        const messagesElements = this.props.messageData.map((m) => {
            return <Message key={m.mid} login={m.login} message={m.message} />
        })

        function formSubmite(e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                this.props.handleSubmit()
            }
        }
        return (
            <div className={s.chatBody}>
                <Connection connection={this.props.connection}>
                    <div className={s.chat}>
                        <div className={s.header}>
                            <img src={Avatar} className={s.avatar} alt='avatar' />

                            <div className={s.about}>
                                <div className={s.companion}>Новиков Паша</div>
                                <div className={s.total}>Отправил дохуилярд сообщений</div>
                            </div>
                        </div>
                        <div className={s.history} id={'history'}>
                            {messagesElements}
                        </div>
                        <form onSubmit={this.props.handleSubmit} className={s.form}>
                            <Field
                                component={'textarea'}
                                className={s.textarea}
                                type={'text'}
                                name={'message'}
                                placeholder={'Сообщение'}
                                onKeyUp={(e) => formSubmite(e)}
                            />
                            <button className={s.send}>Отправить</button>
                        </form>
                    </div>
                </Connection>
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
