import s from './Modal.module.css'
//поиграться с анимацией выхода
const Modal = ({active, closeModal, children}) => {
    return (
        <div
            className={active ? `${s.modal} ${s.active}` : s.modal}
            onClick={() => closeModal(false)}>
            <div
                className={
                    active ? `${s.modalContent} ${s.active}` : s.modalContent
                }
                onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    )
}

export default Modal
