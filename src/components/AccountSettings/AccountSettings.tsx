import styles from "./accountSettings.module.scss";
import { Button } from "../Button";
import { FC, ReactNode } from "react";
import logout from "../../api/logout";
import type User from "../../types/User";
import { useDispatch } from "react-redux";
import { ErrorBlock } from "../ErrorBlock";
import { setUser } from "../../store/userSlice";
import Envelope from "../Icon/Envelope.svg?react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, useOutletContext } from "react-router";

type UserDetailProps = {
  text: string;
  value: string;
  icon: ReactNode;
};

export const AccountSettings = () => {
  const user = useOutletContext<User>();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { mutate, isPending, error } = useMutation({
    mutationFn: logout,
    mutationKey: ["logout"],
    onSuccess: () => {
      navigate("/");
      setTimeout(() => {
        dispatch(setUser(null));
      }, 0);
    },
  });

  const handleLogoutClick = () => mutate();

  return (
    <div className={styles.userDetails}>
      <div className={`${styles.userDetails__content} flex`}>
        <UserDetail
          text="Имя Фамилия"
          value={`${user.name} ${user.surname}`}
          icon={extractInitials(user)}
        />

        <UserDetail
          text="Электронная почта"
          value={user.email}
          icon={<Envelope />}
        />
      </div>

      {error && <ErrorBlock text={error.message} />}

      <Button
        className={styles.userDetails__logout}
        kind="primary"
        onClick={handleLogoutClick}
        isLoading={isPending}
      >
        Выйти из аккаунта
      </Button>
    </div>
  );
};

const UserDetail: FC<UserDetailProps> = ({ text, value, icon }) => {
  return (
    <div className={`${styles.detail} flex`}>
      <div className={`${styles.detail__icon} flex`}>{icon}</div>
      <div className={`${styles.detail__right} flex`}>
        <span className={styles.detail__text}>{text}</span>
        <span className={styles.detail__value}>{value}</span>
      </div>
    </div>
  );
};

const extractInitials = ({ name, surname }: User) => {
  return (name.substring(0, 1) + surname.substring(0, 1)).toUpperCase();
};
