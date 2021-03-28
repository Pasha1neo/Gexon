import './App.css'
import React, {useEffect} from 'react'
import {connect, Provider} from 'react-redux'
import ChatPage from './components/chatPage/ChatPage'
import Header from './components/header/Header'
import Preloader from './components/util/preloader/Preloader'
import {BrowserRouter, Route, withRouter} from 'react-router-dom'
import store from './redux/store'
import {compose} from 'redux'
import {initApp} from './redux/actions/auth'

const App = ({initApp, appReady, chatReady}) => {
    useEffect(() => {
        initApp()
    }, [])
    if (!appReady) {
        return <Preloader />
    }
    return (
        <div className='App'>
            <Header />
            <Route exact path='/' render={() => <>Главная страница</>} />
            {chatReady && <Route path='/chat/:id?' render={() => <ChatPage />} />}
        </div>
    )
}
const mapStateToProps = (state) => ({
    appReady: state.app.appReady,
    chatReady: state.app.chatReady,
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
