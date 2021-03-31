import s from './chat.module.css'
import {Field} from 'redux-form'
import Message from './message/Message'
import Avatar from '../../../assets/img/avatar.png'
import Connection from '../../util/connection/connection'
import {reduxForm, reset} from 'redux-form'
import React, {useEffect, useRef, useState} from 'react'
import _ from 'lodash'

const Chat = (props) => {
    const history = useRef(null)

    useEffect(() => {
        history.current.scrollIntoView({behavior: 'smooth'})
    }, [props.dialog.messages])
    function formSubmite(e) {
        if (e.keyCode === 13 && !e.shiftKey) {
            e.preventDefault()
            props.handleSubmit()
            return false
        }
    }
    const messagesElements = props.dialog.messages.map((m) => {
        return (
            <Message
                key={m.mid}
                login={_.find(props.users, {userID: m.from}).username}
                message={m.message}
                me={m.from === props.me}
            />
        )
    })

    const chatname =
        props.dialog.wid !== 'chat'
            ? _.find(props.users, {userID: props.dialog.wid}).username
            : 'Общий чат'
    return (
        <>
            <Connection connection={props.connect}>
                <div className={s.chat}>
                    <div className={s.header}>
                        <img src={Avatar} className={s.avatar} alt='avatar' />
                        <div className={s.about}>
                            <div className={s.companion}>{chatname}</div>
                            <div className={s.total}>{props.dialog.messages.length}</div>
                        </div>
                    </div>
                    <div className={s.history} id={'history'}>
                        {messagesElements}
                        <div ref={history} />
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
