import Chat from './Chat'
import {connect} from 'react-redux'
import {sendMessage, getMessages, disconnect, connectChat} from '../../redux/actions/chat'
import {compose} from 'redux'
import {withAuthRedurect} from '../util/redirectHOC/authRedirect'

const mapStateToProps = (state) => ({
    login: state.app.login,
    messageData: state.chat.messageData,
    connection: state.chat.connect,
})
const mapDispatchToProps = {sendMessage, getMessages, disconnect, connectChat}

export default compose(connect(mapStateToProps, mapDispatchToProps), withAuthRedurect)(Chat)
