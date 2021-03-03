import {useState} from 'react'
import s from './Authenticator.module.css'
import Form from './Form/Form'
import avatar from '../../assets/img/avatar.png'
import login from '../../assets/img/login.png'

const Authenticator = (props) => {
    const [modalActive, setModalActive] = useState(false)

    const openModal = () => {
        setModalActive(true)
    }
    const closeModal = () => {
        setModalActive(false)
    }

    return (
        <div>
            {props.isAuth ? (
                <div className={s.userContainer}>
                    <img className={s.avatar} src={props.avatar ? props.avatar : avatar} />
                    <span className={s.nickname}>{props.loginName}</span>
                    <button className={s.logout} onClick={props.logout}>
                        Выйти
                    </button>
                </div>
            ) : (
                <img className={s.button} src={login} alt='Логин' onClick={openModal} />
            )}
            {modalActive ? (
                <Form
                    closeModal={closeModal}
                    login={props.login}
                    modalActive={modalActive}
                    registration={props.registration}
                />
            ) : null}
        </div>
    )
}

export default Authenticator
