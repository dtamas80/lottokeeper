import { Fragment } from "react";
import { useSelector } from "react-redux";

import type { RootState } from "../../store";
import classes from "../Tickets/Tickets.module.css";

const Statistic = () => {
  const draw = useSelector((state: RootState) => state.draw.drawData);

  return (
    <Fragment>
      <table className={classes.ticketsTable}>
        <thead>
          <tr>
            <th></th>
            <th>Ötös</th>
            <th>Négyes</th>
            <th>Hármas</th>
            <th>Kettes</th>
            <th>Nyeretlenek</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{"\u03a3"} Szelvények száma / találat:</td>
            <td>{draw.sumResultsCount[5]}</td>
            <td>{draw.sumResultsCount[4]}</td>
            <td>{draw.sumResultsCount[3]}</td>
            <td>{draw.sumResultsCount[2]}</td>
            <td>{draw.sumResultsCount[1] + draw.sumResultsCount[0]}</td>
          </tr>
          <tr>
            <td>Fizetendő / találat</td>
            <td>{draw.prizeAfterResults[5]}</td>
            <td>{draw.prizeAfterResults[4]}</td>
            <td>{draw.prizeAfterResults[3]}</td>
            <td>{draw.prizeAfterResults[2]}</td>
            <td>0</td>
          </tr>
          <tr>
            <td>{"\u03a3"} Fizetendő / találatok</td>
            <td>{draw.prizeAfterResults[5] * draw.sumResultsCount[5]}</td>
            <td>{draw.prizeAfterResults[4] * draw.sumResultsCount[4]}</td>
            <td>{draw.prizeAfterResults[3] * draw.sumResultsCount[3]}</td>
            <td>{draw.prizeAfterResults[2] * draw.sumResultsCount[2]}</td>
            <td>0</td>
          </tr>
          <tr>
            <td colSpan={5} className={classes.sumTd}>
              Szelvények száma:
            </td>
            <td>{draw.sumTickets}</td>
          </tr>
          <tr>
            <td colSpan={5} className={classes.sumTd}>
              Összes bevétel:
            </td>
            <td>{draw.sumIncome}</td>
          </tr>
          <tr>
            <td colSpan={5} className={classes.sumTd}>
              Összes kifizetés:
            </td>
            <td>{draw.sumPayment}</td>
          </tr>
          <tr>
            <td colSpan={5} className={classes.sumTd}>
              Nyereség:
            </td>
            <td>{draw.sumOutcome}</td>
          </tr>
        </tbody>
      </table>
    </Fragment>
  );
};

export default Statistic;
