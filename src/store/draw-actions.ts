import { Dispatch } from "redux";
import { doc, getDoc, updateDoc } from "firebase/firestore";

import { db } from "../firebase";
import { drawActions, IDraw } from "./draw-slice";
import { notificationActions } from "./notification-slice";

export const fetchDrawData = () => {
  return async (dispatch: Dispatch) => {
    const fetchData = async () => {
      const docRef = doc(db, "draw", "draw");
      const docSnap = await getDoc(docRef);
      return docSnap.data();
    };

    try {
      const drawData: any = await fetchData();
      dispatch(drawActions.setDraw(drawData));
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

export const updateDraw = (newDrawData: IDraw) => {
  return async (dispatch: Dispatch) => {
    const sendRequest = async () => {
      const userRef = doc(db, "draw", "draw");
      await updateDoc(userRef, {
        isDraw: newDrawData.isDraw,
        drawedNumbers: newDrawData.drawedNumbers,
        sumResultsCount: newDrawData.sumResultsCount,
        prizeAfterResults: newDrawData.prizeAfterResults,
        sumPrizeAfterResults: newDrawData.sumPrizeAfterResults,
        sumTickets: newDrawData.sumTickets,
        sumIncome: newDrawData.sumIncome,
        sumPayment: newDrawData.sumPayment,
        sumOutcome: newDrawData.sumOutcome,
      });
    };

    try {
      await sendRequest();
      dispatch(drawActions.setDraw(newDrawData));
      dispatch(
        notificationActions.showNotification({
          status: "success",
          title: "A sorsolás lezárult!",
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
