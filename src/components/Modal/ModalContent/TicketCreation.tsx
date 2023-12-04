import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "../../../store";
import { ITicket, ticketActions } from "../../../store/ticket-slice";
import { createTicketData } from "../../../store/ticket-actions";
import { updateUserBalance } from "../../../store/user-actions";

import classes from "../Modal.module.css";
import { userActions } from "../../../store/user-slice";

const TicketCreation: React.FC<{ closeModal: () => void }> = (props) => {
  const { closeModal } = props;
  const dispatch: AppDispatch = useDispatch();
  const balance = useSelector(
    (state: RootState) => state.selectedUser.user.balance
  );
  const [enteredNumber, setEnteredNumber] = useState(1);

  const handleClose = () => {
    setEnteredNumber(0);
    closeModal();
  };

  const generateNumbers = () => {
    const numbers: number[] = [];
    while (numbers.length < 5) {
      const random = Math.floor(Math.random() * 39 + 1);
      if (numbers.indexOf(random) === -1) {
        numbers.push(random);
      }
    }
    numbers.sort((a, b) => a - b);
    return numbers;
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    for (let i = 0; i < enteredNumber; i++) {
      const date = new Date();
      const newTicket: ITicket = {
        id: "",
        date: date.getTime(),
        numbers: generateNumbers(),
        prize: -1,
        results: -1,
        isGenerated: true,
      };
      dispatch(createTicketData(newTicket))
        .then((newId: any) => {
          newTicket.id = newId;
        })
        .then(() => dispatch(ticketActions.addToTickets(newTicket)));
    }
    dispatch(updateUserBalance("1", enteredNumber * 500)).then(() =>
      dispatch(userActions.setUserBalance(balance + enteredNumber * 500))
    );
    closeModal();
  };

  const handleInputChange = (event: React.FormEvent<HTMLInputElement>) => {
    setEnteredNumber(Number(event.currentTarget.value));
  };

  return (
    <div className={classes.content}>
      <h1>Hány darab szelvényt szeretne legenerálni?</h1>
      <form onSubmit={handleSubmit}>
        <div className={classes.inputContainer}>
          <label htmlFor="number">Darabszám:</label>
          <input
            type="number"
            id="number"
            name="number"
            onChange={handleInputChange}
            value={enteredNumber}
            min={1}
            required
          />
        </div>
        <div className={classes.buttonContainer}>
          <button type="button" onClick={handleClose}>
            Mégse
          </button>
          <button>Indítás</button>
        </div>
      </form>
    </div>
  );
};

export default TicketCreation;
