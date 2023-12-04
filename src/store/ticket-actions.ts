import { Dispatch } from "redux";
import {
  addDoc,
  collection,
  getDocs,
  deleteDoc,
  doc,
  query,
  orderBy,
  updateDoc,
  OrderByDirection,
} from "firebase/firestore";

import { db } from "../firebase";
import { AppDispatch } from ".";
import { ITicket, ticketActions } from "./ticket-slice";
import { notificationActions } from "./notification-slice";

export const fetchAllTicketsData = (
  isAdmin: boolean,
  column: string,
  direction: OrderByDirection
) => {
  return async (dispatch: Dispatch) => {
    const fetchData = async () => {
      let ticketsData: ITicket[] = [];
      const q = query(collection(db, "tickets"), orderBy(column, direction));
      const data = await getDocs(q);
      data.forEach((doc: any) => {
        if (isAdmin) {
          ticketsData.push({ ...doc.data(), id: doc.id });
        } else {
          if (!doc.data().isGenerated) {
            ticketsData.push({ ...doc.data(), id: doc.id });
          }
        }
      });
      return ticketsData;
    };

    try {
      const ticketsData = await fetchData();
      dispatch(ticketActions.getTickets(ticketsData));
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

export const createTicketData = (ticket: ITicket) => {
  return async (dispatch: AppDispatch) => {
    dispatch(
      notificationActions.showNotification({
        status: "pending",
        title: "Kis türelmet, vásárlás folyamatban!",
        show: true,
      })
    );

    const sendRequest = async () => {
      const response = await addDoc(collection(db, "tickets"), {
        date: ticket.date,
        numbers: ticket.numbers,
        isGenerated: ticket.isGenerated,
        prize: ticket.prize,
        results: ticket.results,
      });

      if (!response.id) {
        throw new Error("Adatlekérés sikertelen!");
      }
      return response.id;
    };

    try {
      const id = await sendRequest();
      dispatch(
        notificationActions.showNotification({
          status: "success",
          title: "Sikeres vásárlás!",
          show: true,
        })
      );
      return id;
    } catch (error) {
      dispatch(
        notificationActions.showNotification({
          status: "error",
          title: "Sikertelen vásárlás",
          show: true,
        })
      );
    }
  };
};

export const deleteAllTickets = (tickets: ITicket[]) => {
  return async (dispatch: Dispatch) => {
    const deleteData = async () => {
      for await (const ticket of tickets) {
        const playerTicket = doc(db, "tickets", ticket.id);
        await deleteDoc(playerTicket);
      }
    };

    try {
      await deleteData();
    } catch (error) {
      dispatch(
        notificationActions.showNotification({
          status: "error",
          title: "Sikertelen szelvénytörlés!",
          show: true,
        })
      );
    }
  };
};

export const updateTicketData = (
  id: string,
  results: number,
  prize: number
) => {
  return async (dispatch: Dispatch) => {
    const sendRequest = async () => {
      const ticketRef = doc(db, "tickets", id);
      await updateDoc(ticketRef, {
        results,
        prize,
      });
    };

    try {
      await sendRequest();
      dispatch(
        notificationActions.showNotification({
          status: "success",
          title: "Sikeres szelvényművelet!!",
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
