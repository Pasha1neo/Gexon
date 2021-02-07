import Authenticator from './Authenticator'
import {login, logout} from '../../redux/authReducer'
import {connect} from 'react-redux'
const mapDispatchToProps = (dispatch) => {
    return {
        login: (email, password) => {
            dispatch(login(email, password))
        },
        logout: () => {
            dispatch(logout())
        },
    }
}
const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    nickname: state.auth.nickname,
    userId: state.auth.userId,
    email: state.auth.email,
    avatar: state.auth.avatar,
})

export default connect(mapStateToProps, mapDispatchToProps)(Authenticator)
