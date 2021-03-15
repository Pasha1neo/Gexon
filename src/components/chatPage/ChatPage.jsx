import {useEffect} from 'react'
import {connect} from 'react-redux'
import {compose} from 'redux'
import {sendMessage, sendPrivateMessage, disconnect, selectChat} from '../../redux/actions/chat'
import {withAuthRedurect} from '../util/redirectHOC/authRedirect'
import {useQuery} from '../util/querryId/querryId'
import UsersList from './userslist/UsersList'
import ChatHandler from './chat/Chat'
import s from './chatPage.module.css'
import {nameSearchById} from '../util/nameSearchById/nameSearchById'
import {Redirect} from 'react-router'

const ChatPage = ({selectChat, usersData, chatWith, ...props}) => {
    const querryId = useQuery().get('id')
    useEffect(() => {
        const room = querryId
        const {username, valid} = nameSearchById(room, usersData)
        selectChat(room, username, valid)
    }, [querryId])
    return (
        <div className={s.chatBody}>
            <UsersList usersData={usersData} />
            {!chatWith.valid && <Redirect to={'/chat'} />}
            <ChatHandler chatWith={chatWith} {...props} />
        </div>
    )
}
const mapStateToProps = (state) => ({
    messageData: state.chat.messageData,
    login: state.app.login,
    connection: state.chat.connect,
    chatWith: state.chat.chatWith,
    usersData: state.chat.usersData,
})
const mapDispatchToProps = {
    sendMessage,
    sendPrivateMessage,
    disconnect,
    selectChat,
}

export default compose(withAuthRedurect, connect(mapStateToProps, mapDispatchToProps))(ChatPage)
