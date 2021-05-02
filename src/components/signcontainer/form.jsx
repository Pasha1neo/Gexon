import {useState} from 'react'
import {useStyles} from './form.style'
import {Field, reduxForm} from 'redux-form'
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

const FormField = ({label, input, ...custom}) => <TextField label={label} {...input} {...custom} />

const CustomCheckBox = withStyles({
    root: {
        '&$checked': {
            color: '#64dd17',
        },
    },
    checked: {},
})((props) => <Checkbox color='default' {...props} />)

const FormCheckBox = ({input, label, checked, ...other}) => (
    <FormControlLabel
        {...other}
        control={<CustomCheckBox checked={input.value ? true : false} onChange={input.onChange} />}
        label={label}
    />
)

function Form(props) {
    const classes = useStyles()
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
                    value={props.value}
                    onChange={props.signChange}
                    classes={{indicator: classes.ActiveIndicator}}>
                    <Tab label='Авторизация' />
                    <Tab label='Регистрация' />
                </Tabs>
            </Toolbar>
            <form onSubmit={props.handleSubmit}>
                <DialogContent className={classes.content}>
                    <Field
                        component={FormField}
                        fullWidth
                        variant='outlined'
                        label='Логин'
                        name='loginName'
                        className={classes.textField}
                    />
                    {props.value === 1 && (
                        <Field
                            component={FormField}
                            fullWidth
                            variant='outlined'
                            label='Почта'
                            name='email'
                            className={classes.textField}
                        />
                    )}
                    <Field
                        component={FormField}
                        fullWidth
                        variant='outlined'
                        label='Пароль'
                        name='password'
                        type='password'
                        className={classes.textField}
                    />
                    {props.value === 1 && (
                        <Field
                            component={FormField}
                            fullWidth
                            variant='outlined'
                            label='Повторите пароль'
                            name='password_2'
                            className={classes.textField}
                        />
                    )}
                    <Field
                        name='checkbox'
                        component={FormCheckBox}
                        className={classes.checkbox}
                        label={props.value === 1 ? 'Соглашаюсь с правилами' : 'Запомнить меня'}
                    />
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
        </Dialog>
    )
}

const SignReduxForm = reduxForm({
    form: 'sign',
})(Form)

const Sign = ({close, login, registration, ...props}) => {
    const [sign, setSign] = useState(0)
    const signChange = (event, item) => {
        return setSign(item)
    }
    const onSubmit = ({loginName, email, password, password_2, checkbox}) => {
        if (sign === 0) {
            login(loginName, password, checkbox)
        } else {
            registration(loginName, email, password, password_2, checkbox)
        }
        close()
    }
    return (
        <SignReduxForm
            onSubmit={onSubmit}
            close={close}
            signChange={signChange}
            value={sign}
            {...props}
        />
    )
}
export default Sign
