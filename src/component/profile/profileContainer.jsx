import {useState} from 'react'
import {connect} from 'react-redux'
import {compose} from 'redux'
import {addPost, setAvatar, setNickname} from '../../redux/actions/profile'
import EditProfile from './editProfile'
import Profile from './profile'

const ProfileContainer = (props) => {
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
                id={props.id}
                nickname={props.nickname}
                avatar={props.avatar}
                posts={props.posts}
                setEditProfile={setEditProfile}
                addPost={props.addPost}
            />
        )
    }
}

const mapStateToProps = (state) => ({
    nickname: state.user.nickname || state.user.login,
    id: state.user.userId,
    avatar: state.user.avatar,
    posts: state.user.posts,
})
export default compose(connect(mapStateToProps, {addPost, setAvatar, setNickname}))(
    ProfileContainer
)
