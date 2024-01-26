import "@/app/styles/modal.css";
import Button from "./Button";

type ModalProps = {
  title: string;
  isInform: boolean;
  setIsModal: (value: boolean) => void;
  successHandle?: () => void;
  cancelHandle?: () => void;
};

const Modal = ({title, isInform, setIsModal, successHandle, cancelHandle}: ModalProps) => {
  const closeModal = () => {
    const elem = document.querySelector(".modal_wrapper");
    if (elem) {
      elem.animate([{
        opacity: 1
      }, {
        opacity: 0
      }], {
        duration: 200,
        fill: "both",
        easing: "ease-in"
      });
      Promise.all(
        elem.getAnimations({subtree: true}).map((animation) => animation.finished),
      ).then(() => {
        setIsModal(false);
        if (cancelHandle) {
          cancelHandle();
        }
      });
    }
  };

  return <div className="modal_wrapper">
    <div className="modal">
      <h2 className="modal_title">{title}</h2>
      <div className="modal_buttons">
        {!isInform && <Button
          type="button"
          text="Да"
          className="contact_feedback_button"
          onClick={() => {
            if (successHandle) {
              successHandle();
            }
          }}
        />}
        <Button
          type="button"
          text={isInform ? "Хорошо" : "Нет"}
          className="section_button"
          onClick={() => closeModal()}
        />
      </div>
    </div>
  </div>
};

export default Modal;