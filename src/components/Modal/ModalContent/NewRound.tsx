import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store";

import {
  fetchAllTicketsData,
  deleteAllTickets,
} from "../../../store/ticket-actions";
import { notificationActions } from "../../../store/notification-slice";
import { updateDraw } from "../../../store/draw-actions";
import { DRAW_DATA } from "../../../store/draw-slice";
import classes from "../Modal.module.css";

const NewRound: React.FC<{ closeModal: () => void }> = (props) => {
  const { closeModal } = props;
  const dispatch: AppDispatch = useDispatch();
  const tickets = useSelector((state: RootState) => state.ticket.tickets);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(deleteAllTickets(tickets))
      .then(() => dispatch(fetchAllTicketsData(true, "isGenerated", "asc")))
      .then(() => dispatch(updateDraw(DRAW_DATA)))
      .then(() =>
        dispatch(
          notificationActions.showNotification({
            status: "success",
            title: "Új kör kezdődött!",
            show: true,
          })
        )
      );
    closeModal();
  };

  useEffect(() => {
    dispatch(fetchAllTicketsData(true, "isGenerated", "asc"));
  }, [dispatch]);

  return (
    <div className={classes.content}>
      <h1>Biztos, hogy új kört szeretne indítani?</h1>
      <form onSubmit={handleSubmit}>
        <div className={classes.buttonContainer}>
          <button type="button" onClick={closeModal}>
            Nem
          </button>
          <button>Igen</button>
        </div>
      </form>
    </div>
  );
};

export default NewRound;
