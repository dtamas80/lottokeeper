import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import type { RootState } from "../../store";
import { userActions } from "../../store/user-slice";
import { fetchUserData } from "../../store/user-actions";
import { AppDispatch } from "../../store";
import { notificationActions } from "../../store/notification-slice";
import { modalActions } from "../../store/modal-slice";
import NavbarMenuPoint from "../UI/NavbarMenuPoint";
import Balance from "../Balance/Balance";
import logo from "../../assets/logo.jpg";
import classes from "./Header.module.css";

const Header = () => {
  const dispatch: AppDispatch = useDispatch();
  const isPlayer = useSelector(
    (state: RootState) => state.selectedUser.user.isPlayer
  );
  const isAdmin = useSelector(
    (state: RootState) => state.selectedUser.user.isAdmin
  );
  const balance = useSelector(
    (state: RootState) => state.selectedUser.user.balance
  );

  const onClickLogoHandler = () => {
    dispatch(userActions.setNoUser());
    dispatch(modalActions.resetAllModalState());
    dispatch(notificationActions.hideNotification());
  };

  const onClickPlayerHandler = () => {
    dispatch(fetchUserData("2"));
    dispatch(modalActions.resetAllModalState());
    dispatch(modalActions.setNameModal(true));
    dispatch(notificationActions.hideNotification());
  };

  const onClickAdminHandler = () => {
    dispatch(fetchUserData("1"));
    dispatch(modalActions.resetAllModalState());
    dispatch(modalActions.setTicketCreationModal(true));
    dispatch(notificationActions.hideNotification());
  };

  return (
    <header className={classes.header}>
      <Link to="/">
        <img src={logo} onClick={onClickLogoHandler} alt="Lottokeeper logo" />
      </Link>
      {(isPlayer || isAdmin) && (
        <>
          <nav>
            <ul>
            <li>
                <NavbarMenuPoint onClick={onClickLogoHandler} link="/">
                  Kezdőlap
                </NavbarMenuPoint>
              </li>
              <li>
                <NavbarMenuPoint onClick={onClickPlayerHandler} link="/player">
                  Játékos
                </NavbarMenuPoint>
              </li>
              <li>
                <NavbarMenuPoint onClick={onClickAdminHandler} link="/admin">
                  Üzemeltető
                </NavbarMenuPoint>
              </li>
            </ul>
          </nav>
          <Balance balance={balance} />
        </>
      )}
    </header>
  );
};

export default Header;
