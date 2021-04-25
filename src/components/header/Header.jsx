import {AppBar, Button, Container, Toolbar, Typography} from '@material-ui/core'
import {NavLink} from 'react-router-dom'
import {useStyles} from './header.style'

function Header() {
    const s = useStyles()
    return (
        <header className={s.header}>
            <AppBar position='static' color='primary'>
                <Toolbar>
                    <Typography variant='h6' className={s.title}>
                        Material Design
                    </Typography>
                    <Container className={s.links}>
                        <Button
                            component={NavLink}
                            exact
                            to='/'
                            color='inherit'
                            className={s.link}
                            activeClassName={s.active}>
                            Главная
                        </Button>
                        <Button
                            component={NavLink}
                            to='/chat'
                            className={s.link}
                            color='inherit'
                            activeClassName={s.active}>
                            Чат
                        </Button>
                        <Button
                            component={NavLink}
                            to='/profile'
                            color='inherit'
                            className={s.link}
                            activeClassName={s.active}>
                            Профиль
                        </Button>
                    </Container>
                    <Button color='inherit' className={s.menuButton}>
                        Login
                    </Button>
                    <Button color='inherit' className={s.menuButton}>
                        SignUp
                    </Button>
                </Toolbar>
            </AppBar>
        </header>
    )
}
export default Header
