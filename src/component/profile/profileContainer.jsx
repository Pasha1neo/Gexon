import {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import {compose} from 'redux'
import {addPost, setAvatar, setNickname, deletePost} from '../../redux/actions/profile'
import {getProfile} from '../../redux/actions/unauthorized'
import {addFriend, removeFriend} from '../../redux/actions/user'
import EditProfile from './editProfile'
import Profile from './profile'

const ProfileContainer = (props) => {
    useEffect(() => {
        const userId = props.match.params.userId
        props.getProfile(userId === undefined ? props.myUserId : userId)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.match])
    const [editProfile, setEditProfile] = useState(false)
    const saveChanges = ({name, avatar}) => {
        if (name) props.setNickname(name)
        if (avatar) props.setAvatar(avatar)
        setEditProfile(false)
    }
    return editProfile ? (
        <EditProfile
            avatar={props.avatar}
            nickname={props.nickname}
            setEditProfile={setEditProfile}
            saveChanges={saveChanges}
        />
    ) : (
        <Profile
            deletePost={props.deletePost}
            myNickname={props.myNickname}
            userId={props.userId}
            myUserId={props.myUserId}
            isMe={props.myUserId !== props.userId}
            nickname={props.nickname}
            avatar={props.avatar}
            posts={props.posts}
            authStatus={props.authStatus}
            addPost={props.addPost}
            setEditProfile={setEditProfile}
            addFriend={props.addFriend}
            removeFriend={props.removeFriend}
        />
    )
}

const mapStateToProps = (state) => ({
    authStatus: state.app.authStatus,
    nickname: state.profile.nickname || state.profile.login,
    userId: state.profile.userId,
    avatar: state.profile.avatar,
    posts: state.profile.posts,
    myUserId: state.user.userId,
    myNickname: state.user.nickname || state.user.login,
})
const mapDispatchToActions = {
    addPost,
    setAvatar,
    setNickname,
    getProfile,
    deletePost,
    addFriend,
    removeFriend,
}
export default compose(withRouter, connect(mapStateToProps, mapDispatchToActions))(ProfileContainer)
