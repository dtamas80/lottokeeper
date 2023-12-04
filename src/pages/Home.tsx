import { Fragment, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { AppDispatch } from "../store";
import { userActions } from "../store/user-slice";
import { fetchUserData } from "../store/user-actions";
import { notificationActions } from "../store/notification-slice";
import Title from "../components/UI/Title";

import classes from "../components/UI/Ui.module.css";

const HomePage = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const onClickPlayerHandler = () => {
    dispatch(fetchUserData("2"));
    dispatch(notificationActions.hideNotification());
    navigate('/player');
  };

  const onClickAdminHandler = () => {
    dispatch(fetchUserData("1"));
    dispatch(notificationActions.hideNotification());
    navigate('/admin');
  };

  useEffect(() => {
    dispatch(userActions.setNoUser());
  }, [dispatch]);

  return (
    <Fragment>
      <main>
        <Title>Válasszon játékmódot!</Title>
        <div>
          <button className={classes.controlButton} onClick={onClickPlayerHandler}>Játék</button>
          <button className={classes.controlButton} onClick={onClickAdminHandler}>Üzemeltetés</button>
        </div>
        <Title>Felmerült kérdések</Title>
        <div>
          <p><b>Mi legyen a játékos által megvett szelvények árával?</b></p>
          <p>Bár a feladat nem írta, de hozzáaadtam az üzemeltető egyenlegéhez, hiszen anélkül (ha csak játékos szelvény van) veszteséges lenne az üzemeltető egy esetleges kifizetés esetén.</p>
          <p><b>User experience döntések</b></p>
          <p>Név megadása: első indításnál felugrik egy ablak, ami csak új játéknál jön elő megint, de külön gombbal meg lehet változtatni továbbra is.</p>
          <p>Szelvényvásárlás, szelvénygenerálás és sorsolás gomb eltűnik sorsolás után. Új körnél újra elérhető</p>
        </div>
      </main>
    </Fragment>
  );
};

export default HomePage;
