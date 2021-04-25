import s from './connection.module.css'

const Connection = (props) => {
    return (
        <div className={s.connect}>
            {!props.connection && (
                <div className={s.connection}>
                    <div>Нету связи с сервером проверьте соединение...</div>
                    <div className={s.ldsFacebook}>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
            )}
            {props.children}
        </div>
    )
}
export default Connection
