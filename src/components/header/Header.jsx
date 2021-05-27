import {AppBar, Box, Button, Container, Hidden, Toolbar, Typography} from '@material-ui/core'
import {NavLink} from 'react-router-dom'
import SignContainer from '../signcontainer/signContainer'
import {useStyles} from './header.style'

function Header() {
    const classes = useStyles()
    return (
        <AppBar>
            <Toolbar className={classes.toolbar}>
                <Hidden only={['xs']}>
                    <Typography noWrap component='h1' color='inherit' variant='h6'>
                        Material Design
                    </Typography>
                </Hidden>
                <Box className={classes.navLinks}>
                    <Hidden only={['xs']}>
                        <Button
                            color='inherit'
                            component={NavLink}
                            exact
                            to='/'
                            activeClassName={classes.active}>
                            Главная
                        </Button>
                    </Hidden>

                    <Button
                        color='inherit'
                        component={NavLink}
                        to='/chat'
                        activeClassName={classes.active}>
                        Чат
                    </Button>
                    <Button
                        color='inherit'
                        component={NavLink}
                        to='/profile'
                        activeClassName={classes.active}>
                        Профиль
                    </Button>
                    <Hidden only={['xs']}>
                        <Button
                            color='inherit'
                            component={NavLink}
                            to='/users'
                            activeClassName={classes.active}>
                            Пользователи
                        </Button>
                    </Hidden>
                </Box>
                <SignContainer />
            </Toolbar>
        </AppBar>
    )
}
export default Header
