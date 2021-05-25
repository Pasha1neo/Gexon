import React, {useEffect} from 'react'
import {BrowserRouter, Route, withRouter} from 'react-router-dom'
import {connect, Provider} from 'react-redux'
import {compose} from 'redux'
import {ThemeProvider} from '@material-ui/styles'
import {Container, CssBaseline} from '@material-ui/core'

import store from './redux/store'
import {appLaunch} from './redux/actions/app'
import {theme} from './theme'
import {useStyles} from './style'

import Header from './components/header/header'
import Preloader from './components/util/preloader/Preloader'
import {Profile} from './components/user'
import ChatContainer from './components/chat/chatContainer'
import Users from './components/users/usersContainer'

function Application({appLaunch, appStatus, chatStatus}) {
    const classes = useStyles()
    useEffect(() => appLaunch(), [])
    if (!appStatus) return <Preloader /> //переработать
    return (
        <div className={classes.root}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Header />
                <main className={classes.content}>
                    <div className={classes.appBarSpacer} />
                    <Container className={classes.container}>
                        <Route path='/profile/:id?' render={() => <Profile />} />
                        <Route path='/chat/:id?' render={() => chatStatus && <ChatContainer />} />
                        {/* <Route path='/users/:id?' render={() => <Users />} /> */}
                    </Container>
                </main>
            </ThemeProvider>
        </div>
    )
}

const mapStateToProps = (state) => ({
    appStatus: state.app.appStatus,
    chatStatus: state.app.chatStatus,
})

const AppContainer = compose(withRouter, connect(mapStateToProps, {appLaunch}))(Application)

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
