import {
    Avatar,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Grid,
    IconButton,
    Typography,
} from '@material-ui/core'
import FavoriteIcon from '@material-ui/icons/Favorite'
import MoreVertIcon from '@material-ui/icons/MoreVert'

const Post = ({content, author, fid, pid, data, time}) => {
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
                    title={author}
                    subheader={data && `${data} ${time}`}
                />
                <CardContent>
                    <Typography variant='body2' color='textSecondary' component='p'>
                        {content}
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

const Posts = (props) => {
    return (
        <Grid container spacing={2} direction='column-reverse'>
            {props.posts?.map(
                ({postText, authorName, id, content, author, pid, fid, data, time}, key) => {
                    return (
                        <Post
                            key={pid || key}
                            content={content || postText}
                            author={author || authorName}
                            pid={pid || id}
                            fid={fid || null}
                            data={data}
                            time={time}
                        />
                    )
                }
            )}
        </Grid>
    )
}

export default Posts
