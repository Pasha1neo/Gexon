import {
    Container,
    Card,
    Grid,
    CardMedia,
    CardContent,
    CardActions,
    IconButton,
    Typography,
    Avatar,
    Box,
    Button,
} from '@material-ui/core'
import TuneIcon from '@material-ui/icons/Tune'
import useStyles from './style'
import PostForm from './postForm'
import Posts from './post'
import {avatarLink} from '../../config'
import {useState} from 'react'
import Options from './menu'
import {Link} from 'react-router-dom'

const Profile = (props) => {
    const [element, setElement] = useState(null)
    const [postId, setPostId] = useState(null)
    const handleOpenMenu = (event, pid) => {
        setElement(event.currentTarget)
        setPostId(pid)
    }
    const handleCloseMenu = () => {
        setElement(null)
        setPostId(null)
    }
    const classes = useStyles()
    return (
        <Container className={classes.root}>
            <Options
                deletePost={props.deletePost}
                pid={postId}
                element={element}
                handleCloseMenu={handleCloseMenu}></Options>
            <Grid container justify='center' spacing={4}>
                <Grid item xs={12}>
                    <Card variant='outlined' className={classes.userPanel}>
                        <Box className={classes.avatarContainer}>
                            <CardMedia className={classes.media}>
                                <Avatar
                                    className={classes.avatar}
                                    src={avatarLink(props.avatar)}
                                    alt='avatar'
                                />
                            </CardMedia>
                            {props.authStatus && props.isMe && (
                                <>
                                    <Button
                                        component={Link}
                                        to={`/chat/${props.userId}`}
                                        className={classes.button}
                                        fullWidth
                                        color='primary'
                                        variant='contained'>
                                        Написать
                                    </Button>
                                    <Button
                                        className={classes.button}
                                        fullWidth
                                        color='primary'
                                        variant='contained'
                                        onClick={() => {
                                            console.log(props.userId)
                                            props.addFriend(props.userId)
                                        }}>
                                        Добавить в друзья
                                    </Button>
                                </>
                            )}
                        </Box>
                        <CardContent className={classes.content}>
                            <Typography className={classes.nickname} variant='h4'>
                                {props.nickname}
                            </Typography>
                        </CardContent>
                        <CardActions className={classes.actions}>
                            {!props.isMe && (
                                <IconButton onClick={() => props.setEditProfile(true)}>
                                    <TuneIcon fontSize='large' />
                                </IconButton>
                            )}
                        </CardActions>
                    </Card>
                </Grid>
                {props.authStatus && (
                    <Grid item xs={12}>
                        <PostForm
                            myUserId={props.myUserId}
                            addPost={props.addPost}
                            userId={props.userId}
                        />
                    </Grid>
                )}
                <Grid item>
                    <Typography variant='h5'>Посты</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Posts
                        authStatus={props.authStatus}
                        handleOpenMenu={handleOpenMenu}
                        deletePost={props.deletePost}
                        myNickname={props.myNickname}
                        posts={props.posts}
                    />
                </Grid>
            </Grid>
        </Container>
    )
}
export default Profile
