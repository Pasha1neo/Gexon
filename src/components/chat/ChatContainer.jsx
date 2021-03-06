import Chat from './Chat'
import {connect} from 'react-redux'
import {sendMessage, getMessages} from '../../redux/chatReducer'

const mapStateToProps = (state) => ({
    messageData: state.chat.messageData,
    login: state.auth.login,
})

export default connect(mapStateToProps, {sendMessage, getMessages})(Chat)
