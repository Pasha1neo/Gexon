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
import {avatarLink} from '../../config'

const Post = ({text, fid, pid, data, time}) => {
    const username = fid?.nickname || fid?.login
    const avatar = avatarLink(fid?.avatar)
    return (
        <Grid item xs={12}>
            <Card>
                <CardHeader
                    avatar={<Avatar src={avatar}></Avatar>}
                    action={
                        <IconButton>
                            <MoreVertIcon />
                        </IconButton>
                    }
                    title={username}
                    subheader={`${data} ${time}`}
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

const Posts = (props) => {
    return (
        <Grid container spacing={2} direction='column-reverse'>
            {props.posts?.map(({text, fid, _id, data, time}) => {
                return <Post key={_id} text={text} pid={_id} fid={fid} data={data} time={time} />
            })}
        </Grid>
    )
}

export default Posts
