import AuthenticatorContainer from '../authenticator/AuthenticatorContainer'
import s from './Header.module.css'
import logo from '../../assets/img/logo.png'

const Header = () => {
    return (
        <header className={s.header}>
            <img className={s.logo} src={logo} alt='Логотип' />
            <div className={s.link}>
                <div>Главная</div>
                <div>Профиль</div>
                <div>Чат</div>
            </div>
            <AuthenticatorContainer />
        </header>
    )
}
export default Header
