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

const Post = ({text, fid, pid, data, time}) => {
    return (
        <Grid item xs={12}>
            <Card>
                <CardHeader
                    avatar={<Avatar>P</Avatar>} //Тоже через lodash сделать аватарки по id пользователя и так будет каеф
                    action={
                        <IconButton>
                            <MoreVertIcon />
                        </IconButton>
                    }
                    title={'Имя можно сделать например через lodash'}
                    subheader={data && `${data} ${time}`}
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
