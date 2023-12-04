import classes from "./Balance.module.css";

const Balance: React.FC<{ balance: number }> = (props) => {
  const { balance } = props;
  return <p className={classes.balance}>Egyenleg: {balance} akcse</p>;
};

export default Balance;
