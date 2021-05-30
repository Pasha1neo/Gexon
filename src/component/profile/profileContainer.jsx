import {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import {compose} from 'redux'
import {addPost, setAvatar, setNickname, getProfile} from '../../redux/actions/profile'
import EditProfile from './editProfile'
import Profile from './profile'

const ProfileContainer = (props) => {
    useEffect(() => {
        const userId = props.match.params.userId
        props.getProfile(userId === undefined ? props.myUserId : userId)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.match])
    const [editProfile, setEditProfile] = useState(false)
    if (editProfile) {
        return (
            <EditProfile
                avatar={props.avatar}
                nickname={props.nickname}
                setAvatar={props.setAvatar}
                setEditProfile={setEditProfile}
                setNickname={props.setNickname}
            />
        )
    } else {
        return (
            <Profile
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
}

const mapStateToProps = (state) => ({
    authStatus: state.app.authStatus,
    nickname: state.profile.nickname || state.profile.login,
    userId: state.profile.userId,
    avatar: state.profile.avatar,
    posts: state.profile.posts,
    myUserId: state.user.userId,
})
export default compose(
    withRouter,
    connect(mapStateToProps, {addPost, setAvatar, setNickname, getProfile})
)(ProfileContainer)
