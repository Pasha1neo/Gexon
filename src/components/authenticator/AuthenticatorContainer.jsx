import Authenticator from './Authenticator'
import {login, logout, registration} from '../../redux/authReducer'
import {connect} from 'react-redux'

const mapDispatchToProps = (dispatch) => {
    return {
        login: (email, password) => {
            dispatch(login(email, password))
        },
        logout: () => {
            dispatch(logout())
        },
        registration: (email, password) => {
            dispatch(registration(email, password))
        },
    }
}
const mapStateToProps = (state) => ({
    userId: state.auth.userId,
    email: state.auth.email,
    isAuth: state.auth.isAuth,
})

export default connect(mapStateToProps, mapDispatchToProps)(Authenticator)
