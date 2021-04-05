import s from './profile.module.css'
import Avatar from '../../../assets/img/avatar.png'
import Settings from '../../../assets/img/settings.png'
const Profile = () => {
    return (
        <div className={s.profile}>
            <div className={s.profileContainer}>
                <div className={s.header}>
                    <div className={s.createDay}>20.12.2001</div>
                    <div className={s.userInfo}>
                        <div className={s.avatarContainer}>
                            <img className={s.avatar} src={Avatar} alt='Avatar' />
                            <button className={s.addToFriend}>Добавить</button>
                        </div>
                        <div className={s.info}>
                            <div className={s.username}>Pasha1neo</div>
                            <div className={s.otherInfo}>
                                <div className={s.friends}>Друзья: 0</div>
                            </div>
                        </div>
                        <img className={s.settings} src={Settings} alt='settings' />
                    </div>
                </div>
                <div className={s.content}>Что сюда добавить ?</div>
            </div>
        </div>
    )
}
export default Profile
