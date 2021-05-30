import {AppBar, Box, Button, Hidden, Toolbar, Typography} from '@material-ui/core'
import {NavLink} from 'react-router-dom'
import SignContainer from '../signcontainer/signContainer'
import useStyles from './style'

function Header({userId}) {
    const classes = useStyles()
    return (
        <AppBar>
            <Toolbar className={classes.toolbar}>
                <Hidden only={['xs']}>
                    <Typography noWrap component='h1' color='inherit' variant='h6'>
                        Gexon
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
                        to={`/profile/${userId}`}
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
