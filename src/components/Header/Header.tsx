import "./header.scss";
import { Logo } from "../Logo";
import { useContext } from "react";
import { Button } from "../Button";
import { Container } from "../Container";
import type User from "../../types/User";
import { useSelector } from "react-redux";
import { NavLink, Link } from "react-router";
import { RootState } from "../../store/store";
import { ModalContext } from "../ModalProvider";
import SearchMovieBlock from "../SearchMovieBlock";
import IconUser from "../Icon/User.svg?react";
import IconSearch from "../Icon/Search.svg?react";
import IconGenres from "../Icon/Genres.svg?react";
import IconUserFilled from "../Icon/UserFilled.svg?react";
import getNavLinkModifier from "../../utils/getNavLinkModifier";

const SECTION_CLASS_NAME = "header";

export const Header = () => {
  const user = useSelector<RootState, User | null>((state) => state.user.info);
  const { openModal } = useContext(ModalContext);

  return (
    <header className={SECTION_CLASS_NAME}>
      <Container sectionClassName={SECTION_CLASS_NAME}>
        <Link className={`${SECTION_CLASS_NAME}__logo-link link-reset`} to="/">
          <Logo />
        </Link>

        <nav className={`${SECTION_CLASS_NAME}__nav nav flex`}>
          <NavLink
            className={getNavLinkModifier("desktop-content nav-link")}
            to="/"
          >
            Главная
          </NavLink>

          <NavLink className={getNavLinkModifier("nav-link")} to="/genres">
            <span className="desktop-content">Жанры</span>
            <span className="mobile-content" title="Жанры">
              <IconGenres />
            </span>
          </NavLink>

          <Button
            className="open-search mobile-content inner-icon-effect"
            kind="default"
            title="Поиск"
            onClick={() => openModal("search")}
          >
            <IconSearch />
          </Button>

          <div className={`${SECTION_CLASS_NAME}__search desktop-content`}>
            <SearchMovieBlock />
          </div>

          {user ? (
            <NavLink className={getNavLinkModifier("nav-link")} to="/account">
              <span className="desktop-content">{user.name}</span>
              <span className="mobile-content" title={user.name}>
                <IconUserFilled />
              </span>
            </NavLink>
          ) : (
            <Button
              className={`${SECTION_CLASS_NAME}__login-btn inner-icon-effect`}
              kind="default"
              onClick={() => openModal("auth")}
            >
              <span className="desktop-content">Войти</span>
              <span className="mobile-content" title="Личный кабинет">
                <IconUser />
              </span>
            </Button>
          )}
        </nav>
      </Container>
    </header>
  );
};
