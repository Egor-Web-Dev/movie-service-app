import "./accountSettings.scss";
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

const BLOCK_CLASS_NAME = "user-details";

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

  return (
    <div className={`account__user-details ${BLOCK_CLASS_NAME}`}>
      <div className={`${BLOCK_CLASS_NAME}__content flex`}>
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
        className={`${BLOCK_CLASS_NAME}__logout`}
        kind="primary"
        onClick={() => mutate()}
        isLoading={isPending}
      >
        Выйти из аккаунта
      </Button>
    </div>
  );
};

const UserDetail: FC<UserDetailProps> = ({ text, value, icon }) => {
  const componentClassName = "detail";

  return (
    <div className={`${BLOCK_CLASS_NAME}__detail ${componentClassName} flex`}>
      <div className={`${componentClassName}__icon flex`}>{icon}</div>
      <div className={`${componentClassName}__right flex`}>
        <span className={`${componentClassName}__text`}>{text}</span>
        <span className={`${componentClassName}__value`}>{value}</span>
      </div>
    </div>
  );
};

const extractInitials = ({ name, surname }: User) => {
  return (name.substring(0, 1) + surname.substring(0, 1)).toUpperCase();
};
