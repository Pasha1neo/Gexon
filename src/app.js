import {BrowserRouter as Router, Route} from 'react-router-dom'
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
import Users from './component/users/users'

function Application({chatStatus, userId}) {
    const classes = useStyles()
    return (
        <div className={classes.root}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Header userId={userId} />
                <main className={classes.content}>
                    <div className={classes.appBarSpacer} />
                    <Container className={classes.container}>
                        <Route path='/' exact render={() => <Home />} />
                        <Route path='/users' exact render={() => <Users />} />
                        <Route path='/profile/:userId?' render={() => <Profile />} />
                        <Route path='/chat/:userId?' render={() => chatStatus && <Chat />} />
                    </Container>
                </main>
            </ThemeProvider>
        </div>
    )
}
const AppContainer = compose(
    connect(
        (state) => ({
            appStatus: state.app.appStatus,
            chatStatus: state.app.chatStatus,
            userId: state.user.userId,
        }),
        {}
    )
)(Application)

function App() {
    return (
        <Provider store={store}>
            <Router>
                <AppContainer />
            </Router>
        </Provider>
    )
}
export default App
