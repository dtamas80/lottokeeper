import { PropsWithChildren } from "react";

import classes from "./Ui.module.css";

const Title: React.FC<PropsWithChildren> = (props) => {
  const {children} = props;

  return <h1 className={classes.title}>{children}</h1>
};

export default Title;