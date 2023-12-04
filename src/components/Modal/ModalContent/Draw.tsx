import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "../../../store";
import { ITicket, ticketActions } from "../../../store/ticket-slice";
import { IDraw, drawActions } from "../../../store/draw-slice";
import { updateDraw } from "../../../store/draw-actions";
import { updateTicketData } from "../../../store/ticket-actions";
import { updateUserBalance } from "../../../store/user-actions";
import { userActions } from "../../../store/user-slice";
import classes from "../Modal.module.css";

const Draw: React.FC<{ closeModal: () => void }> = (props) => {
  const { closeModal } = props;
  const dispatch: AppDispatch = useDispatch();
  const tickets = useSelector((state: RootState) => state.ticket.tickets);
  const balance = useSelector(
    (state: RootState) => state.selectedUser.user.balance
  );
  let drawedNumbers: number[] = [];
  let sumResultsCount: number[] = [];
  let sumPrizesCount: number[] = [];
  let prizesPerScore: number[] = [];
  let payments = {
    paymentsForPlayer: 0,
    paymentsAll: 0,
  };

  const drawNumbers = () => {
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

  const findResults = (drawedNumbers: number[]) => {
    let resultsCount: number[] = [0, 0, 0, 0, 0, 0];
    let tempTickets = tickets.map((obj) => Object.assign({}, obj));
    tempTickets.forEach((ticket, index) => {
      let common: number[] = [];
      for (let i = 0; i < ticket.numbers.length; i++) {
        for (let j = 0; j < drawedNumbers.length; j++) {
          if (ticket.numbers[i] === drawedNumbers[j]) {
            common.push(ticket.numbers[i]);
          }
        }
      }
      resultsCount[common.length]++;
      tempTickets[index].results = common.length;
    });
    sumResultsCount = resultsCount;
    return tempTickets;
  };

  const calculatePrizeForResult = (sumIncome: number, multiple: number) => {
    return Math.floor(sumIncome * multiple);
  };

  const calculatePrizesPerScore = (sumPrize: number, count: number) => {
    return Math.floor(sumPrize / count) | 0;
  };

  const calculatePrizes = () => {
    const prizePool = tickets.length * 500 * 0.8;
    const multipleForPrizes: number[] = [
      0,
      0,
      calculatePrizeForResult(prizePool, 0.35),
      calculatePrizeForResult(prizePool, 0.16),
      calculatePrizeForResult(prizePool, 0.15),
      calculatePrizeForResult(prizePool, 0.34),
    ];
    const prizesPerScore: number[] = [
      0,
      0,
      calculatePrizesPerScore(multipleForPrizes[2], sumResultsCount[2]),
      calculatePrizesPerScore(multipleForPrizes[3], sumResultsCount[3]),
      calculatePrizesPerScore(multipleForPrizes[4], sumResultsCount[4]),
      calculatePrizesPerScore(multipleForPrizes[5], sumResultsCount[5]),
    ];
    sumPrizesCount = multipleForPrizes;
    return prizesPerScore;
  };

  const updateTicketsWithPrize = (tickets: ITicket[]) => {
    let tempTickets = tickets;
    tempTickets.forEach((ticket, index) => {
      ticket.prize = prizesPerScore[ticket.results];
    });
    return tempTickets;
  };

  const updateTicketsOnDatabase = (ticket: ITicket) => {
    dispatch(updateTicketData(ticket.id, ticket.results, ticket.prize));
  };

  const calculatePayments = (ticket: ITicket) => {
    if (!ticket.isGenerated) {
      payments.paymentsForPlayer = payments.paymentsForPlayer + ticket.prize;
    }
    payments.paymentsAll = payments.paymentsAll + ticket.prize;
  };

  const drawCalculation = () => {
    drawedNumbers = drawNumbers();
    let updatedTickets = findResults(drawedNumbers);
    prizesPerScore = calculatePrizes();
    updatedTickets = updateTicketsWithPrize(updatedTickets);
    dispatch(ticketActions.getTickets(updatedTickets));
    return updatedTickets;
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const updatedTickets = drawCalculation();
    updatedTickets.forEach((ticket) => {
      updateTicketsOnDatabase(ticket);
      calculatePayments(ticket);
    });
    dispatch(updateUserBalance("1", -payments.paymentsAll));
    dispatch(userActions.setUserBalance(balance - payments.paymentsAll));
    dispatch(updateUserBalance("2", payments.paymentsForPlayer));
    const drawData: IDraw = {
      isDraw: true,
        drawedNumbers: drawedNumbers,
        sumResultsCount: sumResultsCount,
        prizeAfterResults: prizesPerScore,
        sumPrizeAfterResults: sumPrizesCount,
        sumTickets: tickets.length,
        sumIncome: tickets.length * 500,
        sumPayment: payments.paymentsAll,
        sumOutcome: tickets.length * 500 - payments.paymentsAll,
    }
    dispatch(
      updateDraw(drawData)
    );
    dispatch(drawActions.setDraw(drawData));
    closeModal();
  };

  return (
    <div className={classes.content}>
      <h1>Biztos, hogy el akarja indítani a sorsolást?</h1>
      <form onSubmit={handleSubmit}>
        <div className={classes.buttonContainer}>
          <button type="button" onClick={closeModal}>
            Nem
          </button>
          <button>Igen</button>
        </div>
      </form>
    </div>
  );
};

export default Draw;
