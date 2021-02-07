import {useState} from 'react'
import s from './Authenticator.module.css'
import Form from './Form/Form'
import defAvatar from './veggie.png'

const Authenticator = ({isAuth, ...props}) => {
    const [modalActive, setModalActive] = useState(false)
    const openModal = () => {
        setModalActive(true)
    }
    const closeModal = () => {
        setModalActive(false)
    }
    return (
        <div>
            {isAuth ? (
                <div className={s.userContainer}>
                    <img
                        className={s.avatar}
                        src={props.avatar ? props.avatar : defAvatar}
                    />
                    <span className={s.nickname}>{props.nickname}</span>
                    <button className={s.logout} onClick={props.logout}>
                        Выйти
                    </button>
                </div>
            ) : (
                <img
                    className={s.button}
                    src='img/login.png'
                    alt='Логин'
                    onClick={openModal}
                />
            )}
            {modalActive ? (
                <Form
                    closeModal={closeModal}
                    login={props.login}
                    modalActive={modalActive}
                />
            ) : null}
        </div>
    )
}

export default Authenticator
