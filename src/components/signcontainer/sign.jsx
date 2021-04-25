import {useState} from 'react'
import Form from './form'
import Login from '../../assets/img/login.png'
import {Button} from '@material-ui/core'
import {useStyles} from './form.style'
import {UserPanel} from '../user'

const Sign = (props) => {
    const [sign, setSign] = useState(false)
    const classes = useStyles()
    const open = () => {
        setSign(true)
    }
    const close = () => {
        setSign(false)
    }

    return (
        <>
            {props.isAuth ? (
                <UserPanel avatar={props.avatar} login={props.loginName} logout={props.logout} />
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
