import { NavLink } from "react-router";

export const Navigation = () => {
  return (
    <nav className="header__nav nav">
      <NavLink className="nav__link" to={"/"}>
        Главная
      </NavLink>
      <NavLink className="nav__link" to={"/genres"}>
        Жанры
      </NavLink>
    </nav>
  );
};
