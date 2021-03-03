import Chat from './Chat'
import {connect} from 'react-redux'
import {addMessage, uploadMessages} from '../../redux/chatReducer'

const mapStateToProps = (state) => ({
    messageData: state.chat.messageData,
    login: state.auth.login,
    userId: state.auth.userId,
})

export default connect(mapStateToProps, {addMessage, uploadMessages})(Chat)
