import {Button, Container, Grid, IconButton, TextField, Typography} from '@material-ui/core'
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined'
import PublishOutlinedIcon from '@material-ui/icons/PublishOutlined'
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined'
import useStyles from './style'
import {useState} from 'react'
import AVATAR from '../../../assets/img/avatar.png'
const EditProfile = (props) => {
    const classes = useStyles()
    const [nickname, setName] = useState(props.nickname)
    const [avatar, setAvatar] = useState(
        props.avatar ? `http://localhost:5000/${props.avatar}` : AVATAR
    )
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
    const saveChanges = () => {
        props.setNickname(nickname)
        props.setAvatar(avatarFile)
        props.setEditProfile(false)
    }
    return (
        <Container className={classes.root}>
            <Grid container spacing={2} className={classes.userPanel}>
                <Grid item xs={4}>
                    <label htmlFor='avatar' className={classes.avatarContainer}>
                        <img className={classes.image} src={avatar} alt='avatar'></img>
                        <IconButton
                            onClick={() => {
                                alert('Удаление аватарки ещё не доделано XD')
                            }}
                            className={classes.delAvatar}>
                            <DeleteOutlineOutlinedIcon fontSize='large' />
                        </IconButton>
                        <IconButton className={classes.uploadAvatar}>
                            <label htmlFor='avatar'>
                                <PublishOutlinedIcon fontSize='large' />
                            </label>
                        </IconButton>
                        {properties && (
                            <div className={classes.properties}>
                                <Typography>Название - {properties.name}</Typography>
                                <Typography>Размер - {properties.size}KB</Typography>
                                <Typography>Тип - {properties.type}</Typography>
                            </div>
                        )}
                    </label>
                    <input
                        accept='image/*'
                        className={classes.fileInput}
                        id='avatar'
                        type='file'
                        onChange={(e) => handleChangeAvatar(e)}
                    />
                </Grid>
                <Grid item xs={6} className={classes.nickname}>
                    <TextField
                        className={classes.changeName}
                        defaultValue={nickname}
                        helperText='Новое имя'
                        variant='outlined'
                        onChange={(e) => setStateName(e)}
                    />
                </Grid>
                <Grid item className={classes.settings}>
                    <IconButton onClick={() => props.setEditProfile(false)}>
                        <CloseOutlinedIcon fontSize='large' />
                    </IconButton>
                </Grid>
                <Grid container justify='center'>
                    <Grid item>
                        <Button
                            className={classes.saveChanges}
                            variant='contained'
                            onClick={() => saveChanges()}>
                            Сохранить
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    )
}
export default EditProfile
