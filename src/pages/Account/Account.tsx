import "./account.scss";
import type User from "../../types/User";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { NavLink, Outlet } from "react-router";
import { Section } from "../../components/Section";
import { ErrorBlock } from "../../components/ErrorBlock";
import IconUser from "../../components/Icon/User.svg?react";
import getNavLinkModifier from "../../utils/getNavLinkModifier";
import IconHeartInactive from "../../components/Icon/HeartInactive.svg?react";

const PAGE_CLASS_NAME = "account";

export const Account = () => {
  const user = useSelector<RootState, User | null>((state) => state.user.info);

  return (
    <Section
      className={PAGE_CLASS_NAME}
      optionalClassName="section-padding-block"
    >
      <h1 className={`${PAGE_CLASS_NAME}__title heading-1`}>Мой аккаунт</h1>

      {user ? (
        <>
          <div className={`${PAGE_CLASS_NAME}__navigation flex`}>
            <NavLink
              className={getNavLinkModifier(`nav-link flex`)}
              to="/account"
              end
            >
              {<IconHeartInactive />}
              <span className="desktop-content">Избранные фильмы</span>
              <span className="mobile-content">Избранное</span>
            </NavLink>

            <NavLink
              className={getNavLinkModifier(`nav-link flex`)}
              to="settings"
            >
              {<IconUser />}
              <span className="desktop-content">Настройка аккаунта</span>
              <span className="mobile-content">Настройки</span>
            </NavLink>
          </div>

          <Outlet context={user} />
        </>
      ) : (
        <ErrorBlock text={"Unauthorized"} />
      )}
    </Section>
  );
};
