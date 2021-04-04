import s from './user.module.css'
import Avatar from '../../../../assets/img/avatar.png'
import {NavLink} from 'react-router-dom'

const User = ({id, name, online, data, me}) => {
    const msg = {
        message: data.last ? data.last.message : null,
        read: data.last ? !data.last.read && data.last.from === me : null,
        unread: data.count ? data.count : false,
        name: data.last ? data.last.from === me && 'Вы:' : null,
    }
    return (
        <NavLink className={s.user} to={`/chat/${id}`} activeClassName={s.active}>
            <img
                className={`${online ? `${s.avatar} ${s.online}` : s.avatar}`}
                src={Avatar}
                alt='аватарка'
            />
            <div className={s.content}>
                <div className={s.messageContainer}>
                    <span className={s.name}>{name}</span>
                    <div className={s.message}>
                        {msg.name && <div>{msg.name}</div>}
                        {<span className={s.msg}>{msg.message}</span>}
                    </div>
                </div>
                <div className={s.readContainer}>
                    {msg.unread !== 0 && <span className={s.unread}>{msg.unread}</span>}
                    {msg.read && <span className={s.read} />}
                </div>
            </div>
        </NavLink>
    )
}

export default User
