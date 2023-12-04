import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { AppDispatch, RootState } from "../../../store";
import {
  fetchAllTicketsData,
  deleteAllTickets,
} from "../../../store/ticket-actions";
import { notificationActions } from "../../../store/notification-slice";
import { updateDraw } from "../../../store/draw-actions";
import { resetUserBalance, updateUserName } from "../../../store/user-actions";
import { updateFirstRun } from "../../../store/firstRun-actions";
import { DRAW_DATA } from "../../../store/draw-slice";
import classes from "../Modal.module.css";

const NewGame: React.FC<{ closeModal: () => void }> = (props) => {
  const { closeModal } = props;
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate()

  const tickets = useSelector(
    (state: RootState) => state.ticket.tickets
  );

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(deleteAllTickets(tickets))
    .then(() => dispatch(fetchAllTicketsData(true, "isGenerated", "asc")))
    .then(() => dispatch(resetUserBalance("1", 0)))
    .then(() => dispatch(resetUserBalance("2", 10000)))
    .then(() => dispatch(updateUserName("2", "Játékos")))
    .then(() => dispatch(updateDraw(DRAW_DATA)))
    .then(() => dispatch(updateFirstRun(true)))
    .then(() => dispatch(
      notificationActions.showNotification({
        status: "success",
        title: "Új játék kezdődött!",
        show: true,
      })
    ));
    closeModal();
    navigate('/');
  };

  useEffect(() => {
    dispatch(fetchAllTicketsData(true, "isGenerated", "asc"));
  }, [dispatch]);

  return (
    <div className={classes.content}>
      <h1>Biztos, hogy új játékot szeretne indítani?</h1>
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

export default NewGame;
