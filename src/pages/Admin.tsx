import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "../store";
import { fetchUserData } from "../store/user-actions";
import { fetchAllTicketsData } from "../store/ticket-actions";
import { modalActions } from "../store/modal-slice";
import { fetchDrawData } from "../store/draw-actions";
import Tickets from "../components/Tickets/Tickets";
import Title from "../components/UI/Title";
import Statistic from "../components/Statistic/Statistic";
import classes from "../components/UI/Ui.module.css";

const Admin = () => {
  const dispatch: AppDispatch = useDispatch();
  const userName = useSelector(
    (state: RootState) => state.selectedUser.user.name
  );
  const tickets = useSelector((state: RootState) => state.ticket.tickets);
  const draw = useSelector((state: RootState) => state.draw.drawData);

  const OpenTicketCreationModal = () => {
    dispatch(modalActions.resetAllModalState());
    dispatch(modalActions.setTicketCreationModal(true));
    dispatch(modalActions.handleModal(true));
  };

  const openNoDrawModal = () => {
    dispatch(modalActions.resetAllModalState());
    dispatch(modalActions.setNoDrawModal(true));
    dispatch(modalActions.handleModal(true));
  };

  const OpenDrawModal = () => {
    dispatch(modalActions.resetAllModalState());
    dispatch(modalActions.setDrawModal(true));
    dispatch(modalActions.handleModal(true));
  };

  const OpenNewRoundModal = () => {
    dispatch(modalActions.resetAllModalState());
    dispatch(modalActions.setNewRoundModal(true));
    dispatch(modalActions.handleModal(true));
  };

  const OpenNewGameModal = () => {
    dispatch(modalActions.resetAllModalState());
    dispatch(modalActions.setNewGameModal(true));
    dispatch(modalActions.handleModal(true));
  };

  useEffect(() => {
    dispatch(fetchUserData("1"));
    dispatch(fetchAllTicketsData(true, "isGenerated", "asc"));
    dispatch(fetchDrawData());
  }, [dispatch]);

  return (
    <Fragment>
      <Title>Üdvözlöm kedves {userName}!</Title>
      <div>
        {!draw.isDraw && (
          <button
            className={classes.controlButton}
            onClick={OpenTicketCreationModal}
          >
            Szelvénygenerálás
          </button>
        )}
        {!draw.isDraw && (
          <button
            className={classes.controlButton}
            onClick={tickets.length > 0 ? OpenDrawModal : openNoDrawModal}
          >
            Sorsolás
          </button>
        )}
        <button className={classes.controlButton} onClick={OpenNewRoundModal}>
          Új kör
        </button>
        <button className={classes.controlButton} onClick={OpenNewGameModal}>
          Új játék
        </button>
      </div>
      {draw.isDraw && (
        <div>
          <Title>
            Kihúzott számok: {draw.drawedNumbers.map((number) => `${number} `)}
          </Title>
          <hr />
          <Title>Sorsolási statisztika</Title>
          <Statistic />
        </div>
      )}
      {tickets.length > 0 && (
        <div>
          <hr />
          <Title>Szelvények</Title>
          <Tickets tickets={tickets} />
        </div>
      )}
    </Fragment>
  );
};

export default Admin;
