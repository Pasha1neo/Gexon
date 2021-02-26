import {Field, reduxForm} from 'redux-form'
import s from './SignUp.module.css'

const SignUpForm = (props) => {
    const handleSelect = (e) => {
        e.target.select()
    }
    return (
        <form onSubmit={props.handleSubmit} className={s.signupForm}>
            <Field
                className={s.signUpIn}
                type={'text'}
                name={'login'}
                placeholder={'Введите логин'}
                component={'input'}
                onFocus={handleSelect}
            />
            <Field
                className={s.signUpIn}
                type={'email'}
                name={'email'}
                placeholder={'Введите почту'}
                component={'input'}
                onFocus={handleSelect}
            />
            <Field
                className={s.signUpIn}
                type={'password'}
                name={'password'}
                placeholder={'Введите пароль'}
                component={'input'}
                onFocus={handleSelect}
            />
            <Field
                className={s.signUpIn}
                type={'password'}
                name={'password_2'}
                placeholder={'Введите пароль ещё раз'}
                component={'input'}
                onFocus={handleSelect}
            />
            <div className={s.signupAcceptContainer}>
                <Field
                    type={'checkbox'}
                    id={'checkbox'}
                    name={'accessAgreement'}
                    component={'input'}
                    onFocus={handleSelect}
                />
                <label htmlFor={'checkbox'}>
                    Я соглашаюсь с <a>условиями</a>
                </label>
            </div>
            <button className={`${s.enterup} ${s.enter}`}>Зарегистрироваться</button>
        </form>
    )
}

const SignUpReduxForm = reduxForm({
    form: 'signup',
})(SignUpForm)

const SignUp = ({closeModal, registration}) => {
    const onSubmit = ({email, password, password_2, accessAgreement}) => {
        registration(email, password)
        closeModal()
    }
    return <SignUpReduxForm onSubmit={onSubmit} />
}

export default SignUp
