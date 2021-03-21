import {memo, useEffect} from 'react'
import {connect} from 'react-redux'
import {compose} from 'redux'
import {sendMessage, disconnect, selectChat} from '../../redux/actions/chat'
import {withAuthRedurect} from '../util/redirectHOC/authRedirect'
import {useQuery} from '../util/querryId/querryId'
import {searchDialogsById} from '../util/searchDialogsById/searchDialogsById'
import UsersList from './userslist/UsersList'
import ChatHandler from './chat/Chat'
import s from './chatPage.module.css'
import {nameSearchById} from '../util/nameSearchById/nameSearchById'
import {Redirect} from 'react-router'

const ChatPage = ({selectChat, usersData, chatWith, ...props}) => {
    const querryId = useQuery().get('id') || 'message'
    useEffect(() => {
        const room = querryId
        const {username, valid} = nameSearchById(room, usersData)
        selectChat(room, username, valid)
    }, [querryId])
    useEffect(() => {
        searchDialogsById(chatWith.id, props.messagesData)
    }, [chatWith])
    return (
        <div className={s.chatBody}>
            <UsersList usersData={usersData} />
            {!chatWith.valid && <Redirect to={'/chat'} />}
            <ChatHandler name={chatWith.name} id={chatWith.id} {...props} />
        </div>
    )
}

const mapStateToProps = (state) => ({
    connection: state.chat.connect,
    usersData: state.chat.usersData,
    messagesData: state.chat.messagesData,
    chatWith: state.chat.chatWith,
})
const mapDispatchToProps = {
    sendMessage,
    disconnect,
    selectChat,
}
export default compose(
    memo,
    withAuthRedurect,
    connect(mapStateToProps, mapDispatchToProps)
)(ChatPage)
