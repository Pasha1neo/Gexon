import AuthenticatorContainer from '../authenticator/AuthenticatorContainer'
import s from './Header.module.css'
import logo from '../../assets/img/logo.png'
import {NavLink} from 'react-router-dom'

const Header = () => {
    return (
        <header className={s.header}>
            <NavLink to='/' activeClassName={s.active}>
                <img className={s.logo} src={logo} alt='Логотип' />
            </NavLink>
            <div className={s.links}>
                <NavLink className={s.link} to='/chat' activeClassName={s.active}>
                    Чат
                </NavLink>
                <NavLink className={s.link} to='/profile' activeClassName={s.active}>
                    Профиль
                </NavLink>
            </div>
            <AuthenticatorContainer />
        </header>
    )
}
export default Header
