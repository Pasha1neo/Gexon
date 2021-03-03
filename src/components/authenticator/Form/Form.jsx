import Modal from '../../util/modal/Modal'
import SignUp from '../signup/SignUp'
import SignIn from '../signin/SignIn'
import s from '../Authenticator.module.css'
import {useState} from 'react'

const Form = (props) => {
    const [choice, setChoice] = useState(false)
    const signin = () => {
        setChoice(false)
    }
    const signup = () => {
        setChoice(true)
    }
    return (
        <Modal active={props.modalActive} closeModal={props.closeModal}>
            <div className={s.container}>
                <span className={s.close} onClick={props.closeModal}>
                    ×
                </span>
                <div className={s.choice}>
                    <div
                        className={choice ? s.choiceIn : `${s.choiceIn} ${s.active}`}
                        onClick={signin}>
                        Авторизация
                    </div>
                    <div
                        className={choice ? `${s.choiceUp} ${s.active}` : s.choiceUp}
                        onClick={signup}>
                        Регистрация
                    </div>
                </div>
                {choice ? (
                    <SignUp closeModal={props.closeModal} registration={props.registration} />
                ) : (
                    <SignIn closeModal={props.closeModal} login={props.login} />
                )}
            </div>
        </Modal>
    )
}
export default Form
