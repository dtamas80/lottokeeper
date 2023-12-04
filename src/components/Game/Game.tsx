import { useState, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "../../store";
import { createTicketData } from "../../store/ticket-actions";
import { updateUserBalance } from "../../store/user-actions";
import { ITicket, ticketActions } from "../../store/ticket-slice";
import { notificationActions } from "../../store/notification-slice";
import { userActions } from "../../store/user-slice";
import classes from "./Game.module.css";

interface IBalls {
  number: number;
  isSelected: boolean;
}

const Game: React.FC<{ onCloseTicket: () => void }> = (props) => {
  const { onCloseTicket } = props;
  const dispatch: AppDispatch = useDispatch();
  const [countNumbers, setCountNumbers] = useState(0);
  const balance = useSelector(
    (state: RootState) => state.selectedUser.user.balance
  );

  const generateNumbers = () => {
    const tempBalls: IBalls[] = [];
    for (let i = 1; i < 40; i++) {
      tempBalls.push({
        number: i,
        isSelected: false,
      });
    }

    return tempBalls;
  };

  const [balls, setBalls] = useState<IBalls[]>(generateNumbers());

  const selectNumber = (selectedBall: number) => {
    let tempBalls: IBalls[] = [...balls];
    const ballState = tempBalls[selectedBall - 1].isSelected;
    if (!ballState && countNumbers < 5) {
      tempBalls[selectedBall - 1].isSelected = true;
      setCountNumbers(() => countNumbers + 1);
    } else if (ballState) {
      tempBalls[selectedBall - 1].isSelected = false;
      setCountNumbers(() => countNumbers - 1);
    }
    setBalls(tempBalls);
  };

  const collectPlayedNumbers = () => {
    let playedNumbers: number[] = [];
    balls.forEach((ball) =>{
      if (ball.isSelected) playedNumbers.push(ball.number);
    });
    return playedNumbers;
  }

  const gameButtonHandler = () => {
    if (balance < 500) {
      dispatch(
        notificationActions.showNotification({
          status: "error",
          title: "Sikertelen vásárlás, alacsony egyenleg!",
          show: true,
        })
      );
      return;
    }
    const date = new Date();
    const newTicket: ITicket = {
      id: "",
      date: date.getTime(),
      numbers: collectPlayedNumbers(),
      prize: -1,
      results: -1,
      isGenerated: false,
    };
    dispatch(createTicketData(newTicket)).then((newId: any) => {
      newTicket.id = newId
    })
    .then(() => dispatch(updateUserBalance("2", -500)))
    .then(() => dispatch(updateUserBalance("1", 500)))
    .then(() => dispatch(userActions.setUserBalance(balance - 500)))
    .then(() => dispatch(ticketActions.addToTickets(newTicket)))
    .then(() => onCloseTicket());
  };

  const cancelGameButtonHandler = () => {
    onCloseTicket();
  };

  return (
    <Fragment>
      <div className={classes.ballsContainer}>
        {balls.map((ball) => (
          <button
            key={ball.number}
            className={`${classes.ball} ${
              ball.isSelected ? classes.selectedBall : ""
            }`}
            onClick={() => selectNumber(ball.number)}
          >
            {ball.number}
          </button>
        ))}
      </div>
      <button
        className={classes.cancelGameButton}
        onClick={cancelGameButtonHandler}
      >
        Mégse
      </button>
      <button
        className={
          countNumbers < 5 ? classes.disabledGameButton : classes.gameButton
        }
        onClick={countNumbers === 5 ? gameButtonHandler : undefined}
      >
        Játék
      </button>
    </Fragment>
  );
};

export default Game;
