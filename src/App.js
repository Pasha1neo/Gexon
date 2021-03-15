import './App.css'
import React, {useEffect} from 'react'
import {connect, Provider} from 'react-redux'
import ChatPage from './components/chatPage/ChatPage'
import Header from './components/header/Header'
import Preloader from './components/util/preloader/Preloader'
import {BrowserRouter, Route, withRouter} from 'react-router-dom'
import store from './redux/reduxStore'
import {compose} from 'redux'
import {initApp} from './redux/actions/auth'

const App = ({initialized, initApp}) => {
    useEffect(() => {
        initApp()
    }, [])
    if (!initialized) {
        return <Preloader />
    }
    return (
        <div className='App'>
            <Header />
            <div>
                <Route exact path='/' render={() => <>Главная страница</>} />
                <Route path='/chat/:id?' render={() => <ChatPage />} />
            </div>
        </div>
    )
}
const mapStateToProps = (state) => ({
    initialized: state.app.initialized,
    isToken: state.app.isToken,
    isAuth: state.app.isAuth,
})

const AppContainer = compose(withRouter, connect(mapStateToProps, {initApp}))(App)
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
