import {MenuItem, Button, Menu} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import CreateIcon from '@material-ui/icons/Create'
import useStyles from './style'

const Options = ({pid, element, handleCloseMenu, deletePost}) => {
    const classes = useStyles()
    const handleDelete = () => {
        deletePost(pid)
        handleCloseMenu()
    }
    return (
        <Menu anchorEl={element} keepMounted open={Boolean(element)} onClose={handleCloseMenu}>
            <MenuItem className={classes.moreMenuItem}>
                <Button
                    className={classes.button}
                    fullWidth
                    size='small'
                    startIcon={<CreateIcon fontSize='small' />}
                    color='primary'>
                    Изменить
                </Button>
            </MenuItem>
            <MenuItem className={classes.moreMenuItem}>
                <Button
                    onClick={handleDelete}
                    className={classes.button}
                    fullWidth
                    size='small'
                    startIcon={<DeleteIcon fontSize='small' />}
                    color='secondary'>
                    Удалить
                </Button>
            </MenuItem>
        </Menu>
    )
}
export default Options
