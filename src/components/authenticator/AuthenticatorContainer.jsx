import Authenticator from './Authenticator'
import {login, logout, registration} from '../../redux/actions/auth'
import {connect} from 'react-redux'

const mapDispatchToProps = {login, logout, registration}
const mapStateToProps = (state) => ({
    loginName: state.app.login,
    isAuth: state.app.isAuth,
    initApp: state.app.initialized,
})

export default connect(mapStateToProps, mapDispatchToProps)(Authenticator)
