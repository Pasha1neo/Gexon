import {connect} from 'react-redux'
import {compose} from 'redux'
import {
    sendMessage,
    selectDialog,
    readMessage,
    changeMessage,
    deleteMessage,
} from '../../redux/actions/chat'
import {withAuthRedurect} from '../util/redirect/authRedirect'
import {useEffect, useState} from 'react'
import {Redirect, withRouter} from 'react-router'
import _ from 'lodash'
import {makeStyles, Paper} from '@material-ui/core'
import UserList from './userslist/userslist'
import Chat from './chat/chat'
import AvatarImage from '../../assets/img/avatar.png'

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
        const wid = pathname.split('/chat/').pop()
        props.selectDialog(wid)
    }, [props.location])

    return (
        <Paper className={classes.root}>
            <UserList
                userId={props.userId}
                isOpen={isOpen}
                users={props.users || []}
                dialogs={props.dialogs || []}
                mobileClose={() => setMobile(false)}
            />
            <Chat
                users={props.users}
                dialog={_.find(props.dialogs, {wid: props.wid})}
                sendMessage={props.sendMessage}
                // readMessage={props.readMessage}
                // changeMessage={props.changeMessage}
                // deleteMessage={props.deleteMessage}
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
    avatar: state.user.avatar || AvatarImage,
    wid: state.user.wid,
})
export default compose(
    withRouter,
    connect(mapStateToProps, {sendMessage, selectDialog, readMessage, changeMessage, deleteMessage})
)(ChatContainer)
