import "./authModal.scss";
import { Logo } from "../Logo";
import { Button } from "../Button";
import { useState, FC } from "react";
import { LoginForm } from "../LoginForm";
import { RegisterForm } from "../RegisterForm";
import { ModalWrapper } from "../ModalWrapper";

const BLOCK_CLASS_NAME = "auth-modal";

type ModalSuccessProps = {
  handler: () => void;
};

type ModalType = "register" | "login" | "success";

export const AuthModal = () => {
  const [modalType, setModalType] = useState<ModalType>("login");

  const setLoginForm = () => setModalType("login");
  const setRegisterForm = () => setModalType("register");
  const setSuccessModal = () => setModalType("success");

  const getSwitchFormButton = (text: string, handler: () => void) => {
    return (
      <Button
        className={`${BLOCK_CLASS_NAME}__switch-btn`}
        kind="default"
        onClick={handler}
      >
        {text}
      </Button>
    );
  };

  return (
    <ModalWrapper>
      <div className={`${BLOCK_CLASS_NAME} flex`}>
        <Logo isBlack={true} />

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
  const className = "register-success";

  return (
    <div className={`${BLOCK_CLASS_NAME}__register-success ${className} flex`}>
      <h3 className={`${className}__title heading-3`}>Регистрация завершена</h3>
      <p className={`${className}__text`}>
        Используйте вашу электронную почту для входа
      </p>

      <Button className={`${className}__btn`} kind="primary" onClick={handler}>
        Войти
      </Button>
    </div>
  );
};
