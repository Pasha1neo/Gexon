import {BrowserRouter, Route, withRouter} from 'react-router-dom'
import {connect, Provider} from 'react-redux'
import {compose} from 'redux'
import {ThemeProvider} from '@material-ui/styles'
import {Container, CssBaseline} from '@material-ui/core'
import store from './redux/store'
import {theme} from './theme'
import {useStyles} from './style'
import Preloader from './components/util/preloader/Preloader'
import {Profile} from './components/user'
import Header from './components/header/header'
import ChatContainer from './components/chat/chatContainer'

function Application({appStatus, chatStatus}) {
    const classes = useStyles()
    if (!appStatus) return <Preloader /> //переработать
    return (
        <div className={classes.root}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Header />
                <main className={classes.content}>
                    <div className={classes.appBarSpacer} />
                    <Container className={classes.container}>
                        <Route
                            path='/profile/:id?'
                            exact
                            render={() => (
                                <div>
                                    Для справки по быстрому накидал 1 в профиле вы можете изменить
                                    аватарку и поставить себе никнейм а так же делать посты только
                                    для себя в чате вы переписываетесь со всесми кем хотите общий
                                    чат не предусмотрен
                                </div>
                            )}
                        />
                        <Route path='/profile/:id?' render={() => <Profile />} />
                        <Route path='/chat/:id?' render={() => chatStatus && <ChatContainer />} />
                        {/* <Route path='/users/:id?' render={() => <Users />} /> */}
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
