import Sign from './sign'
import {signIn, signOut, signUp} from '../../redux/actions/sign'
import {connect} from 'react-redux'

const mapStateToProps = (state) => ({
    nickname: state.user.nickname || state.user.login,
    avatar: state.user.avatar,
    authStatus: state.app.authStatus,
})

export default connect(mapStateToProps, {signIn, signOut, signUp})(Sign)
