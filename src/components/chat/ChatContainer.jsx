import Chat from './Chat'
import {connect} from 'react-redux'
import {sendMessage, getMessages, disconnect, connectChat} from '../../redux/reducers/chatReducer'
import {compose} from 'redux'
import {withAuthRedurect} from '../util/redirectHOC/authRedirect'

const mapStateToProps = (state) => ({
    messageData: state.chat.messageData,
    login: state.auth.login,
    connection: state.chat.connect,
})
const mapDispatchToProps = {sendMessage, getMessages, disconnect, connectChat}
export default compose(connect(mapStateToProps, mapDispatchToProps), withAuthRedurect)(Chat)
