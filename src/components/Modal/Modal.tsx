import { useDispatch, useSelector } from "react-redux";

import type { RootState } from "../../store";
import { AppDispatch } from "../../store";
import { modalActions } from "../../store/modal-slice";
import NewPlayerName from "./ModalContent/NewPlayerName";
import TicketCreation from "./ModalContent/TicketCreation";
import Draw from "./ModalContent/Draw";
import NoDraw from "./ModalContent/NoDraw";
import NewRound from "./ModalContent/NewRound";
import NewGame from "./ModalContent/NewGame";
import classes from "./Modal.module.css";

const Modal: React.FC<{ open: boolean }> = (props) => {
  const { open } = props;
  const dispatch: AppDispatch = useDispatch();
  const nameModal = useSelector((state: RootState) => state.modal.nameModal);
  const ticketGenModal = useSelector(
    (state: RootState) => state.modal.ticketCreationModal
  );
  const drawModal = useSelector(
    (state: RootState) => state.modal.drawModal
  );
  const noDrawModal = useSelector(
    (state: RootState) => state.modal.noDrawModal
  );
  const newRoundModal = useSelector(
    (state: RootState) => state.modal.newRoundModal
  );
  const newGameModal = useSelector(
    (state: RootState) => state.modal.newGameModal
  );

  const handleCloseModal = () => {
    dispatch(modalActions.handleModal(false));
    dispatch(modalActions.resetAllModalState());
  };

  if (open) {
    return (
      <div className={classes.overlay} onClick={handleCloseModal}>
        <div
          className={classes.modalContainer}
          onClick={(e) => e.stopPropagation()}
        >
          {nameModal && <NewPlayerName closeModal={handleCloseModal} />}
          {ticketGenModal && <TicketCreation closeModal={handleCloseModal} />}
          {drawModal && <Draw closeModal={handleCloseModal} />}
          {noDrawModal && <NoDraw closeModal={handleCloseModal} />}
          {newRoundModal && <NewRound closeModal={handleCloseModal} />}
          {newGameModal && <NewGame closeModal={handleCloseModal} />}
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default Modal;
