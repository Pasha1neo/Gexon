import {useEffect} from 'react'
import {connect} from 'react-redux'
import './App.css'
import Header from './components/header/Header'
import Preloader from './components/preloader/Preloader'
import {initializeApp} from './redux/appReducer'

const App = ({initialized, isToken, initialization}) => {
    useEffect(() => {
        initialization()
    }, [])
    if (!initialized && isToken) {
        return <Preloader />
    }
    return (
        <div className='App'>
            <Header />
        </div>
    )
}
const mapDispatchToProps = (dispatch) => {
    return {
        initialization: () => {
            dispatch(initializeApp())
        },
    }
}
const mapStateToProps = (state) => ({
    initialized: state.app.initialized,
    isToken: state.app.isToken,
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
