import {BrowserRouter, Route, withRouter} from 'react-router-dom'
import {connect, Provider} from 'react-redux'
import {compose} from 'redux'
import {ThemeProvider} from '@material-ui/styles'
import {Container, CssBaseline} from '@material-ui/core'
import theme from './theme'
import useStyles from './style'
import store from './redux/store'
import Header from './component/header/header'
import Profile from './component/profile/profileContainer'
import Chat from './component/chat/chatContainer'
import Home from './component/home/home'

function Application({chatStatus}) {
    const classes = useStyles()
    return (
        <div className={classes.root}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Header />
                <main className={classes.content}>
                    <div className={classes.appBarSpacer} />
                    <Container className={classes.container}>
                        <Route path='/' exact render={() => <Home />} />
                        <Route path='/profile/:id?' render={() => <Profile />} />
                        <Route path='/chat/:id?' render={() => chatStatus && <Chat />} />
                    </Container>
                </main>
            </ThemeProvider>
        </div>
    )
}
const AppContainer = compose(
    withRouter,
    connect(
        (state) => ({
            appStatus: state.app.appStatus,
            chatStatus: state.app.chatStatus,
        }),
        {}
    )
)(Application)

function App() {
    return (
        <BrowserRouter>
            <Provider store={store}>
                <AppContainer />
            </Provider>
        </BrowserRouter>
    )
}
export default App
