import styles from "./header.module.scss";
import { Logo } from "../Logo";
import { useContext } from "react";
import { Button } from "../Button";
import { Container } from "../Container";
import type User from "../../types/User";
import { useSelector } from "react-redux";
import { NavLink, Link } from "react-router";
import { RootState } from "../../store/store";
import { ModalContext } from "../ModalProvider";
import SearchMovie from "../SearchMovie";
import IconUser from "../Icon/User.svg?react";
import IconSearch from "../Icon/Search.svg?react";
import IconGenres from "../Icon/Genres.svg?react";
import IconUserFilled from "../Icon/UserFilled.svg?react";
import getNavLinkModifier from "../../utils/getNavLinkModifier";

export const Header = () => {
  const user = useSelector<RootState, User | null>((state) => state.user.info);
  const { openModal } = useContext(ModalContext);

  const handleOpenSearchClick = () => openModal("search");
  const handleOpenAuthClick = () => openModal("auth");

  return (
    <header className={styles.header}>
      <Container contentClassName={styles.header__content}>
        <Link className={`${styles.header__logo} link-reset`} to="/">
          <Logo />
        </Link>

        <nav className={`${styles.nav} flex`}>
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
            onClick={handleOpenSearchClick}
          >
            <IconSearch />
          </Button>

          <div className={`${styles.header__search} desktop-content`}>
            <SearchMovie />
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
              className={`${styles.header__loginBtn} inner-icon-effect`}
              kind="default"
              onClick={handleOpenAuthClick}
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
