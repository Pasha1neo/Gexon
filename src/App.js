import './App.css'
import {useEffect} from 'react'
import {connect, Provider} from 'react-redux'
import ChatContainer from './components/chat/ChatContainer'
import Header from './components/header/Header'
import Preloader from './components/util/preloader/Preloader'
import {initializeApp} from './redux/reducers/appReducer'
import {BrowserRouter, Route, withRouter} from 'react-router-dom'
import store from './redux/reduxStore'
import {compose} from 'redux'

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
            <div>
                <Route exact path='/' render={() => <>Главная страница</>} />
                <Route path='/chat' render={() => <ChatContainer />} />
            </div>
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

const AppContainer = compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(App)
const Pasha1neoApp = () => {
    return (
        <BrowserRouter>
            <Provider store={store}>
                <AppContainer />
            </Provider>
        </BrowserRouter>
    )
}
export default Pasha1neoApp
