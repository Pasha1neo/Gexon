import {connect} from 'react-redux'
import {compose} from 'redux'
import {
    sendMessage,
    selectChat,
    readMessage,
    changeMessage,
    deleteMessage,
} from '../../redux/actions/chat'
import {withAuthRedurect} from '../util/redirect/authRedirect'
import {useEffect} from 'react'
import {withRouter} from 'react-router'
import _ from 'lodash'
import {Hidden, makeStyles, Paper} from '@material-ui/core'
import UsersList from './userslist/userslist'
import Chat from './chat/chat'

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexGrow: 1,
        height: '100%',
        maxHeight: '100%',
    },
}))

const ChatContainer = (props) => {
    const classes = useStyles()
    useEffect(() => {
        const {pathname} = props.location
        const dialogId = pathname.split('/').pop()
        props.selectChat(dialogId)
    }, [props.location])

    return (
        <Paper className={classes.root}>
            <Hidden only={['xs', 'sm']}>
                <UsersList users={props.users} dialogsData={props.dialogsData} me={props.me} />
            </Hidden>
            <Chat
                users={props.users}
                connect={props.connect}
                dialog={_.find(props.dialogsData, {wid: props.with})}
                sendMessage={props.sendMessage}
                readMessage={props.readMessage}
                changeMessage={props.changeMessage}
                deleteMessage={props.deleteMessage}
                me={props.me}
            />
        </Paper>
    )
}

const mapStateToProps = (state) => ({
    connect: state.chat.connect,
    users: state.chat.usersData,
    dialogsData: state.chat.dialogsData,
    with: state.chat.wid,
    chatReady: state.chat.chatReady,
    me: state.chat.user.userID,
    dialogReady: state.chat.dialogReady,
})
export default compose(
    withAuthRedurect,
    connect(mapStateToProps, {sendMessage, selectChat, readMessage, changeMessage, deleteMessage}),
    withRouter
)(ChatContainer)
