import s from './chat.module.css'
import {Field} from 'redux-form'
import Message from './message/Message'
import Avatar from '../../../assets/img/avatar.png'
import Connection from '../../util/connection/connection'
import {reduxForm, reset} from 'redux-form'
import {useEffect, useRef} from 'react'

const Chat = ({dialog, handleSubmit}) => {
    const history = useRef(null)
    const scrollToBottom = () => {
        history.current.scrollIntoView({behavior: 'smooth'})
    }
    useEffect(() => {
        scrollToBottom()
    }, [dialog.messages])
    function formSubmite(e) {
        if (e.keyCode === 13 && !e.shiftKey) {
            e.preventDefault()
            handleSubmit()
            return false
        }
    }

    const messagesElements = dialog.messages.map((m) => {
        return <Message key={m.mid} login={'Pasha1neo'} message={m.message} />
    })
    return (
        <>
            <div className={s.chat}>
                <div className={s.header}>
                    <img src={Avatar} className={s.avatar} alt='avatar' />
                    <div className={s.about}>
                        <div className={s.companion}>{'PASHA1NEO'}</div>
                        <div className={s.total}>Много сообщений</div>
                    </div>
                </div>
                <div className={s.history} id={'history'}>
                    <div>{messagesElements}</div>
                    <div ref={history} />
                </div>
                <form onSubmit={handleSubmit} className={s.form}>
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
            {/* <Connection connection={props.connection}>
            </Connection> */}
        </>
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
