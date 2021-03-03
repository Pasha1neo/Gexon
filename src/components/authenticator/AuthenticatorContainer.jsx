import Authenticator from './Authenticator'
import {login, logout, registration} from '../../redux/authReducer'
import {connect} from 'react-redux'

const mapDispatchToProps = (dispatch) => {
    return {
        registration: (login, email, password, password_2) => {
            dispatch(registration(login, email, password, password_2))
        },
        login: (loginName, password, rememberMe) => {
            dispatch(login(loginName, password, rememberMe))
        },
        logout: () => {
            dispatch(logout())
        },
    }
}
const mapStateToProps = (state) => ({
    loginName: state.auth.login,
    isAuth: state.auth.isAuth,
})

export default connect(mapStateToProps, mapDispatchToProps)(Authenticator)
