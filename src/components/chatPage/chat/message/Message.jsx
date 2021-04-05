import s from './message.module.css'
import {useState} from 'react'
import Avatar from '../../../../assets/img/avatar.png'
import Pen from '../../../../assets/img/pen.svg'
import Del from '../../../../assets/img/del.png'
import {InView} from 'react-intersection-observer'
import _ from 'lodash'

const Message = ({
    login,
    message,
    me,
    time,
    read,
    change,
    mid,
    inView,
    MsgRef,
    readed,
    withMe,
    delMessage,
}) => {
    const [edit, setEdit] = useState(false)
    const [messagee, setMessage] = useState(message)

    function textChange(e) {
        if (e.keyCode === 13 && !e.shiftKey) {
            e.preventDefault()
            change(mid, messagee)
            setEdit(false)
        }
    }
    const setTextMessage = (e) => {
        setMessage(e.currentTarget.value)
    }

    if (inView && !me) {
        readed(mid)
    }
    return (
        <div className={`${me ? `${s.message} ${s.me}` : s.message}`} ref={MsgRef}>
            <div className={s.avatarContainer}>
                <img src={Avatar} alt='Avatar' className={s.avatar} />
            </div>
            <div className={s.messageBody}>
                <div className={s.header}>
                    <div className={s.name}>{login}</div>
                    <div className={s.time}>{time.hm}</div>
                </div>
                {edit ? (
                    <input
                        type='text'
                        className={s.textChange}
                        value={messagee}
                        onChange={(e) => {
                            setTextMessage(e)
                        }}
                        onKeyUp={(e) => {
                            textChange(e)
                        }}
                    />
                ) : (
                    <div className={s.text}>{message}</div>
                )}
                {me && !withMe && (
                    <div className={s.read}>{read ? 'прочитано' : 'непрочитано'}</div>
                )}
            </div>
            {me && (
                <div className={s.functions}>
                    <img
                        src={Pen}
                        className={s.change}
                        alt='change'
                        onClick={() => {
                            setEdit(true)
                        }}
                    />
                    <img
                        src={Del}
                        className={s.change}
                        alt='change'
                        onClick={() => {
                            delMessage(mid)
                        }}
                    />
                </div>
            )}
        </div>
    )
}

const MessageContainer = ({messages, users, me, change, readed, withMe, delMessage}) => {
    const messagesMap = messages.map((m) => {
        if (m.read) {
            return (
                <Message
                    delMessage={delMessage}
                    key={m.mid}
                    mid={m.mid}
                    message={m.message}
                    time={m.time}
                    read={m.read}
                    me={m.from === me}
                    login={_.find(users, {userID: m.from}).username}
                    change={change}
                    readed={readed}
                    withMe={withMe}
                />
            )
        }
        return (
            <InView key={m.mid}>
                {({inView, ref}) => {
                    return (
                        <Message
                            delMessage={delMessage}
                            mid={m.mid}
                            message={m.message}
                            time={m.time}
                            read={m.read}
                            me={m.from === me}
                            login={_.find(users, {userID: m.from}).username}
                            change={change}
                            readed={readed}
                            inView={inView}
                            MsgRef={ref}
                        />
                    )
                }}
            </InView>
        )
    })
    return <>{messagesMap}</>
}

export default MessageContainer
