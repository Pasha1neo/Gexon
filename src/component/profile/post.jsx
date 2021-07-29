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

const Post = ({text, fid, pid, data, time, myNickname, handleOpenMenu, authStatus}) => {
    const username = fid?.nickname || fid?.login || myNickname || null
    const avatar = avatarLink(fid?.avatar)
    return (
        <Grid item xs={12}>
            <Card>
                <CardHeader
                    avatar={<Avatar src={avatar}></Avatar>}
                    action={
                        authStatus && (
                            <IconButton
                                onClick={(e) => {
                                    handleOpenMenu(e, pid)
                                }}>
                                <MoreVertIcon />
                            </IconButton>
                        )
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
                return (
                    <Post
                        handleOpenMenu={props.handleOpenMenu}
                        deletePost={props.deletePost}
                        myNickname={props.myNickname}
                        key={_id}
                        text={text}
                        pid={_id}
                        fid={fid}
                        data={data}
                        time={time}
                        authStatus={props.authStatus}
                    />
                )
            })}
        </Grid>
    )
}

export default Posts
