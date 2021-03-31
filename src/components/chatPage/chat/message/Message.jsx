import s from './message.module.css'
import {useEffect, useRef} from 'react'
import Avatar from '../../../../assets/img/avatar.png'

const Message = ({login, message, me}) => {
    return (
        <>
            <div className={`${me ? `${s.message} ${s.me}` : s.message}`}>
                <div className={s.avatarContainer}>
                    <img src={Avatar} alt='Avatar' className={s.avatar} />
                </div>
                <div className={s.messageBody}>
                    <div className={s.header}>
                        <div className={s.name}>{login}</div>
                        <div className={s.time}>11:01</div>
                    </div>
                    <div className={s.text}>{message}</div>
                </div>
            </div>
        </>
    )
}
export default Message
