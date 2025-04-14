import styles from "./account.module.scss";
import type User from "../../types/User";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { NavLink, Outlet } from "react-router";
import { Container } from "../../components/Container";
import { ErrorBlock } from "../../components/ErrorBlock";
import IconUser from "../../components/Icon/User.svg?react";
import getNavLinkModifier from "../../utils/getNavLinkModifier";
import IconHeartInactive from "../../components/Icon/HeartInactive.svg?react";

const USER_NOT_FOUND = "Unauthorized";

export const Account = () => {
  const user = useSelector<RootState, User | null>((state) => state.user.info);

  return (
    <section className={styles.account}>
      <Container contentClassName={styles.account__content}>
        <h1 className="heading-1">Мой аккаунт</h1>

        {user ? (
          <>
            <div className={`${styles.account__navigation} flex`}>
              <NavLink
                className={getNavLinkModifier(
                  `nav-link ${styles.account__navLink} flex`
                )}
                to="/account"
                end
              >
                <IconHeartInactive />
                <span className="desktop-content">Избранные фильмы</span>
                <span className="mobile-content">Избранное</span>
              </NavLink>

              <NavLink
                className={getNavLinkModifier(
                  `nav-link ${styles.account__navLink} flex`
                )}
                to="settings"
              >
                <IconUser />
                <span className="desktop-content">Настройка аккаунта</span>
                <span className="mobile-content">Настройки</span>
              </NavLink>
            </div>

            <Outlet context={user} />
          </>
        ) : (
          <ErrorBlock text={USER_NOT_FOUND} />
        )}
      </Container>
    </section>
  );
};
