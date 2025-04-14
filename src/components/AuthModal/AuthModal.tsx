import styles from "./authModal.module.scss";
import { Logo } from "../Logo";
import { Button } from "../Button";
import { useState, FC } from "react";
import { LoginForm } from "../LoginForm";
import { RegisterForm } from "../RegisterForm";
import { ModalWrapper } from "../ModalWrapper";

type ModalSuccessProps = {
  handler: () => void;
};

type ModalType = "register" | "login" | "success";

export const AuthModal = () => {
  const [modalType, setModalType] = useState<ModalType>("login");

  const setLoginForm = () => setModalType("login");
  const setRegisterForm = () => setModalType("register");
  const setSuccessModal = () => setModalType("success");

  const getSwitchFormButton = (text: string, onClick: () => void) => {
    return (
      <Button
        className={styles.authModal__switchBtn}
        kind="default"
        onClick={onClick}
      >
        {text}
      </Button>
    );
  };

  return (
    <ModalWrapper>
      <div className={`${styles.authModal} flex`}>
        <Logo className={styles.authModal__logo} isBlack />

        {modalType === "register" && (
          <>
            <RegisterForm onSubmitSuccess={setSuccessModal} />
            {getSwitchFormButton("У меня есть пароль", setLoginForm)}
          </>
        )}

        {modalType === "login" && (
          <>
            <LoginForm />
            {getSwitchFormButton("Регистрация", setRegisterForm)}
          </>
        )}

        {modalType === "success" && <ModalSuccess handler={setLoginForm} />}
      </div>
    </ModalWrapper>
  );
};

const ModalSuccess: FC<ModalSuccessProps> = ({ handler }) => {
  return (
    <div className={`${styles.registerSuccess} flex`}>
      <h3 className={`${styles.registerSuccess__title} heading-3`}>
        Регистрация завершена
      </h3>
      <p className={styles.registerSuccess__text}>
        Используйте вашу электронную почту для входа
      </p>

      <Button
        className={styles.registerSuccess__enter}
        kind="primary"
        onClick={handler}
      >
        Войти
      </Button>
    </div>
  );
};
