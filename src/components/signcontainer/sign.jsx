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
            {props.isAuth ? (
                <UserPanel login={props.loginName} logout={props.logout} />
            ) : (
                <Button
                    size='large'
                    onClick={open}
                    color='inherit'
                    // endIcon={<img height='30px' src={Login} />}
                >
                    Войти
                </Button>
            )}
            <Form close={close} open={sign} login={props.login} registration={props.registration} />
        </>
    )
}

export default Sign
