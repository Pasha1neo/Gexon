import {useState} from 'react'
import {Button} from '@material-ui/core'
import Form from './form'
import Panel from '../panel/panel'

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
                <Panel avatar={props.avatar} nickname={props.nickname} signOut={props.signOut} />
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
