import s from './userslist.module.css'
import User from './user/user'
import _ from 'lodash'

const UsersList = (props) => {
    const getUserData = (id) => {
        const user = _.find(props.dialogsData, {wid: id})
        if (user) {
            return {
                count: _.filter(user.messages, {read: false, from: id}).length,
                last: _.last(user.messages),
            }
        }
        return {
            count: false,
            last: false,
        }
    }
    const unRead = (id) => {}
    const users = props.users.map((user) => {
        return (
            <User
                key={user.userID}
                id={user.userID}
                name={user.username}
                online={user.connected}
                data={getUserData(user.userID)}
                me={props.me}
            />
        )
    })
    return (
        <div className={s.usersList}>
            <div className={s.header}>список пользователей:</div>
            <div className={s.content}>{users}</div>
        </div>
    )
}
export default UsersList
