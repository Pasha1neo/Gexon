import s from './chatPage.module.css'
import {connect} from 'react-redux'
import {compose} from 'redux'
import {sendMessage, selectChat} from '../../redux/actions/chat'
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
                connect={props.connect}
                dialog={_.find(props.dialogsData, {wid: props.with})}
                sendMessage={props.sendMessage}
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
})
export default compose(
    connect(mapStateToProps, {sendMessage, selectChat}),
    withAuthRedurect,
    withRouter
)(ChatPage)
