import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import type { RootState } from "../../../store";
import { AppDispatch } from "../../../store";
import { updateUserName } from "../../../store/user-actions";
import { updateFirstRun } from "../../../store/firstRun-actions";

import classes from "../Modal.module.css";

const NewPlayerName: React.FC<{ closeModal: () => void }> = (props) => {
  const { closeModal } = props;

  const dispatch: AppDispatch = useDispatch();
  const isFirstRun = useSelector(
    (state: RootState) => state.firstRun.isFirstRun
  );
  const [enteredUserName, setEnteredUserName] = useState("");

  const handleClose = () => {
    setEnteredUserName("");
    if (isFirstRun) {
      dispatch(updateFirstRun(false));
    }
    closeModal();
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const newName = enteredUserName.replace(/\s+/g, " ");
    if (newName !== " ") {
      dispatch(updateUserName("2", newName));
      setEnteredUserName("");
      if (isFirstRun) {
        dispatch(updateFirstRun(false));
      }
      closeModal();
    } else {
      setEnteredUserName("");
    }
  };

  const handleInputChange = (event: React.FormEvent<HTMLInputElement>) => {
    setEnteredUserName(event.currentTarget.value);
  };

  return (
    <div className={classes.content}>
      <h1>Szeretne új játékosnevet megadni?</h1>
      <form onSubmit={handleSubmit}>
        <div className={classes.inputContainer}>
          <label htmlFor="name">Játékosnév:</label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={handleInputChange}
            value={enteredUserName}
            required
          />
        </div>
        <div className={classes.buttonContainer}>
          <button type="button" onClick={handleClose}>
            Mégse
          </button>
          <button>Mentés</button>
        </div>
      </form>
    </div>
  );
};

export default NewPlayerName;
