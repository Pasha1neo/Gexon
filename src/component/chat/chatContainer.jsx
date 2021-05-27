import {connect} from 'react-redux'
import {compose} from 'redux'
import {useEffect, useState} from 'react'
import {withRouter} from 'react-router'
import {makeStyles, Paper} from '@material-ui/core'
import PersonIcon from '@material-ui/icons/Person'
import _ from 'lodash'
import UserList from '../userslist/userslist'
import Chat from './chat'
import {
    sendMessage,
    selectDialog,
    readMessage,
    changeMessage,
    deleteMessage,
} from '../../redux/actions/chat'

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        height: '100%',
    },
}))

const ChatContainer = (props) => {
    const classes = useStyles()
    const [isOpen, setMobile] = useState(false)

    useEffect(() => {
        const {pathname} = props.location
        const wid = pathname.split('/').pop()
        if (wid === 'chat') {
            props.selectDialog(props.userId)
        } else {
            props.selectDialog(wid)
        }
    }, [props])

    return (
        <Paper className={classes.root}>
            <UserList
                userId={props.userId}
                users={props.users || []}
                dialogs={props.dialogs || []}
                isOpen={isOpen}
                mobileClose={() => setMobile(false)}
            />
            <Chat
                userId={props.userId}
                withUser={_.find(props.users, {_id: props.wid})}
                dialog={_.find(props.dialogs, {wid: props.wid})}
                sendMessage={props.sendMessage}
                readMessage={props.readMessage}
                changeMessage={props.changeMessage}
                deleteMessage={props.deleteMessage}
                isOpen={isOpen}
                mobileOpen={() => setMobile(true)}
            />
        </Paper>
    )
}

const mapStateToProps = (state) => ({
    users: state.user.users,
    dialogs: state.user.dialogs,
    userId: state.user.userId,
    avatar: state.user.avatar || <PersonIcon />,
    wid: state.user.wid,
})
export default compose(
    withRouter,
    connect(mapStateToProps, {sendMessage, selectDialog, readMessage, changeMessage, deleteMessage})
)(ChatContainer)
