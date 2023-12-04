import { useDispatch } from "react-redux";

import { notificationActions } from "../../store/notification-slice";
import { INotification } from "../../store/notification-slice";
import classes from "./Notification.module.css";

const Notification: React.FC<INotification> = (props) => {
  const dispatch = useDispatch();
  const { status, title } = props;
  let specialClasses = "";

  if (status === "error") {
    specialClasses = classes.error;
  }
  if (status === "success") {
    specialClasses = classes.success;
  }

  const cssClasses = `${classes.notification} ${specialClasses}`;

  const closeNotification = () => {
    dispatch(notificationActions.hideNotification());
  };

  return (
    <section className={cssClasses}>
      <h2>{title}</h2>
      <span onClick={closeNotification} className={`material-symbols-outlined ${classes.closeButton}`}>close</span>
    </section>
  );
};

export default Notification;
