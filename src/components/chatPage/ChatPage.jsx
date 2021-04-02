import s from './chatPage.module.css'
import {connect} from 'react-redux'
import {compose} from 'redux'
import {sendMessage, selectChat, readMessage, changeMessage} from '../../redux/actions/chat'
import UsersList from './userslist/UsersList'
import ChatHandler from './chat/Chat'
import {withAuthRedurect} from '../util/redirect/authRedirect'
import _ from 'lodash'
import {useEffect} from 'react'
import {withRouter} from 'react-router'

const ChatPage = (props) => {
    useEffect(() => {
        const {pathname} = props.location
        const dialogId = pathname.split('/').pop()
        props.selectChat(dialogId)
    }, [props.location.pathname])
    return (
        <div className={s.chatBody}>
            <UsersList users={props.users} />
            <ChatHandler
                users={props.users}
                connect={props.connect}
                dialog={_.find(props.dialogsData, {wid: props.with})}
                sendMessage={props.sendMessage}
                readMessage={props.readMessage}
                changeMessage={props.changeMessage}
                me={props.me}
            />
        </div>
    )
}

const mapStateToProps = (state) => ({
    connect: state.chat.connect,
    users: state.chat.usersData,
    dialogsData: state.chat.dialogsData,
    with: state.chat.wid,
    chatReady: state.chat.chatReady,
    me: state.chat.user.userID,
    dialogReady: state.chat.dialogReady,
})
export default compose(
    withAuthRedurect,
    connect(mapStateToProps, {sendMessage, selectChat, readMessage, changeMessage}),
    withRouter
)(ChatPage)
