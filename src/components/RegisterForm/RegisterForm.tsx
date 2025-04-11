import "./registerForm.scss";
import { z } from "zod";
import { Button } from "../Button";
import { FC, useState } from "react";
import { Formik, Form } from "formik";
import { FormField } from "../FormField";
import register from "../../api/register";
import IconKey from "../Icon/Key.svg?react";
import IconUser from "../Icon/User.svg?react";
import IconEnvelope from "../Icon/Envelope.svg?react";
import { toFormikValidationSchema } from "zod-formik-adapter";
import capitalizeFirstLetter from "../../utils/capitalizeFirstLetter";

const FORM_CLASS_NAME = "register-form";

type FormProps = {
  onSubmitSuccess: () => void;
};

const requiredField = z.string({ required_error: "Заполните поле" }).trim();
const ValidationSchema = z
  .object({
    email: requiredField.email({ message: "Некорректный email" }),
    name: requiredField,
    surname: requiredField,
    password: requiredField,
    confirm: requiredField,
  })
  .refine((data) => data.password === data.confirm, {
    message: "Пароли не совпадают",
    path: ["confirm"],
  });

export const RegisterForm: FC<FormProps> = ({ onSubmitSuccess }) => {
  const [validateOnChange, setValidateOnChange] = useState(false);

  return (
    <>
      <h3 className={`${FORM_CLASS_NAME}__title heading-3`}>Регистрация</h3>

      <Formik
        initialValues={{
          email: "",
          name: "",
          surname: "",
          password: "",
          confirm: "",
        }}
        validationSchema={toFormikValidationSchema(ValidationSchema)}
        validateOnBlur={false}
        validateOnChange={validateOnChange}
        onSubmit={(values, { setSubmitting, setStatus }) => {
          const requestData = {
            ...values,
            name: capitalizeFirstLetter(values.name),
            surname: capitalizeFirstLetter(values.surname),
          };
          register(requestData)
            .then(() => {
              onSubmitSuccess();
              setSubmitting(false);
            })
            .catch((error) => setStatus({ error: error.message }))
            .finally(() => setSubmitting(false));
        }}
      >
        {({ isSubmitting, status }) => (
          <Form className={`${FORM_CLASS_NAME} form flex`} noValidate>
            <fieldset className="fieldset flex">
              <FormField
                className={`${FORM_CLASS_NAME}__email`}
                id="email"
                type="email"
                name="email"
                placeholder="Электронная почта"
                icon={<IconEnvelope />}
                autoFocus
              />

              <FormField
                className={`${FORM_CLASS_NAME}__name`}
                id="name"
                type="text"
                name="name"
                placeholder="Имя"
                icon={<IconUser />}
              />

              <FormField
                className={`${FORM_CLASS_NAME}__surname`}
                id="surname"
                type="text"
                name="surname"
                placeholder="Фамилия"
                icon={<IconUser />}
              />

              <FormField
                className={`${FORM_CLASS_NAME}__password`}
                id="password"
                type="password"
                name="password"
                placeholder="Пароль"
                icon={<IconKey />}
              />

              <FormField
                className={`${FORM_CLASS_NAME}__confirm-password`}
                id="confirm-password"
                type="password"
                name="confirm"
                placeholder="Подтвердите пароль"
                icon={<IconKey />}
              />
            </fieldset>

            {status && <p className="auth-error">{status.error}</p>}

            <Button
              className={`${FORM_CLASS_NAME}__submit-btn`}
              kind="primary"
              type="submit"
              isLoading={isSubmitting}
              onClick={() => setValidateOnChange(true)}
            >
              Создать аккаунт
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
};
