import {connect} from 'react-redux'
import {compose} from 'redux'
import {addPost, setAvatar} from '../../../redux/actions/profile'
import Profile from './profile'

const ProfileContainer = (props) => {
    return (
        <Profile
            addPost={props.addPost}
            login={props.login}
            avatar={props.avatar}
            posts={props.posts}
            setAvatar={props.setAvatar}
        />
    )
}

const mapStateToProps = (state) => ({
    login: state.app.login,
    avatar: state.app.avatar,
    posts: state.profile.posts,
})
export default compose(connect(mapStateToProps, {addPost, setAvatar}))(ProfileContainer)
