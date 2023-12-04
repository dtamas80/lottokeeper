import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "../store";
import { fetchUserData } from "../store/user-actions";
import { fetchAllTicketsData } from "../store/ticket-actions";
import { modalActions } from "../store/modal-slice";
import { fetchFirstRunData } from "../store/firstRun-actions";
import { fetchDrawData } from "../store/draw-actions";
import Title from "../components/UI/Title";
import classes from "../components/UI/Ui.module.css";
import Game from "../components/Game/Game";
import Tickets from "../components/Tickets/Tickets";

const Player = () => {
  const dispatch: AppDispatch = useDispatch();
  const userName = useSelector(
    (state: RootState) => state.selectedUser.user.name
  );
  const draw = useSelector((state: RootState) => state.draw.drawData);
  const tickets = useSelector((state: RootState) => state.ticket.tickets);
  const [isNewTicket, setIsNewTicket] = useState(false);

  const newTicketHandler = () => {
    if (!draw.isDraw) {
      setIsNewTicket(true);
    }
  };

  const cancelGame = () => {
    setIsNewTicket(false);
  };

  const openModal = () => {
    dispatch(modalActions.setNameModal(true));
    dispatch(modalActions.handleModal(true));
  };

  useEffect(() => {
    dispatch(fetchUserData("2"));
    dispatch(fetchAllTicketsData(false, "date", "asc"));
    dispatch(fetchFirstRunData());
    dispatch(fetchDrawData());
  }, [dispatch]);

  return (
    <Fragment>
      <Title>Üdvözlöm kedves {userName}!</Title>
      <div>
        <button className={classes.controlButton} onClick={openModal}>
          Név megadása
        </button>
        {!draw.isDraw && (
          <button className={classes.controlButton} onClick={newTicketHandler}>
            Új szelvény
          </button>
        )}
        {draw.isDraw && (
          <Title>
            A sorsolás lezárult. Az új kör kezdetéig nincs lehetőség
            szelvényvásárlásra.
          </Title>
        )}
      </div>
      <div>{isNewTicket && <Game onCloseTicket={cancelGame} />}</div>
      {draw.isDraw && (
        <Title>
          Kihúzott számok: {draw.drawedNumbers.map((number) => `${number} `)}
        </Title>
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

export default Player;
