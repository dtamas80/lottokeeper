import { userActions } from "./user-slice";
import { Dispatch } from "redux";
import { getDoc, doc, updateDoc } from "firebase/firestore";

import { db } from "../firebase";
import { notificationActions } from "./notification-slice";

export const fetchUserData = (id: string) => {
  return async (dispatch: Dispatch) => {
    const fetchData = async () => {
      const userRef = doc(db, "users", id);
      const data = await getDoc(userRef);
      return data.data();
    };

    try {
      const userData = await fetchData();
      dispatch(userActions.setSelectedUser(userData));
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

export const updateUserBalance = (id: string, amount: number) => {
  return async (dispatch: Dispatch) => {
    const sendRequest = async () => {
      const userRef = doc(db, "users", id);
      const data: any = await getDoc(userRef);
      const newBalance = data.data().balance + amount;
      await updateDoc(userRef, {
        balance: newBalance,
      });
    };

    try {
      await sendRequest();      
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

export const resetUserBalance = (id: string, amount: number) => {
  return async (dispatch: Dispatch) => {
    const sendRequest = async () => {
      const userRef = doc(db, "users", id);
      await updateDoc(userRef, {
        balance: amount,
      });
    };

    try {
      await sendRequest();
      dispatch(userActions.setUserBalance(amount));
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

export const updateUserName = (id: string, newName: string) => {
  return async (dispatch: Dispatch) => {
    const sendRequest = async () => {
      const userRef = doc(db, "users", id);
      await updateDoc(userRef, {
        name: newName,
      });
    };

    try {
      await sendRequest();
      dispatch(userActions.setUserName(newName));
      dispatch(
        notificationActions.showNotification({
          status: "success",
          title: "Sikeres névmódosítás!",
          show: true,
        })
      );
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
