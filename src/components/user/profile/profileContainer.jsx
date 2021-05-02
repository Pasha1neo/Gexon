import {useState} from 'react'
import {connect} from 'react-redux'
import {compose} from 'redux'
import {addPost, setAvatar, setNickname} from '../../../redux/actions/profile'
import EditProfile from './editProfile'
import Profile from './profile'
import AvatarImage from '../../../assets/img/avatar.png'

const ProfileContainer = (props) => {
    const [editProfile, setEditProfile] = useState(false)
    if (editProfile) {
        return (
            <EditProfile
                avatar={props.avatar}
                setAvatar={props.setAvatar}
                setEditProfile={setEditProfile}
                setNickname={props.setNickname}
                nickname={props.nickname}
            />
        )
    } else {
        return (
            <Profile
                addPost={props.addPost}
                nickname={props.nickname}
                avatar={props.avatar}
                posts={props.posts}
                id={props.id}
                setEditProfile={setEditProfile}
            />
        )
    }
}

const mapStateToProps = (state) => ({
    nickname: state.app?.nickname || state.app.login,
    id: state.app.userId,
    avatar: state.app?.avatar || AvatarImage,
    posts: state.profile?.posts,
})
export default compose(connect(mapStateToProps, {addPost, setAvatar, setNickname}))(
    ProfileContainer
)
