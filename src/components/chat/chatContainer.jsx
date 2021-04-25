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
import {useEffect, useState} from 'react'
import {Redirect, withRouter} from 'react-router'
import _ from 'lodash'
import {makeStyles, Paper} from '@material-ui/core'
import UserList from './userslist/userslist'
import Chat from './chat/chat'

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
        const dialogId = pathname.split('/').pop()
        props.selectChat(dialogId)
    }, [props.location])

    if (!_.find(props.users, {userID: props.with}) && props.with !== 'chat') {
        return <Redirect to={'/chat'} />
    }

    return (
        <Paper className={classes.root}>
            <UserList
                isOpen={isOpen}
                mobileClose={() => {
                    setMobile(false)
                }}
                users={props.users}
                dialogsData={props.dialogsData}
                me={props.me}
            />
            <Chat
                users={props.users}
                connect={props.connect}
                dialog={_.find(props.dialogsData, {wid: props.with})}
                sendMessage={props.sendMessage}
                readMessage={props.readMessage}
                changeMessage={props.changeMessage}
                deleteMessage={props.deleteMessage}
                me={props.me}
                isOpen={isOpen}
                mobileOpen={() => {
                    setMobile(true)
                }}
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
    withRouter,
    connect(mapStateToProps, {sendMessage, selectChat, readMessage, changeMessage, deleteMessage})
)(ChatContainer)
