import { useState, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";

import type { AppDispatch, RootState } from "../../store";
import { ITicket } from "../../store/ticket-slice";
import { fetchAllTicketsData } from "../../store/ticket-actions";
import Ticket from "./Ticket";
import classes from "./Tickets.module.css";

const Tickets: React.FC<{ tickets: ITicket[] }> = (props) => {
  const dispatch: AppDispatch = useDispatch();
  const { tickets } = props;
  const isAdmin = useSelector(
    (state: RootState) => state.selectedUser.user.isAdmin
  );
  const draw = useSelector((state: RootState) => state.draw.drawData);
  const [orderDateUp, setOrderDateUp] = useState(true);
  const [orderNumbersUp, setOrderNumbersUp] = useState(true);
  const [orderIsGeneratedUp, setOrderIsGeneratedUp] = useState(true);
  const [orderResultsUp, setOrderResultsUp] = useState(true);
  const [orderPrizeUp, setOrderPrizeUp] = useState(true);

  const calculateSumPrize = () => {
    let sumPrize = 0;
    tickets.forEach((ticket: ITicket) => {
      ticket.prize > 0 ? (sumPrize += ticket.prize) : (sumPrize += 0);
    });

    return sumPrize;
  };

  const setSumPrizeTd = () => {
    const value = isAdmin ? (
      <td colSpan={4} className={classes.sumTd}>
        Összes nyeremény:
      </td>
    ) : (
      <td colSpan={3} className={classes.sumTd}>
        Összes nyeremény:
      </td>
    );
    return value;
  };

  const orderByDate = (event: React.FormEvent) => {
    setOrderDateUp((prevState) => !prevState);
    dispatch(
      fetchAllTicketsData(isAdmin, "date", orderDateUp ? "desc" : "asc")
    );
  };

  const orderByNumbers = (event: React.FormEvent) => {
    setOrderNumbersUp((prevState) => !prevState);
    dispatch(
      fetchAllTicketsData(isAdmin, "numbers", orderNumbersUp ? "desc" : "asc")
    );
  };

  const orderByIsGenerated = (event: React.FormEvent) => {
    setOrderIsGeneratedUp((prevState) => !prevState);
    dispatch(
      fetchAllTicketsData(
        isAdmin,
        "isGenerated",
        orderIsGeneratedUp ? "desc" : "asc"
      )
    );
  };

  const orderByResults = (event: React.FormEvent) => {
    setOrderResultsUp((prevState) => !prevState);
    dispatch(
      fetchAllTicketsData(isAdmin, "results", orderResultsUp ? "desc" : "asc")
    );
  };

  const orderByPrize = (event: React.FormEvent) => {
    setOrderPrizeUp((prevState) => !prevState);
    dispatch(
      fetchAllTicketsData(isAdmin, "prize", orderPrizeUp ? "desc" : "asc")
    );
  };

  return (
    <Fragment>
      <table className={classes.ticketsTable}>
        <thead>
          <tr>
            <th>
              Sorszám
              {draw.isDraw && isAdmin && (
                <span
                  className={`material-symbols-outlined ${
                    orderDateUp ? classes.arrowUp : classes.arrowDown
                  }`}
                  onClick={orderByDate}
                >
                  arrow_drop_up
                </span>
              )}
            </th>
            <th>
              Számok
              {draw.isDraw && isAdmin && (
                <span
                  className={`material-symbols-outlined ${
                    orderNumbersUp ? classes.arrowUp : classes.arrowDown
                  }`}
                  onClick={orderByNumbers}
                >
                  arrow_drop_up
                </span>
              )}
            </th>
            {isAdmin && (
              <th>
                Típusa
                {draw.isDraw && (
                  <span
                    className={`material-symbols-outlined ${
                      orderIsGeneratedUp ? classes.arrowUp : classes.arrowDown
                    }`}
                    onClick={orderByIsGenerated}
                  >
                    arrow_drop_up
                  </span>
                )}
              </th>
            )}
            <th>
              Találatok
              {draw.isDraw && (
                <span
                  className={`material-symbols-outlined ${
                    orderResultsUp ? classes.arrowUp : classes.arrowDown
                  }`}
                  onClick={orderByResults}
                >
                  arrow_drop_up
                </span>
              )}
            </th>
            <th>
              Nyeremény
              {draw.isDraw && isAdmin && (
                <span
                  className={`material-symbols-outlined ${
                    orderPrizeUp ? classes.arrowUp : classes.arrowDown
                  }`}
                  onClick={orderByPrize}
                >
                  arrow_drop_up
                </span>
              )}
            </th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket: ITicket) => (
            <Ticket
              id={ticket.id}
              date={ticket.date}
              numbers={ticket.numbers}
              prize={ticket.prize}
              results={ticket.results}
              isGenerated={ticket.isGenerated}
              key={ticket.id}
            />
          ))}
          {draw.isDraw && !isAdmin && (
            <tr>
              {setSumPrizeTd()}
              <td>
                <b>{calculateSumPrize()} akcse</b>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </Fragment>
  );
};

export default Tickets;
