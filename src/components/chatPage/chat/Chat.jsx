import s from './chat.module.css'
import {Field} from 'redux-form'
import MessageContainer from './message/Message'
import Avatar from '../../../assets/img/avatar.png'
import Connection from '../../util/connection/connection'
import {reduxForm, reset} from 'redux-form'
import React from 'react'
import _ from 'lodash'
import {Redirect} from 'react-router'

const Chat = (props) => {
    function formSubmite(e) {
        if (e.keyCode === 13 && !e.shiftKey) {
            e.preventDefault()
            props.handleSubmit()
            return false
        }
    }
    function change(mid, message) {
        props.changeMessage(props.dialog.wid, mid, message)
    }
    function readed(mid) {
        props.readMessage(props.dialog.wid, mid)
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
        <>
            <Connection connection={props.connect}>
                <div className={s.chat}>
                    <div className={s.header}>
                        <img src={Avatar} className={s.avatar} alt='avatar' />
                        <div className={s.about}>
                            <div className={s.companion}>{chatname()}</div>
                            <div className={s.total}>{props.dialog.messages.length}</div>
                        </div>
                    </div>
                    <div className={s.history} id={'history'}>
                        <MessageContainer
                            messages={props.dialog.messages}
                            change={change}
                            readed={readed}
                            users={props.users}
                            me={props.me}
                        />
                    </div>
                    <form onSubmit={props.handleSubmit} className={s.form}>
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
