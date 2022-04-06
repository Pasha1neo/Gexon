import type {NextPage} from 'next'
import {Fragment, useState} from 'react'
import AppBar from '@mui/material/AppBar'
import BottomNavigation from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'
import RestoreIcon from '@mui/icons-material/Restore'
import FavoriteIcon from '@mui/icons-material/Favorite'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'

const Home: NextPage = () => {
    const [value, setValue] = useState(0)

    return (
        <Fragment>
            <AppBar position='static'>
                <Toolbar>
                    <IconButton
                        size='large'
                        edge='start'
                        color='inherit'
                        aria-label='menu'
                        sx={{mr: 2}}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant='h6' component='div' sx={{flexGrow: 1}}>
                        Главная
                    </Typography>
                    <Button color='inherit'>Войти</Button>
                </Toolbar>
            </AppBar>

            <main>Мейн</main>

            <footer>
                <BottomNavigation
                    showLabels
                    value={value}
                    onChange={(_, newValue) => {
                        setValue(newValue)
                    }}>
                    <BottomNavigationAction label='Recents' icon={<RestoreIcon />} />
                    <BottomNavigationAction label='Favorites' icon={<FavoriteIcon />} />
                    <BottomNavigationAction label='Nearby' icon={<LocationOnIcon />} />
                </BottomNavigation>
            </footer>
        </Fragment>
    )
}

export default Home
