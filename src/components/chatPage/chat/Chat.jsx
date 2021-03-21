import s from './chat.module.css'
import {Component} from 'react'
import {Field} from 'redux-form'
import Message from './message/Message'
import Avatar from '../../../assets/img/avatar.png'
import Connection from '../../util/connection/connection'
import {reduxForm, reset} from 'redux-form'

class Chat extends Component {
    formSubmite(e) {
        if (e.keyCode === 13 && !e.shiftKey) {
            e.preventDefault()
            this.props.handleSubmit()
            return false
        }
    }
    render() {
        // .map((m) => {
        //     return <Message key={m.key} login={this.props.chatWith.name} message={m.value} />
        // })
        return (
            <>
                <Connection connection={this.props.connection}>
                    <div className={s.chat}>
                        <div className={s.header}>
                            <img src={Avatar} className={s.avatar} alt='avatar' />
                            <div className={s.about}>
                                <div className={s.companion}>{this.props.name}</div>
                                <div className={s.total}>Много сообщений</div>
                            </div>
                        </div>
                        <div className={s.history} id={'history'}>
                            {/* {messagesElements} */}
                        </div>
                        <form onSubmit={this.props.handleSubmit} className={s.form}>
                            <Field
                                component={'textarea'}
                                className={s.textarea}
                                type={'text'}
                                name={'message'}
                                placeholder={'Сообщение'}
                                onKeyUp={(e) => this.formSubmite(e)}
                            />
                            <button className={s.send}>Отправить</button>
                        </form>
                    </div>
                </Connection>
            </>
        )
    }
}

const ChatReduxForm = reduxForm({
    form: 'chatForm',
})(Chat)

const ChatHandler = ({sendMessage, ...props}) => {
    const onSubmit = (formValues, dispatch) => {
        sendMessage({
            toUserID: props.id,
            msg: formValues.message,
        })
        dispatch(reset('chatForm'))
    }
    return <ChatReduxForm {...props} onSubmit={onSubmit} />
}
export default ChatHandler
