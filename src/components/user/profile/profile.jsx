import {
    Avatar,
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    CardMedia,
    Collapse,
    Container,
    Grid,
    IconButton,
    makeStyles,
    TextField,
    Typography,
} from '@material-ui/core'
import AvatarImage from '../../../assets/img/avatar.png'
import FavoriteIcon from '@material-ui/icons/Favorite'
import ShareIcon from '@material-ui/icons/Share'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import {useState} from 'react'
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined'
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined'
import TuneIcon from '@material-ui/icons/Tune'
import {Form, Field} from 'react-final-form'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    image: {
        width: '100%',
    },
    nickname: {
        marginTop: theme.spacing(2),
    },
    iconButton: {
        position: 'absolute',
        right: 0,
    },
    box: {
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    settings: {
        position: 'absolute',
        right: 0,
    },
    userPanel: {
        position: 'relative',
    },
    fileInput: {
        display: 'none',
    },
}))
const Posts = ({name, date, text}) => {
    return (
        <Grid item xs={12}>
            <Card>
                <CardHeader
                    avatar={<Avatar>P</Avatar>}
                    action={
                        <IconButton>
                            <MoreVertIcon />
                        </IconButton>
                    }
                    title={name}
                    subheader={date}
                />
                <CardContent>
                    <Typography variant='body2' color='textSecondary' component='p'>
                        {text}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton>
                        <FavoriteIcon />
                    </IconButton>
                </CardActions>
            </Card>
        </Grid>
    )
}

const ProfileField = ({label, input, ...custom}) => (
    <TextField label={label} {...input} {...custom} />
)

const Profile = (props) => {
    const classes = useStyles()
    const [settings, setSettings] = useState(true)
    const [post, setPost] = useState(props.posts ? false : true)
    return (
        <Container className={classes.root}>
            <Grid container justify='center' spacing={4}>
                <Grid item xs={12}>
                    <Grid container spacing={2} className={classes.userPanel}>
                        <Grid item xs={4}>
                            <label htmlFor='avatar'>
                                <img
                                    className={classes.image}
                                    src={props.avatar || AvatarImage}
                                    alt='avatar'
                                />
                            </label>
                            <input
                                accept='image/*'
                                className={classes.fileInput}
                                id='avatar'
                                type='file'
                                onChange={(e) => {
                                    const file = e.target.files[0]
                                    props.setAvatar(file)
                                }}
                            />
                        </Grid>
                        <Grid item className={classes.nickname}>
                            <Typography variant='h4'>{props.login}</Typography>
                        </Grid>
                        <Grid item className={classes.settings}>
                            <IconButton onClick={() => setSettings(true)}>
                                <TuneIcon />
                            </IconButton>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <div className={classes.box}>
                        <Typography variant='h5'>{post ? 'Создать пост' : 'Посты'}</Typography>
                        <IconButton
                            className={classes.iconButton}
                            onClick={() => setPost(post ? false : true)}>
                            {post ? (
                                <CancelOutlinedIcon fontSize='large' />
                            ) : (
                                <CreateOutlinedIcon fontSize='large' />
                            )}
                        </IconButton>
                    </div>
                </Grid>
                <Grid item xs={12}>
                    {post && (
                        <Form
                            onSubmit={({text}) => {
                                props.addPost({name: props.login, text})
                                setPost(false)
                            }}>
                            {({handleSubmit, form}) => (
                                <form onSubmit={handleSubmit}>
                                    <Grid container justify='flex-end' spacing={2}>
                                        <Grid item xs={12}>
                                            <Field name='text'>
                                                {(props) => (
                                                    <TextField
                                                        onKeyUp={(e) => {
                                                            if (e.keyCode === 13 && !e.shiftKey) {
                                                                e.preventDefault()
                                                                handleSubmit()
                                                                form.reset()
                                                            }
                                                        }}
                                                        {...props.input}
                                                        multiline
                                                        label='Написать пост'
                                                        fullWidth
                                                        variant='outlined'
                                                    />
                                                )}
                                            </Field>
                                        </Grid>
                                        <Grid item>
                                            <Button type='submit' variant='outlined'>
                                                Отправить
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </form>
                            )}
                        </Form>
                    )}
                    <Grid container spacing={2} direction='column-reverse'>
                        {props.posts?.map(({postText, authorName, id}, key) => {
                            return <Posts key={key} name={authorName} text={postText} />
                        })}
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    )
}
export default Profile
