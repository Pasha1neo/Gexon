import {Container, Grid, IconButton, Typography} from '@material-ui/core'
import TuneIcon from '@material-ui/icons/Tune'
import useStyles from './style'
import PostForm from './postForm'
import Posts from './post'

const Profile = (props) => {
    const classes = useStyles()
    return (
        <Container className={classes.root}>
            <Grid container justify='center' spacing={4}>
                <Grid item xs={12}>
                    <Grid container spacing={2} className={classes.userPanel}>
                        <Grid item xs={4}>
                            <img className={classes.image} src={props.avatar} alt='avatar' />
                        </Grid>
                        <Grid item>
                            <Typography className={classes.nickname} variant='h4'>
                                {props.nickname}
                            </Typography>
                        </Grid>
                        <Grid item className={classes.settings}>
                            <IconButton onClick={() => props.setEditProfile(true)}>
                                <TuneIcon fontSize='large' />
                            </IconButton>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <PostForm addPost={props.addPost} id={props.id} nickname={props.nickname} />
                </Grid>
                <Grid item>
                    <Typography variant='h5'>Посты</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Posts posts={props.posts} />
                </Grid>
            </Grid>
        </Container>
    )
}
export default Profile
