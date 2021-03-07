import Chat from './Chat'
import {connect} from 'react-redux'
import {sendMessage, getMessages, disconnect} from '../../redux/reducers/chatReducer'

const mapStateToProps = (state) => ({
    messageData: state.chat.messageData,
    login: state.auth.login,
    connection: state.chat.connect,
})

export default connect(mapStateToProps, {sendMessage, getMessages, disconnect})(Chat)
