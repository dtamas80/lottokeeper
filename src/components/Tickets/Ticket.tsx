import { useSelector } from "react-redux";

import type { RootState } from "../../store";
import { ITicket } from "../../store/ticket-slice";

const Ticket: React.FC<ITicket> = (props) => {
  const { date, numbers, results, prize, isGenerated } = props;
  const isAdmin = useSelector(
    (state: RootState) => state.selectedUser.user.isAdmin
  );

  const setNumbers = () => {
    let nums = "";
    numbers.forEach((number) => {
      nums = nums.concat(" ", number.toString());
    });
    return nums;
  };

  const setGeneratedTd = () => {
    return <td>{isGenerated ? "Generált" : "Játékos"}</td>;
  };

  return (
    <tr>
      <td>{date}</td>
      <td>{setNumbers()}</td>
      {isAdmin ? setGeneratedTd() : null}
      <td>{results > -1 ? `${results} találat` : ""}</td>
      <td>{prize > -1 ? `${prize} akcse` : ""}</td>
    </tr>
  );
};

export default Ticket;
