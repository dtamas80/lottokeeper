import { Fragment } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

import { RootState } from "../store";
import Modal from "../components/Modal/Modal";
import Notification from "../components/UI/Notification";
import Header from "../components/Header/Header";

const RootLayout = () => {
  const notification = useSelector((state: RootState) => state.notification.notification);
  const modalStatus = useSelector((state: RootState) => state.modal.modalStatus);

  return (
    <Fragment>
      <Modal open={modalStatus}/>
      {notification.show && (
        <Notification
          status={notification.status}
          title={notification.title}
          show
        />
      )}
      <Header />
      <main>
        <Outlet />
      </main>
    </Fragment>
  );
};

export default RootLayout;
