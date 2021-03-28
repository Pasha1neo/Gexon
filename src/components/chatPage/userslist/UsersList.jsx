import s from './userslist.module.css'
import Avatar from '../../../assets/img/avatar.png'
import {NavLink} from 'react-router-dom'
import {memo} from 'react'

const User = ({id, name, online}) => {
    return (
        <NavLink className={s.user} to={`/chat/${id}`}>
            <img className={s.avatar} src={Avatar} alt='аватарка' />
            <div className={s.userContent}>{name}</div>
            <div className={`${online ? `${s.constat} ${s.online}` : s.constat}`}></div>
        </NavLink>
    )
}
const UsersList = memo((props) => {
    return (
        <div className={s.usersList}>
            <div className={s.header}>список пользователей:</div>
            <div className={s.content}>
                {/* <NavLink key={'globalChat'} className={s.user} to={`/chat`}>
                    <img className={s.avatar} src={Avatar} alt='аватарка' />
                    <div className={s.userContent}>Общий чат</div>
                </NavLink> */}
                {props.users.map((user) => {
                    return (
                        <User
                            key={user.userID}
                            id={user.userID}
                            name={user.username}
                            online={user.connected}
                        />
                    )
                })}
            </div>
        </div>
    )
})
export default UsersList
