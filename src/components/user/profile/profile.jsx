import {
    Avatar,
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Container,
    Grid,
    IconButton,
    makeStyles,
    TextField,
    Typography,
} from '@material-ui/core'
import AvatarImage from '../../../assets/img/avatar.png'
import FavoriteIcon from '@material-ui/icons/Favorite'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import {useState} from 'react'
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined'
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined'

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
}))
const Posts = ({name, date, text}) => {
    return (
        <Grid container spacing={2}>
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
        </Grid>
    )
}

const Profile = (props) => {
    const classes = useStyles()
    const [post, setPost] = useState(props.posts ? false : true)
    return (
        <Container className={classes.root}>
            <Grid container justify='center' spacing={4}>
                <Grid item xs={12}>
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <img className={classes.image} src={AvatarImage} alt='avatar' />
                        </Grid>
                        <Grid item className={classes.nickname}>
                            <Typography variant='h4'>Pasha1neo</Typography>
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
                    {post ? (
                        <Grid container justify='flex-end' spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    multiline
                                    label='Написать пост'
                                    fullWidth
                                    variant='outlined'
                                />
                            </Grid>
                            <Grid item>
                                <Button variant='outlined'>Отправить</Button>
                            </Grid>
                        </Grid>
                    ) : (
                        props.posts?.map((posts, key) => {
                            return (
                                <Posts
                                    key={key}
                                    name={posts.name}
                                    date={posts.date}
                                    text={posts.text}
                                />
                            )
                        })
                    )}
                </Grid>
            </Grid>
        </Container>
    )
}
export default Profile
