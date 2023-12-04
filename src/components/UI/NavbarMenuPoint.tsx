import { ReactNode } from "react";
import { NavLink } from "react-router-dom";

import classes from "./Ui.module.css";

interface INavbarMenuPointProps {
  link: string;
  children: ReactNode;
  onClick: ()=> void;
}

const NavbarMenuPoint: React.FC<INavbarMenuPointProps> = (props) => {
  const { link, children, onClick } = props;

  return (
    <NavLink
      to={link}
      className={({ isActive }) => (isActive ? classes.active : undefined)}
      onClick={onClick}
      end
    >
      {children}
    </NavLink>
  );
};

export default NavbarMenuPoint;
