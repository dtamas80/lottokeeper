import classes from "../Modal.module.css";

const NoDraw: React.FC<{ closeModal: () => void }> = (props) => {
  const { closeModal } = props;

  return (
    <div className={classes.content}>
      <h1>A sorsolás csak akkor lehetséges, ha vannak szelvények!</h1>
      <div className={classes.buttonContainer}>
        <button type="button" onClick={closeModal}>
          Mégse
        </button>
      </div>
    </div>
  );
};

export default NoDraw;
