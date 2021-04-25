import React, {useEffect} from 'react'
import {BrowserRouter, Route, withRouter} from 'react-router-dom'
import {connect, Provider} from 'react-redux'
import {compose} from 'redux'
import store from './redux/store'
import {initApp} from './redux/actions/auth'
import {theme} from './theme'
import {ThemeProvider} from '@material-ui/styles'
import Header from './components/header/header'
import Preloader from './components/util/preloader/Preloader'
import ChatContainer from './components/chat/chatContainer'
import {Container, CssBaseline} from '@material-ui/core'
import {useStyles} from './style'
import {Profile} from './components/user'

function Application({initApp, appReady, chatReady}) {
    const classes = useStyles()
    useEffect(() => {
        initApp()
    }, [initApp])
    if (!appReady) {
        return <Preloader />
    }
    return (
        <div className={classes.root}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Header />
                <main className={classes.content}>
                    <div className={classes.appBarSpacer} />
                    <Container className={classes.container}>
                        <Route path='/profile/:id?' render={() => <Profile />} />
                        {chatReady && <Route path='/chat/:id?' render={() => <ChatContainer />} />}
                    </Container>
                </main>
            </ThemeProvider>
        </div>
    )
}

const mapStateToProps = (state) => ({
    appReady: state.app.appReady,
    chatReady: state.app.chatReady,
})

const AppContainer = compose(withRouter, connect(mapStateToProps, {initApp}))(Application)

const App = () => {
    return (
        <BrowserRouter>
            <Provider store={store}>
                <AppContainer />
            </Provider>
        </BrowserRouter>
    )
}
export default App
