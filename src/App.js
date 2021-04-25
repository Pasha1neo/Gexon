import {theme} from './theme'
import {ThemeProvider} from '@material-ui/styles'
import React from 'react'
import Header from './components/header/Header'
import {BrowserRouter, Route} from 'react-router-dom'

function Application() {
    return (
        <div>
            <ThemeProvider theme={theme}>
                <Header />
                <Route exact path='/' render={() => <>Главная страница</>} />
            </ThemeProvider>
        </div>
    )
}

const App = () => {
    return (
        <BrowserRouter>
            <Application />
        </BrowserRouter>
    )
}
export default App
