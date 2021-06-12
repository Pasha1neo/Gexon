import {
    Avatar,
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Container,
    Grid,
    IconButton,
    TextField,
    Typography,
} from '@material-ui/core'
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined'
import PublishOutlinedIcon from '@material-ui/icons/PublishOutlined'
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined'
import DescriptionIcon from '@material-ui/icons/Description'
import {useState} from 'react'
import useStyles from './style'
import {avatarLink} from '../../config'

const EditProfile = (props) => {
    const classes = useStyles()
    const [nickname, setName] = useState(props.nickname)
    const [avatar, setAvatar] = useState(avatarLink(props.avatar))
    const [properties, setProperties] = useState(null)
    const [avatarFile, setFile] = useState(null)
    const setStateName = (e) => {
        setName(e.currentTarget.value)
    }
    const handleChangeAvatar = (e) => {
        const file = e.target.files[0]
        if (file) {
            setFile(file)
            const reader = new FileReader()
            reader.onloadend = handleAvatar
            setProperties({
                name: file.name,
                size: Math.ceil(file.size / 1000),
                type: file.type.split('/')[1],
            })
            reader.readAsDataURL(file)
        }
    }
    const handleAvatar = (e) => {
        const content = e.target.result
        setAvatar(content)
    }
    const handleEnter = (e) => {
        if (e.keyCode === 13 && !e.shiftKey) {
            e.preventDefault()
            handleSave()
            return false
        }
    }
    const handleSave = () => {
        const data = {
            name: null,
            avatar: null,
        }
        if (nickname !== props.nickname) data.name = nickname
        if (avatarFile) data.avatar = avatarFile
        props.saveChanges(data)
    }
    return (
        <Container className={classes.root}>
            <Grid container spacing={1} className={classes.userPanel}>
                <Grid item xs={12}>
                    <Card variant='outlined' className={classes.userPanel}>
                        <Box className={classes.avatarContainer}>
                            <CardMedia className={classes.media}>
                                <Box component='label' htmlFor='avatar'>
                                    <Avatar className={classes.avatar} src={avatar} alt='avatar' />
                                </Box>
                            </CardMedia>
                            <Box>
                                <IconButton
                                    onClick={() => alert('Тут будет удаление фото')}
                                    className={classes.delAvatar}>
                                    <DeleteOutlineOutlinedIcon />
                                </IconButton>
                                <IconButton component='label' htmlFor='avatar'>
                                    <PublishOutlinedIcon />
                                </IconButton>
                                <IconButton onClick={() => alert('Тут будет описание фото')}>
                                    <DescriptionIcon />
                                </IconButton>
                                {properties && (
                                    <>
                                        <Typography noWrap>Название - {properties.name}</Typography>
                                        <Typography>Размер - {properties.size}KB</Typography>
                                        <Typography>Тип - {properties.type}</Typography>
                                    </>
                                )}
                            </Box>
                            <input
                                accept='image/*'
                                className={classes.fileInput}
                                id='avatar'
                                type='file'
                                onChange={handleChangeAvatar}
                            />
                        </Box>
                        <CardContent className={classes.content}>
                            <TextField
                                label='Введите новое имя'
                                className={classes.changeName}
                                defaultValue={nickname}
                                variant='outlined'
                                onKeyDown={handleEnter}
                                onChange={(e) => setStateName(e)}
                            />
                        </CardContent>
                        <CardActions className={classes.actions}>
                            <IconButton onClick={() => props.setEditProfile(false)}>
                                <CloseOutlinedIcon fontSize='large' />
                            </IconButton>
                        </CardActions>
                        <Button
                            color='primary'
                            className={classes.saveButton}
                            variant='contained'
                            onClick={handleSave}>
                            Сохранить
                        </Button>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    )
}
export default EditProfile
