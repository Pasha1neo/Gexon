import {Field, reduxForm} from 'redux-form'
import s from './SignIp.module.css'
/*сделать что бы оно нажималось на пробел когда ты выделяешь его
TAB */
const SignInForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit} className={s.signinForm}>
            <Field
                component={'input'}
                className={s.input}
                type={'text'}
                name={'loginName'}
                placeholder={'Введите почту'}
            />
            <Field
                component={'input'}
                className={s.input}
                type={'password'}
                name={'password'}
                placeholder={'Введите пароль'}
            />
            <div className={s.rememberContainer}>
                <Field component={'input'} type={'checkbox'} id={'checkbox'} name={'rememberMe'} />

                <label htmlFor={'checkbox'}>Запомнить</label>
                <a>Забыли пароль?</a>
            </div>
            <button className={s.enter}>Войти</button>
        </form>
    )
}
const SignInReduxForm = reduxForm({
    form: 'signin',
})(SignInForm)
const SignIn = ({closeModal, login}) => {
    const onSubmit = ({loginName, password, rememberMe}) => {
        login(loginName, password, rememberMe)
        closeModal()
    }
    return <SignInReduxForm onSubmit={onSubmit} />
}

export default SignIn
