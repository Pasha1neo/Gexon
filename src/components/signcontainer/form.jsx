import {useState} from 'react'
import {useStyles} from './form.style'
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    TextField,
    Tab,
    Tabs,
    withStyles,
    IconButton,
    Checkbox,
    FormControlLabel,
    Toolbar,
} from '@material-ui/core'
import HighlightOffOutlinedIcon from '@material-ui/icons/HighlightOffOutlined'
import {Form, Field} from 'react-final-form'

const CustomCheckBox = withStyles({
    root: {
        '&$checked': {
            color: '#64dd17',
        },
    },
    checked: {},
})((props) => <Checkbox color='default' {...props} />)

function SignForm(props) {
    const classes = useStyles()
    const [sign, setSign] = useState(0)
    const signChange = (event, item) => {
        return setSign(item)
    }

    return (
        <Dialog
            open={props.open}
            fullWidth
            maxWidth='sm'
            onClose={props.close}
            aria-labelledby='form-dialog-title'>
            <IconButton color='inherit' className={classes.close}>
                <HighlightOffOutlinedIcon color='action' />
            </IconButton>
            <Toolbar className={classes.tabPanel}>
                <Tabs
                    value={sign}
                    onChange={signChange}
                    classes={{indicator: classes.ActiveIndicator}}>
                    <Tab label='Авторизация' />
                    <Tab label='Регистрация' />
                </Tabs>
            </Toolbar>
            <Form
                onSubmit={({loginName, email, password, password_2, checkbox}) => {
                    if (sign === 0) {
                        props.login(loginName, password, checkbox)
                    } else {
                        props.registration(loginName, email, password, password_2, checkbox)
                    }
                    props.close()
                }}>
                {({handleSubmit, form}) => (
                    <form onSubmit={handleSubmit}>
                        <DialogContent className={classes.content}>
                            <Field name='loginName'>
                                {(props) => (
                                    <TextField
                                        fullWidth
                                        className={classes.textField}
                                        variant='outlined'
                                        label='Логин'
                                        {...props.input}
                                    />
                                )}
                            </Field>
                            {sign === 1 && (
                                <Field name='email'>
                                    {(props) => (
                                        <TextField
                                            fullWidth
                                            variant='outlined'
                                            label='Почта'
                                            className={classes.textField}
                                            {...props.input}
                                        />
                                    )}
                                </Field>
                            )}
                            <Field name='password'>
                                {(props) => (
                                    <TextField
                                        fullWidth
                                        variant='outlined'
                                        label='Пароль'
                                        type='password'
                                        className={classes.textField}
                                        {...props.input}
                                    />
                                )}
                            </Field>
                            {sign === 1 && (
                                <Field name='password_2'>
                                    {(props) => (
                                        <TextField
                                            fullWidth
                                            variant='outlined'
                                            label='Повторите пароль'
                                            className={classes.textField}
                                            {...props.input}
                                        />
                                    )}
                                </Field>
                            )}
                            <Field type='checkbox' name='checkbox'>
                                {(props) => (
                                    <FormControlLabel
                                        className={classes.checkbox}
                                        control={<CustomCheckBox {...props.input} />}
                                        label={
                                            sign === 1 ? 'Соглашаюсь с правилами' : 'Запомнить меня'
                                        }
                                    />
                                )}
                            </Field>
                        </DialogContent>
                        <DialogActions>
                            <Button
                                color='inherit'
                                type='submit'
                                size='large'
                                className={classes.submit}
                                variant='contained'>
                                {props.value === 1 ? 'Регистрация' : 'Войти'}
                            </Button>
                        </DialogActions>
                    </form>
                )}
            </Form>
        </Dialog>
    )
}

export default SignForm
