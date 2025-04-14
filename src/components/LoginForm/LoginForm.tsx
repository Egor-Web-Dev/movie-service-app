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

const requiredField = z.string({ required_error: "Заполните поле" }).trim();
const ValidationSchema = z.object({
  email: requiredField.email({ message: "Некорректный email" }),
  password: requiredField,
});

export const LoginForm = () => {
  const { closeModal } = useContext(ModalContext);
  const [isValidateOnChange, setValidateOnChange] = useState(false);

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={toFormikValidationSchema(ValidationSchema)}
      validateOnBlur={false}
      validateOnChange={isValidateOnChange}
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
        <Form className="form flex" noValidate>
          <fieldset className="fieldset flex">
            <FormField
              id="email-input"
              type="email"
              name="email"
              placeholder="Электронная почта"
              icon={<IconEnvelope />}
              autoFocus
            />

            <FormField
              id="password-input"
              type="password"
              name="password"
              placeholder="Пароль"
              icon={<IconKey />}
            />
          </fieldset>

          {status && <p className="auth-error">{status.error}</p>}

          <Button
            className="submit-btn"
            kind="primary"
            type="submit"
            isLoading={isSubmitting}
            onClick={() => setValidateOnChange(true)}
          >
            Войти
          </Button>
        </Form>
      )}
    </Formik>
  );
};
