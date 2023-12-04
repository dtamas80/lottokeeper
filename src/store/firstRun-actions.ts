import { Dispatch } from "redux";
import { doc, getDoc, updateDoc } from "firebase/firestore";

import {db} from "../firebase";
import { firstRunActions } from "./firstRun-slice";
import { notificationActions } from "./notification-slice";
import { modalActions } from "./modal-slice";


export const fetchFirstRunData = () => {
  return async (dispatch: Dispatch) => {
    const fetchData = async () => {
      const docRef = doc(db, "firstRun", "firstRun");
      const docSnap = await getDoc(docRef);
      return docSnap.data();
    };

    try {
      const firstRunData: any = await fetchData();
      dispatch(firstRunActions.setFirstRunModal(firstRunData.isFirstRun));
      dispatch(modalActions.setNameModal(true));
      dispatch(modalActions.handleModal(firstRunData.isFirstRun));
    } catch (error) {
      dispatch(
        notificationActions.showNotification({
          status: "error",
          title: "Sikertelen adatlekérés!",
          show: true,
        })
      );
    }
  };
};

export const updateFirstRun = (isFirstRun: boolean) => {
  return async (dispatch: Dispatch) => {
    const sendRequest = async () => {
      const userRef = doc(db, "firstRun", "firstRun");
      await updateDoc(userRef, {
        isFirstRun: isFirstRun
      });
    };

    try {
      await sendRequest();
      dispatch(firstRunActions.setFirstRunModal(isFirstRun));
    } catch (error) {
      dispatch(
        notificationActions.showNotification({
          status: "error",
          title: "Sikertelen adatbázis művelet!",
          show: true,
        })
      );
    }
  };
};
