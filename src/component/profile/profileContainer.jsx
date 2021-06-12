import {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import {compose} from 'redux'
import {addPost, setAvatar, setNickname, getProfile, deletePost} from '../../redux/actions/profile'
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
            myUserId={props.myUserId}
            isMe={props.myUserId !== props.userId}
            userId={props.userId}
            nickname={props.nickname}
            avatar={props.avatar}
            posts={props.posts}
            authStatus={props.authStatus}
            addPost={props.addPost}
            setEditProfile={setEditProfile}
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
export default compose(
    withRouter,
    connect(mapStateToProps, {addPost, setAvatar, setNickname, getProfile, deletePost})
)(ProfileContainer)
