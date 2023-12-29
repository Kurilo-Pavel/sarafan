import "../styles/modal.css";
import Button from "./Button";

type ModalProps = {
  title: string;
  setModalIsOpen: (value: boolean) => void;
  onClick: () => void;
}

const Modal = ({title, onClick, setModalIsOpen}: ModalProps) => {
  return <div className="modal">
    <h2 className="modal_title">{title}</h2>
    <div className="modal_buttons">
      <Button type="button" text="Да" className="contact_feedback_button" onClick={onClick}/>
      <Button type="button" text="Нет" className="section_button" onClick={() => setModalIsOpen(false)}/>
    </div>
  </div>
}

export default Modal;