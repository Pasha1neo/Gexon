import AuthenticatorContainer from '../authenticator/AuthenticatorContainer'
import s from './Header.module.css'

const Header = () => {
    return (
        <header className={s.header}>
            <img className={s.logo} src='img/Logo.png' alt='Логотип' />
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
