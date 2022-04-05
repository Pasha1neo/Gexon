import {useState} from 'react'
import Form from './form'
import {Button} from '@material-ui/core'
import {UserPanel} from '../user'

const Sign = (props) => {
    const [sign, setSign] = useState(false)
    const open = () => {
        setSign(true)
    }
    const close = () => {
        setSign(false)
    }

    return (
        <>
            {props.authStatus ? (
                <UserPanel
                    avatar={props.avatar}
                    nickname={props.nickname}
                    signOut={props.signOut}
                />
            ) : (
                <Button size='large' onClick={open} color='inherit'>
                    Войти
                </Button>
            )}
            <Form close={close} open={sign} signIn={props.signIn} signUp={props.signUp} />
        </>
    )
}

export default Sign
