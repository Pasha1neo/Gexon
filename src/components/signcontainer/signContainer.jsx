import Sign from './sign'
import {login, logout, registration} from '../../redux/actions/auth'
import {connect} from 'react-redux'
import AvatarImage from '../../assets/img/avatar.png'

const mapStateToProps = (state) => ({
    nickname: state.app?.nickname || state.app.login,
    avatar: state.app?.avatar || AvatarImage,
    isAuth: state.app.isAuth,
    initApp: state.app.initialized,
})

export default connect(mapStateToProps, {login, logout, registration})(Sign)
