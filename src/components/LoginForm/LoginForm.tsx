import { z } from "zod";
import { Button } from "../Button";
import login from "../../api/login";
import { Formik, Form } from "formik";
import fetchMe from "../../api/fetchMe";
import { FormField } from "../FormField";
import { store } from "../../store/store";
import { useContext, useState } from "react";
import { setUser } from "../../store/userSlice";
import { ModalContext } from "../ModalProvider";
import IconKey from "../Icon/Key.svg?react";
import IconEnvelope from "../Icon/Envelope.svg?react";
import { toFormikValidationSchema } from "zod-formik-adapter";

const FORM_CLASS_NAME = "login-form";

const requiredField = z.string({ required_error: "Заполните поле" }).trim();
const ValidationSchema = z.object({
  email: requiredField.email({ message: "Некорректный email" }),
  password: requiredField,
});

export const LoginForm = () => {
  const { closeModal } = useContext(ModalContext);
  const [validateOnChange, setValidateOnChange] = useState(false);

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={toFormikValidationSchema(ValidationSchema)}
      validateOnBlur={false}
      validateOnChange={validateOnChange}
      onSubmit={(values, { setSubmitting, setStatus }) => {
        login({ ...values })
          .then(() => {
            closeModal();
            fetchMe().then((res) => store.dispatch(setUser(res)));
          })
          .catch(() => setStatus({ error: "Не удалось выполнить вход!" }))
          .finally(() => setSubmitting(false));
      }}
    >
      {({ isSubmitting, status }) => (
        <Form className={`${FORM_CLASS_NAME} form flex`} noValidate>
          <fieldset className="fieldset flex">
            <FormField
              className={`${FORM_CLASS_NAME}__email`}
              id="email-input"
              type="email"
              name="email"
              placeholder="Электронная почта"
              icon={<IconEnvelope />}
              autoFocus
            />

            <FormField
              className={`${FORM_CLASS_NAME}__password`}
              id="password-input"
              type="password"
              name="password"
              placeholder="Пароль"
              icon={<IconKey />}
            />
          </fieldset>

          {status && <p className="auth-error">{status.error}</p>}

          <Button
            onClick={() => setValidateOnChange(true)}
            className={`${FORM_CLASS_NAME}__submit-btn`}
            kind="primary"
            type="submit"
            isLoading={isSubmitting}
          >
            Войти
          </Button>
        </Form>
      )}
    </Formik>
  );
};
